import {CaseReducer} from "@reduxjs/toolkit";
import {unlockArtifact} from "../actions";


export const LOCKED = "LOCKED";
export const READYTOLOCK = "READYTOLOCK";
export const READONLY = "READONLY"
export const READYTOEDIT = "READYTOEDIT";

const initialState = {
    info: "",
    status: "readOnly",
    action: () => console.log("No Action"),
}

const reducer: CaseReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOCKED:
            return {
                ...state,
                info: "fileStatus.locked",
                status: "locked",
                action: () => unlockArtifact,
            }
        case READYTOLOCK:
            return {
                ...state,
                info: "fileStatus.readyToLock",
                status: "readyToLock",
                action: () => unlockArtifact,
            }
        case READONLY:
            return {
                ...state,
                info: "fileStatus.readOnly",
                status: "readOnly",
                action: () => unlockArtifact,
            }
        case READYTOEDIT:
            return {
                ...state,
                info: "fileStatus.readyToEdit",
                status: "readyToEdit",
                action: () => unlockArtifact,
            }
    }
    return state;
}


export default reducer;

/*
 1. EditroContainer sendet request
 2. im EditorContainer wird eine action dispatched, die den status der datei meldet
 3.

 */