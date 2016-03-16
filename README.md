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

2. One or more renditions, or distinct representations of the publications, which may differ in language, use of fixed layout, etc. Most publications consist of a single rendition.

3. A rendition consists of metadata ("rendition metadata"), links, and a manifest. The links enumerate the components of the publication, their ordering, and their properties.


#####Example 1 (omitting linked data and other enhancements)

```json
{
"metadata": {
  "title": "Moby-Dick",
  "identifier": "978031600000X",
  "language": "en",
  "modified": "2015-09-29T17:00:00Z"
},

"rendition": {
    "links": [{
      "href": "cover.jpg",
      "media-type": "image/jpeg",
      "properties": "cover-image"
    }, {
      "href": "map.svg",
      "media-type": "image/svg+xml"
    }, {
      "href": "c001.html",
      "media-type": "text/html"
    }, {
      "href": "c002.html",
      "media-type": "text/html"
    }],

    "manifest": {
      "links": [{
        "href": "style.css",
        "media-type": "text/css"
      }, {
        "href": "whale.jpg",
        "media-type": "image/jpeg"
      }, {
        "href": "boat.svg",
        "media-type": "image/svg+xml"
      }, {
        "href": "notes.html",
        "media-type": "text/html",
        "title": "Notes from the editor"
      }]
    }
  }

}
```

