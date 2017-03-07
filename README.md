```
npm i
```

```
node seed  // start geberate users, stores and products
node seed store_cnt users_cnt products_cnt // like node seed 20 10 300

node seed remove // clear db
node seed store_cnt users_cnt products_cnt remove

node seed store_cnt products_cnt // change only store and products count
node seed store_cnt products_cnt remove

node seed  products_cnt // change only products count
node seed  products_cnt remove
```

Start server
```
node app.js
//and another cmd
mongod
```

Use A2

```
cd client/
npm i
npm run typings install
//npm start
```