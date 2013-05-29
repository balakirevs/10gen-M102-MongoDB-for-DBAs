-- 5.1

=> Premier passage sans Index défini

db.sensor_readings.find( {   tstamp : {      $gte : ISODate("2012-08-01"),      $lte :  ISODate("2012-09-01")    },   active : true } ).limit(3).explain()
{
	"cursor" : "BasicCursor",
	"isMultiKey" : false,
	"n" : 3,
	"nscannedObjects" : 2696,
	"nscanned" : 2696,
	"nscannedObjectsAllPlans" : 2696,
	"nscannedAllPlans" : 2696,
	"scanAndOrder" : false,
	"indexOnly" : false,
	"nYields" : 0,
	"nChunkSkips" : 0,
	"millis" : 6,
	"indexBounds" : {
		
	},
	"server" : "HP:27017"
}

=> Then create an index

> db.sensor_readings.ensureIndex({tstamp:1, active:1})

> db.sensor_readings.find( {   tstamp : {      $gte : ISODate("2012-08-01"),      $lte :  ISODate("2012-09-01")    },   active : true } ).limit(3).explain()
{
	"cursor" : "BtreeCursor tstamp_1_active_1",
	"isMultiKey" : false,
	"n" : 3,
	"nscannedObjects" : 3,
	"nscanned" : 5,
	"nscannedObjectsAllPlans" : 7,
	"nscannedAllPlans" : 9,
	"scanAndOrder" : false,
	"indexOnly" : false,
	"nYields" : 0,
	"nChunkSkips" : 0,
	"millis" : 0,
	"indexBounds" : {
		"tstamp" : [
			[
				ISODate("2012-08-01T00:00:00Z"),
				ISODate("2012-09-01T00:00:00Z")
			]
		],
		"active" : [
			[
				true,
				true
			]
		]
	},
	"server" : "HP:27017"
}


============
> homework.a()
That's good - you can submit the answer below (just submit the number).  however there
is an index you could 
create that will get nscanned down to 3 for the query of interest. see if you can 
do that or watch the answer video for details on that...
6
============