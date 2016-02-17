#Browser-friendly format for EPUB 3.1

EPUB as it exists today is not directly usable by a web browser. The web-friendly content files are inside a zip package, which also contains container and package files expressed in a custom XML vocabulary. 

The goal of a browser-friendly format (henceforth EPUB-BFF) is to make it easier for web developers to display EPUB content by [1] allowing an unzipped ("exploded") publication, and [2] by providing an alternative serialization of the information in container.xml and the package document(s).

I have collected several different proposals for how best to do this.

###[Proposal 1: JSON serialization](json-ordered.md) with separate spine and manifest

#####Example of proposal 1
```json
{
  "metadata": {
    "title": "Moby Dick",
    "creator": "Herman Melville",
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
      "title": "Cover Page",
      "properties": "cover-image"
    }, {
      "href": "map.svg",
      "type": "image/svg+xml",
      "title": "Map"
    }, {
      "href": "c001.html",
      "type": "text/html",
      "title": "Looming"
    }, {
      "href": "c002.html",
      "type": "text/html",
      "title": "The Spouter-Inn"
    }],

    "manifest": {
      "links": [{
        "href": "style.css",
        "type": "text/css"
      }, {
        "href": "whale.jpg",
        "type": "image/jpeg",
      }, {
        "href": "boat.svg",
        "type": "image/svg+xml"
      }, {
        "href": "notes.html",
        "type": "text/html",
        "title": "Notes from the editor"
      }]
    }
  }
}

```

###Proposal 2: JSON-LD

#####Example of proposal 2 using only schema.org vocabulary

>**Issue**: The JSON-LD is a disaster. Suggestions for improvements from people with actual knowledge of linked data are welcome!


```json
{
  "@context": {

    "title": "http://schema.org/name",
    "creator": "http://schema.org/author",
    "identifier": "http://schema.org/isbn",
    "modified": "http://schema.org/dateModified",
    "language": "http://schema.org/inLanguage",
    "links": {
      "@id": "http://schema.org/hasPart",
      "@type": "@id"
    },
    "href": {
      "@id": "http://schema.org/url",
      "@type": "@id"
    },
    "type": "http://schema.org/fileFormat",
    "rendition": {
      "@id": "http://schema.org/encoding",
      "@type": "@id"
    }
  },
  "@type": "http://schema.org/Book",
  "title": "Moby-Dick",
  "creator": "Herman Melville",
  "identifier": "9780000000000",
  "modified": "2016-02-01T15:45:00Z",
  "language": "en-US",
  "rendition": {
  "links": [{
      "href": "cover.jpg",
      "type": "image/jpeg"
    }, {
      "href": "map.svg",
      "type": "image/svg+xml"
    }, {
      "href": "c001.html",
      "type": "text/html"
    }, {
      "href": "c002.html",
      "type": "text/html"
    }]
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

