# script that downloads link by link as a file and saves it as the last

Links = [
"https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/fonts/KaTeX_AMS-Regular.woff",
"https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/fonts/KaTeX_AMS-Regular.woff2",
"https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/fonts/KaTeX_Caligraphic-Bold.woff",
"https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/fonts/KaTeX_Caligraphic-Bold.woff2",
"https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/fonts/KaTeX_Caligraphic-Regular.woff",
"https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/fonts/KaTeX_Caligraphic-Regular.woff2",
"https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/fonts/KaTeX_Fraktur-Bold.woff",
"https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/fonts/KaTeX_Fraktur-Bold.woff2",
"https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/fonts/KaTeX_Typewriter-Regular.woff2",
"https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/fonts/KaTeX_Typewriter-Regular.woff",
"https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/fonts/KaTeX_Size4-Regular.woff2",
"https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/fonts/KaTeX_Size4-Regular.woff",
"https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/fonts/KaTeX_Size3-Regular.woff2",
"https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/fonts/KaTeX_Size3-Regular.woff",
"https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/fonts/KaTeX_Size2-Regular.woff2",
"https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/fonts/KaTeX_Size2-Regular.woff",
"https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/fonts/KaTeX_Size1-Regular.woff2",
"https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/fonts/KaTeX_Size1-Regular.woff",
"https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/fonts/KaTeX_Script-Regular.woff2",
"https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/fonts/KaTeX_Script-Regular.woff",
"https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/fonts/KaTeX_SansSerif-Regular.woff2",
"https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/fonts/KaTeX_SansSerif-Regular.woff",
"https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/fonts/KaTeX_SansSerif-Italic.woff2",
"https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/fonts/KaTeX_SansSerif-Italic.woff",
"https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/fonts/KaTeX_SansSerif-Bold.woff2",
"https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/fonts/KaTeX_SansSerif-Bold.woff",
"https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/fonts/KaTeX_Math-Italic.woff2",
"https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/fonts/KaTeX_Math-Italic.woff",
"https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/fonts/KaTeX_Math-BoldItalic.woff2",
"https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/fonts/KaTeX_Math-BoldItalic.woff",
"https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/fonts/KaTeX_Main-Regular.woff2",
"https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/fonts/KaTeX_Main-Regular.woff",
"https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/fonts/KaTeX_Main-Italic.woff2",
"https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/fonts/KaTeX_Main-Italic.woff",
"https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/fonts/KaTeX_Main-BoldItalic.woff2",
"https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/fonts/KaTeX_Main-BoldItalic.woff",
"https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/fonts/KaTeX_Main-Bold.woff2",
"https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/fonts/KaTeX_Main-Bold.woff",
"https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/fonts/KaTeX_Fraktur-Regular.woff2",
"https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/fonts/KaTeX_Fraktur-Regular.woff"]

import requests
for link in Links:
    filename = link.split("/")[-1]
    response = requests.get(link)
    if response.status_code == 200:
        with open(filename, 'wb') as file:
            file.write(response.content)
    else:
        print(f"Failed to download {link}: Status code {response.status_code}")
print("Download complete.")