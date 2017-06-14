__mongodb-graph-who__

Lab 1
===========

Overview
-----------

1. Seed the database
1. Perform simple find() queries to familiarize yourself with the schema of collection `nodes` and `arcs`
1. Perform aggregations using `$graphLookup` 


## 1 Seeding the database

> If you are given a Mongo connection string for this part during live training, you may skip this part.

Data for the exploration can be found in the *data* directory.
The data is stored in JSON format, and can be imported using *mongoimport*

```bash
mongoimport --db "graph-who" --collection adversary adversary.json --drop
mongoimport --db "graph-who" --collection companion companion.json --drop
mongoimport --db "graph-who" --collection cypher cypher.json --drop
mongoimport --db "graph-who" --collection arcs arcs.json --drop
mongoimport --db "graph-who" --collection nodes nodes.json --drop
```

## 2 Familiarize with schema

### Exercise 1

Connect to the **"graph-who"** database.

Aggregate over the `nodes` collection.

1. The first pipeline stage should match only documents for the person named *river*.
1. The second pipeline stage should look to see who has an arc related to *river*:
   Starting with the constant value *river* lookup into the collection `arcs` and locate the zero-th relation (without descending further). We want to the connection from the document's **arc** field, and connect it to the **_id** field.

- You should have seen _one_ document returned.
- The document returned should have _two_ connections.

### Exercise 2
1. Change the value of the `startWith` field to be "---", and run the aggregation again.
Did a document return from the aggregation? Why is that? (No filed in any document in `arcs` has '---' anywhere.)

1. Change the value of the `startWith` field to be *river* again. Run _$graphLookup_ without the $match operator.
How many documents are returned?

<!--

db.nodes.aggregate([{$match:{name:'river'}}])
db.nodes.aggregate([
    {$match:{name:'river'}},
    {$graphLookup : {
        from : 'arcs',
        startWith : 'river',
        connectFromField : 'arc',
        connectToField : '_id',
        as : 'arcs',
        maxDepth : 0
    	}
    }
])

db.nodes.aggregate([
    {$match:{name:'river'}},
    {$graphLookup : {
        from : 'arcs',
        startWith : '---',
        connectFromField : 'arc',
        connectToField : '_id',
        as : 'arcs',
        maxDepth : 0
    	}
    }
])


db.nodes.aggregate([
    {$graphLookup : {
        from : 'arcs',
        startWith : 'river',
        connectFromField : 'arc',
        connectToField : '_id',
        as : 'arcs',
        maxDepth : 0
    	}
    }
])



-->