>**Issue 13: [Simpler serialization for single-rendition publications](https://github.com/dauwhe/epub31-bff/issues/13)**


>**Issue 14: [Can the links/manifest model be simplified?](https://github.com/dauwhe/epub31-bff/issues/14)**


##Content Documents

EPUB-BFF content documents follow the usual rules of EPUB 3.1.

####Associating a JSON package document with an EPUB-BFF content document

To indicate that an EPUB-BFF content document is associated with a particular JSON package document, use a `link` element in the HTML `head`:

```html
<link href="manifest.pwp" rel="manifest" type="application/epub+json">
```


>**Note:** EPUB 3.1 now allows the HTML serialization of HTML5. 


##Containers

Ordinary EPUBs must be packaged in an EPUB Container as defined in [OCF31]. EPUB-BFF is not defined in a packaged state (although this may change in the future), but exists only as a file system container.  The EPUB-BFF JSON package file may be included in an ordinary packaged EPUB if referenced properly, but reading systems have no obligation to read the JSON package file in this context.

The JSON package document described below must be named `package.json` and must appear at the top level of the file system container.

>**Issue 15: [Naming and location of JSON package document] (https://github.com/dauwhe/epub31-bff/issues/15)**


##Relationship to the Navigation Document

>**Issue 16: [Title attribute on the links object](https://github.com/dauwhe/epub31-bff/issues/16)**


>**Issue 17: [Can a JSON package file function as a navigation document?](https://github.com/dauwhe/epub31-bff/issues/17)**


##The JSON Package Document


###Data Model

The JSON package file consists of a metadata object, followed by one or more collection objects. EPUB 3.0.1 defines a collection as "a related group of resources." We are extending this term so that any rendition of a publication can be described as a collection. The key for a collection is the name of that collection. An EPUB-BFF must have one rendition collection (if there is more than one rendition, a rendition array is used).

A collection consists of metadata, links, and subcollections. The link array describes all publications in the linear reading order (aka "spine"). Other resources are listed in a `manifest` collection. 

Note that this avoids the duplication inherent in the manifest/spine model of EPUB, as well as the need for id and idrefs.


###The `links` object

Each publication component is described by a `links` object, which consists of the following key/value pairs. The `href` and `type` pairs are required. 

| Name  | Value | Format | Required? |
| ------------- | ------------- | ------------- | ------------- |
| href  | link location  | URI  | Yes  |
| type  | MIME type of resource  | MIME media type  | Yes  |
| title  | title of the linked resource  | text  | No  |
| rel  | relationship  | TK  | No  |
| properties  | properties associated with the linked resource  | see [list of property values](http://www.idpf.org/epub/301/spec/epub-publications.html#sec-item-property-values)  | No  |
| media-overlay  | indicates SMIL file corresponding to the linked resource  | URI  | No  |
| duration  | indicates length the linked resource  | subset of SMIL clock value  | No  |
| templated  | indicates linked resource is a URI template  | boolean  | No  |

>**Issue 18: [Media overlays and the definition of the links object](https://github.com/dauwhe/epub31-bff/issues/18)** 

###Types of collections

####Rendition collections

Each EPUB-BFF must have at least one rendition collection, but can have as many as required. If there is more than one rendition collection, each must have rendition metadata to allow the reading system to select the proper rendition.


>**Issue 19: [Rendition mapping in BFF](https://github.com/dauwhe/epub31-bff/issues/19)**



#####Example 2: Multiple renditions with selection metadata
```json
{
 "metadata": {
  "title": "Chouinard",
  "language": "en",
  "identifier": "42",
  "modified": "2016-02-01T15:45:00Z",
  "creator": "Yvon Chouinard",
  "description": "Equipment for alpinists",
  "date": "1972-01-01"
 },

 "rendition": [{
   "metadata": {
    "layout": "reflowable",
    "accessMode": "textual",
    "label": "Optimized for smaller screens"
   },

   "links": [{
    "href": "reflow/html/section001.xhtml",
    "type": "application/xhtml+xml"
   }, {
    "href": "reflow/html/section002.xhtml",
    "type": "application/xhtml+xml"
   }, {
    "href": "reflow/html/section003.xhtml",
    "type": "application/xhtml+xml"
   }],

   "manifest": {

    "links": [{
     "href": "reflow/css/reflow.css",
     "type": "text/css"
    }]
   }
  },

  {
   "metadata": {
    "media": "color, min-width: 1920px",
    "layout": "pre-paginated",
    "accessMode": "visual",
    "label": "Color-optimized print replica"
   },

   "links": [{
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
   }],


   "manifest": {

    "links": [{
     "href": "fixed/css/fixed.css",
     "type": "text/css"
    }]
   }
  }
 ]

}

```



####Preview collections

#####Example 3: preview collection

```json
{
  "metadata": {},

  "rendition": {},

  "preview": {

    "metadata": {
      "title": "Moby Dick Preview",
      "language": "en-US",
      "identifier": "123456789012X",
      "modified": "2015-09-29T17:00:00Z"
      }
    },

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
    }],


    "manifest": {

      "links": [{
        "href": "style.css",
        "type": "text/css"
      }]
    }
  }
}
```


####Distributable objects

#####Example 4: distributable object collection

```json 
{
  "metadata": {
    "title": "Phantom Textbook - Chapter 1",
    "language": "en",
    "type": "distributable-object",
    "identifier": "urn:uuid:a46825d1-e796-4cc3-a633-5160f529a1e0",
    "modified": "2014-11-10T19:30:22Z",
    "creator": "Jane Doe",
    "description": "Introduction to the history of phantasms. For sale separately.",
    "source": "urn:isbn:9780987654321",
    "date": "2014-10-31",
    "rights": "All rights reserved. Not available for use or sale except by authorized vendors."
  },

  "distributable-object": {

    "links": [{
      "href": "xhtml/chapter01.xhtml",
      "type": "application/xhtml+xml"
    }, {
      "href": "xhtml/notes.xhtml",
      "type": "application/xhtml+xml"
    }, {
      "href": "xhtml/biblio.xhtml#b001",
      "type": "application/xhtml+xml"
    }, {
      "href": "xhtml/biblio.xhtml#b023",
      "type": "application/xhtml+xml"
    }, {
      "href": "xhtml/biblio.xhtml#b029",
      "type": "application/xhtml+xml"
    }],
    "manifest": {
      "links": [

        {
          "href": "css/epub.css",
          "type": "text/css"
        }
      ]
    }
  }
}
```

####Collection collections

The key for a collection is the name of the collection type. In the following example, based on Example 40 from the indexing spec, nested collections are used to describe a complex index.

>**Issue 20: [Nesting sub-collections between links](https://github.com/dauwhe/epub31-bff/issues/20)**

#####Example 5: index group


```json

{
  "metadata": {},

  "rendition": {},

  "index": {
    "links": [{
      "index-group": [{

          "links": [{
            "href": "subjectIndex-a01.html",
            "type": "text/html"
          }, {
            "href": "subjectIndex-a02.html",
            "type": "text/html"
          }, {
            "href": "subjectIndex-a03.html",
            "type": "text/html"
          }]
        },

        {
          "links": [{
            "href": "subjectIndex-a01.html",
            "type": "text/html"
          }]
        },

        {
          "links": [{
            "href": "subjectIndex-c01.html",
            "type": "text/html"
          }, {
            "href": "subjectIndex-c02.html",
            "type": "text/html"
          }, {
            "href": "subjectIndex-c03.html",
            "type": "text/html"
          }]
        },

        {
          "links": [{
            "href": "subjectIndex-d.html",
            "type": "text/html"
          }]
        },

        {
          "links": [{
            "href": "subjectIndex-e.html",
            "type": "text/html"
          }]
        }
      ]
    }]
  }
}

```


###Media overlays

#####Example 6: media overlays
```json
{
  "metadata": {
    "title": "Audio Book",
    "language": "en",
    "identifier": "qqq",
    "modified": "2016-01-01T00:00:01Z",
    "creator": "Jane Doe"
  },

  "rendition": {
    "metadata": {
      "duration": "1:36:20",
      "narrator": "Joe Speaker",
      "active-class": "-epub-media-overlay-active",
      "playback-active-class": "-epub-media-overlay-playing"
    },

    "links": [{
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

    "manifest": {
      "links": [
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
  }
}
```

>**Issue 9: How do we support media-overlays?**
In the previous example, media overlays are assigned to XHTML resources using either a dedicated attribute or a nested link element? What's the best solution for that problem? Fallbacks could also work with a nested link.


## JSON-LD and Linked Data

We can add a context so that the JSON can be interpreted as linked data. 

##### Example 7.

>**Note**: Metadata and JSON-LD for this proposal are still a work in progress. For the metadata the idea is to have properties that can either work as literals or objects. All extensions would have to use full IRIs since additional context definition won't be allowed. [Examples for both are available in a separate Gist] (https://gist.github.com/HadrienGardeur/03ab96f5770b0512233a).


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

  "rendition": {
    "links": [{
      "href": "cover.jpg",
      "media-type": "image/jpeg",
      "title": "Cover Page",
      "properties": "cover-image"
    }, {
      "href": "map.svg",
      "media-type": "image/svg+xml",
      "title": "Map"
    }, {
      "href": "c001.html",
      "media-type": "text/html",
      "title": "Looming"
    }, {
      "href": "c002.html",
      "media-type": "text/html",
      "title": "The Spouter-Inn"
    }],

    "manifest": {
      "links": [{
        "href": "style.css",
        "media-type": "text/css"
      }, {
        "href": "whale.jpg",
        "media-type": "image/jpeg"
      }, {
        "href": "boat.svg",
        "media-type": "image/svg+xml"
      }, {
        "href": "notes.html",
        "media-type": "text/html",
        "title": "Notes from the editor"
      }]
    }
  }
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

###Acknowledgements

All the JSON serialization work is based on ideas from Hadrien Gardeur.  
