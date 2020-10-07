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
 