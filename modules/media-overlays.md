# Media overlays

While EPUB 3.1 relies entirely on the OPF for the support of media overlays, EPUB BFF considers that media overlays 
should behave more like CSS which means:

- SMIL files should be listed under `resources` in the manifest
- in each content document, a link can point to a SMIL file if a media overlay is available

## Manifest Example
```json
{
  "metadata": {
    "title": "Audio Book",
    "language": "en",
    "identifier": "qqq",
    "modified": "2016-01-01T00:00:01Z",
    "creator": "Jane Doe",
    "duration": "1:36:20",
    "narrator": "Joe Speaker",
    "active-class": "-epub-media-overlay-active",
    "playback-active-class": "-epub-media-overlay-playing"
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
    {"href": "chapter1_audio.mp3", "type": "audio/mpeg", "duration": "0:32:29"},
    {"href": "chapter2_audio.mp3", "type": "audio/mpeg", "duration": "0:34:02"}, 
    {"href": "chapter3_audio.mp3", "type": "audio/mpeg", "duration": "0:29:49"}
  ]
}
```

## HTML Example

```html
<link rel="alternate" href="chapter1_audio.smil" type="application/smil+xml" />
```
