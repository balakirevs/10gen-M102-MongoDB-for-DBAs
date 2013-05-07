> db.products.find()
> // or:
> db.products.count()
> // should print out "11


Now, what query would you run to get all the products where brand equals the string “ACME”?

db.products.find({brand : "ACME"})