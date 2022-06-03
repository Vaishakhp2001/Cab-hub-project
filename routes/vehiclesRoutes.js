import { Router } from "express";
const router = Router();
import { getVehicle,availableVehicles,selectedVehicle } from '../controllers/vehicleController.js'

router.get('/',getVehicle)
router.get('/available',availableVehicles)
router.get('/selected/:type',selectedVehicle)

export default router;
