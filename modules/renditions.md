# Multiple renditions

Multiple renditions publications rely on the `rendition` role and an additional collection element, 
where each rendition has its own `spine` and `resources`. 
Each of them must have rendition metadata to allow the reading system to select the proper rendition.


>**Issue 19: [Rendition mapping in BFF](https://github.com/dauwhe/epub31-bff/issues/19)**



## Example : Multiple renditions with selection metadata
```json
{
  "metadata": {
    "title": "Chouinard",
    "language": "en",
    "identifier": "42",
    "modified": "2016-02-01T15:45:00Z",
    "author": "Yvon Chouinard",
    "description": "Equipment for alpinists"
  },

  "rendition": [{
    "metadata": {
      "layout": "reflowable",
      "accessMode": "textual",
      "label": "Optimized for smaller screens"
    },

    "spine": [
      {"href": "reflow/html/section001.xhtml", "type": "application/xhtml+xml"}, 
      {"href": "reflow/html/section002.xhtml", "type": "application/xhtml+xml"}, 
      {"href": "reflow/html/section003.xhtml", "type": "application/xhtml+xml"}
    ],

    "resources": [{"href": "reflow/css/reflow.css","type": "text/css"}]
  },
  {
    "metadata": {
      "media": "color, min-width: 1920px",
      "layout": "pre-paginated",
      "accessMode": "visual",
      "label": "Color-optimized print replica"
    },

    "spine": [
      {"href": "fixed/html/page001.xhtml", "type": "application/xhtml+xml"}, 
      {"href": "fixed/html/page002.xhtml", "type": "application/xhtml+xml"}, 
      {"href": "fixed/html/page003.xhtml", "type": "application/xhtml+xml"}, 
      {"href": "fixed/html/page004.xhtml", "type": "application/xhtml+xml"}, 
      {"href": "fixed/html/page005.xhtml","type": "application/xhtml+xml"}
    ],

    "resources": [{"href": "fixed/css/fixed.css","type": "text/css"}]
  }
 ]

}

```
