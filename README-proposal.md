#Browser-friendly format for EPUB 3.1

EPUB as it exists today is not directly usable by a web browser. The web-friendly content files are inside a zip package, which also contains container and package files expressed in a custom XML vocabulary. 

The goal of a browser-friendly format (henceforth EPUB-BFF) is to make it easier for web developers to display EPUB content by [1] allowing an unzipped ("exploded") publication, and [2] by providing an alternative JSON serialization of the information in container.xml and the package document(s).

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


#####Example 1 (omitting linked data and other enhancements)

```json
{
  "metadata": {
    "title": "Moby-Dick",
    "identifier": "978031600000X",
    "language": "en",
    "modified": "2015-09-29T17:00:00Z"
  },

  "links": [
    {"rel": "self", "href": "http://example.org/manifest.json", "type": "application/epub+json"},
    {"rel": "alternate", "href": "http://example.org/publication.epub", "type": "application/epub+zip"}
  ],
  
  "spine": [
    {
      "href": "cover.jpg",
      "type": "image/jpeg",
      "properties": "cover-image",
      "title": "Cover"
    }, {
      "href": "map.svg",
      "type": "image/svg+xml",
      "title": "Map"
    }, {
      "href": "c001.html",
      "type": "text/html",
      "title": "Chapter 1"
    }, {
      "href": "c002.html",
      "type": "text/html",
      "title": "Chapter 2"
    }
  ],

  "resources": [
    {
      "href": "style.css",
      "type": "text/css"
    }, {
      "href": "whale.jpg",
      "type": "image/jpeg"
    }, {
      "href": "boat.svg",
      "type": "image/svg+xml"
    }, {
      "href": "notes.html",
      "type": "text/html"
    }
  ]
  
}
```

##Content Documents

EPUB-BFF content documents follow the usual rules of EPUB 3.1, but also allows HTML in addition to XHTML.

####Associating a JSON manifest document with an EPUB-BFF content document

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

##Containers

Ordinary EPUBs must be packaged in an EPUB Container as defined in [OCF31]. 
EPUB-BFF is not defined in a packaged state (although this may change in the future), but exists only as a file system container.  
The EPUB-BFF JSON manifest file may be included in an ordinary packaged EPUB if referenced properly, 
but reading systems have no obligation to read the JSON manifest file in this context.

The JSON manifest document described below must be named `manifest.json` and must appear at the top level of the file system container.

