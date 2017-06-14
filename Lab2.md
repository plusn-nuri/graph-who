__mongodb-graph-who__

Lab 2
===============

Overview
---------------
> One observation the UNIT team had, is that the Dr. is frequently seen with companions. In this lab we will try and track companion associations through UNIT's companion database.

1. Perform simple find() queries to familiarize yourself with the schema of collection `companion`
1. Perform aggregations using `$graphLookup` 


## 1 Familiarize with schema

## 2 Excercises

### Excercise 1

Aggregate over the `companion` collection.
The first pipeline stage should match only documents for **'Amy Pond'**.
The second pipeline stage should look to see who was a potential companion sighted with her. The document field `seen` indicates episodes Amy was in. Starting with episode **'6'**, find others in those same episodes, without descending deeper. Use the same collection to look into, and the `seen` field to connect _to_ as well as _from_. Name the graph-connected field **anlongside**.

How many documents returned?
How many entries in the **alongside** field? Does it look right?

### Excercise 2
As you may have noticed, the descent into similarly numbered episodes nets more documents that it should. This is because the same episode number may have appeared with a different Doctor ordinal number. The field `ord` contains the ordinal number. Run the same aggretation as before, but restrict the descent to those matching the same Doctor ordinal number. Again, use episode **'6'** as the recursion root.

### Excercise 3
To understand who else has a potential of being a companion, let's reshape try something different:
1. Start the pipeline by matching the Eleventh doctor.
1. Start with the value of the field `seen`, not the constant **'6'**
1. Add a `$group` stage to the pipeline, grouping by **name** and collecting all graph-connected names (eg: _'$alongside.name'_) for each name.

Which character appears alongside others the most?


<!--

db.companion.aggregate([
    {$match:{name:'Amy Pond'}},
    {$graphLookup : {
        from : 'companion',
        startWith : '6',
        connectFromField : 'seen',
        connectToField : 'seen',
        as : 'alongside',
        maxDepth : 0
    	}
    }
])


db.companion.aggregate([
    {$match:{name:'Amy Pond'}},
    {$graphLookup : {
        from : 'companion',
        startWith : '6',
        connectFromField : 'seen',
        connectToField : 'seen',
        as : 'alongside',
        maxDepth : 0,
        restrictSearchWithMatch: { ord: 'Eleventh'}
    	}
    }
])

db.companion.aggregate([
    {$match:{ord:'Eleventh'}},
    {$graphLookup : {
        from : 'companion',
        startWith : '$seen',
        connectFromField : 'seen',
        connectToField : 'seen',
        as : 'alongside',
        maxDepth : 0,
        restrictSearchWithMatch: { ord: 'Eleventh'}
    	}
    },
    {$group: {_id: '$name', appearsWith: {$addToSet: '$alongside.name'}}}
])

-->