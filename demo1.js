// demo 1

db.nodes.find()

db.arcs.find()

// what we say on slides
db.nodes.aggregate([
    { $match: { name: "dr" } },
    {
        "$graphLookup": {
            "from": "arcs",
            "startWith": "amy",
            "connectFromField": "arc",
            "connectToField": "_id",
            "as": "arcs",
            "maxDepth": 0
        }
    }
]).pretty();

// use dynamic field from the parent node
db.nodes.aggregate([
    { $match: { name: "dr" } },
    {
        "$graphLookup": {
            "from": "arcs",
            "startWith": "$name",
            "connectFromField": "arc",
            "connectToField": "_id",
            "as": "arcs",
            "maxDepth": 0
        }
    }
]).pretty();

// increase depth
db.nodes.aggregate([
    { $match: { name: "dr" } },
    {
        "$graphLookup": {
            "from": "arcs",
            "startWith": "$name",
            "connectFromField": "arc",
            "connectToField": "_id",
            "as": "arcs",
            "maxDepth": 1
        }
    }
]).pretty();

// emit depth field
db.nodes.aggregate([
    { $match: { name: "dr" } },
    {
        "$graphLookup": {
            "from": "arcs",
            "startWith": "$name",
            "connectFromField": "arc",
            "connectToField": "_id",
            "as": "arcs",
            "maxDepth": 1,
            "depthField": "distance"
        }
    }
]).pretty();
