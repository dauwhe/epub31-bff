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

###[Proposal 2: JSON-LD in NAV](json-mixed.md), where the JSON+LD package is embedded in the `nav` document

#####Example of proposal 2
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Moby-Dick</title>

<script type="application/json+ld">
{
  "@context": {
    "schema": "http://schema.org/",
    "bff": "http://idpf.org/2016/bff/"
  },

  "@type": "schema:Book",
  "schema:name": "Moby-Dick",
  "schema:dateModified": "2015-09-29T17:00:00Z",
  "schema:ISBN": "9780000000001",
  "schema:inLanguage": "en",

  "bff:collection": {
    "@type": "bff:rendition",
    "bff:links": [{
      "@type": "schema:mediaObject",
      "schema:url": "cover.jpg",
      "schema:fileformat": "image/jpeg",
      "bff:properties": "cover-image"
    }, {
      "@type": "schema:mediaObject",
      "schema:url": "map.svg",
      "schema:fileformat": "image/svg+xml"
    }, {
      "@type": "schema:mediaObject",
      "schema:url": "c001.html",
      "schema:fileformat": "text/html"
    }, {
      "@type": "schema:mediaObject",
      "schema:url": "c002.html",
      "schema:fileformat": "text/html"
    }],

    "bff:collection": {
      "@type": "bff:manifest",
      "bff:links": [{
        "@type": "schema:mediaObject",
        "schema:url": "style.css",
        "schema:fileformat": "text/css"
      }, {
        "@type": "schema:mediaObject",
        "schema:url": "whale.jpg",
        "schema:fileformat": "image/jpeg"
      }, {
        "@type": "schema:mediaObject",
        "schema:url": "boat.svg",
        "schema:fileformat": "image/svg+xml"
      }, {
        "@type": "schema:mediaObject",
        "schema:url": "notes.html",
        "schema:fileformat": "text/html",
        "schema:name": "Notes from the editor"
      }]
    }
  }
}
</script>
</head>
<body>

<nav role="doc-toc" id="nav"> 
<ol>
  <li><a href="cover.jpg">Cover Page</a></li>
  <li><a href="map.svg">Map</a></li>
  <li><a href="html/c001.html">Loomings</a></li>
  <li><a href="html/c001.html">The Spouter-inn</a></li>
</ol>
</nav> 

</body>
</html>

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

