import { Router } from 'express'
const router = Router()
import { addDetails, authDriver, registerDriver, showDetails, driverLogout, confirmation, bookingInfo,verifyPin, driverProfile, currentLocation } from '../controllers/driverController.js'

router.post('/',registerDriver)
router.post('/login',authDriver)
router.put('/logout',driverLogout)
router.post('/add_details',addDetails)
router.get('/details',showDetails)
router.post('/confirmation',confirmation)
router.get('/info',bookingInfo)
router.route('/verify_pin/:pin').get(verifyPin)
router.route('/profile/:id').get(driverProfile)
router.route('/current_location').patch(currentLocation)


export default router
 






