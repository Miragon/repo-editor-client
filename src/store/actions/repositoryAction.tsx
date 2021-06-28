import {Dispatch} from "@reduxjs/toolkit";
import helpers from "../../constants/Functions";
import * as api from "../../api/api"
import {SUCCESS, SYNC_STATUS, UNHANDLEDERROR} from "./diagramAction";
import {NewBpmnRepositoryTO} from "../../api/models";
import {ActionType} from "./actions";
import {handleError} from "./errorAction";


export const GET_REPOS = "GET_REPOS"
export const ACTIVE_REPO = "ACTIVE_REPO"
export const ACTIVE_DIAGRAMS = "ACTIVE_DIAGRAMS"


export const fetchRepositories = () => {
    return async (dispatch: Dispatch) => {
        const repositoryController = new api.BpmnRepositoryControllerApi() //config was passed before
        try {
            const config = helpers.getClientConfig(localStorage.getItem("oauth_token"))

            const response = await repositoryController.getAllRepositories(config)
            if(Math.floor(response.status/100) === 2){
                dispatch({type: GET_REPOS, repos: response.data})
                dispatch({type: SYNC_STATUS, dataSynced: true})

            }
            else {
                dispatch({type: UNHANDLEDERROR, errorMessage: "Could not process request"})
            }
        } catch (error){
            dispatch(handleError(error, ActionType.FETCH_REPOSITORIES, []))

        }
    }
}



export const getSingleRepository = (bpmnRepositoryId: string) => {
    return async (dispatch: Dispatch) => {
        const repositoryController = new api.BpmnRepositoryControllerApi() //config was passed before
        try {
            const config = helpers.getClientConfig(localStorage.getItem("oauth_token"))

            const response = await repositoryController.getSingleRepository(bpmnRepositoryId, config)
            if(Math.floor(response.status/100) === 2){
                dispatch({type: ACTIVE_REPO, activeRepo: response.data})

            }
            else {
                dispatch({type: UNHANDLEDERROR, errorMessage: "Could not process request"})
            }
        } catch (error){
            dispatch(handleError(error, ActionType.GET_SINGLE_REPOSITORY, [bpmnRepositoryId]))

        }
    }
}




export const createRepository = (bpmnRepositoryName: string, bpmnRepositoryDescription: string) => {
    return async (dispatch: Dispatch) => {
        const repositoryController = new api.BpmnRepositoryControllerApi() //config was passed before
        try {
            const newBpmnRepositoryTO: NewBpmnRepositoryTO = {
                bpmnRepositoryName: bpmnRepositoryName,
                bpmnRepositoryDescription: bpmnRepositoryDescription
            }
            const config = helpers.getClientConfig(localStorage.getItem("oauth_token"))
            const response = await repositoryController.createRepository(newBpmnRepositoryTO, config)
            if(Math.floor(response.status/100) === 2){
                dispatch({type: SUCCESS, successMessage: "Repository created"})
                dispatch({type: SYNC_STATUS, dataSynced: false})
            }
            else {
                dispatch({type: UNHANDLEDERROR, errorMessage: "Could not process request"})
            }
        } catch (error){
            dispatch(handleError(error, ActionType.CREATE_REPOSITORY, [bpmnRepositoryName, bpmnRepositoryDescription]))

        }
    }
}



export const updateRepository = (bpmnRepositoryId: string, bpmnRepositoryName: string, bpmnRepositoryDescription: string) => {
    return async (dispatch: Dispatch) => {
        const repositoryController = new api.BpmnRepositoryControllerApi() //config was passed before
        try {
            const newBpmnRepositoryTO: NewBpmnRepositoryTO = {
                bpmnRepositoryName: bpmnRepositoryName,
                bpmnRepositoryDescription: bpmnRepositoryDescription
            }
            const config = helpers.getClientConfig(localStorage.getItem("oauth_token"))
            const response = await repositoryController.updateRepository(newBpmnRepositoryTO, bpmnRepositoryId, config)
            if(Math.floor(response.status/100) === 2){
                dispatch({type: SUCCESS, successMessage: "Repository updated"})
                dispatch({type: SYNC_STATUS, dataSynced: false})
            }
            else {
                dispatch({type: UNHANDLEDERROR, errorMessage: "Could not process request"})
            }
        } catch (error){
            dispatch(handleError(error, ActionType.UPDATE_REPOSITORY, [bpmnRepositoryId, bpmnRepositoryName, bpmnRepositoryDescription]))

        }
    }
}


export const deleteRepository = (bpmnRepositoryId: string) => {
    return async (dispatch: Dispatch) => {
        const repositoryController = new api.BpmnRepositoryControllerApi() //config was passed before
        try {

            const config = helpers.getClientConfig(localStorage.getItem("oauth_token"))
            const response = await repositoryController.deleteRepository(bpmnRepositoryId, config)
            if(Math.floor(response.status/100) === 2){
                dispatch({type: SUCCESS, successMessage: "Repository deleted"})
            }
            else {
                dispatch({type: UNHANDLEDERROR, errorMessage: "Could not process request"})
            }
        } catch (error){
            dispatch(handleError(error, ActionType.DELETE_REPOSITORY, [bpmnRepositoryId]))

        }
    }
}
