import mongoose from "mongoose";

const vehicleSchema = mongoose.Schema(
    {
        _id : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Details'
        },
        vehicle_name: {
            required: true,
            type: String
        },
        speed: {
            required: true,
            type: Number
        },
        charge: {
            required: true,
            type: Number
        }
    }
)

const Vehicle = mongoose.model('Vehicle',vehicleSchema)

export default Vehicle