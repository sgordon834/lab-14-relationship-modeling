![CF](https://camo.githubusercontent.com/70edab54bba80edb7493cad3135e9606781cbb6b/687474703a2f2f692e696d6775722e636f6d2f377635415363382e706e67) 14: Mongo/Express 2 Resource API

## Description
Uses relational properties to 'JOIN' two models/tables so user can view data queried from both tables into one table.

## Use
* Dog Model takes mandatory "name" and "breed" ObjectId
* Breed uses string.

POST/api/v1/dogs or breeds creates a new dog or breed

GET/api/v1/dogs returns all dogs or breeds

GET/api/v1/dogs or breeds/id returns dog or breed with specified id

PUT/api/v1/dogs or breeds/id updates dog or breed with specified id

DELETE/api/v1/dogs or breeds/id deletes dog or breed with specified id

Status Codes

404 returned if resource cannot be located by id

400 returned if query does not have correct parameters

500 returned for server errors


