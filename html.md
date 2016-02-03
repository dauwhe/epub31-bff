#Browser-friendly format for EPUB 3.1

EPUB as it exists today is not directly usable by a web browser. The web-friendly content files are inside a zip package, which also contains container and package files expressed in a custom XML vocabulary. 

The goal of a browser-friendly format (henceforth EPUB-BFF) is to make it easier for web developers to display EPUB content by [1] allowing an unzipped ("exploded") publication, and [2] by providing an alternative form of the information in container.xml and the package document(s).

##Content Documents

EPUB-BFF content documents follow the usual rules of EPUB 3.1.

##nav and index.html

We propose that all the package information be embedded in the `nav` document, which must be named `index.html` and located at the top level of the file system container. 

##metadata

Metadata in `index.html` applies to the publication as a whole.

In keeping with the focus on the web, publication metadata should be easily understood by browsers and search engines. In the example below, the schema.org vocabulary is used to describe the minimal metadata set required by EPUB. 

###EPUB-BFF minimal Metadata

```html
<html lang="en" prefix="schema: http://schema.org/">
<head typeof="schema:Book">
<meta charset="utf-8" />
<title>Moby-Dick</title>
  <meta id="title" property="schema:name" content="Moby-Dick, or, The Whale">
  <meta id="pub-id" property="schema:isbn" content="9780000000001">
  <meta id="modified-date" property="schema:dateModified" content="2015-09-29T17:00:00Z">
  <meta id="language" property="schema:inLanguage" content="en-US">
```

But metadata can often be more complex than this, and at some point it makes more sense to use JSON-LD embedded in the document head. Here's another example, again using schema.org:

```json
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
```
##Describing document resources

In EPUB, the manifest lists all publication resources, and the spine describes their ordering. EPUB-BFF uses the required `nav` element to describe the nature and ordering of the primary publication content documents. Other publication resources are listed as links in the head of index.html. 

###Non-spine resources
```html
  <link href="style.css" type="text/css" rel="prefetch">
  <link href="cover.jpg" type="image/jpeg" role="doc-cover" rel="prefetch">
  <link href="whale.jpg" type="image/jpeg" rel="prefetch">
  <link href="boat.svg" type="image/svg+xml" rel="prefetch">
  <link href="notes.html" type="text/html" rel="prefetch" title="Notes from the editor">
```

###Spine resources
```html
<nav role="doc-toc" id="nav"> 
    <ol>
      <li> <a href="#nav" type="text/html">Contents</a> </li>
      <li> <a href="map.svg" type="image/svg+xml">Map</a> </li>
      <li> <a href="c001.html" type="text/html">Looming</a> </li>
      <li> <a href="c002.html" type="text/html">The Spouter-inn</a> </li>
    </ol>
  </nav> 

```


##Complications

EPUB, and especially related specifications such as Multiple-Rendition Documents and Indexing, often include requirements for more complex information about a publication. 

###Media overlays

Attributes on the `item` elements in an EPUB manifest are used to describe the relationship between an EPUB content document and an associated media overlay (SMIL) file. For EPUB-BFF, we can use a custom attribute on the `a` element in `nav` to point to the media overlay:

```html
  <li><a href="html/c001.html" type="text/html" data-media-overlay-ref="ch01smil">Loomings</a></li>
```

This requires the media overlay link in the head to have an ID:

```html
<link id="ch01smil" href="smil/c001-overlay.smil" type="application/smil+xml" rel="prefetch">

```

EPUB also lists the duration of each media overlay audio file, as well as the total duration of all the audio for a publication.

>**Issue**: how to do this? 

###Multiple renditions

Each rendition should have an HTML package document like index.html, but with a different name. These are described by using alternate links in the primary index.html. 

For example, if another rendition is a French translation of the primary rendition:

```html

<link rel="alternate" href="index2.html" hreflang="fr" title="French translation">
```

Other renditions may be optimized for a particular display size or type. The media attribute can be used to distinguish these:

```html
<link rel="alternate" href="index3.html" media="min-width: 1024px" title="Fixed Layout">
```

Each such alternate link must have a title attribute, which could allow a user agent to display the possible options to a reader. 


###Collections

Nested lists in nav can be used to group content documents into collections, with a dpub-aria role attribute to describe the nature of the collection.


>**Note**: This is a somewhat simplified version of example 40 in the indexing spec. It actually seems more useful to me, as it does supply labels for navigation, and I'm not sure of the utility of yet another wrapper around multiple files that cover the same letter of the alphabet.


```html

<nav role="doc-toc" id="nav"> 
<ol>
...
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

```
