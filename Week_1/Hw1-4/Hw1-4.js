rint out, in the shell, the name of all the products without extraneous characters or braces, sorted alphabetically, ascending

var c = db.products.find({},{name:1,_id:0}).sort({name:1}); while( c.hasNext() ) print( c.next().name);

var c = db.products.find({}).sort({name:1}); c.forEach( function(doc){ print(doc.name) } );