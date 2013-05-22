mymgd --dbpath 1 --replSet abc --port 27001 --smallfiles --oplogSize 50 --logpath log.1 --logappend --fork

mymgd --dbpath 2 --replSet abc --port 27002 --smallfiles --oplogSize 50 --logpath log.2 --logappend --fork

mymgd --dbpath 3 --replSet abc --port 27003 --smallfiles --oplogSize 50 --logpath log.3 --logappend --fork


mymgd --dbpath 1 --replSet abc --port 27001 --smallfiles --oplogSize 50 --logpath log.1 --logappend --fork


cfg = {
_id : "abc",
members : [
{ _id : 0, host : "localhost:27001" },
{ _id : 1, host : "localhost:27002" },
{ _id : 2, host : "localhost:27003" }
]
}

rs.init()

use week4
> db.foo.find()

> homework.b()

answer: 5002