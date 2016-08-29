#Default Context for the Web Publication Manifest

>**Note**: This proposal is still a work in progress. For the metadata the idea is to have properties that can either work as literals or objects. [Examples for both are available in a separate Gist] (https://gist.github.com/HadrienGardeur/03ab96f5770b0512233a).

The Web Publication Manifest defines a shared external context document hosted by the IDPF and based primarily on schema.org and its extensions.

This context is meant primarily to:

- provide compatibility with EPUB 3.1 by providing equivalent metadata elements based on schema.org
- align the Web Publication Manifest with the Web by adopting schema.org and its extensions

| Name  | URI | Description | Required? |
| ---- | ----------- | ------------- | --------- |
Default Context | http://idpf.org/epub.jsonld  | Default context definition used in every EPUB BFF manifest. | Yes |

## Core Metadata

| Key  | Schema.org | EPUB 3.1 |
| ---- | ---------- | -------- |
| [title](definitions.md#Title) | http://schema.org/name  | dc:title |
| [sort_as](definitions.md#Title)  | http://schema.org/alternateName  | title@opf:file-as |
| [author](definitions.md#Contributors) | http://schema.org/author  | dc:creator |
| [translator](definitions.md#Contributors) | http://schema.org/translator  | dc:contributor@opf:role="trl" |
| [editor](definitions.md#Contributors) | http://schema.org/editor  | dc:contributor@opf:role="edt" |
| [illustrator](definitions.md#Contributors)| http://schema.org/illustrator  | dc:contributor@opf:role="ill" |
| [narrator](definitions.md#Contributors) | http://bib.schema.org/readBy | dc:contributor@opf:role="nrt" |
| [contributor](definitions.md#Contributors) | http://schema.org/contributor  | dc:contributor |
| language  | http://schema.org/inLanguage  | dc:language |
| subject  | http://schema.org/keywords  | dc:subject |
| publisher  | http://schema.org/publisher  | dc:publisher |
| modified  | http://schema.org/dateModified  | dcterms:modified |
| published  | http://schema.org/datePublished  | dc:date |
| description  | http://schema.org/description  | dc:description |
| epub-type  | None  | dc:type |
| numberOfPages  | http://schema.org/numberOfPages  | schema:numberOfPages |


## Rendition Properties

All rendition specific properties must show up in a `rendition` object. This specification allows the following elements, all defined in the EPUB 3.1 specification:

| Key  | URI |
| ---- | --- |
| flow  | http://www.idpf.org/vocab/rendition/#flow |
| layout  | http://www.idpf.org/vocab/rendition/#layout |
| orientation  | http://www.idpf.org/vocab/rendition/#orientation |
| spread  | http://www.idpf.org/vocab/rendition/#spread |

Here's an example of metadata for a fixed layout document:

```json
"rendition": {
  "flow": "paginated",
  "layout": "pre-paginated",
  "orientation": "landscape",
  "spread": "none"
}
```

## Collections & Series Properties

This context also allows metadata to express that a publication belongs to any number of collections or series.

The `belongs_to` object is used for that purpose and has no real equivalent in EPUB 3.1.

The following keys and their mappings to schema.org are used to specify collections/series:

| Key  | Schema.org |
| ---- | --- |
| belongs_to  | http://www.schema.org/isPartOf |
| series  | http://www.schema.org/Series |
| collection  | http://www.schema.org/Collection |
| position  | http://www.schema.org/position |

Here's an example of metadata for both collections and series:

```json
"belongs_to": {
  "collection": "Young Adult Classics",
  "series": {
    "name": "Harry Potter",
    "position": 4
  }
}
```


## Example

```json
{
  "@context": "http://idpf.org/epub.jsonld",
  
  "metadata": {
    "@type": "http://schema.org/EBook",
    "identifier": "urn:isbn:9780000000001",
    "title": "Moby-Dick",
    "author": "Herman Melville",
    "language": "en",
    "publisher": "Whale Publishing Ltd.",
    "modified": "2016-02-18T10:32:18Z"
  },

  "links": [
    {"rel": "self", "href": "http://example.org/manifest.json", "type": "application/epub+json"},
    {"rel": "alternate", "href": "http://example.org/publication.epub", "type": "application/epub+zip"}
  ],
  
  "spine": [
    {"href": "cover.jpg", "type": "image/jpeg", "properties": "cover-image", "title": "Cover"}, 
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

If we use another example with more complex metadata expression and an extension:

```json
{
  "@context": "http://idpf.org/epub.jsonld",
  
  "metadata": {
    "@type": "http://schema.org/EBook",
    "identifier": "urn:isbn:9780000000002",
    "title": {
      "en": "A Journey into the Center of the Earth",
      "fr": "Voyage au centre de la Terre"
    },
    "sort_as": "Journey into the Center of the Earth, A",
    "author": {
      "name": "Jules Verne",
      "identifier": "http://isni.org/isni/0000000121400562",
      "sort_as": "Verne, Jules"
    },
    "translator": "Frederick Amadeus Malleson",
    "language": ["en", "fr"],
    "publisher": "SciFi Publishing Inc.",
    "modified": "2016-02-22T11:31:38Z",
    "description": "The story involves German professor Otto Lidenbrock who believes there are volcanic tubes going toward the centre of the Earth. He, his nephew Axel, and their guide Hans descend into the Icelandic volcano Snæfellsjökull, encountering many adventures, including prehistoric animals and natural hazards, before eventually coming to the surface again in southern Italy, at the Stromboli volcano.",
    "schema:isFamilyFriendly": true,
    "belongs_to": {
      "series": {
        "name": "The Extraordinary Voyages",
        "position": 3
      },
      "collection": "SciFi Classics"
    }
  }
}
```
