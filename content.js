(function () {
  "use strict";

  const IGNORE_TAGS = ["SCRIPT", "STYLE", "TEXTAREA", "PRE", "CODE"];
  const IGNORE_CLASSES = ["katex-ignore-active-render", "anki-output-ignore"];

  /**
   * Corrected function to find and sanitize LaTeX expressions.
   * It no longer uses a while-loop for replacement, which was the source of the errors.
   */
  const preprocessAndSanitize = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      let originalText = node.nodeValue;

      // This regex correctly finds content wrapped in $$...$$.
      const displayMathRegex = /\$\$(.*?)\$\$/gs;

      // Use a single, robust .replace() call with a replacer function.
      // This processes all matches in one pass without the bugs of the old loop.
      const newText = originalText.replace(
        displayMathRegex,
        (match, content) => {
          const trimmedContent = content.trim();

          // If a user just types "$$" with nothing inside, remove it to prevent errors.
          if (trimmedContent === "") {
            return "";
          }

          // The heuristic to determine if an expression is "complex" enough to
          // remain in display mode. You can adjust these rules as needed.
          const isComplex =
            trimmedContent.length > 25 ||
            trimmedContent.includes("\\begin") ||
            trimmedContent.includes("\\frac") ||
            trimmedContent.includes("\\sum") ||
            trimmedContent.includes("\\int") ||
            trimmedContent.includes("\\lim") ||
            trimmedContent.includes("\\\\") ||
            trimmedContent.split(" ").length > 4;

          if (isComplex) {
            // If complex, keep the original match (e.g., "$$ E = mc^2 $$").
            return match;
          } else {
            // If simple, convert to inline math.
            // Using \\(...\\) is safer than $...$ because it's less likely to
            // conflict with regular text (e.g., currency symbols like $5).
            return `\\(${trimmedContent}\\)`;
          }
        }
      );

      // Only update the DOM if a change was actually made.
      if (newText !== originalText) {
        node.nodeValue = newText;
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      if (
        IGNORE_TAGS.includes(node.tagName) ||
        IGNORE_CLASSES.some((cls) => node.classList.contains(cls))
      ) {
        return;
      }
      for (const child of Array.from(node.childNodes)) {
        preprocessAndSanitize(child);
      }
    }
  };

  const ignoreClass = "katex-ignore-active-render";
  const katexOptions = {
    delimiters: [
      { left: "$$", right: "$$", display: true },
      { left: "$", right: "$", display: false },
      { left: "\\(", right: "\\)", display: false },
      { left: "\\[", right: "\\]", display: true },
    ],
    ignoredClasses: [ignoreClass, "anki-output-ignore"],
    throwOnError: false,
  };

  let renderTimeout;
  const renderPageWithIgnore = () => {
    const activeEl = document.activeElement;
    let hasIgnoreClass = false;
    try {
      if (
        activeEl &&
        (activeEl.isContentEditable ||
          activeEl.tagName === "TEXTAREA" ||
          activeEl.tagName === "INPUT")
      ) {
        activeEl.classList.add(ignoreClass);
        hasIgnoreClass = true;
      }
      preprocessAndSanitize(document.body);
      renderMathInElement(document.body, katexOptions);
    } catch (e) {
      console.error("KaTeX render error:", e);
    } finally {
      if (hasIgnoreClass && activeEl) {
        activeEl.classList.remove(ignoreClass);
      }
    }
  };

  const observer = new MutationObserver(() => {
    clearTimeout(renderTimeout);
    renderTimeout = setTimeout(renderPageWithIgnore, 300);
  });
  observer.observe(document.body, { childList: true, subtree: true });

  renderPageWithIgnore();
})();
