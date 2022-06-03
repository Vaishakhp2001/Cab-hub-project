import asyncHandler from 'express-async-handler';
import Details from '../models/detailsModel.js';
import Driver from '../models/driverModel.js';
import Vehicle from '../models/vehicleModel.js';

export const getVehicle = asyncHandler(async (req, res) => {


    const vehicles = await Vehicle.find({})

    console.log(vehicles)

    res.send(vehicles)

})

export const availableVehicles = asyncHandler(async (req, res) => {

    const type = req.query.type

    Details.find({ vehicleType: type })
        .populate({
            path: 'driverId',
            // find: {'loggedIn': { $eq: true },'location' : { $near : { $geometry: { type: "Point", coordinates: [ -73.9667, 40.78 ], $maxDistance: 0.10 }}}},
            // match: { 'loggedIn': { $eq: true } }
            
            
        })
        // .find({ 'driverId.location' : { $near : { $geometry: { type: "Point", coordinates: [ -73.9667, 40.78 ], $maxDistance: 0.10 }}}})
        .populate({
            path: 'vehicleInfo'
        })
       
        .exec((err, result) => {
            if (err) {
                throw new Error("Error ocured ", err.message)
            }   
            else {

                result = result.filter((obj) => {
                    return obj.driverId.loggedIn 
                })
                console.log("availble vehicles ***********************: ",result)

                // result.driverId.location
                
                res.status(200).json({ result })
            }
        })

})

export const selectedVehicle = asyncHandler(async(req,res) => {

    
    const type = req.params.type

    const vehicle = await Vehicle.findOne({ vehicle_name : type })

    console.log("vehicle:",vehicle)

    res.status(200).json(vehicle)
    
})