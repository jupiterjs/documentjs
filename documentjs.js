steal('steal',
      'documentjs/types/script.js',
	  'documentjs/searchdata.js',
	  'steal/generate/ejs.js',
	  'documentjs/out.js',
	  'steal/build', 
	  function( s, Script, searchData, EJS, out ) {
	//if we already have DocumentJS, don't create another, this is so we can document documentjs
	var objects = {};
	/**
	 * @function DocumentJS
	 * @module documentjs
	 * @parent index
	 * 
	 * @description DocumentJS makes it easy to produce beautiful
	 * and useful documentation for your JavaScript project.
	 * 
	 * @signature `DocumentJS(path,[options])` Documents
	 * everything in folder path. Example:
	 * 
	 *     DocumentJS("myproject",{});
	 * 
	 * Generates "myproject/docs.html" and resources in
	 * "myproject/docs/".
	 * 
	 * @param {String} folder The folder location to search for files ending with
	 * `.js`.
	 * @param {{}} [options] Optional options that configure the behavior of DocumentJS.
	 * 
	 * @option {Array.<String>} markdown An array folders
	 * to look for markdown files within. Defaults 
	 * to `[folder]`.
	 * @option {String} [out=folder] Where to place the output content. Defaults to 
	 * the folder.
	 * @option {String} [index=folder] The name of the object that is documented.
	 * 
	 * @signature `DocumentJS(files,[options])` Documents
	 * the files in files.
	 * @param {Array.<{src:String,text:String}>} files The files
	 * to document.  Each file should have a src and text property like:
	 * 
	 *     [{src: "path/to/file.js", text: "var a= 1;"}, { ... }]
	 * 
	 * @param {{}} options The same options available in the other 
	 * signature.
	 * 
	 * @body
	 * 
     * ## Features
     * 
	 * 
     * - Flexible organization of your documentation
     * - An integrated documentation viewer where you can search your API
     * - Markdown support
     * - An extensible architecture
     * 
	 * DocumentJS provides powerful and easy to extend documentation functionality.
	 * It's smart enough to guess 
	 * at things like function names and parameters, but powerful enough to generate 
	 * <span class='highlight'>JavaScriptMVC's entire website</span>!
	 * 
	 * ## Organizing your documentation
	 *
	 * Let's use an hypothetical little CRM system as an example of how easy it is to organize your documentation with DocumentJS. 
	 * 
	 * First let's create our CRM documentation home page by creating a folder name __crm__. Paste this code into a file named __crm.js__ inside __crm__ folder.
	 * 
	 * @codestart
	 * /*
     *  * @@page index CRM
     *  * @@tag home
     *  *
     *  * ###Little CRM
     *  *  
     *  * Our little CRM only has two classes:
     *  *  
     *  * * Customer 
     *  * * Order 
     *  *|
	 * @codeend
	 * 
	 * Run the documentjs script to generate the docs:
	 * 
	 *
	 *     documentjs/doc.bat crm
	 * 
	 * 
	 * This is what you should see when you open __crm\docs.html__:
	 * 
	 * @image site/images/crm_doc_demo_1.png
	 * 
	 * 
	 * There are a few things to notice:
	 * 
	 * * The example closes comments with _*|_.  You should close them with / instead of |.
	 * * We create a link to another class with _[Animal here]_. 
	 * * We used the @@page directive to create the crm documentation home page. Don't worry about the @@tag directive for now, we'll get back to it later. 
	 * * In all the examples in this walkthrough we use markdown markup instead of html to make the documentation more maintainable and easier to read .
	 * 
	 * Next we document the two classes that make our little crm system. Paste each snippet of code into two files with names __customer.js__ and __order.js__:
	 * 
	 * __customer.js__
	 * 
	 * @codestart
     * /*
     *  * @@class Customer
     *  * @@parent index
     *  * @@constructor
     *  * Creates a new customer.
     *  * @@param {String} name
     *  *|
     *  var Customer = function(name) {
	 *     this.name = name;
     *  }
	 * @codeend 
	 * 
	 * __order.js__
	 * 
	 * @codestart
     * /*
     *  * @@class Order
     *  * @@parent index
     *  * @@constructor
     *  * Creates a new order.
     *  * @@param {String} id
     *  *|
     *  var Order = function(id) {
	 *     this.id = id;
     *  }
	 * @codeend 
	 * 
	 * After running the documentjs script once again you should be able to see this:
	 * 
	 * @image site/images/crm_doc_demo_2.png
	 * 
	 * 
	 * We want to be able to both look for our customer's orders and dispatch them so let's add a _findById_ method to our Order class
	 * and a _dispatch_ method to our Order's prototype:
	 * 
	 * __order.js__
	 * 
	 * @codestart
	 * /*  
     *  * @class Order 
     *  * @parent index 
     *  * @@constructor
     *  * Creates a new order.
     *  * @@param {String} id
     *  *|
     * var Order = function(id) {
     *     this.id = id;
     * }
     *
     * $.extend(Order,
     * /*
     * * @@static
     * *|
     * {
	 *    /*
	 *     * Finds an order by id.
	 *     * @@param {String} id Order identification number.
	 *     * @@param {Date} [date] Filter order search by this date.
	 *     *|
	 *     findById: function(id, date) {
     *
	 *     }
     *  });
     *
     * $.extend(Order.prototype,
     * /*
     *  * @@prototype
     *  *|
     *  {
	 *     /*
	 *      * Dispatch an order.
	 *      * @@return {Boolean} Returns true if order dispatched successfully.
	 *      *|
	 *      dispatch: function() {
	 *     
	 *      }
     * });
	 * @codeend
	 * 
	 * Go ahead and produce the docs by running the documentjs script. You should see your Order methods organized by static and protoype categories.
	 * 
	 * There's one last thing we need to cover - customizing the document viewer template. The default viewer template file name is __summary.ejs__ and it's
	 * located in __documentjs/jmvcdoc/summary.ejs__. You can use a customized template by copying __summary__.ejs into the __crm__ folder and changing it 
	 * according to your needs. Let's try changing the navigation menu __core__ item to __crm__:
	 * 
	 * @codestart
	 * &lt;li class="ui-menu-item"&gt;
	 *     &lt;a class="menuLink" href="#&amp;search=crm"&gt;&lt;span class="menuSpan"&gt;CRM&lt;/span&gt;&lt;/a&gt;
     * &lt;/li&gt;
	 * @codeend
	 *
	 * Remember the @@tag directive? We can now change it in our examples from _core_ to _crm_. You will notice that our crm page will show up
	 * every time you click the CRM menu item or type _crm_ in the documentation viewer search box.
	 * 
	 * If you need for DocumentJS not to document a particular script you can do that by adding the @document-ignore directive to the top of the file. 
	 * 
	 * As you see DocumentJS makes it super easy and fun to organize your documentation!
	 * 
	 * ## How DocumentJS works
	 * 
	 * DocumentJS architecture is organized around the concepts of [DocumentJS.types types] and [DocumentJS.tags tags]. Types are meant to represent every javascript construct 
	 * you might want to comment like classes, functions and attributes. Tags add aditional information to the comments of the type being processed.
	 * 
	 * DocumentJS works by loading a set of javascript files, then by spliting each file into type/comments pairs 
	 * and finally parsing each type's comments tag directives to produce a set of jsonp files (one per type) 
	 * that are used by the document viewer (jmvcdoc) to render the documentation.
	 * 
	 * DocumentJS was written thinking of extensibility and it's very easy to add custom type/tag directives to handle your specific documentation needs.
	 *
	 * DocumentJS currently requires [stealjs Steal] to be included on the pages you are documenting.   
	 * 
	 * ###Type directives
	 * 
	 * * [DocumentJS.tags.add @add] - add docs to a class or constructor described in another file.
	 * * [DocumentJS.tags.constructor @constructor] - document a class or constructor. 
	 * * [DocumentJS.tags.function @function] - document functions.
	 * * [DocumentJS.tags.page @page] -  add a standalone page.
	 * * [DocumentJS.tags.property @property] -  document values on an object.
	 * * [DocumentJS.tags.prototype @prototype] - add to the previous class or constructor's prototype functions.
	 * * [DocumentJS.tags.static @static] - add to the previous class or constructor's static functions.
	 * 
	 * ###Tag directives
	 * 
	 * * [DocumentJS.tags.alias @alias] - another commonly used name for Class or Constructor.
	 * * [DocumentJS.tags.author @author] - author of class.
	 * * [DocumentJS.tags.codestart @codestart] and [DocumentJS.tags.codeend @codeend] - insert highlighted code block.
	 * * [DocumentJS.tags.constructor @constructor] - documents a contructor function and its parameters.
	 * * [DocumentJS.tags.demo @demo] - placeholder for an application demo.
	 * * [DocumentJS.tags.download @download] - adds a download link.
	 * * [DocumentJS.tags.hide @hide] - hide in Class view.
	 * * [DocumentJS.tags.iframe @iframe] - adds an iframe with example code.
	 * * [DocumentJS.tags.image @image] - adds an image.
	 * * [DocumentJS.tags.inherits @inherits] - what the Class or Constructor inherits.
	 * * [DocumentJS.tags.parent @parent] - says under which parent the current type should be located. 
	 * * [DocumentJS.tags.param @param] - A function's parameter.
	 * * [DocumentJS.tags.plugin @plugin] - by which plugin this object gets steal'd.
	 * * [DocumentJS.tags.release @release] - specifies the release.
	 * * [DocumentJS.tags.return @return] - what a function returns.
	 * * [DocumentJS.tags.tag @tag] - tags for searching.
	 * * [DocumentJS.tags.test @test] - link for test cases.
	 * * [DocumentJS.tags.typedef @typedef] - aliases a complex type for use in other documentation.
	 * 
	 * 
	 * ## Inspiration
	 * 
	 * DocumentJS was inspired by the [http://api.jquery.com/ jQuery API Browser] by [http://remysharp.com/ Remy Sharp]
	 * 
	 * 
	 */
	var DocumentJS = function(scripts, options) {
		// an html file, a js file or a directory
		options = options || {};
		
		if(typeof scripts == 'string'){
			if(!options.out){
				if(/\.html?$|\.js$/.test(scripts)){
					options.out = scripts.replace(/[^\/]*$/, 'docs')
				}else{ //folder
					options.out = scripts+"/docs";
				}
			}
			steal.File(options.out).mkdir();
			scripts = DocumentJS.getScripts(scripts)
		} else if(scripts instanceof Array){
			steal.File(options.out).mkdir();
			trueScriptsArr = [];
			for(idx in scripts) {
				files = DocumentJS.getScripts(scripts[idx]);
				trueScriptsArr = trueScriptsArr.concat(files);
			}
			scripts = trueScriptsArr;
		}
		// an array of folders
		if(options.markdown){
			for(var i =0 ; i < options.markdown.length; i++){
				DocumentJS.files(options.markdown[i], function(path, f){
					if(/\.(md|markdown)$/.test(f) && !/node_modules/.test(path)){
					  scripts.push( {
					  	src: path,
					  	text: readFile(path)
					  } )
				    }
				})
			}
			
			
			
		}
		// if options, get .md and .markdown files ...
		
		
 		//all the objects live here, have a unique name
		
		
		//create each Script, which will create each class/constructor, etc
		print("PROCESSING SCRIPTS\n")
		for ( var s = 0; s < scripts.length; s++ ) {
			Script.process(scripts[s], objects)
		}
		
		print('\nGENERATING DOCS -> '+options.out+'\n')
		
		// generate individual JSONP forms of individual comments
		DocumentJS.generateDocs(options)
		// make combined search data
		searchData(objects,options )

		//make summary page (html page to load it all)
		DocumentJS.summaryPage(options);
		
	};
	
	s.extend(DocumentJS, {
		files : function(path, cb){
			var getJSFiles = function(dir){
			  var file = new s.File(dir);
			  if(file.isFile()) {
				  cb(dir.replace('\\', '/'), dir);
			  } else {
				  file.contents(function(f, type){
					if(type == 'directory' && !/node_modules/.test(f)) {
				       getJSFiles(dir+"/"+f)
				    }else {
					  cb((dir+"/"+f).replace('\\', '/'), f);
				    }
				  });
			  }
			};
			getJSFiles(path);
		},
		// gets scripts from a path
		getScripts : function(file){
			var collection = [], scriptUrl;
			if (/\.html?$/.test(file)) { // load all the page's scripts
				s.build.open(file, function(scripts){
					var paths = s.config().paths;
					scripts.each(function(script, text){
						if(script.id && text){
							scriptUrl = paths[script.id] || script.id;
							collection.push({
								src: scriptUrl,
								text: text
							})
						}
					});
				});
				// many things already steal steal
				//collection.unshift({
				//	src: 'steal/steal.js',
				//	text:  readFile('steal/steal.js')  // this might need to change
				//})
			}
			else if (/\.js$/.test(file)) { // load just this file
				collection.push(file)
			}
			else { // assume its a directory
				this.files(file, function(path, f){
					if(/\.(js|md|markdown)$/.test(f)){
					  collection.push( {
					  	src: path,
					  	text: readFile(path)
					  } )
				    }
				})
				
				
			}
			return collection;
		},
		generateDocs : function(options){
			// go through all the objects and generate their docs
			var output = options.out ? options.out+ "/" : "";
			for ( var name in objects ) {
				if (objects.hasOwnProperty(name)){

					//get a copy of the object (we will modify it with children)
					var obj = s.extend({}, objects[name]),
						toJSON;
					
					// eventually have an option allow scripts
					if ( obj.type == 'script' || typeof obj != "object" ) {
						continue;
					}
					
					//get all children					
					//obj.children = this.listedChildren(obj);
					// update the search model with all of these
					var converted = name.replace(/ /g, "_")
										.replace(/&#46;/g, ".")
										.replace(/&gt;/g, "_gt_")
										.replace(/\*/g, "_star_")
										.replace(/\//g,"|")
					toJSON = out(obj, undefined, "c", obj.src);
					new s.URI(output + converted + ".json").save(toJSON);
				}
	
			}
			//print(commentTime);
			//print(processTime)
		},
		// tests if item is a shallow child of parent
		/*shallowParent: function( item, parent ) {
			if ( item.parents && parent ) {
				for ( var i = 0; i < item.parents.length; i++ ) {
					if ( item.parents[i] == parent.name ) {
						return true;
					}
				}
			}
			return false;
		},
		// returns all recustive 'hard' children and one level of 'soft' children.
		listedChildren: function( item, stealSelf, parent ) {
			var result = stealSelf ? [item.name] : [];
			if ( item.children && !this.shallowParent(item, parent) ) {
				for ( var c = 0; c < item.children.length; c++ ) {
					var child = objects[item.children[c]];
					var adds = this.listedChildren(child, true, item);
					if ( adds ) {
						result = result.concat(adds);
					}

				}
			}
			return result;
		},*/
		summaryPage: function( options ) {
			//find index page
			var path = options.out,
				base = path.replace(/[^\/]*$/, ""),
				renderData = {
					pathToRoot: s.URI(base.replace(/\/[^\/]*$/, "")).pathToRoot(),
					path: path,
					indexPage: objects[options.index || 'index'],
					index: options.index
				}

			//checks if you have a summary
			if ( readFile(base + "summary.ejs") ) {
				print("Using summary at " + base + "summary.ejs");
				DocumentJS.renderTo(base + "docs.html", base + "summary.ejs", renderData)
			} else {
				print("Using default page layout.  Overwrite by creating: " + base + "summary.ejs");
				DocumentJS.renderTo(base + "docs.html", "documentjs/jmvcdoc/summary.ejs", renderData);
			}
		},
		renderTo: function( file, ejs, data ) {
			new s.URI(file).save(new EJS({
				text: readFile(ejs)
			}).render(data));
		}
	})


	return DocumentJS;


})
