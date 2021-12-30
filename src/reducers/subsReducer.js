import { SUBSCRIBE } from "../types";

const initialSub = null

export default function subsReducer(state = initialSub, action) {
    switch (action.type) {
        case SUBSCRIBE:
            return action.payload

        default:
            return state
    }


}

