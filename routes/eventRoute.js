const {getEvents,postEvents,updateEvent,deleteEvent} = require("../controller/eventController")
const auth = require("../middleware/auth")
const route = require("express").Router()


route.get("/",getEvents)

route.post("/",auth,postEvents)

route.put('/:id',auth,updateEvent)

route.delete("/:id",auth,deleteEvent)

module.exports = route