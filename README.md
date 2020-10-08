# AddressTest
Test for address.ir

# Prerequisites
### Postgres
You need postgres wit postgis installed on it or you can use this image with the project's docker-compose
```
# docker pull mdillon/postgis
# docker-compose up
```
### node_modules
Install package dependencies
```
npm install 
```

# Migrations
### Sequelize-cli
I used sequelize-cli for my migrations so first remember to install it:
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
    "arrayOfLocations": [
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