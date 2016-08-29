# Media Overlays

While EPUB 3.1 relies entirely on the OPF for the support of media overlays, EPUB BFF considers that media overlays 
should behave more like CSS which means:

- SMIL files should be listed under `resources` in the manifest
- in each content document, a link can point to a SMIL file if a media overlay is available

## Manifest Example
```json
{
  "metadata": {
    "@type": "http://bib.schema.org/EBook",
    "title": "EBook with Media Overlay",
    "language": "en",
    "identifier": "http://www.example.com/media-overlay",
    "modified": "2016-01-01T00:00:01Z",
    "author": "Jane Doe",
    "duration": "1H32M20S",
    "readBy": "Joe Speaker",
    "media-overlay": {
      "active-class": "-epub-media-overlay-active",
      "playback-active-class": "-epub-media-overlay-playing"
    }
  },
  
  "spine": [
    {"href": "xhtml/chapter01.xhtml", "type": "application/xhtml+xml"},
    {"href": "xhtml/chapter02.xhtml", "type": "application/xhtml+xml"},
    {"href": "xhtml/chapter03.xhtml", "type": "application/xhtml+xml"}
  ],

  "resources": [
    {"href": "css/epub.css","type": "text/css"}, 
    {"href": "chapter1_audio.smil", "type": "application/smil+xml"}, 
    {"href": "chapter2_audio.smil", "type": "application/smil+xml"}, 
    {"href": "chapter3_audio.smil", "type": "application/smil+xml"}, 
    {"href": "chapter1_audio.mp3", "type": "audio/mpeg", "duration": "29M"},
    {"href": "chapter2_audio.mp3", "type": "audio/mpeg", "duration": "34M"}, 
    {"href": "chapter3_audio.mp3", "type": "audio/mpeg", "duration": "29M20S"}
  ]
}
```

## HTML Example

```html
<link rel="alternate" href="chapter1_audio.smil" type="application/smil+xml" />
```
