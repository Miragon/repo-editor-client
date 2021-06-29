import * as diagramAction from "./diagramAction";
import {
    deleteDiagram,
    fetchDiagramsFromRepo,
    fetchFavoriteDiagrams,
    fetchRecentDiagrams,
    searchDiagram,
    uploadDiagram
} from "./diagramAction";
import {
    createRepository,
    deleteRepository,
    fetchRepositories,
    getSingleRepository,
    updateRepository
} from "./repositoryAction";
import {searchUsers} from "./userAction";
import {createOrUpdateVersion, getAllVersions} from "./versionAction";
import {createOrUpdateUserAssignment, deleteAssignment, getAllAssignedUsers} from "./assignmentAction";

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
    DELETE_ASSIGNMENT,
    UPDATE_REPOSITORY,
    DELETE_REPOSITORY,
    SEARCH_DIAGRAM
}

export const actionMapper = (actionType: ActionType, payload: Array<any>) => {

    switch (actionType) {
        case ActionType.CREATE_DIAGRAM:
            return diagramAction.createDiagram(payload[0], payload[1], payload[2], payload[3]);

        case ActionType.FETCH_FAVORITE_DIAGRAMS:
            return fetchFavoriteDiagrams();

        case ActionType.FETCH_RECENT_DIAGRAMS:
            return fetchRecentDiagrams();

        case ActionType.FETCH_DIAGRAMS_FROM_REPO:
            return fetchDiagramsFromRepo(payload[0]);

        case ActionType.UPLOAD_DIAGRAM:
            return uploadDiagram(payload[0], payload[1], payload[2]);

        case ActionType.DELETE_DIAGRAM:
            return deleteDiagram(payload[0])

        case ActionType.FETCH_REPOSITORIES:
            return fetchRepositories();

        case ActionType.GET_SINGLE_REPOSITORY:
            return getSingleRepository(payload[0]);

        case ActionType.CREATE_REPOSITORY:
            return createRepository(payload[0], payload[1]);

        case ActionType.UPDATE_REPOSITORY:
            return updateRepository(payload[0], payload[1], payload[2]);

        case ActionType.SEARCH_USERS:
            return searchUsers(payload[0]);

        case ActionType.CREATE_OR_UPDATE_VERSION:
            return createOrUpdateVersion(payload[0], payload[1], payload[2], payload[3] ? payload[3] : "");

        case ActionType.GET_ALL_VERSIONS:
            return getAllVersions(payload[0]);

        case ActionType.GET_ALL_ASSIGNED_USERS:
            return getAllAssignedUsers(payload[0]);

        case ActionType.CREATE_OR_UPDATE_USER_ASSIGNMENT:
            return createOrUpdateUserAssignment(payload[0], payload[1], payload[2]);

        case ActionType.DELETE_ASSIGNMENT:
            return deleteAssignment(payload[0], payload[1])

        case ActionType.DELETE_REPOSITORY:
            return deleteRepository(payload[0])

        case ActionType.SEARCH_DIAGRAM:
            return searchDiagram(payload[0])

    }
}
