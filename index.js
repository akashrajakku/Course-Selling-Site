const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const adminRouter = require("./routes/admin")
const userRouter = require("./routes/user");

// Middleware for parsing request bodies
app.use(bodyParser.json());
//another use of app.use("/route", routehandler) => in below code we have passed /admin as route, so basically any request with endpoint such as /admin/anything will get handled by adminROuter, it is simply equal to /admin/courses or /admin/purchases , just a better way to structure the routes 
app.use("/admin", adminRouter)
app.use("/user", userRouter)

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});