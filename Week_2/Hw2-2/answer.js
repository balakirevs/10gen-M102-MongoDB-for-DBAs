- db.products.insert({"_id" : "ac9", "name" : "AC9 Phone", "brand" : "ACME","type" : "phone", "price" : 333, "warranty_years" : 0.25, "available" : true})

- db.products.findOne( { _id : ObjectId("507d95d5719dbef170f15c00") } )

- myobj = db.products.findOne( { _id : ObjectId("507d95d5719dbef170f15c00") } )

- myobj.term_years = 3
- db.products.save(myobj)

- myobj.limits.sms.over_rate = 0.01
- db.products.save(myobj)

- > homework.b()
0.050.019031