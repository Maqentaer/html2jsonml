#html2jsonml

Convert HTML to JSONML

##Usage
```javascript
var jsonMl = html2jsonml( <string> html [, <func> callback(err, <array> jsonMl)]);
```

##Examples
```javascript
var html2jsonml = require('html2jsonml');
html2jsonml("<div id='first'>text</div>", function(err, jsonMl){
  if(err) throw err;
  else console.log(JSON.stringify(jsonMl));
});
```

```javascript
var html2jsonml = require('html2jsonml');
var jsonMl = html2jsonml("<div id='first'>text</div>");
if(null === jsonMl) throw new Error("Invalid HTML");
else console.log(JSON.stringify(jsonMl));
```

##Installation

`npm install html2jsonml`

## Contributors

 - Maqentaer

## MIT Licenced
