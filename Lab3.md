__mongodb-graph-who__

Lab 3
===========

Overview
----------

This is where real detective work happens!
>There is a particularly devious adversary known as _Cybermen_. We can finde serveral of these in our `adversary` collection, across multiple years and episodes.
Turns out, there have been a many reports of people who whitnessed the Cyberment, or who know someone who did. Even more mysteriously, in each documented case, a cypher has been found left as a potential clue to the whereabouts of the Doctor. We'll try and connect the dots using a compound pipeline. 


## 1 Familiarize with schema
-  Familiarize yourself with the schema of collections `adversary`, `people`, and `cypher`

## 2 Excercises

### Excercise 1

1. Create a basic aggregation over the `adversary` collection. Filter the documents to only match those with the **name** begining with **"Cyber"** (Hint: use anchored regex).
1. Add a $graphLookup pipeline stage from the `people` collection. Start with the **_id** field, connecting from the **knows** field to the **whitness** field, naming the new field **association**. 
1. Check to see you have 6 resulting documents. You can do so by appending _.toArray().length_ after the _aggregate(...)_ command

### Excercise 2
We need to extract and process the associations.
1. Unwind the **association** array built in the pervious excercise.
1. Sort the results by **association._id**, ascending.
1. Extract a the case reference from the results: Project out a field named **ref** with the value of **association.case**, and ensure no other field is proejcted.

### Excercise 3
With a case number in hand as the field **ref**, we should look up the cyphers that correspond to the case.
1. Add a `$lookup` pipeline stage. Lookup from the `cypher` collection, using the local field **ref** and the foreign field **_id**, naming the new field **clue**
1. Inspect the results. This is the most likely place to find the Doctor.

<!--
db.adversary.aggregate([
    {$match:{name:/^Cyber/}},
    {$graphLookup:{
        from: 'people',
        startWith: '$_id',
        connectFromField: 'knows',
        connectToField: 'whitness',
        as: 'association',
        }
    },
    {$unwind:'$association'},
    {$sort: {'association._id':1}},
    {$project:{ref:'$association.case', _id:0}},
    {$lookup: {from: 'cypher', localField: 'ref', foreignField: '_id', as: 'clue' }}
])
-->
