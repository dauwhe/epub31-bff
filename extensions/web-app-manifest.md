#Web App Manifest

A Web Publication Manifest should also be embeddable in a Web App Manifest.

##Example

```json
{
  "name": "Moby-Dick",
  "start_url": "c001.html",
  "icons": [
    {
      "src": "icon.png",
      "sizes": "64x64",
      "type": "image/png"
    }
  ],
  "display": "fullscreen",

  "@context": "http://idpf.org/epub.jsonld",
  
  "metadata": {
    "@type": "http://schema.org/EBook",
    "title": "Moby-Dick",
    "author": "Herman Melville",
    "identifier": "urn:isbn:978031600000X",
    "language": "en",
    "modified": "2015-09-29T17:00:00Z"
  },

  "links": [
    {"rel": "self", "href": "http://example.org/manifest.json", "type": "application/epub+json"},
    {"rel": "alternate", "href": "http://example.org/publication.epub", "type": "application/epub+zip"}
  ],
  
  "spine": [
    {"href": "cover.jpg", "type": "image/jpeg", "height": 600, "width": 400, "properties": "cover-image", "title": "Cover"},
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