>**Issue 15: [Naming and location of JSON package document] (https://github.com/dauwhe/epub31-bff/issues/15)**


##Relationship to the Navigation Document

>**Issue 16: [Title attribute on the links object](https://github.com/dauwhe/epub31-bff/issues/16)**


>**Issue 17: [Can a JSON package file function as a navigation document?](https://github.com/dauwhe/epub31-bff/issues/17)**


##The JSON Manifest Document


###Data Model

The manifest itself is a collection.
EPUB 3.0.1 defines a collection as "a related group of resources."

A collection consists of `metadata`, `links`, and subcollections. The key for a collection is the name of that collection.

A manifest must have one `spine` collection (if there is more than one rendition, a `rendition` collection is used instead) where
the components of the publications are listed in the linear reading order (aka "spine"). 
Other resources are listed in a `resources` collection. 

Collections that do not contain any metadata or subcollections (also called "compact collections"), 
can use a more compact syntax where they simply contain an array of link object. 

###The link object

The link object is used in `links` and in compact collections to list resources associated to a collection. 
It requires at least the presence of `href` and `type`:

| Name  | Value | Format | Required? |
| ------------- | ------------- | ------------- | ------------- |
| href  | link location  | URI  | Yes  |
| type  | MIME type of resource  | MIME media type  | Yes  |
| title  | title of the linked resource  | text  | No  |
| rel  | relationship  | see [list of property values](http://www.idpf.org/epub/vocab/package/link/)  | No  |
| properties  | properties associated with the linked resource  | see [list of property values](http://www.idpf.org/epub/301/spec/epub-publications.html#sec-item-property-values)  | No  |
| media-overlay  | indicates SMIL file corresponding to the linked resource  | URI  | No  |
| duration  | indicates length the linked resource  | subset of SMIL clock value  | No  |
| templated  | indicates linked resource is a URI template  | boolean  | No  |

>**Issue 18: [Media overlays and the definition of the link object](https://github.com/dauwhe/epub31-bff/issues/18)** 

###Multiple renditions

Multiple renditions publications rely on the `rendition` role and an additional collection element, 
where each rendition has its own `spine` and `resources`. 
Each of them must have rendition metadata to allow the reading system to select the proper rendition.


>**Issue 19: [Rendition mapping in BFF](https://github.com/dauwhe/epub31-bff/issues/19)**



####Example 2: Multiple renditions with selection metadata
```json
{
  "metadata": {
    "title": "Chouinard",
    "language": "en",
    "identifier": "42",
    "modified": "2016-02-01T15:45:00Z",
    "author": "Yvon Chouinard",
    "description": "Equipment for alpinists"
  },

  "rendition": [{
    "metadata": {
      "layout": "reflowable",
      "accessMode": "textual",
      "label": "Optimized for smaller screens"
    },

    "spine": [
      {
        "href": "reflow/html/section001.xhtml",
        "type": "application/xhtml+xml"
      }, {
        "href": "reflow/html/section002.xhtml",
        "type": "application/xhtml+xml"
      }, {
        "href": "reflow/html/section003.xhtml",
        "type": "application/xhtml+xml"
      }
    ],

    "resources": [{
      "href": "reflow/css/reflow.css",
      "type": "text/css"
    }]
  },
  {
    "metadata": {
      "media": "color, min-width: 1920px",
      "layout": "pre-paginated",
      "accessMode": "visual",
      "label": "Color-optimized print replica"
    },

    "spine": [
      {
        "href": "fixed/html/page001.xhtml",
        "type": "application/xhtml+xml"
      }, {
        "href": "fixed/html/page002.xhtml",
        "type": "application/xhtml+xml"
      }, {
        "href": "fixed/html/page003.xhtml",
        "type": "application/xhtml+xml"
      }, {
        "href": "fixed/html/page004.xhtml",
        "type": "application/xhtml+xml"
      }, {
        "href": "fixed/html/page005.xhtml",
        "type": "application/xhtml+xml"
      }
    ],

    "resources": [{
     "href": "fixed/css/fixed.css",
     "type": "text/css"
    }]
  }
 ]

}

```

###Media overlays

#####Example 3: media overlays
```json
{
  "metadata": {
    "title": "Audio Book",
    "language": "en",
    "identifier": "qqq",
    "modified": "2016-01-01T00:00:01Z",
    "creator": "Jane Doe",
    "duration": "1:36:20",
    "narrator": "Joe Speaker",
    "active-class": "-epub-media-overlay-active",
    "playback-active-class": "-epub-media-overlay-playing"
  },
  
  "spine": [
    {
      "href": "xhtml/chapter01.xhtml",
      "type": "application/xhtml+xml",
      "media-overlay": "chapter1_audio.smil"
    },
    {
      "href": "xhtml/chapter02.xhtml",
      "type": "application/xhtml+xml",
      "media-overlay": "chapter2_audio.smil"
    },
    {
      "href": "xhtml/chapter03.xhtml",
      "type": "application/xhtml+xml",
      "links": {
        "type:": "application/smil+xml",
        "href": "chapter3_audio.smil",
        "rel": "media-overlay"
      }
    }
  ],

  "resouces": [
    {
      "href": "css/epub.css",
      "type": "text/css"
    }, {
      "href": "chapter1_audio.smil",
      "type": "application/smil+xml"
    }, {
      "href": "chapter2_audio.smil",
      "type": "application/smil+xml"
    }, {
      "href": "chapter3_audio.smil",
      "type": "application/smil+xml"
    }, {
      "href": "chapter1_audio.mp3",
      "type": "audio/mpeg",
      "duration": "0:32:29"
    }, {
      "href": "chapter2_audio.mp3",
      "type": "audio/mpeg",
      "duration": "0:34:02"
    }, {
      "href": "chapter3_audio.mp3",
      "type": "audio/mpeg",
      "duration": "0:29:49"
    }
  ]
}
```

>**Issue: How do we support media-overlays?**
In the previous example, media overlays are assigned to XHTML resources using either a dedicated attribute or a nested link element? What's the best solution for that problem? Fallbacks could also work with a nested link.


## JSON-LD and Linked Data

We can add a context so that the JSON can be interpreted as linked data. 

##### Example 4.

>**Note**: Metadata and JSON-LD for this proposal are still a work in progress. For the metadata the idea is to have properties that can either work as literals or objects. All extensions would have to use full IRIs since additional context definition won't be allowed. [Examples for both are available in a separate Gist] (https://gist.github.com/HadrienGardeur/03ab96f5770b0512233a).

######JSON
```json
{
  "@context": "http://idpf.org/epub.jsonld",
  "@type": "http://schema.org/CreativeWork",
  
  "metadata": {
    "@type": "http://schema.org/Book",
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
    {
      "href": "cover.jpg",
      "type": "image/jpeg",
      "properties": "cover-image",
      "title": "Cover"
    }, {
      "href": "map.svg",
      "type": "image/svg+xml",
      "title": "Map"
    }, {
      "href": "c001.html",
      "type": "text/html",
      "title": "Chapter 1"
    }, {
      "href": "c002.html",
      "type": "text/html",
      "title": "Chapter 2"
    }
  ],

  "resources": [
    {
      "href": "style.css",
      "type": "text/css"
    }, {
      "href": "whale.jpg",
      "type": "image/jpeg"
    }, {
      "href": "boat.svg",
      "type": "image/svg+xml"
    }, {
      "href": "notes.html",
      "type": "text/html"
    }
  ]
}
```

If we use another example with more complex metadata expression and an extension:

```json
{
  "@context": "http://idpf.org/epub.jsonld",
  "@type": "http://schema.org/CreativeWork",
  
  "metadata": {
    "@type": "http://schema.org/Book",
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
    "http://schema.org/isFamilyFriendly": true,
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

######Schema.org context (a context for Dublin Core is also available at the above gist)
```json
{
  "@context": {
    "metadata": "owl:sameAs",
    "identifier": "@id",
    "title": {
      "@id": "http://schema.org/name",
      "@container": "@language"
    },
    "sort_as": "http://schema.org/alternateName",
    "author": {
      "@id": "http://schema.org/author",
      "@type": "http://schema.org/Person"
    },
    "translator": {
      "@id": "http://schema.org/translator",
      "@type": "http://schema.org/Person"
    },
    "editor": {
      "@id": "http://schema.org/editor",
      "@type": "http://schema.org/Person"
    },
    "illustrator": {
      "@id": "http://schema.org/illustrator",
      "@type": "http://schema.org/Person"
    },
    "contributor": {
      "@id": "http://schema.org/contributor",
      "@type": "http://schema.org/Person"
    },
    "name":  {
      "@id": "http://schema.org/name",
      "@container": "@language"
    },
    "language": "http://schema.org/inLanguage",
    "publisher": {
      "@id": "http://schema.org/publisher",
      "@type": "http://schema.org/Organization"
    },
    "modified": {
      "@id": "http://schema.org/dateModified",
      "@type": "http://www.w3.org/2001/XMLSchema#dateTime"
    },
    "description": "http://schema.org/description",
    "belongs_to": "http://schema.org/isPartOf",
    "series": "http://schema.org/Series",
    "collection": "http://bib.schema.org/Collection",
    "position": "http://schema.org/position"
  }
}

```

###Acknowledgements

All the JSON serialization work is based on ideas from Hadrien Gardeur.  
