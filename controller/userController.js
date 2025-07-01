const User = require("../model/userModel")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

exports.getUser = async (req,res) => {
    try {
        const data = await User.find()
        return res.json({errors:false,data:data})
    } catch (error) {
        return res.status(500).json({errors:true,message:error.message})
    }
}

exports.postUser = async (req,res) => {
    try {
        const isUserExists = await User.findOne({email:req.body.email})
        if(isUserExists) return res.status(500).json({errors:true,message:"The User Is Already Exists"})
        req.body.password = await bcryptjs.hash(req.body.password,10)
        const data = await User.create(req.body)
        return res.json({errors:false,data:data})
    } catch (error) {
        return res.status(500).json({errors:true,message:error.message})
    }
}

exports.login = async (req,res) => {
    try {
        const isUserExists = await User.findOne({email : req.body.email})
        if(!isUserExists) return res.status(500).json({errors:true,message:"The Username or Password is Invaild"})
        const comparePassword = await bcryptjs.compare(req.body.password,isUserExists.password)
        if(!comparePassword) return res.status(500).json({errors:true,message:"The Username or Password is Invaild"})
        const token = await jwt.sign({_id:isUserExists._id},process.env.SEC)
        return res.json({errors:false,data:{token:token,user:isUserExists}})
    } catch (error) {
        return res.json(500).json({errors:true,message:error.message})    
    }
    
}

exports.updateUser = async (req,res) => {
    try {
        const data = await User.findByIdAndUpdate(req.params.id,req.body,{new:true})
        return res.json({errors:false,data:data})
    } catch (error) {
        return res.status(500).json({errors:true,message:error.message})
    }
}

exports.deleteUser = async (req,res) => {
    try {
        const data = await User.findByIdAndDelete(req.params.id)
        return res.json({errors:false,data:data})
    } catch (error) {
        return res.status(500).json({errors:true,message:error.message})
    }
}