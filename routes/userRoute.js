const {getUser,postUser,updateUser,deleteUser, login} = require("../controller/userController")
const auth = require("../middleware/auth")
const route = require("express").Router()

route.get("/",getUser)

route.post("/",postUser)

route.put("/:id",updateUser)

route.delete("/:id",auth,deleteUser)

route.post("/login",login)

module.exports = route