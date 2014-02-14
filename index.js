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
 * @param {function} callback (optional)
 * @return {array} JsonML
 */
module.exports = function(html, callback)
{
	var errors = null;
	var jsonMl = null;
	if(typeof html === 'string'){
		jsonMl = [];
		var current = jsonMl;
		var parents = [];
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
					if(attr)
						current.push(attribs);
				}
				parent.push(current);
			},
			ontext: function(text){
				current.push(text);
			},
			onclosetag: function(name){
				current = parents.pop();
			},
			onprocessinginstruction: function(name, value){
				if('!doctype' === name)
					current.push(['!', value.substr(1)]);
			},
			onerror: function(err){
				if(null !== errors)
					errors = [errors, err];
				else
					errors = err;
			}
		});
		parser.write(html);
		parser.end();

		if (jsonMl.length === 1)
			jsonMl = jsonMl[0];
		else if (jsonMl.length > 1)
			jsonMl.unshift('');

		if(html.length && !jsonMl.length)
			jsonMl = null;
	}
	if(callback){
		if(null === jsonMl || null !== errors)
			callback(null === errors ? new Error("Invalid HTML") : errors);
		else
			callback(null, jsonMl)
	}
	return jsonMl;
}