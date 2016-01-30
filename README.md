#Browser-friendly format for EPUB 3.1

EPUB as it exists today is not directly usable by a web browser. The web-friendly content files are inside a zip package, which also contains container and package files expressed in a custom XML vocabulary. 

The goal of a browser-friendly format (henceforth EPUB-BFF) is to make it easier for web developers to display EPUB content by [1] allowing an unzipped ("exploded") publication, and [2] by providing an alternative JSON serialization of the information in container.xml and the package document(s).

##Content Documents

EPUB-BFF content documents are identical to those in EPUB 3.1.

```
**Note:** EPUB 3.1 now allows the HTML serialization of HTML5. 
```

##Containers

Ordinary EPUBs must be packaged in an EPUB Container as defined in [OCF31]. EPUB-BFF is not defined in a packaged state (although this may change in the future), but exists only as a file system container.  The EPUB-BFF JSON package file may be included in an ordinary packaged EPUB if referenced properly, but reading systems have no obligation to read the JSON package file in this context.

The JSON package document described below must be named `package.json` and must appear at the top level of the file system container.

##The JSON Package Document

###Introduction

A single JSON package document replaces both container.xml and the package file(s). All of these files consist of essentially two things—metadata and links. So with only the concepts of metadata and links, we can express document metadata, manifests, the spine, rendition metadata, and collections.

###Data Model

The JSON package file consists of a metadata object, followed by one or more collection objects. EPUB 3.0.1 defines a collection as "a related group of resources." We are extending this term so that any rendition of a publication can be described as a collection. The key for a collection is the name of that collection. An EPUB-BFF must have at least one rendition collection. 

A collection consists of metadata and links. The link array describes both the required publication resources ("manifest") and their sequence ("spine"). Note that this avoids the duplication inherent in the manifest/spine model of EPUB, as well as the need for id and idrefs.

#####Example 1. Simple JSON package document.
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

The package assumes that resources of type `text/html` or `application/xhtml+xml` are in the "spine," and that any other types (like 'text/css') are not in the spine, unless otherwise specified. For example, if you wish to omit the `nav` document from the reading order:


#####Example 2. Content Document outside spine
```json
{
  "href": "toc.html",
  "type": "text/html",
  "properties": "nav",
  "sequence": "false"
}
```

Or include an SVG file as a spine item:

#####Example 3. SVG document in spine
```json
{
  "href": "page001.svg",
  "type": "image/svg+xml",
  "sequence": "true"
}
```

###The link object

Each publication component is described by a link object, which consists of the following key/value pairs. The `href` and `type` pairs are required. 

| Name  | Value | Format | Required? |
| ------------- | ------------- | ------------- | ------------- |
| href  | link location  | URI  | Yes  |
| type  | MIME type of resource  | MIME media type  | Yes  |
| sequence  | is the linked resource part of the linear reading order?  | boolean  | No  |
| rel  | relationship  | TK  | No  |
| properties  | properties associated with the linked resource  | see http://www.idpf.org/epub/301/spec/epub-publications.html#sec-item-property-values  | No  |
| templated  | indicates linked resource is a URI template  | boolean  | No  |


###Types of collections

####Rendition collections

Each EPUB-BFF must have at least one rendition collection, but can have as many as required. If there is more than one rendition collection, each must have rendition metadata to allow the reading system to select the proper rendition.

```
**Issue:** Rendition mapping
```

#####Example 4: Multiple renditions with selection metadata
```json
{ 
"example": "tk" 
}

```



####Preview collections

#####Example 5: preview collection

####Collection collections

#####Example 6: index group

