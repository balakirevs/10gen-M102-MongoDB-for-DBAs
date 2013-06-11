// M102 Fall 2012
// a.js 
// see also: a.sh

function ourinit() {
    // note: never use "localhost", or aliases for it, for production.  but for a 1 machine dev test it is ok.
    var x = rs.initiate(                                                                                    
        { _id:'z',                                                                                              
          members:[                                                                                             
            { _id:1, host:'localhost:27001' },                                                                   
            { _id:2, host:'localhost:27002' },                                                                   
            { _id:3, host:'localhost:27003' }                                                                    
          ]                                                                                             
        }
    );                                                                                                     
    printjson(x);                                                                                           
    print('waiting for set to initiate...');                                                                    
    while( 1 ) {                                                                                            
        sleep(2000);                                                                                          
        x = db.isMaster();                                                                                    
        printjson(x);                                                                                         
        if( x.ismaster || x.secondary ) {                                    
            print("ok, this member is online now; that doesn't mean all members are ");
            print("ready yet though.");
            break;                                                                                              
        }                                                                                                     
    }                                                                                                       
}

p="priority";

function testRollback() {         
    var im = db.isMaster();
    if( !im.ismaster ) {
        print("this member is not the primary.  run testRollback() on the 27003 and be sure it is primary.");
        printjson(db.isMaster());
        return;
    }
    if( !im.me.match(/03/) ) {
        throw "expected to be connected to the mongod on port 27003. try again/something wrong relative to the problem?";
    }
                                                                   
    // homework assumption: we are localhost:27003
    var a = connect("localhost:27001/admin");
    var b = connect("localhost:27002/admin");

    assert( db.isMaster().ismaster );
    if( !a.isMaster().secondary ) { 
        throw "27001 is not in secondary state. require/expect that.";
    }
    assert( b.isMaster().secondary );

    print("dropping test.foo collection...");
    db.foo.drop();
    db.getLastError(3); // await all to drop
    print("done");

    db.foo.insert({_id:1})
    db.foo.insert({_id:2})
    db.foo.insert({_id:3})

    print(3);
    printjson( db.getLastError('majority') );
    print(4);

    db.foo.insert({_id:4});
    print("stopping 27002...");
    b.shutdownServer();
    db.foo.insert({_id:5});
    db.foo.insert({_id:6});
    print("wait 2");
    db.getLastError(2);
    print("got wait 2");
    print("stopping 27001...");
    a.shutdownServer();
    sleep(100); // i don't think we need this...just to be sure as this is a simulation of failures...i 
                // believe shutdownServer waits for a response and then catches it
    db.foo.insert({_id:7});
    db.foo.insert({_id:8});
    db.foo.insert({_id:9});
    db.getLastError();
    print("done with testRollback. On problem #2 you need to stop (kill) the final mongod yourself.");
}                                                                                                       

function go() { printjson( db.isMaster() );
  print();
  print("things to run for the homework:");
  print("  ourinit()            Used in problem #1, initiates the replica set for you");
  print("  testRollback()       Used in problems #1 and #2");
  print("  part4()              Used in problem #4");
  print(); 
}
go();

function part4(){ if( !db.isMaster().ismaster && !db.isMaster().secondary ) throw "something is wrong the set isn't healthy"; var z=db.getSisterDB("local").system.replset.find()[0].members; var n = 0; for( var i in z ) { if( z[i][p] != 0 ) n++; if( z[i].slaveDelay ) n+=77;} return ""+n+z.length+rs.status().members.length;}
