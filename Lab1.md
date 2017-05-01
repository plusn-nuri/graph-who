# mongodb-graph-who

# Lab 1

1. Seed the database
1. Perfom simple find() queries to familiarize yourself with the schema of collection `nodes` and `arcs`
1. Perfomr aggregations using `$graphLookup` 


## 1 Seeding the database

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

### Excercise 1

Aggregate over the `node` collection.

The first pipeline stage should match only documents for the person named *river*.

The second pipeline stage should look to see who has an arc related to *river*: 
1. Starting with the constant value *river* lookup into the collection `arcs` and locate the zero-th relation (without descending further).
1. We want to base this on River's `arcs` field, and connect it to the `_id` field.

You should have seen _one_ document returned.
The document returned should have _two_ connections.

Now change the value of the `startWith` field to be "---". Run the aggregation again.
Did a document return from the aggretaion? Why is that? (No filed in any document in `arcs` has '---' anywhere.)

Now change the value of the `startWith` field to be *river* again. Run $graphLookup without the $match operator.
How many documents are returned?
