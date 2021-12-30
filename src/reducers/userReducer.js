import { LOGIN, LOGOUT } from "../types"

const initialUser = null

export default function userReducer(state = initialUser, action) {

    switch (action.type) {
        case LOGIN:
            return action.payload
        case LOGOUT:
            return initialUser
        default:
            return state

    }

}