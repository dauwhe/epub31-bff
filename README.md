#Browser-friendly format for EPUB 3.1

EPUB as it exists today is not directly usable by a web browser. The web-friendly content files are inside a zip package, which also contains container and package files expressed in a custom XML vocabulary. 

The goal of a browser-friendly format (henceforth EPUB-BFF) is to make it easier for web developers to display EPUB content by [1] allowing an unzipped ("exploded") publication, and [2] by providing an alternative serialization of the information in container.xml and the package document(s).

I have collected several different proposals for how best to do this.

###[Proposal 1: JSON-LD serialization](json-ordered.md) with separate spine and manifest, and an external JSON-LD context

#####Example of proposal 1

>**Note**: Metadata and JSON-LD for this proposal are still a work in progress. For the metadata the idea is to have properties that can either work as literals or objects. All extensions would have to use full IRIs since additional context definition won't be allowed. [Examples for both are available in a separate Gist] (https://gist.github.com/HadrienGardeur/03ab96f5770b0512233a).


######Schema.org context (a context for Dublin Core is also available at the above gist)
```json
{
  "@context": {
    "identifier": "@id",
    "title": {
      "@id": "http://schema.org/name",
      "@container": "@language"
    },
    "creator": {
      "@id": "http://schema.org/author",
      "@type": "http://schema.org/Person"
    },
    "name": "http://schema.org/name",
    "sort-as": "http://schema.org/alternateName",
    "language": "http://schema.org/inLanguage",
    "publisher": {
      "@id": "http://schema.org/publisher",
      "@type": "http://schema.org/Organization"
    },
    "modified": {
      "@id": "http://schema.org/dateModified",
      "@type": "http://www.w3.org/2001/XMLSchema#dateTime"
    }
  }
}

```
######JSON
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



###[Proposal 2: Pure HTML serialization](html.md)

We use the `nav` file to describe the content sequence, as well as providing metadata for the entire publication. 

#####Example of proposal 2
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
  <!--list non-spine files here, to allow caching, etc-->
  <link href="style.css" type="text/css">
  <link href="cover.jpg" type="image/jpeg" rel="icon" sizes="any">
  <link href="whale.jpg" type="image/jpeg">
  <link href="boat.svg" type="image/svg+xml">
  <link href="notes.html" type="text/html" title="Notes from the editor">
</head>
<body>
  <nav role="doc-toc" id="nav"> 
    <ol>
      <li> <a href="#nav" type="text/html">Contents</a> </li>
      <li> <a href="map.svg" type="image/svg+xml">Map</a> </li>
      <li> <a href="c001.html" type="text/html">Looming</a> </li>
      <li> <a href="c002.html" type="text/html">The Spouter-inn</a> </li>
    </ol>
  </nav> 
</body>
</html>

```

###Acknowledgements

All the JSON serialization work is based on ideas from Hadrien Gardeur. 

