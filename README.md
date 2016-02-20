#Browser-friendly format for EPUB 3.1

EPUB as it exists today is not directly usable by a web browser. The web-friendly content files are inside a zip package, which also contains container and package files expressed in a custom XML vocabulary. 

The goal of a browser-friendly format (henceforth EPUB-BFF) is to make it easier for web developers to display EPUB content by [1] allowing an unzipped ("exploded") publication, and [2] by providing an alternative serialization of the information in container.xml and the package document(s).

I have collected several different proposals for how best to do this.

###[Proposal 1: JSON serialization](json-ordered.md) with separate spine and manifest, and an external JSON-LD context

#####Example of proposal 1

>**Note**: Metadata and JSON-LD for this proposal are still a work in progress. For the metadata the idea is to have properties that can either work as literals or objects. All extensions would have to use full IRIs since additional context definition won't be allowed. [Examples for both are available in a separate Gist] (https://gist.github.com/HadrienGardeur/03ab96f5770b0512233a).

```json
{
  "@context": "http://idpf.org/epub.jsonld",
  "@type": "http://schema.org/Book",
  
  "metadata": {
    "identifier": "urn:isbn:9780000000001",
    "title": "Moby Dick",
    "creator": "Herman Melville",
    "language": "en",
    "publisher": "Whale Publishing Ltd."
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
  "@type": "http://schema.org/Book",
  
  "metadata": {
    "identifier": "urn:isbn:9780000000002",
    "title": {
      "en": "A Journey into the Center of the Earth",
      "fr": "Voyage au centre de la Terre"
    },
    "sort-as": "Journey into the Center of the Earth, A",
    "creator": {
      "name": "Jules Verne",
      "identifier": "http://isni.org/isni/0000000121400562",
      "sort-as": "Verne, Jules"
    },
    "language": ["en", "fr"],
    "publisher": "SciFi Publishing Inc.",
    "http://schema.org/isFamilyFriendly": true
  }
}
```

###Proposal 2: JSON-LD

#####Example of proposal 2 using some schema.org terms

>**Issue**: The JSON-LD is a disaster. Suggestions for improvements from people with actual knowledge of linked data are welcome! I especially have questions about how to deal with nesting in @context. One version of the proposal has both identifier/type and link/type. How to give different contexts for those two different type keys?


>**Issue**: Of course, there's no good mapping to schema.org for some of these properties.


```json
{
  "@context": {
    "title": "http://schema.org/name",
    "creator": "http://schema.org/author",
    "identifier": "http://idpf.org/2016/bff/identifier",
    "value": {

      "@id": "http://schema.org/isbn",
      "@type": "@id"

    },
    "type": "http://idpf.org/2016/bff/identifier-type",
    "modified": "http://schema.org/dateModified",

    "language": "http://schema.org/inLanguage",
    "link": "http://schema.org/hasPart",
    "href": {
      "@id": "http://schema.org/url",
      "@type": "@id"
    },
    "media-type": "http://schema.org/fileFormat",
    "rendition": "http://schema.org/encoding",
    "manifest": "http://schema.org/encoding",
    "metadata": "http://idpf.org/2016/bff/metadata"

  },
  "@type": "http://schema.org/Book",
  "metadata": {
    "title": "Moby-Dick",
    "creator": "Herman Melville",
    "identifier": {
      "type": "unique-identifier",
      "value": "9999999999999",
      "modified": "2016-02-18T10:32:18Z"

    },

    "language": "en-US"
  },
  "rendition": {
    "link": [{
      "href": "c001.html",
      "media-type": "text/html"
    }, {
      "href": "c002.html",
      "media-type": "text/html"
    }],
    "manifest": {
      "link": [{
        "href": "style.css",
        "media-type": "text/css"
      }, {
        "href": "cover.jpg",
        "media-type": "image/jpeg"
      }]
    }
  }
}

```


###[Proposal 3: Pure HTML serialization](html.md)

#####Example of proposal 3
```html
<!DOCTYPE html>
<html lang="en" prefix="schema: http://schema.org/">
<head typeof="schema:Book">
<meta charset="utf-8" />
<title>Moby-Dick</title>
  <meta id="title" property="schema:name" content="Moby-Dick, or, The Whale">
  <meta id="pub-id" property="schema:isbn" content="9780000000001">
  <meta id="modified-date" property="schema:dateModified" content="2015-09-29T17:00:00Z">
  <meta id="language" property="schema:inLanguage" content="en-US">

  <link href="style.css" type="text/css" rel="prefetch">
  <link href="cover.jpg" type="image/jpeg" rel="prefetch icon" sizes="any">
  <link href="whale.jpg" type="image/jpeg" rel="prefetch">
  <link href="boat.svg" type="image/svg+xml" rel="prefetch">
  <link href="notes.html" type="text/html" rel="prefetch" title="Notes from the editor">
</head>
<body>
  <nav role="doc-toc" id="nav"> 
    <ol>
      <li> <a href="#nav" type="text/html" rel="prefetch">Contents</a> </li>
      <li> <a href="map.svg" type="image/svg+xml" rel="prefetch">Map</a> </li>
      <li> <a href="c001.html" type="text/html" rel="prefetch">Looming</a> </li>
      <li> <a href="c002.html" type="text/html" rel="prefetch">The Spouter-inn</a> </li>
    </ol>
  </nav> 
</body>
</html>

```

###Acknowledgements

All the JSON serialization work is based on ideas from Hadrien Gardeur. 

