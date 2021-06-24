import {AxiosResponse} from "axios";
import {Dispatch} from "@reduxjs/toolkit";
import {type} from "os";
import {HANDLEDERROR, UNHANDLEDERROR} from "./diagramAction";
import {defaultErrors} from "../../components/Exception/defaultErrors";
import {ActionType} from "./actions";
import {createDispatchHook, useDispatch} from "react-redux";


export const handleFailedCall = (errorType: string, response: AxiosResponse, actionType: ActionType, payload: Array<any>) => {
    return async (dispatch: Dispatch) => {
        console.log(response)
        //dispatch({type: errorType, errorMessage: response.message + `(${response.status})`, retryMethod: retryMethod()})
    }
}


export const handleError = (error: any, actionType: ActionType, retryMethod: any, payload: Array<any>) => {

        if(error.response){
              switch(error.response.data.status.toString()) {
                case "400":
                     return ({type: HANDLEDERROR, errorMessage: defaultErrors["400"], retryMethod: retryMethod, payload: payload})
                case "401":
                    console.log("In Err function")
                    return ({type: HANDLEDERROR, errorMessage: defaultErrors["401"], retryMethod: retryMethod()})
                case "403":
                    return ({type: UNHANDLEDERROR, errorMessage: defaultErrors["403"], retryMethod: retryMethod()})
                case "404":
                    return ({type: UNHANDLEDERROR, errorMessage: defaultErrors["404"], retryMethod: retryMethod()})
                case "409":
                    return ({type: HANDLEDERROR, errorMessage: defaultErrors["409"], retryMethod: retryMethod()})
                default:
                    return ({type: UNHANDLEDERROR, errorMessage: `Error ${error}`, retryMethod: retryMethod()})
        }
    }
}