# RestaurantAppAdmin

This web app is for managing admin processes of the web app [RestaurantApp](https://github.com/MikhilMC/RestaurantApp). I havenn't implemented not much of features in this web app yet.

## Used Technologies

1. **MongoDB** as database
2. **Express.js** as server-side framework package for Node.js
3. **Node.js** as the run-time environment for server side

## Usage

To run the RestaurantAppAdmin web app, type:

```bash
nodemon app.js
```

or

```bash
node app.js
```

## Database Used

The database used here is **Restaurant**. The collections used are:

* __fooditems__ for storing the information about the whole food items.

* __todaymenuitems__ for storing information about today's menu. (_This collection is also managed by admin users._) When a normal user places an order, the server can add that quantity to the sold quantity field of this collection.

## Todo List

- [x] Add food items

- [x] Create today's menu

- [ ] Edit and delete options for food items

- [ ] Edit and delete options for today's menu

- [ ] User signup and login processes with authentication and authorization

- [ ] Get the details of today's sale report.

- [ ] Get notification when each order is placed.

- [ ] Implement image uploading to server using GridFS


