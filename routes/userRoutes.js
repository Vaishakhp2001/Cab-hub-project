import { Router } from 'express'
const router = Router()
import { authUser,registerUser,googleLogin,userProfile,bookTrip,tripDetails,allTrips } from '../controllers/userController.js'
import protect from '../middleware/authModdleware.js'


router.route('/').post(registerUser)
router.post('/login', authUser)
router.post('/googlelogin', googleLogin)
router.route('/profile/:id').get(userProfile)
router.route('/booktrip').post(bookTrip)
router.route('/trip_details').post(tripDetails)
router.route('/trips/:id').get(allTrips)


export default router   
