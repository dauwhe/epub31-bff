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

###[Proposal 2: JSON serialization](json-mixed.md), with a single array functioning as manifest and spine

#####Example of proposal 2
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
      "href": "map.svg",
      "type": "image/svg+xml"
    }, {
      "href": "c001.html",
      "type": "text/html"
    }, {
      "href": "c002.html",
      "type": "text/html"
    }, {
      "href": "whale.jpg",
      "type": "image/jpeg",
      "sequence": false
    }, {
      "href": "boat.svg",
      "type": "image/svg+xml",
      "sequence": false
    }, {
      "href": "toc.html",
      "type": "text/html",
      "properties": "nav"
    }, {
      "href": "notes.html",
      "type": "text/html",
      "sequence": false
    }, {
      "href": "style.css",
      "type": "text/css"
    }]
  }
}
```


###[Proposal 3: HTML serialization](html.md)

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
  <link href="cover.jpg" type="image/jpeg" role="doc-cover" rel="prefetch">
  <link href="whale.jpg" type="image/jpeg" rel="prefetch">
  <link href="boat.svg" type="image/svg+xml" rel="prefetch">
  <link href="notes.html" type="text/html" rel="prefetch" title="Notes from the editor">
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

