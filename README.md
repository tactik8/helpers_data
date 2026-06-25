# dataHelpers

JS library data manipulation

## Location

### Source code
https://github.com/tactik8/dataHelpers

### repl.it
https://replit.com/@tactik8/dataHelpers


## Install

### From github
```
git clone https://github.com/tactik8/dataHelpers ./utils/dataHelpers
```

## Test and publish

```
npm install --save-dev jest

npm install --save-dev babel-jest @babel/core @babel/preset-env
npm install --save-dev jest-environment-jsdom

node --experimental-vm-modules node_modules/.bin/jest

npx parcel build
npm adduser
npm publish

```



## How to use

### make available to import  
#### add in package.json 
``` 
imports: {
    "#dataHelpers": "./utils/dataHelpers/dataHelpers/dataHelpers.js",
}
```

#### or in html file
```
<script type="importmap">
    {
      "imports": {
        "#dataHelpers": "/utils/dataHelpers/dataHelpers/dataHelpers.js"
      }
    }
  </script>


```

 ### in code
 
import { dataHelpers as dh } from '#dataHelpers'

let record = {
    "@context": "https://schema.org/",
    "@type": "Thing",
    "@id": "thing1",
    "name": "thing1"
}


let k = h.value.get(record, '@type')


```

## Examples

```
let k = KrakenSchemas.get('Person')

let p = k.getProperty('givenName')

p.getLocalizedPropertyID('en-US')) --> 'first name'




```

## Tests

Prompt:
```
please write jest unit tests for all functions in @jsonlsHelpers.js. The records used should be jsonld records (nested). Please separate the tests one directory by file and one file by function. Please consider edge cases (invalid, null, wrong type, etc.).
```


## Running tests
node --experimental-vm-modules node_modules/.bin/jest

