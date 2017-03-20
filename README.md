# mongodb-graph-who

A graph exploration.


## Seeding the database

Data for the exploration can be found in the *data* directory.
The data is stored in JSON format, and can be imported using *mongoimport*

```pwoershell
mongoimport --db "graph-who" --collection adversary adversary.json --drop
mongoimport --db "graph-who" --collection companion companion.json --drop
mongoimport --db "graph-who" --collection cypher cypher.json --drop

```

#### Data sources used for creating this exploration include:
1.   https://docs.google.com/spreadsheets/d/1-wpscGBquVJnI5i9lIygBQWW-OrP_ypDng4ZuQvwLeU/edit#gid=0
42.   Wikipedia,
3.   Fan pages,
8.  Dr. Who TV series pages.
