import {CaseReducer} from "@reduxjs/toolkit";
import {ArtifactTypeTO} from "../../api";
import {ACTIVEARTIFACT, FILETYPES,} from "../../constants/Constants";

const initialState = {
    artifact: null,
    fileTypes: Array<ArtifactTypeTO>(),
};

const reducer: CaseReducer = (state = initialState, action) => {
    switch (action.type) {
        case FILETYPES:
            return {
                ...state,
                fileTypes: action.fileTypes
            }
        case ACTIVEARTIFACT:
            return {
                ...state,
                artifact: action.artifact
            }

    }
    return state;
};

export default reducer;
