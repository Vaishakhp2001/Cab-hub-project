import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'
import Booking from '../models/BookingModel.js'
import Trip from '../models/TripModel.js'
import bcrypt from 'bcryptjs'
import { OAuth2Client } from 'google-auth-library';
import Vehicle from '../models/vehicleModel.js'

const client = new OAuth2Client('374230202308-9b2hlfuis86rdsm3ghik1jtj2roe98gt.apps.googleusercontent.com')


const authUser = asyncHandler(async (req,res) => {
   
    const { email, password } = req.body

    console.log("body:",req.body)

    const user = await User.findOne({ email })

    
    if(user && (await user.matchPassword(password))) {
        
       
         res.json({
             _id: user._id,
             name: user.name,
             email: user.email,
             phone: user.phone,
             isAdmin: user.isAdmin,
             token: generateToken(user._id)
         })

    } else {
      res.status(401)
      throw new Error('Invalid email or password')     
    }
    
})

const registerUser = asyncHandler(async (req,res) => { 
    
    let { name, email, phone, password } = req.body

    const userExist = await User.findOne({ email })

    if(userExist) {
        res.status(401)
        throw new Error('User already exists')
        
    }

    password =await bcrypt.hash(password, 10)

    const user = await User.create({
        name,
        email,
        phone,
        password 
    })

    if(user) {

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
      
        
    } else {
        res.status(400)
        throw new Error("Invalid user data") 
        
    }
    
})

const googleLogin =  asyncHandler(async ( req,res ) => {
    
    const { tokenId } = req.body


    client.verifyIdToken({idToken : tokenId,audience:'374230202308-9b2hlfuis86rdsm3ghik1jtj2roe98gt.apps.googleusercontent.com'}).then((response)=> {
        const { email_verified ,name, email,picture } = response.payload;

        console.log(picture)

        if(email_verified){

            User.findOneAndUpdate({ 
                where: { email: email },
                update: { name, picture },
                create: { name, email, picture }
            }).then((response) => {
                console.log("user:",response)
                res.status(200).json(response)
            })
        }
        
    })
    

})

export const userProfile = asyncHandler(async(req,res) => {

    const id = req.params.id

    console.log(id)

    const user = await User.findOne({_id:id})

    console.log("user:",user)

    res.status(200).json(user)

})

export const tripDetails = asyncHandler(async(req,res) => {

    const { direction, distance ,start ,end } = req.body

    console.log("trip_details",req.body)

    const trip = await Trip.create({
        direction,
        distance,
        start,
        end
    })

})

export const bookTrip = asyncHandler(async(req,res) => {

    const { _id,location1,location2,userId,coordinate,driverId,distance,amount,destination,destinationCoordinate } = req.body
    const vehicleId = _id

    console.log("req.body:;::::",req.body)

    console.log("amount : ::::::",amount)

    const date = new Date()

    const trip = await Booking.create({ 
        userId,
        driverId,
        vehicleId,
        location1,
        location2,
        destination,
        coordinate,
        destinationCoordinate,
        distance,
        amount,
        date,
    })

    if(trip) {

        console.log("trip:   ",trip)
        res.status(200).json({})
    }
})

export const allTrips = asyncHandler(async(req,res) => {

    const id = req.params.id

    const data = await Booking.find({ userId : id })

    console.log(data)

    res.json(data)
    
})


export { authUser,registerUser,googleLogin }
 