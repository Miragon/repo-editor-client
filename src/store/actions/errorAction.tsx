import {HANDLEDERROR, UNHANDLEDERROR} from "./diagramAction";
import {defaultErrors} from "../../components/Exception/defaultErrors";
import {ActionType} from "./actions";


export const handleError = (error: any, retryMethod: ActionType, retryPayload: Array<any>) => {
    console.log(error)
    try {
        switch(error.response.data.status?.toString()) {
            case "400":
                return {type: UNHANDLEDERROR, errorMessage: defaultErrors["400"], retryMethod: retryMethod, retryPayload: retryPayload}
            case "401":
                return {type: HANDLEDERROR, errorMessage: error.response.data.message, retryMethod: retryMethod, retryPayload: retryPayload}
            case "403":
                return {type: UNHANDLEDERROR, errorMessage: defaultErrors["403"], retryMethod: retryMethod, retryPayload: retryPayload}
            case "404":
                return {type: UNHANDLEDERROR, errorMessage: defaultErrors["404"], retryMethod: retryMethod, retryPayload: retryPayload}
            case "409":
                return {type: HANDLEDERROR, errorMessage: error.response.data.message, retryMethod: retryMethod, retryPayload: retryPayload}

            default:
                return {type: UNHANDLEDERROR, errorMessage: `Error ${error.response.status}`, retryMethod: retryMethod, retryPayload: retryPayload}
        }
    } catch (err) {
        console.log(err)
        return {type: UNHANDLEDERROR, errorMessage: "Unknown Error - Please refresh the page"}
    }

}

