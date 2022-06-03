import mongoose from 'mongoose'

const tripSchema = mongoose.Schema(
    {   
        userId:{
            type:mongoose.Schema.Types.ObjectId
        },
        direction:{
            type:Array,
            required:true
        },
        distance:{
            type:Number,
            required:true
        }, 
        start:{
            type:[Number,Number],
            required:true
        },
        end:{
            type:[Number,Number],
            required:true
        }
    }
)

const Trip = mongoose.model('Trip',tripSchema)

export default Trip