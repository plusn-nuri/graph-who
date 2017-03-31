# mongodb-graph-who

A graph exploration.


## Seeding the database

Data for the exploration can be found in the *data* directory.
The data is stored in JSON format, and can be imported using *mongoimport*

```bash
mongoimport --db "graph-who" --collection adversary adversary.json --drop
mongoimport --db "graph-who" --collection companion companion.json --drop
mongoimport --db "graph-who" --collection cypher cypher.json --drop
mongoimport --db "graph-who" --collection arcs arcs.json --drop
mongoimport --db "graph-who" --collection nodes nodes.json --drop
```

### Syntax Basics

Query one doc

```javascript
    db.nodes.aggregate([{$match:{name:"dr"}}])
    db.arcs.aggregate([{$match:{_id:"dr"}}])
    db.arcs.aggregate([{$match:{arc:"dr"}}])
```
Connected to 

```javascript
    db.nodes.aggregate([
        {$match:{name:"dr"}},
        {$graphLookup:{
            from: 'arcs',
            startWith: 'dr',
            connectFromField: 'arc',
            connectToField: '_id',
            as: 'arcs',
            maxDepth: 0
            }
        }
    ])
```

#### Data sources used for creating this exploration include:
1.   https://docs.google.com/spreadsheets/d/1-wpscGBquVJnI5i9lIygBQWW-OrP_ypDng4ZuQvwLeU/edit#gid=0
42.   Wikipedia,
3.   Fan pages,
8.  Dr. Who TV series pages.
