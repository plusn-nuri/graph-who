__mongodb-graph-who__

Lab 2
===============

Overview
---------------
1. Perfom simple find() queries to familiarize yourself with the schema of collection `companion`
1. Perfom aggregations using `$graphLookup` 


## 1 Familiarize with schema

## 2 Excercises

### Excercise 1

Aggregate over the `companion` collection.
The first pipeline stage should match only documents for 'Amy Pond'.
The second pipeline stage should look to see who was a potential companion sighted with her. Field `seen` indicates episodes Amy was in. Starting with episod **6**, find others in those same episodes, without descending deeper. Use the same collection to look into, and the `seen` field to connect to as well as from. Name the graph-connected field **anlongside**.

How many documents returned?
How many entries in the **alongside** field? Does it look right?

### Excercise 2
As you saw, the descent into similarly numbered episodes nets more doucments that it should. This is because the same episod number may have appeard with a different Doctor ordinal number. The field `ord` contains the ordinal number. Run the same aggretation as before, but restrict the descent to those matchin the same Doctor ordinal number. Again, use episod **6** as the recursion root.

### Excercise 3
Now properly restricted to the same Doctor, change the first pipeline stage to allow any document with **ord** euqaling **'Eleventh'**. Run the pipeline.

To understand who else has a potential of being a companion, let's reshape the result:
Add a  `$group` stage to the pipeline, grouping by **name** and collecting all graph-connected names (eg: _'$alongside.name'_) for each name.
Which character appearse alongside others the most?
