#Browser-friendly format for EPUB 3.1

EPUB as it exists today is not directly usable by a web browser. The web-friendly content files are inside a zip package, which also contains container and package files expressed in a custom XML vocabulary. 

The goal of a browser-friendly format (henceforth EPUB-BFF) is to make it easier for web developers to display EPUB content by: 

- allowing an unzipped ("exploded") publication 
- and providing an alternative JSON serialization of the information in container.xml and the package document(s).

##Introduction: The Browser-Friendly Format (aka "BFF")

EPUB exists because the web doesn't allow us to easily speak about
collections of documents. Web documents can link to each other, and link
relations let you say a few things about what's on the other end of a
link. But you can't say two documents are part of a larger entity. You
can't say this metadata applies to a group of documents.

EPUB has filled that gap with the package file, which includes publication metadata, a list of files that make up the publication ("manifest"), and information about their ordering ("spine"). However, there's a lot of duplication and indirection involved in the XML, and we believe a simpler conceptual model is possible. 

We can describe everything we need to know about the bundle of documents that forms a publication with a relatively simple JSON structure. It consists of:

1. Metadata about the publication as a whole.

2. Links to related resources, including one mandatory link ("self") to the canonical location of the manifest.

3. A spine that enumerates the components of the publication, their ordering, and their properties.

4. Additional resources that are not part of the spine but used by the publication (CSS, images, fonts).


#####Example (omitting linked data and other enhancements)

```json
{
  "metadata": {
    "title": "Moby-Dick",
    "author": "Herman Melville",
    "identifier": "urn:isbn:978031600000X",
    "language": "en",
    "modified": "2015-09-29T17:00:00Z"
  },

  "links": [
    {"rel": "self", "href": "http://example.org/manifest.json", "type": "application/epub+json"},
    {"rel": "alternate", "href": "http://example.org/publication.epub", "type": "application/epub+zip"},
    {"rel": "search", "href": "http://example.org/?q={searchTerms}", "type": "text/html", "templated": true}
  ],
  
  "spine": [
    {"href": "cover.jpg", "type": "image/jpeg", "height": 600, "width": 400, "properties": "cover-image", "title": "Cover"},
    {"href": "map.svg", "type": "image/svg+xml", "title": "Map"}, 
    {"href": "c001.html", "type": "text/html", "title": "Chapter 1"}, 
    {"href": "c002.html", "type": "text/html", "title": "Chapter 2"}
  ],

  "resources": [
    {"href": "style.css", "type": "text/css"}, 
    {"href": "whale.jpg", "type": "image/jpeg"}, 
    {"href": "boat.svg", "type": "image/svg+xml"}, 
    {"href": "notes.html", "type": "text/html"}
  ]
}
```

## The JSON Manifest Document

### Data Model

The manifest itself is a collection.
EPUB 3.0.1 defines a collection as "a related group of resources."

A collection consists of `metadata`, `links`, and subcollections. The key for a collection is the role of that collection:
```
role
  metadata
  links
  [subcollections]
```

A manifest must have one `spine` collection where the components of the publications are listed in the linear reading order. 
Other resources are listed in a `resources` collection. 

Collections that do not contain any metadata or subcollections (also called "compact collections"), 
can use a more compact syntax where they simply contain an array of Link Objects. 

###Collection Roles

This specification defines two collection roles that are the building blocks of any manifest:

| Role  | Semantics | Compact? | Required? |
| ----- | --------- | -------- | --------- |
| spine  | Identifies a list of resources in reading order for the publication.  | Yes  | Yes  |
| resources  | Identifies resources that are necessary for rendering the publication.  | Yes  | No  |

