import {makeStyles} from "@material-ui/core/styles";
import React from "react";
import {useHistory} from "react-router-dom";
import BetaBadge from "../Menu/BetaBadge";
import MenuBar from "../Menu/MenuBar";
import MenuLogo from "../Menu/MenuLogo";
import AppMenu from "./Menu/AppMenu";

const useStyles = makeStyles({
    menuComponent: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#3c91b0",
        paddingLeft: "30px",
        paddingRight: "30px",
    },
    menu: {
        height: "100%",
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: "960px",
        margin: "0 auto"
    },
    userIcon: {
        position: "absolute",
        cursor: "pointer",
        right: "5%",
        color: "white",
        height: "28px"
    },
    spacer: {
        flexGrow: 1
    }
});

const Menu: React.FC = () => {

    const classes = useStyles();
    const history = useHistory();

    return (
        <MenuBar>

            <AppMenu />

            <div className={classes.menu}>

                <MenuLogo onClick={() => history.push("/")} />

                <BetaBadge />

            </div>

        </MenuBar>
    );
}

export default Menu;
