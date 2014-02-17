#html2jsonml

Convert HTML to JSONML

##Usage
```javascript
var jsonMl = html2jsonml( <string> html [, <object> options ] [, <func> callback(err, <array> jsonMl)]);
```

##Options
for supporting not JSONML standards and others:
```javascript
var options = {
  // Add attributes object in any case (false by default):
  requireAttributes: false,
  // Children in separate array (false by default):
  childrenInArray: false,
  // Don't generate processing instructions (false by default):
  noProcessingInstructions: false,
  // HtmlParser2 (false by default):
  lowerCaseAttributeNames: false,
  // HtmlParser2 (false by default):
  lowerCaseTags: false,
  // HtmlParser2:Tokenizer (false by default):
  decodeEntities: false
}
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
