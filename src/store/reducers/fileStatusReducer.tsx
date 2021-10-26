import {CaseReducer} from "@reduxjs/toolkit";


export const LOCKED = "LOCKED";
export const READYTOLOCK = "READYTOLOCK";
export const READONLY = "READONLY"
export const READYTOEDIT = "READYTOEDIT";
export const SAVED = "SAVED";
export const SAVING = "SAVING";
export const SAVEERROR = "SAVEERROR";
export const DEPLOYED = "DEPLOYED";

const initialState = {
    info: "",
    status: "readOnly",
}

const reducer: CaseReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOCKED:
            return {
                ...state,
                info: "fileStatus.locked",
                status: "locked",
            }
        case READYTOLOCK:
            return {
                ...state,
                info: "fileStatus.readyToLock",
                status: "readyToLock",
            }
        case READONLY:
            return {
                ...state,
                info: "fileStatus.readOnly",
                status: "readOnly",
            }
        case READYTOEDIT:
            return {
                ...state,
                info: "fileStatus.readyToEdit",
                status: "readyToEdit",
            }
        case SAVEERROR:
            return {
                ...state,
                info: "fileStatus.saveError",
                status: "saveError"
            }
        case SAVED:
            return {
                ...state,
                info: "fileStatus.saved",
                status: "saved"
            }
        case SAVING:
            return {
                ...state,
                info: "fileStatus.saving",
                status: "saving"
            }
        case DEPLOYED:
            return {
                ...state,
                info: "fileStatus.deployed",
                status: "deployed"
            }
    }
    return state;
}


export default reducer;
