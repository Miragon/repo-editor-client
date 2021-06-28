import {Dispatch} from "@reduxjs/toolkit";
import * as api from "../../api/api";
import helpers from "../../constants/Functions";
import {ASSIGNED_USERS, SUCCESS, SYNC_STATUS, UNHANDLEDERROR} from "./diagramAction";
import {AssignmentWithUserNameTO, AssignmentWithUserNameTORoleEnumEnum} from "../../api/models";
import {ActionType} from "./actions";
import {handleError} from "./errorAction";

export const getAllAssignedUsers = (repoId: string) => {
    return async (dispatch: Dispatch) => {
        const assignmentController = new api.AssignmentControllerApi()

        try{
            const config = helpers.getClientConfig()
            const response = await assignmentController.getAllAssignedUsers(repoId, config)
            if(Math.floor(response.status/100) === 2) {
                dispatch({type: ASSIGNED_USERS, assignedUsers: response.data})
                dispatch({type: SYNC_STATUS, dataSynced: true})

            }
            else {
                dispatch({type: UNHANDLEDERROR, errorMessage: "Could not process request"})
            }
        } catch (error){
            dispatch(handleError(error, ActionType.GET_ALL_ASSIGNED_USERS, [repoId]))

        }
    }
}



export const createOrUpdateUserAssignment = (repoId: string, userName: string, roleEnum?: AssignmentWithUserNameTORoleEnumEnum) => {
    return async (dispatch: Dispatch) => {
        const assignmentController = new api.AssignmentControllerApi()
        let message = ""
        try {
            if (!roleEnum) {
                message = "Added User to Repository"
            } else {
                message = `Changed role of ${userName} to ${roleEnum}`
            }

            const assignment: AssignmentWithUserNameTO = {
                bpmnRepositoryId: repoId,
                userName: userName,
                roleEnum: (roleEnum) ? roleEnum : AssignmentWithUserNameTORoleEnumEnum.MEMBER
            }
            const config = helpers.getClientConfig()
            const response = await assignmentController.createOrUpdateUserAssignment(assignment, config)
            if (Math.floor(response.status / 100) === 2) {
                dispatch({type: SUCCESS, successMessage: message})
                dispatch({type: SYNC_STATUS, dataSynced: false})
            }

            else {
                dispatch({type: UNHANDLEDERROR, errorMessage: "Could not process request"})
            }
        } catch (error){
            dispatch(handleError(error, ActionType.CREATE_OR_UPDATE_USER_ASSIGNMENT, [repoId, userName, roleEnum]))

        }
    }
}



export const deleteAssignment = (repoId: string, userName: string) => {
    return async (dispatch: Dispatch) => {
        const assignmentController = new api.AssignmentControllerApi()
        try{
            const config = helpers.getClientConfig()
            const response = await assignmentController.deleteUserAssignment(repoId, userName, config)
            if(Math.floor(response.status/100) === 2) {
                dispatch({type: SUCCESS, successMessage: `Removed ${userName} from Repository`})
                dispatch({type: SYNC_STATUS, dataSynced: false})
            }
            else {
                dispatch({type: UNHANDLEDERROR, errorMessage: "Could not process request"})
            }
        } catch (error){
            dispatch(handleError(error, ActionType.DELETE_ASSIGNMENT, [repoId, userName]))

        }
    }
}

