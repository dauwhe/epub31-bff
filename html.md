#Browser-friendly format for EPUB 3.1

EPUB as it exists today is not directly usable by a web browser. The web-friendly content files are inside a zip package, which also contains container and package files expressed in a custom XML vocabulary. 

The goal of a browser-friendly format (henceforth EPUB-BFF) is to make it easier for web developers to display EPUB content by [1] allowing an unzipped ("exploded") publication, and [2] by providing an alternative HTML serialization of the information in container.xml and the package document(s).

##Content Documents

EPUB-BFF content documents follow the usual rules of EPUB 3.1.

####Associating an HTML package document with an EPUB-BFF content document

To indicate that an EPUB-BFF content document is associated with a particular HTML package document, use a `link` element in the HTML `head`:

```html
<link href="index" rel="package" type="text/html" />
```


>**Note:** EPUB 3.1 now allows the HTML serialization of HTML5. 


##Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Moby-Dick</title>

<!--one possiblility for complex metadata-->
<script type="application/json+ld">
{
  "@context": "http://schema.org",
  "@type": "Book",
  "accessibilityAPI": "ARIA",
  "accessibilityControl": [
    "fullKeyboardControl",
    "fullMouseControl"
  ],
  "accessibilityFeature": [
    "largePrint/CSSEnabled",
    "highContrast/CSSEnabled",
    "resizeText/CSSEnabled"
  ],
  "accessibilityHazard": [
    "noFlashing",
    "noMotionSimulation",
    "noSound"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "reviewCount": "0"
  },
  "bookFormat": "EBook/e0",
  "copyrightHolder": {
    "@type": "Organization",
    "name": "Harper & Row"
  },
  "author": "Herman Melville",
  "datePublished": "1851-10-19",
  "image": "moby-dick-book-cover.jpg",
  "offers": {
    "@type": "Offer",
    "availability": "https://example.com/BuyMe?isbn=9780316123456",
    "price": "6.99",
    "priceCurrency": "USD"
  },
  "copyrightYear": "1851",
  "description": "Project Gutenberg edition of Moby-Dick",
  "genre": "Literary Fiction",
  "inLanguage": "en-US",
  "isFamilyFriendly": "true",
  "isbn": "9780000000000",
  "name": "Moby-Dick",
  "numberOfPages": "777",
  "publisher": {
    "@type": "Organization",
    "name": "Harper & Row"
  }
}
</script>


<!--or traditional dublin core metadata-->
<meta id="title" name="dc:title" content="Moby-Dick, or, The Whale">
<meta id="creator" name="dc:creator" content="Herman Melville">

<style type="text/css">
head, meta {
display: block;
}

meta[content]::after {
content: attr(name) ': ' attr(content);
display: inline;
}
</style> 


<!--this is the manifest minus spine, essentially—files that are not in nav below but are part of the publication-->

<link href="css/main.css" type="text/css" rel="prefetch">
<link href="images/cover.jpg" type="image/jpeg" role="doc-cover" rel="prefetch">
<link href="smil/c001-overlay.smil" type="application/smil+xml" rel="prefetch">
<link href="audio/chapter1_audio.mp3" type="audio/mpeg" rel="prefetch">


<!--issue: link smil files to corresponding content docs-->
<!--issue: rendition metadata-->

<!--link to alternate rendition, in this case French version-->
<link rel="alternate" href="index2.html" hreflang="fr" title="French translation">


<!--link to alternate rendition, with media query-->
<link rel="alternate" href="index3.html" media="min-width: 1024px" title="Fixed Layout">



<!--issue: would a service worker want rel=prefetch on everything? -->
</head>
<body>

<!--sequence/spine-->
<nav role="doc-toc" id="nav"> 
<ol>
  <li> <a href="#nav" type="text/html">Contents</a> </li>
  <li> <a href="html/c001.html" type="text/html">Looming</a> </li>
  <li> <a href="html/c001.html" type="text/html">The Spouter-inn</a> </li>

<!--this is a somewhat simplified version of example 40 in the indexing spec. It actually seems more useful to me, as it does supply labels for navigation, and I'm not sure of the utility of yet another wrapper around multiple files that cover the same letter of the alphabet-->
  <li> <span>Subject Index</span> 
  <ol role="doc-index">
    <li> <a href="html/subjectIndex-a01.html" type="text/html">A</a> </li>
    <li> <a href="html/subjectIndex-a02.html" type="text/html">A</a> </li>
    <li> <a href="html/subjectIndex-a03.html" type="text/html">A</a> </li>
    <li> <a href="html/subjectIndex-b.html" type="text/html">B</a> </li>
    <li> <a href="html/subjectIndex-c01.html" type="text/html">C</a> </li>
    <li> <a href="html/subjectIndex-c02.html" type="text/html">C</a> </li>
    <li> <a href="html/subjectIndex-c03.html" type="text/html">C</a> </li>
  </ol>
  </li>
</ol>
</nav> 
</body>
</html>


```
