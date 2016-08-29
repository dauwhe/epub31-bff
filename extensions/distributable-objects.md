# Distributable Objects

## Example

```json 
{
  "metadata": {
    "title": "Phantom Textbook - Chapter 1",
    "language": "en",
    "type": "distributable-object",
    "identifier": "urn:uuid:a46825d1-e796-4cc3-a633-5160f529a1e0",
    "modified": "2014-11-10T19:30:22Z",
    "author": "Jane Doe",
    "description": "Introduction to the history of phantasms. For sale separately.",
    "source": "urn:isbn:9780987654321",
    "date": "2014-10-31",
    "rights": "All rights reserved. Not available for use or sale except by authorized vendors."
  },

  "distributable-object": {

    "spine": [
      {"href": "xhtml/chapter01.xhtml", "type": "application/xhtml+xml"}, 
      {"href": "xhtml/notes.xhtml", "type": "application/xhtml+xml"}, 
      {"href": "xhtml/biblio.xhtml#b001", "type": "application/xhtml+xml"}, 
      {"href": "xhtml/biblio.xhtml#b023", "type": "application/xhtml+xml"}, 
      {"href": "xhtml/biblio.xhtml#b029", "type": "application/xhtml+xml"}
    ],
    
    "resources": [{"href": "css/epub.css", "type": "text/css"}]
  }
}
```
