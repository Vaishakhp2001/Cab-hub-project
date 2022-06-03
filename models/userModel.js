import  mongoose from 'mongoose'
import  bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
    
    {
        name: {
            type: String,
            required: true
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
        isAdmin: {
            type: Boolean,
            required: true,
            default: false
        }
    },{
        timestamp: true
    }
)  

userSchema.methods.matchPassword = async function matchPassword(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model('User', userSchema)

console.log(User)

export default User