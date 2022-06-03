import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { driverLoginReducer,driverRegisterReducer,driverInfoReducer } from '../reducers/driverReducer';
import { googleLoginReducer, userLoginReducer,userRegisterReducer,userInfoReducer } from '../reducers/userReducers';
import { getAvailableVehiclesReducer, getSelectedVehicleReducer, getVehicleReducer } from '../reducers/vehicleReducer';
import { pickUpReducer,destinationReducer,directionReducer,pathReducer,currentLocationReducer,distanceReducer,durationReducer } from '../reducers/locationReducer'
import { confirmationReducer,driverConfirmationReducer,driverDataReducer } from '../reducers/bookingReducer'
import { driverReachedReducer,reachedDestinationReducer } from '../reducers/tripReducer'
import { detailsUploadReducer } from '../reducers/detailsReducer';
import { composeWithDevTools } from'redux-devtools-extension';

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    pickUp: pickUpReducer,
    destination: destinationReducer,
    direction: directionReducer,
    path: pathReducer,
    currentLocation: currentLocationReducer,
    distance: distanceReducer,
    duration:durationReducer,
    driverLogin:driverLoginReducer,
    driverRegister:driverRegisterReducer,
    vehicles:getVehicleReducer,
    googleLogin: googleLoginReducer,
    availableVehicles: getAvailableVehiclesReducer,
    selectedVehicle: getSelectedVehicleReducer,
    confirmation:confirmationReducer,
    driverConfirmation:driverConfirmationReducer,
    driverData:driverDataReducer,
    detailsUpload:detailsUploadReducer,
    driverReached:driverReachedReducer,
    userInfo: userInfoReducer,
    driverInfo: driverInfoReducer,
    reachedDestination: reachedDestinationReducer
})

const initialState = {}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;




