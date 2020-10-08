# AddressTest
Test for address.ir

# Prerequisites
### Postgres
You need postgres wit postgis installed on it or you can use this image with the project's docker-compose
```
# docker-compose up
```
### node_modules
Install package dependencies
```
npm install 
```

# Migrations
### Sequelize-cli
I used sequelize-cli for my migrations so remember to install it:
```
npm install -g sequelize-cli
```
### Running the migrations
To run the migration use the following command:
```
sequelize db:migrate
```

# Generating 2M random records and saving them in DB
In order to do so use the following command:
```
 node ./services/generateHouses
 ```
 
 # PolygonSearch API
 For polygon search use the following route with POST and a application/json body
 ```
  http://{HOST}:{PORT}/api/houses/polygonSearch
  ```
  
  Sample request body:
  ```
  {
    "locations": [
        {
            "latitude": 35.755096606456476,
            "longitude": 51.345163134043275
        },
        {
            "latitude": 35.755096606456476,
            "longitude": 51.345163134043275
        },
        {
            "latitude": 35.757345349813406,
            "longitude": 51.34678322234799
        },
        {
            "latitude": 35.758194487415544,
            "longitude": 51.344014184810284
        }
    ]
  }
  ```

# Nearby Houses API
 For polygon search use the following route with POST and a application/json body
 ```
  http://{HOST}:{PORT}/api/houses/nearby
  ```
  
  Sample request body:
  ```
  {
    "latitude": 35.755096606456476,
    "longitude":  51.345163134043275
  }

  ```

  # Filtered Search
  The Search functions accepts all parameters related to a house object as it was asked exept the location parameters. every parameter can either have a GreaterThanEqual and LessThanEqual or have neither of them. 
  Use the following route with POST and a application/json body
    ps: The offset is self explanitory, api is limited to send back 25 results at a time, so use offset to move along results.
```
http://{HOST}:{PORT}/api/houses/search
```
Request body sample:
```
{
    "areaGte": 10,
    "areaLte": 100,
    "rentGte": 100,
    "rentLte": 100000,
    "mortgageGte": 1000,
    "mortgageLte": 100000,
    "ageGte": 10,
    "ageLte": 100,
    "offset": 100
}
```

# CRUD
### Details Of A House
POST ``http://{HOST}:{PORT}/api/houses/``
Request body sample:
```
{
    "id": "3bbf3196-a97f-4e66-98b1-08e37532a797"
}
```
### Create New House
PUT ``http://{HOST}:{PORT}/api/houses/``
Request body sample:
```
{
    "area": 1231,
    "latitude": 35.758194487415777,
    "longitude": 51.344014184810777,
    "rent": 1222,
    "mortgage": 222,
    "age": 223
}
```
### Delete A House
DELETE ``http://{HOST}:{PORT}/api/houses/``
Request body sample:
```
{
    "id": "3bbf3196-a97f-4e66-98b1-08e37532a797"
}
```
### Edit  A House
PATCH ``http://{HOST}:{PORT}/api/houses/``
If you dont incluede a parameter in the request body it will not be changed.
Request body sample:
```
{
    "id": "",
    "area": 1,
    "latitude": 1,
    "longitude": 1,
    "rent": 1,
    "mortgage": 1,
    "age": 1
}
```