```
npm i
node app.js
```

Seeds:
```
node seed remove


node seed  // start geberate users, stores and products
node seed store_cnt users_cnt products_cnt // like node seed 20 10 300

node seed remove // clear db
node seed store_cnt users_cnt products_cnt remove

node seed store_cnt products_cnt // change only store and products count
node seed store_cnt products_cnt remove

node seed  products_cnt // change only products count
node seed  products_cnt remove
```
