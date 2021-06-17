import {CaseReducer} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import {createDiagram} from "./diagramAction";

export enum ActionType {
    FETCH_FAVORITE_DIAGRAMS,
    FETCH_RECENT_DIAGRAMS,
    CREATE_DIAGRAM,
    FETCH_DIAGRAMS_FROM_REPO,
    UPLOAD_DIAGRAM,
    DELETE_DIAGRAM,
    FETCH_REPOSITORIES,
    GET_SINGLE_REPOSITORY,
    CREATE_REPOSITORY,
    SEARCH_USERS,
    CREATE_OR_UPDATE_VERSION,
    GET_ALL_VERSIONS,
    GET_ALL_ASSIGNED_USERS,
    CREATE_OR_UPDATE_USER_ASSIGNMENT,
    DELETE_ASSIGNMENT
}


