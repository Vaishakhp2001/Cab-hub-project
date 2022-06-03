import {
    DETAILS_UPLOAD_ERROR
} from '../constants/detailsConstants'

export const detailsUploadReducer = (state = {},action) => {
    switch(action.type) {
        case DETAILS_UPLOAD_ERROR:
            return { error:action.payload}
        default:
            return state
    }
}