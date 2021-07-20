import {Drawer} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import React, {useEffect} from "react";
import MenuSpacer from "../../Menu/MenuSpacer";
import DrawerApp from "./AppMenu/DrawerApp";
import {MenuItemTO} from "../../../api/models";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/reducers/rootReducer";
import {fetchMenuItems} from "../../../store/actions/menuAction";
import {useTranslation} from "react-i18next";

const useStyles = makeStyles(theme => ({
    button: {
        textTransform: "none",
        fontFamily: "Arial",
        fontSize: "0.9rem",
        margin: "0 0.5rem",
        minWidth: 0,
        height: "28px",
        width: "28px",
        color: "white"
    },
    activeButton: {
        color: "black"
    },
    hiddenTitle: {
        display: "none"
    },
    drawerPaper: {
        marginTop: "75px",
        width: "350px",
        padding: "0px",
        height: "calc(100% - 75px)",
        background: "white",
        overflow: "hidden"
    },
    drawerTitle: {
        margin: "2.5rem 13px 0 13px",
        fontSize: "1.5rem",
        fontWeight: 600
    },
    drawerSubtitle: {
        margin: "0.5rem 13px 1.5rem 13px",
        fontSize: "1.2rem",
        fontWeight: 300
    },
    drawerContent: {
        display: "flex",
        flexDirection: "column",
        flexGrow: 1
    }
}));

interface Props {
    open: boolean;
}

const AppMenu: React.FC<Props> = props => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {t} = useTranslation("common");

    const apps: Array<MenuItemTO> = useSelector((state: RootState) => state.menuItems.menuItems);
    const menuSynced: boolean = useSelector((state: RootState) => state.dataSynced.menuSynced);

    useEffect(() => {
        if (!menuSynced) {
            dispatch(fetchMenuItems());
        }
    }, [menuSynced, dispatch])

    return (
        <>
            <Drawer
                classes={{paper: classes.drawerPaper}}
                variant="persistent"
                anchor="left"
                open={props.open}>

                <div className={classes.drawerContent}>
                    {apps?.map(app => (
                        <DrawerApp
                            active={app.name === "Home"}
                            key={app.name}
                            title={t(app.name)}
                            icon={app.icon}
                            onClick={() => window.open(`/${app.url}`, "_self")}/>
                    ))}
                    <MenuSpacer/>
                </div>
            </Drawer>
        </>
    );
};

export default AppMenu;
