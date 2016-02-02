#Browser-friendly format for EPUB 3.1

EPUB as it exists today is not directly usable by a web browser. The web-friendly content files are inside a zip package, which also contains container and package files expressed in a custom XML vocabulary. 

The goal of a browser-friendly format (henceforth EPUB-BFF) is to make it easier for web developers to display EPUB content by [1] allowing an unzipped ("exploded") publication, and [2] by providing an alternative serialization of the information in container.xml and the package document(s).

I have collected several different proposals for how best to do this.

1. [JSON serialization](json-ordered.md), with separate spine and manifest
2. [JSON serialization](json-mixed.md), with a single array functioning as manifest and spine
3. [HTML serialization](html.md)

###Acknowledgements

All the JSON serialization work is based on ideas from Hadrien Gardeur. 

