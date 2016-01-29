#Browser-friendly format

EPUB as it exists today is not directly usable by a web browser. The web-friendly content files are inside a zip package, which also contains container and package files expressed in a custom XML vocabulary. 

The goal of a browser-friendly format (henceforth EPUB-BFF) is to make it easier for web developers to display EPUB content by [1] allowing an unzipped ("exploded") publication, and [2] by providing an alternative JSON serialization of the information in container.xml and the package document(s). 

##The Container

While ordinary EPUBs must be packaged in an EPUB Container as defined in [OCF31], this is optional for EPUB-BFF. A packaged EPUB-BFF must have a mimetype file, and be zipped in the same manner as EPUB31. But instead of META-INF and container.xml, the JSON package document must be called package.json and placed in the top level of the publication folder.

##The JSON Package Document

###Introduction

A single JSON package document replaces both container.xml and the package file(s). Document metadata, the manifest, the spine, rendition metadata, and collections can all be serialized this way. 

###Data Model

The JSON package file consists of a metadata object, followed by one or more collection objects. EPUB 3.0.1 defines a collection as "a related group of resources." We are extending this term so that a rendition of a publication can be described as a collection.


A collection consists of metadata and links. The link array describes both the required publication resources ("manifest") and their sequence ("spine"). Note that this avoids the duplication inherent in the manifest/spine model of EPUB, as well as the need for id and idrefs.

```json
{
  "metadata": {
    "title": "Moby Dick",
    "language": "en",
    "identifier": {
      "type": "unique-identifier",
      "value": "9780000000001",
      "modified": "2015-09-29T17:00:00Z"
    }
  },

  "rendition": {

    "links": [{
      "href": "cover.jpg",
      "type": "image/jpeg",
      "properties": "cover-image"
    }, {
      "href": "c001.html",
      "type": "text/html"
    }, {
      "href": "c002.html",
      "type": "text/html"
    }, {
      "href": "toc.html",
      "type": "text/html",
      "properties": "nav"
    }, {
      "href": "style.css",
      "type": "text/css"
    }]
  }

}
```

The package assumes that resources of type "text/html" are in the "spine" unless otherwise specified.

```json
{
  "href": "toc.html",
  "type": "text/html",
  "properties": "nav",
  "sequence": "false"
}
```

| Name  | Value | Format | Required? |
| ------------- | ------------- | ------------- | ------------- |
| href  | link location  | URI  | Yes  |


