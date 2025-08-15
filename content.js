(function () {
    'use strict';

    const IGNORE_TAGS = ['SCRIPT', 'STYLE', 'TEXTAREA', 'PRE', 'CODE'];
    const IGNORE_CLASSES = ['katex-ignore-active-render', 'anki-output-ignore'];

    const preprocessAndSanitize = (node) => {
        if (node.nodeType === Node.TEXT_NODE) {
            let originalText = node.nodeValue;
            let newText = originalText;

            const displayMathRegex = /\$\$(.*?)\$\$/gs;
            let tempTextForDisplay = newText;
            let match_display;
            while ((match_display = displayMathRegex.exec(tempTextForDisplay)) !== null) {
                const content = match_display[1].trim();
                const isComplex = content.length > 25 || content.includes('\\begin') || content.includes('\\frac') || content.includes('\\sum') || content.includes('\\int') || content.includes('\\lim') || content.includes('\\\\') || content.split(' ').length > 4;
                if (!isComplex) {
                    newText = newText.replace(`$$${match_display[1]}$$`, `$${content}$`);
                }
            }

            if (newText !== originalText) {
                node.nodeValue = newText;
            }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            if (
                IGNORE_TAGS.includes(node.tagName) ||
                IGNORE_CLASSES.some(cls => node.classList.contains(cls))
            ) {
                return;
            }
            for (const child of Array.from(node.childNodes)) {
                preprocessAndSanitize(child);
            }
        }
    };

    const ignoreClass = 'katex-ignore-active-render';
    const katexOptions = {
        delimiters: [
            { left: "$$", right: "$$", display: true }, { left: "$", right: "$", display: false },
            { left: "\\(", right: "\\)", display: false }, { left: "\\[", right: "\\]", display: true }
        ],
        ignoredClasses: [ignoreClass, 'anki-output-ignore'],
        throwOnError: false
    };

    let renderTimeout;
    const renderPageWithIgnore = () => {
        const activeEl = document.activeElement;
        let hasIgnoreClass = false;
        try {
            if (activeEl && (activeEl.isContentEditable || activeEl.tagName === 'TEXTAREA' || activeEl.tagName === 'INPUT')) {
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