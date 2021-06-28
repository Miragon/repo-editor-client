import {Dispatch} from "@reduxjs/toolkit";
import * as api from "../../api/api";
import helpers from "../../constants/Functions";
import {SEARCH_USERS, UNHANDLEDERROR, USERQUERY_EXECUTED} from "./diagramAction";
import {ActionType} from "./actions";
import {handleError} from "./errorAction";

export const searchUsers = (typedName: string) => {
    return async (dispatch: Dispatch) => {
        const userController = new api.UserControllerApi()
        try{
            const config = helpers.getClientConfig()
            const response = await userController.searchUsers(typedName, config)
            if(Math.floor(response.status/100) === 2) {
                dispatch({type: SEARCH_USERS, searchedUsers: response.data})
                dispatch({type: USERQUERY_EXECUTED, resultsCount: response.data.length})
            }
            else {
                dispatch({type: UNHANDLEDERROR, errorMessage: "Could not process request"})
            }
        } catch (error){
            dispatch(handleError(error, ActionType.SEARCH_USERS, [typedName]))
        }
    }
}