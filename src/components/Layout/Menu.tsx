import {IconButton} from "@material-ui/core";
import {makeStyles, Theme} from "@material-ui/core/styles";
import {Menu as MenuIcon} from "@material-ui/icons";
import clsx from "clsx";
import React from "react";
import logo from "../../img/logo.png";
import MenuBar from "../Menu/MenuBar";
import AppMenu from "./Menu/AppMenu";

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
    icon: {
        height: "40px",
        margin: "0 auto",
    },
    menuIcon: {
        color: "white"
    },
    menu: {
        transition: theme.transitions.create("padding")
    },
    menuOpen: {
        paddingLeft: "350px"
    }
}));

const Menu: React.FC<Props> = props => {
    const classes = useStyles();

    return (
        <>
            <MenuBar className={clsx(classes.menu, props.open && classes.menuOpen)}>
                <IconButton
                    size="small"
                    disableRipple
                    className={classes.menuIcon}
                    onClick={() => props.setOpen(!props.open)}>
                    <MenuIcon/>
                </IconButton>
                <img
                    alt="Logo"
                    className={classes.icon}
                    src={logo}/>
            </MenuBar>

            <AppMenu open={props.open}/>
        </>
    );
};

export default Menu;
