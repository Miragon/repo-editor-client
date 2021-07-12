import {Dispatch} from "@reduxjs/toolkit";
import * as api from "../../api/api";
import {DeploymentTO} from "../../api/models";
import helpers from "../../constants/Functions";
import {SUCCESS, UNHANDLEDERROR} from "../constants";
import {handleError} from "./errorAction";
import {ActionType} from "./actions";


export const deployVersion = (target: string, diagramId: string, versionId: string) => {
    return async (dispatch: Dispatch): Promise<void> => {
        const deploymentController = new api.DeploymentApi();
        try {
            const deploymentTO: DeploymentTO = {
                target
            };
            const config = helpers.getClientConfig();
            const response = await deploymentController.deployVersion(deploymentTO, diagramId, versionId);
            if (Math.floor(response.status / 100) === 2) {
                dispatch({ type: SUCCESS, successMessage: "Deployed Version" });
            } else {
                dispatch({ type: UNHANDLEDERROR, errorMessage: "Could not process request" });
            }
        } catch (error) {
            dispatch(handleError(error, ActionType.DEPLOY_VERSION, [
                target, diagramId, versionId
            ]));
        }
    };
};