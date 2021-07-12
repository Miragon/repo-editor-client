import {MenuItemTO} from "../../api/models";
import {CaseReducer} from "@reduxjs/toolkit";
import {MENU_ITEMS} from "../constants";

const initalState = {
    menuItems: Array<MenuItemTO>()
}

const reducer: CaseReducer = (state = initalState, action) => {
    switch (action.type) {
        case MENU_ITEMS:
            return {
                ...state,
                menuItems: action.menuItems
            }
    }
    return state;
};

export default reducer;