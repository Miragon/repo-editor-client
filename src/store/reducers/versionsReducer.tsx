import {CaseReducer} from "@reduxjs/toolkit";
import {ArtifactVersionTO} from "../../api";
import {GET_VERSION, LATEST_VERSION} from "../../constants/Constants";

const initialState = {
    activeVersions: Array<ArtifactVersionTO>(),
    version: null,
    latestVersion: null,
    defaultVersionProps: null,
    versionProps: null
};

const reducer: CaseReducer = (state = initialState, action) => {
    switch (action.type) {
        case LATEST_VERSION:
            return {
                ...state,
                latestVersion: action.latestVersion
            }
        case GET_VERSION:
            return {
                ...state,
                version: action.version
            }
    }
    return state;
};

export default reducer;
