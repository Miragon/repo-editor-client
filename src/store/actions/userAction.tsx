import {Dispatch} from "@reduxjs/toolkit";
import * as api from "../../api/api";
import {
    BpmnDiagramVersionUploadTO,
    BpmnDiagramVersionUploadTOSaveTypeEnum,
    UserEmailTO,
} from "../../api/models";
import helpers from "../../constants/Functions";
import {HANDLEDERROR, SEARCH_USERS, UNHANDLEDERROR, USERQUERY_EXECUTED} from "./diagramAction";
import {defaultErrors} from "../../components/Exception/defaultErrors";
import {ActionType} from "./actions";

export const searchUsers = (typedName: string) => {
    return async (dispatch: Dispatch) => {
        const userController = new api.UserControllerApi()
        try{
            const config = helpers.getClientConfig(localStorage.getItem("oauth_token"))
            const response = await userController.searchUsers(typedName, config)
            if(Math.floor(response.status/100) === 2) {
                dispatch({type: SEARCH_USERS, searchedUsers: response.data})
                dispatch({type: USERQUERY_EXECUTED, resultsCount: response.data.length})
            }
            else {
                dispatch({type: UNHANDLEDERROR, errorMessage: response.status + "" + JSON.stringify(response), retryMethod: (() => dispatch({type: ActionType.SEARCH_USERS, payload: [typedName] }))})
            }
        } catch (error){
            if(error.response){
                switch(error.response.data.status) {
                    case "400":
                        dispatch({type: UNHANDLEDERROR, errorMessage: defaultErrors["400"], retryMethod: (() => dispatch({type: ActionType.SEARCH_USERS, payload: [typedName] }))})
                        return;
                    case "401":
                        dispatch({type: UNHANDLEDERROR, errorMessage: defaultErrors["401"], retryMethod: (() => dispatch({type: ActionType.SEARCH_USERS, payload: [typedName] }))})
                        return;
                    case "403":
                        dispatch({type: UNHANDLEDERROR, errorMessage: defaultErrors["403"], retryMethod: (() => dispatch({type: ActionType.SEARCH_USERS, payload: [typedName] }))})
                        return;
                    case "404":
                        dispatch({type: UNHANDLEDERROR, errorMessage: defaultErrors["404"], retryMethod: (() => dispatch({type: ActionType.SEARCH_USERS, payload: [typedName] }))})
                        return;
                    case "409":
                        dispatch({type: HANDLEDERROR, errorMessage: error.response.data.message, retryMethod: (() => dispatch({type: ActionType.SEARCH_USERS, payload: [typedName] }))})
                        return;
                    default:
                        dispatch({type: UNHANDLEDERROR, errorMessage: `Error ${error.response.status}`, retryMethod: (() => dispatch({type: ActionType.SEARCH_USERS, payload: [typedName] }))})
                        return;

                }
            }
        }
    }
}