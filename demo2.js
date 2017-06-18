// demo 2
db.adversary.aggregate([{ $match: { _id: 12 } }])

db.adversary.aggregate([
    { $match: { _id: 12 } },
    {
        $graphLookup: {
            from: 'adversary',
            startWith: 'Serve big bad',
            connectFromField: 'motive',
            connectToField: 'motive',
            as: 'similar'
        }
    }
]).pretty()

db.adversary.aggregate([
    { $match: { _id: 12 } },
    {
        $graphLookup: {
            from: 'adversary',
            startWith: 'Serve big bad',
            connectFromField: 'motive',
            connectToField: 'motive',
            as: 'similar',
            restrictSearchWithMatch:{ly:{$gt:2011}}
        }
    }
]).pretty()
