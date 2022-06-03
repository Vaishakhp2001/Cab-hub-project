import mongoose from 'mongoose'

const bookingSchema = mongoose.Schema(
    {
        userId: {
            type:String,
            required: true
        },
        driverId:{
            type:String,
            required: true
        },
        vehicleId:{
            type:String,
            required:true
        },
        location1:{
            type:String,
            required:true
        },
        location1:{
            type:String,
            required:true
        },
        destination:{
            type:String,
            required:true
        },
        coordinate:{
            type:Number,
            required:true
        },
        destinationCoordinate:{
            type:Number,
            required:true
        },
        distance:{
            type:Number,
            required:true
        },
        amount:{
            type:Number,
            required:true
        },
        date:{
            type:String,
            required:true
        },
        tripId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Trip'
        }

    }
)

const Booking = mongoose.model('Booking',bookingSchema)

export default Booking