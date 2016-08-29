# Definitions

##Title

Every Web Publication Manifest must contain a single title:

`"title": "Moby-Dick"`

In addition to a simple string representation, the `title` element also supports multiple representations of the same string in different scripts and languages:

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

`"author": "James Joyce"`

Each element can also contain multiple contributors using a simple array:

`"illustrator": ["Shawn McManus", "Colleen Doran", "Bryan Talbot", "George Pratt", "Stan Woch", "Dick Giordano"]`

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
If none of the elements provide the proper contributor role, a `contributor` role may be used instead. 

The `contributor` element should be used with an object that contains a `role` which value must be a [MARC relator code](https://www.loc.gov/marc/relators/relaterm.html): 

```json
"contributor": {
  "name": "Lou Reed",
  "role": "sng"
}
```
