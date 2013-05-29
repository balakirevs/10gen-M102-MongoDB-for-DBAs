// week5.js
// M102 course
// run: 
//   mongo --shell localhost/week5 week5.js

homework = { };
if( "week5" != db ) { 
    print("week5.js: want db to be 'week5' when the shell starts. terminating.");
    throw "use week5 db before running script";
}
homework.init = function () {

    var t = db.sensor_readings;

    if( t.count() ) {
        print("week5.sensor_readings will drop and reload...");
        t.drop();
    }

    var a = 0;
    for( var m = 0; m < 20000; m++ ) {

        var ts = new Date(2012,m%12,m%27+1);

        t.insert( { _id : m, tstamp : ts, active : (a%77==0), x : 99 } );

        a += 3;
    }

    printjson( db.getLastErrorObj() );

    print("still working...");
    t.update({},{$set:{str:"this is a test"}},false,true);
    printjson( db.getLastErrorObj() );

    print( "count: " + t.count() );
}
homework.a = function() { 
    var e = db.sensor_readings.find( {   tstamp : {      $gte : ISODate("2012-08-01"),      $lte :  ISODate("2012-09-01")    },   active : true } ).limit(3).explain();
    if( !e ) {
        print("something isn't right? try again?");
        return;    }
    if( e.n != 3 ) { 
        print("expected 3 results for the test query yet got: " + e.n);
        print("try again?");
        print("db.sensor_readings.count(): " + db.sensor_readings.count() + " (should be 20000)");
        return;    }
    if( e.nscanned > 500 ) { 
        print("quite a few keys or documents were scanned, need a better index try something else / try again.");
        return; }
    if( e.nscanned > 10 ) { 
        print("that's a big improvement over table scan -- " + e.nscanned + " keys scanned,");
        print("but we can do better, try something else / try again.");
        return; }
    if( e.nscanned > 3 ) { 
        print("That's good - you can submit the answer below (just submit the number).  however there");
        print("is an index you could ");
        print("create that will get nscanned down to 3 for the query of interest. see if you can ");
        print("do that or watch the answer video for details on that...");
    }
    var b=new BinData(0,"abcdefgh"); return b.length()+b.subtype();
}
homework.c = function() { 
    var long = false;
    var y = 0;
    var ip;
    var i = 0;
    var k = false;
    for( ; i < 100; i++ ) { 
        ip=db.currentOp().inprog;
        ip.forEach(function (x){if(x.op=='update')k++;});
        if( k ) break;
        sleep(1);
    }
    if(!k){print("not seeing the expected activity, is homework.b() really running in a separate shell? try again.");return;}
    ip.forEach(function (x){if(x.op=='update'&&x.secs_running>3)y+=x.secs_running;});
    return  y^0xc;
}
homework.d = function() { 
    assert(db.sensor_readings.count()==20000);
    var t = db.sensor_readings;
    var s = t.stats(); return Math.round((s.size+s.indexSizes._id_)/100000);
}
homework.b = function() { 
    print("simulating a workload in this shell. after completing homework 5.2, you can ");
    print("stop this shell with ctrl-c. let it run in the meantime...");
    print("(you will want to open another mongo shell to do your work in.)");
    print("\nnote: this function changes the indexes on db.sensor_readings. so if you go ");
    print(  "      back to homework 5.1, drop and recreate indexes (or run homework.init() again)");
    print();
    var ipl = db.currentOp().inprog.length;
    if( ipl ) { 
        print();
        print("info: " + ipl + " operations were in progress when homework.b() begins.");
        print("      if you have a replica set more than zero is normal as the replicas will");
        print("      query the primary.");
        print();
    }
    var t = db.sensor_readings;
    if( t.count() != 20000 ) { 
        print("error, expected db.sensor_readings to have 20000 documents. ?");
        return;
    }
    var conn2 = (new Mongo()).getDB('week5');
    var t2 = conn2.sensor_readings;
    assert( t2.count() == 20000 );
    var conn3 = (new Mongo()).getDB('week5');
    var t3 = conn3.sensor_readings;
    assert( t3.count() == 20000 );
    t3.update({$where:"function(){sleep(500);return false;}"},{$set:{name:'fran'}},false,true); 
    var i = 0;
    print("looping...");
    while( 1 ) {
        i++;
        {
            t.update({},{$set:{z:1}});
            t.update({},{$inc:{z:1}});
            if( i % 5 == 0 ) { 
                db.getLastError();
            }
        }
        t2.find().limit(4).toArray();
    }
}