Additional collection roles are defined in the [EPUB Collection Roles Registry](http://idpf.github.io/epub-registries/roles/).

Extensions to these collection roles must use a URI as their JSON key.

###Links

A manifest must contain at least one link using the `self` relationship.
This link must point to the canonical location of the manifest using an absolute URI:

```json
"links": [{
  "rel": "self",
  "href": "http://example.org/manifest.json",
  "type": "application/epub+json"}
]
```
A manifest may also contain other links, such as a `alternate` link to an EPUB 3.1 version of the publication for example.

###The Link Object

The Link Object is used in `links` and in compact collections to list resources associated to a collection. 
It requires at least the presence of `href` and `type`:

| Name  | Value | Format | Required? |
| ------------- | ------------- | ------------- | ------------- |
| href  | link location  | URI  | Yes  |
| type  | MIME type of resource  | MIME media type  | Yes  |
| title  | title of the linked resource  | text  | No  |
| rel  | relationship  | [list of rel values](http://www.idpf.org/epub/vocab/package/link/) or URI for an extension  | No  |
| properties  | properties associated with the linked resource  | [list of property values](http://www.idpf.org/epub/301/spec/epub-publications.html#sec-item-property-values)  | No  |
| height  | indicates the height of the linked resource in pixels  | integer where the value is greater than zero | No  |
| width  | indicates the width of the linked resource in pixels  | integer where the value is greater than zero | No  |
| duration  | indicates the length of the linked resource in seconds  | integer where the value is greater than zero | No  |
| templated  | indicates linked resource is a URI template  | boolean  | No  |


## JSON-LD and Linked Data

JSON-LD provides an easy and standard way to extend existing JSON document: through the addition of a context, we can associate keys in a document to Linked Data elements from various vocabularies.

EPUB BFF relies on JSON-LD to provide a context for the `metadata` object of the manifest.

While JSON-LD is very flexible and allows the context to be defined in-line (local context) or referenced (URI), EPUB BFF restricts context definition strictly to references.

EPUB BFF defines an initial registry of well-known context documents, which currently includes the following references:

| Name  | URI | Description | Required? |
| ---- | ----------- | ------------- | --------- |
[Default Context](https://github.com/dauwhe/epub31-bff/blob/master/contexts/default/) | http://idpf.org/epub.jsonld  | Default context definition used in every EPUB BFF manifest. | Yes |

The full up-to-date registry is [available directly on Github](https://github.com/dauwhe/epub31-bff/blob/master/contexts/).

## Content Documents

EPUB-BFF content documents follow the usual rules of EPUB 3.1, but also allows HTML in addition to XHTML.

### Discovering a Manifest

To indicate that an EPUB-BFF content document is associated with a particular JSON manifest document, 
use a `link` element in the HTML `head`:

```html
<link href="manifest.json" rel="manifest" type="application/epub+json">
```

The manifest can also be associated with any resources served over HTTP using the `Link` header:

```
Link: <http://example.org/manifest.json>; rel="manifest";
         type="application/epub+json"
```

## Table of Contents

An EPUB BFF manifest can indicate that a table of contents is available using the `navigation` rel value in a Link Object listed in `spine` or `resources`:

```json
{"rel": "navigation", "href": "contents.html", "type": "text/html"}
```

The link must point to an HTML or XHTML document and may be a Navigation Document as defined in EPUB 3.1. 

An EPUB BFF client may also rely on the `title` key included in each Link Object of the `spine` to extract a minimal table of contents.

## Containers

Classic EPUBs must be packaged in an EPUB Container as defined in the OCF specification.

EPUB BFF is primarily meant to be distributed unpackaged and exploded on the Web.

That said, an EPUB BFF manifest may be included in a classic EPUB but reading systems have no obligation to access the manifest.

If an EPUB BFF manifest is included in an EPUB container, the following restrictions apply:

- the manifest document must be named `manifest.json` and must appear at the top level of the container
- the OPF of the primary rendition must include a link to the manifest where the relationship is set to `alternate`

```xml
<link rel="alternate" href="manifest.json" media-type="application/epub+json" />
```

##Acknowledgements

All the JSON serialization work is based on ideas from Hadrien Gardeur.  
