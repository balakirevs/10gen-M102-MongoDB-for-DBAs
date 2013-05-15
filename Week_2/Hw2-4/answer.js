db.products.find({},{for:1})

Create an index on the field for.
- db.products.ensureIndex({for:1})

After creating the index, query products that work with an "ac3" phone; that is, "ac3" is present in the product's "for" field.
How many are there?
- Q1 : 4

Run an explain plan for the same query. How many records were scanned?
- db.products.find({},{for:1}).explain()
- Q2 : 4

Was an index used?
- yes