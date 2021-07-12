import {Dispatch} from "@reduxjs/toolkit";
import * as api from "../../api/api";
import helpers from "../../constants/Functions";
import {MENU_ITEMS, UNHANDLEDERROR} from "../constants";
import {handleError} from "./errorAction";
import {ActionType} from "./actions";


export const fetchMenuItems = () => {
    return async (dispatch: Dispatch): Promise<void> => {
        const menuController = new api.MenuApi();
        try {
            const config = helpers.getClientConfig();
            const response = await menuController.getAllMenuItems(config);
            if(Math.floor(response.status / 100) === 2) {
                dispatch({type: MENU_ITEMS, menuItems: response.data})
            } else{
                dispatch({type: UNHANDLEDERROR, errorMessage: "could not process request"});
            }
        }
        catch (error) {
            dispatch(handleError(error, ActionType.FETCH_MENU_ITEMS, []));
        }
    }
}