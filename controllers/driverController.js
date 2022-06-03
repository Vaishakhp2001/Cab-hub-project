import asyncHandler from 'express-async-handler'
import Details from '../models/detailsModel.js'
import Driver from '../models/driverModel.js'
import { cloudinary } from '../utils/cloudinary.js'
import generateToken from '../utils/generateToken.js'
import bcrypt from 'bcryptjs'
import Vehicle from '../models/vehicleModel.js'
import { Server, Socket } from 'socket.io'



const authDriver = asyncHandler(async (req, res) => {

    console.log(req.body)

    const { email, password } = req.body

    const driver = await Driver.findOne({ email })

    console.log("driver: ", driver)

    if (driver && (await driver.matchPassword(password))) {

        const loginDriver = await Driver.updateOne({ email: driver.email }, { loggedIn: true })

        console.log("loggedIn driver", loginDriver)

        res.json({
            _id: driver._id,
            name: driver.name,
            email: driver.email,
            phone: driver.phone,
            token: generateToken(driver._id)
        })
    }
    else {
        console.log("error")
        res.status(401)
        throw new Error("Invalid Email or Password")
    }

})

const registerDriver = asyncHandler(async (req, res) => {

    console.log(req.body)

    let { name, email, phone, password } = req.body

    const driverExist = await Driver.findOne({ email })

    if (driverExist) {
        res.status(401)
        throw new Error('Driver already exists')
    }

    console.log("dirver exist ", driverExist)

    password = await bcrypt.hash(password, 10)

    const driver = await Driver.create({
        name,
        email,
        phone,
        password
    })

    console.log("driver:", driver)

    if (driver) {
        res.status(201).json({
            _id: driver._id,
            name: driver.name,
            email: driver.email,
            phone: driver.phone,
            token: generateToken(driver._id)
        })
    }
    else {
        res.status(400)
        throw new Error("Invalid credentials")
    }

})

export const addDetails = asyncHandler(async (req, res) => {


    const { vehicleType, vehicleImage, vehicleNumber, rcBookImage, rcbookNumber, drivingLicenceImage, drivingLicenceNumber, driverId } = req.body

    console.log(vehicleType,"88888",vehicleNumber,"88888",rcbookNumber,"88888",drivingLicenceNumber,"88888",driverId,"88888")

    const vehicleExist = await Details.findOne({ vehicleNumber })

    const driverExist = await Details.findOne({ driverId })

    if(driverExist) {
        res.status(409)
        throw new Error("Drive already exist")
    }

    if(!vehicleType) {
        
        res.status(406) 
        throw new Error("No vehicle type") 
    }


    if (!vehicleExist) {

        let vehicleId="123";
        let rcBookId="123";
        let drivingLicenceId="123";

        // try {
            
        //     await cloudinary.uploader.upload(vehicleImage, function (error, result) {
        //         if (result) {
                   
        //             vehicleId = result.public_id;
        //         }
        //         else {
        //             console.log("error image 1")
        //             console.log("error on upload image 1: ", error)
        //             res.status(501).json("error on upload image 1: ", error)
        //         }
        //     });

        //     await cloudinary.uploader.upload(rcBookImage, function (error, result) {
        //         if (result) {
        //             console.log(result)
        //             rcBookId = result.public_id;
        //         }
        //         else {
        //             console.log("error image 2")
        //             console.log("error on upload image 2: ", error)
        //             res.status(501).json("error on upload image 2: ", error)
        //         }
        //     });

        //     await cloudinary.uploader.upload(drivingLicenceImage, function (error, result) {
        //         if (result) {
        //             console.log(result)
        //             drivingLicenceId = result.public_id;
        //         }
        //         else {
        //             console.log("error on upload image : ", error)
        //             res.status(501).json("error on upload image 3: ", error)
        //         }
        //     });

            const vehiclesId = await Vehicle.findOne({ vehicle_name: vehicleType })

            const vehicleInfo = vehiclesId._id

            const vehicle = await Details.create({

                vehicleType,
                vehicleId,
                vehicleNumber,
                rcBookId,
                rcbookNumber,
                drivingLicenceId,
                drivingLicenceNumber,
                driverId,
                vehicleInfo

            })

            if (vehicle) {
                res.status(200).json("Details added successfully")
            }
            else {
                res.status(401)
                throw new Error("Something went wrong")
            }
        // }

        // catch (err) {
        //     console.log("error occured duing imge upload ", err)
        //     throw new Error("error occured", err)
        // }

    }
    else {
        res.status(304)
        throw new Error("Vehicle already exist ..")
    }

})

export const showDetails = asyncHandler(async (req, res) => {

    try {
        const details = await Details.find({}).
            populate('driverId').
            exec((err, driver) => {
                if (driver) {

                    res.status(200).json(driver)
                }
                else {
                    res.status(401)
                    throw new Error("No details")
                }
            })

    }

    catch (err) {
        res.status(400)
        throw new Error("No details found")
    }

})

export const driverLogout = asyncHandler(async (req, res) => {

    console.log(req.body)

    const driver = await Driver.findOneAndUpdate({ _id: req.body.driverId }, { loggedIn: false })

    console.log(driver)

    res.json(driver)

})

export const confirmation = asyncHandler(async (req, res) => {

    // let io = req.app.get('socketio')

    console.log(req.body)

    // io.on("connection", (socket) => {  

    //     socket.emit("message", data)
    // })

    console.log(req.body)
    res.json(req.body)

})

export const bookingInfo = asyncHandler(async(req,res) => {

    const Id = req.query.Id

    console.log("query data : ",req.query)

    Details.findOne({ driverId : Id })
        .populate({
            path:'driverId'
        })
        .populate({
            path: 'vehicleInfo'
        })
        .exec((err, result) => {
            if (err) {
                throw new Error("Error ocured ", err)
            }
            else {
                console.log("Driver details  to user  :",result)
                res.status(200).json({ result })
            }
        })

})

export const verifyPin = asyncHandler(async(req,res) => {

    const pin = req.params.pin

    res.status(200).json({pin})
})

export const driverProfile = asyncHandler(async(req,res)=> {
    
    const id = req.params.id

    const driver = await Driver.findOne({_id:id})

    res.status(200).json(driver)

})

export const currentLocation = asyncHandler(async(req,res) => { 

    const {id, longitude, latitude} = req.body

    console.log(req.body)

   const driver = await Driver.findById(id)

   const location = { type: 'Point', coordinates: [longitude,latitude] }

    driver.location = location;

    await driver.save()
})

export { authDriver, registerDriver }


