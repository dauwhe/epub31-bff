#Web Publication Manifest

## Example

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
    {"href": "c001.html", "type": "text/html", "title": "Chapter 1"}, 
    {"href": "c002.html", "type": "text/html", "title": "Chapter 2"}
  ],

  "resources": [
    {"href": "cover.jpg", "type": "image/jpeg", "height": 600, "width": 400, "rel": "cover"},
    {"href": "style.css", "type": "text/css"}, 
    {"href": "whale.jpg", "type": "image/jpeg"}, 
    {"href": "boat.svg", "type": "image/svg+xml"}, 
    {"href": "notes.html", "type": "text/html"}
  ]
}
```


##Introduction

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
| duration  | indicates the length of the linked resource in seconds  | ISO 8601 duration | No  |
| templated  | indicates linked resource is a URI template  | boolean, defaults to false  | No  |


### Metadata

JSON-LD provides an easy and standard way to extend existing JSON document: through the addition of a context, we can associate keys in a document to Linked Data elements from various vocabularies.

The Web Publication Manifest relies on JSON-LD to provide a context for the `metadata` object of the manifest.

While JSON-LD is very flexible and allows the context to be defined in-line (local context) or referenced (URI), the Web Publication Manifest restricts context definition strictly to references.

The Web Publication Manifest defines an initial registry of well-known context documents, which currently includes the following references:

| Name  | URI | Description | Required? |
| ---- | ----------- | ------------- | --------- |
[Default Context](contexts/default/) | http://idpf.org/epub.jsonld  | Default context definition used in every Web Publication Manifest. | Yes |

The full up-to-date registry is [available directly on Github](contexts/).

## Content Documents

Web Publication Manifest content documents follow the usual rules of EPUB 3.1, but also allows HTML in addition to XHTML.

## Discovering a Manifest

To indicate that a content document is associated with a particular Web Publication Manifest, 
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

A Web Publication Manifest can indicate that a table of contents is available using the `contents` rel value in a Link Object listed in `spine` or `resources`:

```json
{"rel": "contents", "href": "contents.html", "type": "text/html"}
```

The link must point to an HTML or XHTML document and may be a Navigation Document as defined in EPUB 3.1. 

A Web Publication Manifest client may also rely on the `title` key included in each Link Object of the `spine` to extract a minimal table of contents.

## Cover

A Web Publication Manifest can also provide a cover using the `cover` rel value in a Link Object listed in `spine`, `resources` or `links`:

```json
{"rel": "cover", "href": "cover.jpg", "type": "image/jpeg", "height": 600, "width": 400}
```

The link must point to an image using one of the following media types: `image/jpeg`, `image/png`, `image/gif` or `image/svg+xml`. 

## Containers

Classic EPUBs must be packaged in an EPUB Container as defined in the OCF specification.

The Web Publication Manifest is primarily meant to be distributed unpackaged and exploded on the Web.

That said, a Web Publication Manifest may be included in a classic EPUB but reading systems have no obligation to access the manifest.

If a Web Publication Manifest is included in an EPUB container, the following restrictions apply:

- the manifest document must be named `manifest.json` and must appear at the top level of the container
- the OPF of the primary rendition must include a link to the manifest where the relationship is set to `alternate`

```xml
<link rel="alternate" href="manifest.json" media-type="application/epub+json" />
```

##Live Demo

A live demo of a Web Publication is available at: https://dauwhe.github.io/epub31-bff/examples/MobyDick/

The manifest for this demo is available at: https://dauwhe.github.io/epub31-bff/examples/MobyDick/manifest.json

In addition to a Web Publication Manifest, this live demo also uses a Service Worker to provide offline reading and a Web App Manifest.

##Acknowledgements

All the JSON serialization work is based on ideas from Hadrien Gardeur.  
