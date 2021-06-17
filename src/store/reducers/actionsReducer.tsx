import {CaseReducer} from "@reduxjs/toolkit";
import {
    createDiagram,
    createOrUpdateUserAssignment,
    createOrUpdateVersion,
    createRepository,
    deleteAssignment,
    deleteDiagram,
    fetchDiagramsFromRepo,
    fetchFavoriteDiagrams,
    fetchRecentDiagrams,
    fetchRepositories,
    getAllAssignedUsers,
    getAllVersions,
    getSingleRepository,
    searchUsers,
    uploadDiagram
} from "../actions";
import {ActionType} from "../actions/actions";

const initialState = {
    payload: Array<any>()
}

const reducer: CaseReducer = (state=  initialState, action) => {
    switch (action.type) {

        case ActionType.FETCH_FAVORITE_DIAGRAMS:
            fetchFavoriteDiagrams();
            return;

        case ActionType.FETCH_RECENT_DIAGRAMS:
            fetchRecentDiagrams();
            return;

        case ActionType.CREATE_DIAGRAM:
            createDiagram(action.payload[0], action.payload[1], action.payload[2], action?.payload[3]);
            return;

        case ActionType.FETCH_DIAGRAMS_FROM_REPO:
            fetchDiagramsFromRepo(action.payload[0]);
            return;

        case ActionType.UPLOAD_DIAGRAM:
            uploadDiagram(action.payload[0], action.payload[1], action.payload[2]);
            return;

        case ActionType.DELETE_DIAGRAM:
            deleteDiagram(action.payload[0], action.payload[1])
            return;

        case ActionType.FETCH_REPOSITORIES:
            fetchRepositories();
            return;

        case ActionType.GET_SINGLE_REPOSITORY:
            getSingleRepository(action.payload[0]);
            return;

        case ActionType.CREATE_REPOSITORY:
            createRepository(action.payload[0], action.payload[1]);
            return;

        case ActionType.SEARCH_USERS:
            searchUsers(action.payload[0]);
            return;

        case ActionType.CREATE_OR_UPDATE_VERSION:
            createOrUpdateVersion(action.payload[0], action.payload[1], action.payload[2], action?.payload[3]);
            return;

        case ActionType.GET_ALL_VERSIONS:
            getAllVersions(action.payload[0], action.payload[1]);
            return;

        case ActionType.GET_ALL_ASSIGNED_USERS:
            getAllAssignedUsers(action.payload[0]);
            return;

        case ActionType.CREATE_OR_UPDATE_USER_ASSIGNMENT:
            createOrUpdateUserAssignment(action.payload[0], action.payload[1], action?.payload[2]);
            return;

        case ActionType.DELETE_ASSIGNMENT:
            deleteAssignment(action.payload[0], action.payload[1])
    }
}

export default reducer;