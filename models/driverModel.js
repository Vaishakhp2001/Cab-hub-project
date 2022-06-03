import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import Details from './detailsModel.js'

const pointSchema = new mongoose.Schema({
    type: {
      type: String,
      enum: ['Point'],
   
    },
    coordinates: {
      type: [Number],
      
    }
  });

const driverSchema = mongoose.Schema(
    {
        // _id : {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'Details',
        // },
        name : {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true
        },
        loggedIn: {
            type: Boolean,
            
        },
        location: {
            type: pointSchema,  
            
        }
        
    }
)

driverSchema.methods.matchPassword = async function matchPassword(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

const Driver = mongoose.model('Driver',driverSchema)

console.log(Driver)

export default Driver

