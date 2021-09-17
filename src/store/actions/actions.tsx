import {
    addToFavorites,
    copyToRepo,
    createArtifact,
    deleteArtifact,
    getArtifact,
    updateArtifact,
} from "./artifactAction";
import {fetchRepositories, getManageableRepos, getSingleRepository, updateRepository} from "./repositoryAction";
import {createVersion, getAllVersions, getLatestVersion, getSingleVersion} from "./versionAction";

export enum ActionType {
    CREATE_ARTIFACT,
    FETCH_ARTIFACTS_FROM_REPO,
    DELETE_ARTIFACTS,
    FETCH_REPOSITORIES,
    GET_SINGLE_REPOSITORY,
    CREATE_OR_UPDATE_VERSION,
    GET_ALL_VERSIONS,
    UPDATE_REPOSITORY,
    UPDATE_ARTIFACT,
    LATEST_VERSION,
    FETCH_MENU_ITEMS,
    SET_STARRED,
    COPY_TO_REPO,
    GET_ALL_SHARED_ARTIFACTS,
    GET_MANAGEABLE_REPOS,
    GET_ARTIFACT,
    GET_SINGLE_VERSION
}

// eslint-disable-next-line
export const actionMapper = (actionType: ActionType, payload: Array<any>) => {
    switch (actionType) {
        case ActionType.CREATE_ARTIFACT:
            return createArtifact(payload[0], payload[1], payload[2], payload[3]);

        case ActionType.GET_SINGLE_VERSION:
            return getSingleVersion(payload[0], payload[1]);

        case ActionType.GET_ARTIFACT:
            return getArtifact(payload[0]);

        case ActionType.COPY_TO_REPO:
            return copyToRepo(payload[0], payload[1]);

        case ActionType.DELETE_ARTIFACTS:
            return deleteArtifact(payload[0]);

        case ActionType.FETCH_REPOSITORIES:
            return fetchRepositories();

        case ActionType.GET_MANAGEABLE_REPOS:
            return getManageableRepos();

        case ActionType.GET_SINGLE_REPOSITORY:
            return getSingleRepository(payload[0]);

        case ActionType.UPDATE_REPOSITORY:
            return updateRepository(payload[0], payload[1], payload[2]);

        case ActionType.CREATE_OR_UPDATE_VERSION:
            return createVersion(payload[0], payload[1], payload[2], payload[3] ? payload[3] : "");

        case ActionType.GET_ALL_VERSIONS:
            return getAllVersions(payload[0]);

        case ActionType.UPDATE_ARTIFACT:
            return updateArtifact(payload[0], payload[1], payload[2]);

        case ActionType.LATEST_VERSION:
            return getLatestVersion(payload[0]);

        case ActionType.SET_STARRED:
            return addToFavorites(payload[0]);
    }
};
