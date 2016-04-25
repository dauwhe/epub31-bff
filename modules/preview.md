#Preview collections

##Example

```json
{
  "metadata": {},

  "spine": {},
  "manifest": {},
  
  "preview": {

    "metadata": {
      "title": "Moby Dick Preview",
      "language": "en-US",
      "identifier": "123456789012X",
      "modified": "2015-09-29T17:00:00Z"
    },

    "spine": [
      {"href": "cover.jpg", "type": "image/jpeg", "properties": "cover-image"}, 
      {"href": "c001.html", "type": "text/html"}, 
      {"href": "c002.html", "type": "text/html"}, 
      {"href": "toc.html", "type": "text/html", "properties": "nav"}
    ],

    "manifest": [{"href": "style.css", "type": "text/css"}]
  }
}
```
