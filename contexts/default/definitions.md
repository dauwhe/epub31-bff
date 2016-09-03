# Default Context Definitions

##Identifier

A Web Publication Manifest must contain an identifier. The identifier must be a valid URN:

```json
"identifier": "http://example.com/publication"
```

Publications can be updated and to identify each specific version, the manifest must also contain a `modified` element containing the timestamp when the publication was last modified expressed as an ISO 8601 time and date:

```json
"modified": "2016-02-22T11:31:38Z"
```

##Title

A Web Publication Manifest must contain a single title:

```json
"title": "Moby-Dick"
```

In addition to a simple string representation, the `title` element also supports alternate representations of the same string in different scripts and languages:

```json
"title": {
  "fr": "Vingt mille lieues sous les mers",
  "en": "Twenty Thousand Leagues Under the Sea",
  "ja": "海底二万里"
}
```

The manifest may also contain a `sort_as` element to provide a single sortable string, used by a client to organize a collection of publications:

```json
"title": "A Tale of Two Cities",
"sort_as": "Tale of Two Cities, A"
```

##Contributors

The default context for the Web Publication Manifest provides a number of elements to indicate the nature of a contributor: `author`, `translator`, `editor`, `illustrator` and `narrator`.

In addition to these elements, it also provides a generic term for contributors: `contributor`.

A Web Publication Manifest should contain one or more contributor.

The most straightforward expression of a contributor is through a simple string:

```json
"author": "James Joyce"
```

Each element can also contain multiple contributors using a simple array:

```json
"illustrator": ["Shawn McManus", "Colleen Doran", "Bryan Talbot", "George Pratt", "Stan Woch", "Dick Giordano"]
```

In addition to a simple string representation, each contributor can also be represented using an object using the following elements: `name`, `sorted_as` and `identifier`.

When an object is used, it must contain at least `name`. 

It behaves like the `title` element and allows either a simple strings, or representations in multiple languages and scripts of a contributor's name:

```json
"author": {
  "name": {
    "ru": "Михаил Афанасьевич Булгаков",
    "en": "Mikhail Bulgakov",
    "fr": "Mikhaïl Boulgakov"
  }
}
```

The contributor object may also contain a `sort_as` element to provide a single sortable string, used by a client to organize a collection of publications:

```json
"author": {
  "name": "Marcel Proust",
  "sort_as": "Proust, Marcel"
}
```

Finally, the object may also contain an `identifier`. The `identifier` must be a URN.

ISNI (http://isni.org) is the preferred authority, but other sources may also be used:

```json
"author": {
  "name": "Jules Amédée Barbey d'Aurevilly",
  "sort_as": "Barbey d'Aurevilly, Jules Amédée",
  "identifier": "http://isni.org/isni/0000000121317806"
}
```
If none of the elements available are specific enough, a `contributor` element may be used instead. 

The `contributor` element should be used with an object that contains a `role`. 
All values for the `role` element should be based on [MARC relator codes](https://www.loc.gov/marc/relators/relaterm.html): 

```json
"contributor": {
  "name": "Lou Reed",
  "role": "sng"
}
```

## Language

In order to indicate its primary language, a Web Publication Manifest should use a `language` element. Its value must be a valid [BCP 47](https://tools.ietf.org/html/bcp47) language tag.

```json
"language": "en"
```

If a publication has more than one primary language (a bilingual edition for example), the `language` element may contain an array of BCP 47 language tags:

```json
"language": ["en", "fr", "ja"]
```

## Description

A Web Publication Manifest may contain a description of the publication in plain text using the `description` element:

```json
"description": "The story of two gnomes, discussing the meaning of life in a
Scandivanian garden."
```

## Publisher

A Web Publication Manifest may list one or more publishers using the `publisher` element.

The most straightforward expression is through a simple string:

```json
"publisher": "Literary Fiction Ltd."
```

This element also allows a more complex representation using an object and the following elements: `name`, `sort_as`, `identifier`. The semantics and syntax are identical to contributors:

```json
"publisher": {
  "name": "The Science Fiction Company",
  "sort_as": "Science Fiction Company, The",
  "identifier": "http://example.com/publisher"
}
```

Multiple publishers can be listed in this element using the string or object representations.


## Publication Date

A Web Publication Manifest may contain a publication date using the `published` element. The publication date must be a valid ISO 8601 date.

```json
"published": "2016-09-02"
```

##Subjects

A Web Publication Manifest may also provide one or more subjects using the `subject` element:

```json
"subject": "Historical Fiction"
```

Multiple subjects are listed using an array:

```json
"subject": ["Science Fiction", "Fantasy"]
```

Subjects can also be expressed using an object with the following elements: `name`, `sort_as`, `code` and `scheme`.

`name` is meant to provide a human readable string for the subject, while `code` and `scheme` are meant to indicate that a subject is part of a controlled vocabulary:

```json
"subject": {
  "name": "Manga: Shonen",
  "sort_as": "Shonen",
  "scheme": "THEMA",
  "code": "XAMG"
}
```

##Collections & Series

A Web Publication Manifest may indicate that it belongs to one or multiple collections/series.

`collection` and `series` behave the same way, the most straightforward way to indicate that a publication belongs to a collection/series is through a simple string:

```json
"belongs_to": {
  "collection": "Mysteries from Another Time",
  "series": "The Zombie Detective"
}
```

To indicate the position of a publication in a collection/series or how the collection/series should be sorted, an object with the following elements can be used instead: `name`, `sort_as`, `position` and `identifier`.

```json
"belongs_to": {
  "collection": "Young Adult Classics",
  "series": {
    "name": "Harry Potter",
    "position": 4
  }
}
```
