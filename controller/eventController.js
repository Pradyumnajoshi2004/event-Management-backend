const Event = require("../model/eventModel")

exports.getEvents = async (req,res) => {
    try {
        const data  = await Event.find()
        return res.json({errors:false,data:data})
    } catch (error) {
        return res.status(500).json({errors:true,message:error.message})
    }
}

exports.getEventById = async (req,res) => {
    try {
        const data  = await Event.findById(req.params.id)
        return res.json({errors:false,data:data})
    } catch (error) {
        return res.status(500).json({errors:true,message:error.message})
    }
}

exports.postEvents = async (req, res) => {
    try {
        const { eventName, date, eventDescription, eventVenue } = req.body;

        const isEventExists = await Event.findOne({ eventName, date });
        if (isEventExists) {
            return res.status(500).json({ errors: true, message: "The event already exists" });
        }

        const data = await Event.create(req.body);
        return res.json({ errors: false, data: data });
    } catch (error) {
        return res.status(500).json({ errors: true, message: error.message });
    }
};

exports.updateEvent = async (req,res) => {
    try {
        const data = await Event.findByIdAndUpdate(req.params.id,req.body,{new:true})
        return res.json({errors:false,data:data})
    } catch (error) {
        return res.status(500).json({errors:true,message:error.message})
    }
}

exports.deleteEvent = async (req,res) => {
    try {
        const data = await Event.findByIdAndDelete(req.params.id)
        return res.json({errors:false,data:data})
    } catch (error) {
        return res.status(500).json({errors:true,message:error.message})
    }
}


