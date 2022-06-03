import mongoose from 'mongoose'

const detailsSchema = mongoose.Schema(
    {
        vehicleType: {
            type:String,
            required: true
        },
        vehicleId: {
            type:String,
            required: false
        },
        vehicleNumber: {
            type: String,
            required: true
        },
        rcBookId: {
            type: String,
            required: false
        },
        rcbookNumber: {
            type: String,
            required: true
        },
        drivingLicenceId: {
            type: String,
            required: false
        },
        drivingLicenceNumber: {
            type: String, 
            required: true
        },
        driverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'Driver',   
        },
        vehicleInfo: {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'Vehicle'
        }
        
    }
)

const Details = mongoose.model('Details',detailsSchema)

export default Details