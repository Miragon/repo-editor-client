import {Dispatch} from "@reduxjs/toolkit";
import helpers from "../../constants/Functions";
import * as api from "../../api/api"
import {HANDLEDERROR, SUCCESS, SYNC_STATUS, UNHANDLEDERROR} from "./diagramAction";
import {NewBpmnRepositoryTO} from "../../api/models";
import {defaultErrors} from "../../components/Exception/defaultErrors";
import {ActionType} from "./actions";


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
                dispatch({type: UNHANDLEDERROR, errorMessage: response.status + "" + JSON.stringify(response), retryMethod: (() => dispatch({type: ActionType.FETCH_REPOSITORIES }))})
            }
        } catch (error){
            if(error.response){
                switch(error.response.data.status) {
                    case "400":
                        dispatch({type: UNHANDLEDERROR, errorMessage: defaultErrors["400"], retryMethod: (() => dispatch({type: ActionType.FETCH_REPOSITORIES }))})
                        return;
                    case "401":
                        dispatch({type: UNHANDLEDERROR, errorMessage: defaultErrors["401"], retryMethod: (() => dispatch({type: ActionType.FETCH_REPOSITORIES }))})
                        return;
                    case "403":
                        dispatch({type: UNHANDLEDERROR, errorMessage: defaultErrors["403"], retryMethod: (() => dispatch({type: ActionType.FETCH_REPOSITORIES }))})
                        return;
                    case "404":
                        dispatch({type: UNHANDLEDERROR, errorMessage: defaultErrors["404"], retryMethod: (() => dispatch({type: ActionType.FETCH_REPOSITORIES }))})
                        return;
                    case "409":
                        dispatch({type: HANDLEDERROR, errorMessage: error.response.data.message, retryMethod: (() => dispatch({type: ActionType.FETCH_REPOSITORIES }))})
                        return;
                    default:
                        dispatch({type: UNHANDLEDERROR, errorMessage: `Error ${error.response.status}`, retryMethod: (() => dispatch({type: ActionType.FETCH_REPOSITORIES }))})
                        return;

                }
            }
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
                dispatch({type: UNHANDLEDERROR, errorMessage: response.status + "" + JSON.stringify(response), retryMethod: (() => dispatch({type: ActionType.GET_SINGLE_REPOSITORY, payload: [bpmnRepositoryId] }))})
            }
        } catch (error){
            if(error.response){
                switch(error.response.data.status) {
                    case "400":
                        dispatch({type: UNHANDLEDERROR, errorMessage: defaultErrors["400"], retryMethod: (() => dispatch({type: ActionType.GET_SINGLE_REPOSITORY, payload: [bpmnRepositoryId] }))})
                        return;
                    case "401":
                        dispatch({type: UNHANDLEDERROR, errorMessage: defaultErrors["401"], retryMethod: (() => dispatch({type: ActionType.GET_SINGLE_REPOSITORY, payload: [bpmnRepositoryId] }))})
                        return;
                    case "403":
                        dispatch({type: UNHANDLEDERROR, errorMessage: defaultErrors["403"], retryMethod: (() => dispatch({type: ActionType.GET_SINGLE_REPOSITORY, payload: [bpmnRepositoryId] }))})
                        return;
                    case "404":
                        dispatch({type: UNHANDLEDERROR, errorMessage: defaultErrors["404"], retryMethod: (() => dispatch({type: ActionType.GET_SINGLE_REPOSITORY, payload: [bpmnRepositoryId] }))})
                        return;
                    case "409":
                        dispatch({type: HANDLEDERROR, errorMessage: error.response.data.message, retryMethod: (() => dispatch({type: ActionType.GET_SINGLE_REPOSITORY, payload: [bpmnRepositoryId] }))})
                        return;
                    default:
                        dispatch({type: UNHANDLEDERROR, errorMessage: `Error ${error.response.status}`, retryMethod: (() => dispatch({type: ActionType.GET_SINGLE_REPOSITORY, payload: [bpmnRepositoryId] }))})
                        return;

                }
            }
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
                dispatch({type: UNHANDLEDERROR, errorMessage: response.status + "" + JSON.stringify(response), retryMethod: (() => dispatch({type: ActionType.CREATE_REPOSITORY, payload: [bpmnRepositoryName, bpmnRepositoryDescription] }))})
            }
        } catch (error){
            if(error.response){
                switch(error.response.data.status) {
                    case "400":
                        dispatch({type: UNHANDLEDERROR, errorMessage: defaultErrors["400"], retryMethod: (() => dispatch({type: ActionType.CREATE_REPOSITORY, payload: [bpmnRepositoryName, bpmnRepositoryDescription] }))})
                        return;
                    case "401":
                        dispatch({type: UNHANDLEDERROR, errorMessage: defaultErrors["401"], retryMethod: (() => dispatch({type: ActionType.CREATE_REPOSITORY, payload: [bpmnRepositoryName, bpmnRepositoryDescription] }))})
                        return;
                    case "403":
                        dispatch({type: UNHANDLEDERROR, errorMessage: defaultErrors["403"], retryMethod: (() => dispatch({type: ActionType.CREATE_REPOSITORY, payload: [bpmnRepositoryName, bpmnRepositoryDescription] }))})
                        return;
                    case "404":
                        dispatch({type: UNHANDLEDERROR, errorMessage: defaultErrors["404"], retryMethod: (() => dispatch({type: ActionType.CREATE_REPOSITORY, payload: [bpmnRepositoryName, bpmnRepositoryDescription] }))})
                        return;
                    case "409":
                        dispatch({type: HANDLEDERROR, errorMessage: error.response.data.message, retryMethod: (() => dispatch({type: ActionType.CREATE_REPOSITORY, payload: [bpmnRepositoryName, bpmnRepositoryDescription] }))})
                        return;
                    default:
                        dispatch({type: UNHANDLEDERROR, errorMessage: `Error ${error.response.status}`, retryMethod: (() => dispatch({type: ActionType.CREATE_REPOSITORY, payload: [bpmnRepositoryName, bpmnRepositoryDescription] }))})
                        return;

                }
            }
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
                dispatch({type: UNHANDLEDERROR, errorMessage: response.status + "" + JSON.stringify(response), retryMethod: (() => dispatch({type: ActionType.UPDATE_REPOSITORY, payload: [bpmnRepositoryId, bpmnRepositoryName, bpmnRepositoryDescription] }))})
            }
        } catch (error){
            if(error.response){
                switch(error.response.data.status) {
                    case "400":
                        dispatch({type: UNHANDLEDERROR, errorMessage: defaultErrors["400"], retryMethod: (() => dispatch({type: ActionType.UPDATE_REPOSITORY, payload: [bpmnRepositoryId, bpmnRepositoryName, bpmnRepositoryDescription] }))})
                        return;
                    case "401":
                        dispatch({type: UNHANDLEDERROR, errorMessage: defaultErrors["401"], retryMethod: (() => dispatch({type: ActionType.UPDATE_REPOSITORY, payload: [bpmnRepositoryId, bpmnRepositoryName, bpmnRepositoryDescription] }))})
                        return;
                    case "403":
                        dispatch({type: UNHANDLEDERROR, errorMessage: defaultErrors["403"], retryMethod: (() => dispatch({type: ActionType.UPDATE_REPOSITORY, payload: [bpmnRepositoryId, bpmnRepositoryName, bpmnRepositoryDescription] }))})
                        return;
                    case "404":
                        dispatch({type: UNHANDLEDERROR, errorMessage: defaultErrors["404"], retryMethod: (() => dispatch({type: ActionType.UPDATE_REPOSITORY, payload: [bpmnRepositoryId, bpmnRepositoryName, bpmnRepositoryDescription] }))})
                        return;
                    case "409":
                        dispatch({type: HANDLEDERROR, errorMessage: error.response.data.message, retryMethod: (() => dispatch({type: ActionType.UPDATE_REPOSITORY, payload: [bpmnRepositoryId, bpmnRepositoryName, bpmnRepositoryDescription] }))})
                        return;
                    default:
                        dispatch({type: UNHANDLEDERROR, errorMessage: `Error ${error.response.status}`, retryMethod: (() => dispatch({type: ActionType.UPDATE_REPOSITORY, payload: [bpmnRepositoryId, bpmnRepositoryName, bpmnRepositoryDescription] }))})
                        return;

                }
            }
        }
    }
}