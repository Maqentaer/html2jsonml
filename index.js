/*
 index.js
 Convert HTML to JSONML

 Created: 2014-02-12

 Copyright (c)2014 Roman Glebsky <maqentaer@gmail.com>
 Distributed under The MIT License: http://github.com/Maqentaer/html2jsonml/raw/master/LICENSE
 */

var htmlparser2 = require('htmlparser2');

/**
 * @param {string} html
 * @param {object} options (optional)
 * @param {function} callback (optional)
 * @return {array} JsonML
 */
module.exports = function(html, options, callback)
{
	if(typeof options === 'function' || typeof options === 'undefined'){
		callback = options;
		options = {};
	}
	var errors = null;
	var jsonMl = null;
	if(typeof html === 'string'){
		jsonMl = [];
		var current = jsonMl;
		var currentChildren = null;
		var parents = [];
		var parentsChildren = [];
		var parser = new htmlparser2.Parser({
			onopentag: function(name, attribs){
				var parent = current;
				parents.push(parent);
				current = [name];
				if(attribs){
					var found = false;
					for(var attr in attribs){
						if(attribs.hasOwnProperty(attr)){
							found = true;
							break;
						}
					}
					if(found || options.requireAttributes){
						current.push(attribs);
					}
				}else if(options.requireAttributes){
					current.push({});
				}
				if(options.childrenInArray){
					if(!currentChildren){
						currentChildren = [current];
						parent.push(currentChildren);
					}else{
						currentChildren.push(current);
					}
					parentsChildren.push(currentChildren);
					currentChildren = null;
				}else{
					parent.push(current);
				}
			},
			ontext: function(text){
				if(options.childrenInArray){
					if(!currentChildren){
						currentChildren = [text];
						current.push(currentChildren);
					}else{
						currentChildren.push(text);
					}
				}else{
					current.push(text);
				}
			},
			onclosetag: function(name){
				current = parents.pop();
				if(options.childrenInArray){
					currentChildren = parentsChildren.pop();
				}
			},
			onprocessinginstruction: function(name, value){
				if(!options.noProcessingInstructions)
					current.push([value.substr(0,1), value.substr(1)]);
			},
			onerror: function(err){
				if(null !== errors){
					errors = [errors, err];
				}else{
					errors = err;
				}
			}
		}, options);
		parser.write(html);
		parser.end();

		if(options.childrenInArray){
			jsonMl = jsonMl[0];
		}

		if (jsonMl.length === 1){
			jsonMl = jsonMl[0];
		}
		else if (jsonMl.length > 1){
			if(options.childrenInArray){
				jsonMl = [jsonMl];
			}
			if(options.requireAttributes){
				jsonMl.unshift({});
			}
			jsonMl.unshift('');
		}

		if(html.length && !jsonMl.length){
			jsonMl = null;
		}
	}
	if(callback){
		if(null === jsonMl || null !== errors){
			callback(null === errors ? new Error("Invalid HTML") : errors);
		}else{
			callback(null, jsonMl)
		}
	}
	return jsonMl;
}