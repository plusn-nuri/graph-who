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
mongoimport --db "graph-who" --collection people people.json --drop
```

### Syntax Basics

#### Query one doc using the Aggregation Framework

```javascript
    db.nodes.aggregate([{$match:{name:"dr"}}])
    db.arcs.aggregate([{$match:{_id:"dr"}}])
    db.arcs.aggregate([{$match:{_id:"amy"}}])
    db.arcs.aggregate([{$match:{arc:"amy"}}])
```

#### Adding a graph pipeline stage


```javascript
    // Relate the current pipeline node to a constant (value of 'from' is fixed)
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
    ]).pretty()

    // Relate the current pipeline node to connected graph arcs (value of 'from' is dynamic)
    db.nodes.aggregate([
        {$match:{name:"dr"}},
        {$graphLookup:{
            from: 'arcs',
            startWith: '$name',
            connectFromField: 'arc',
            connectToField: '_id',
            as: 'arcs',
            maxDepth: 0
            }
        }
    ]).pretty()

    // Descend further in the graph by increasing the maxDepth field
    db.nodes.aggregate([
        {$match:{name:"dr"}},
        {$graphLookup:{
            from: 'arcs',
            startWith: 'dr',
            connectFromField: 'arc',
            connectToField: '_id',
            as: 'arcs',
            maxDepth: 2
            }
        }
    ]).pretty()

    // Add an output field named 'howDeep' containing the depth of the connected graph node
    db.nodes.aggregate([
        {$match:{name:"dr"}},
        {$graphLookup:{
            from: 'arcs',
            startWith: 'dr',
            connectFromField: 'arc',
            connectToField: '_id',
            as: 'arcs',
            maxDepth: 2,
            depthField: 'howDeep'
            }
        }
    ]).pretty()
```

### Data sources used for creating this exploration include:
1.   https://docs.google.com/spreadsheets/d/1-wpscGBquVJnI5i9lIygBQWW-OrP_ypDng4ZuQvwLeU/edit#gid=0
42.   Wikipedia
3.   Fan pages
9.   Dr. Who TV series pages
11.  Arbitrary data for demo purposes
