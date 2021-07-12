import {Drawer} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {FormatShapes, Help, Home, Widgets} from "@material-ui/icons";
import React, {useEffect} from "react";
import MenuSpacer from "../../Menu/MenuSpacer";
import DrawerApp from "./AppMenu/DrawerApp";
import {MenuItemTO} from "../../../api/models";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/reducers/rootReducer";
import {GRID_ROOT_CSS_CLASS_SUFFIX} from "@material-ui/data-grid";
import {fetchMenuItems} from "../../../store/actions/menuAction";
import HomeIcon from "@material-ui/icons/Home";
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
        marginTop: "56px",
        width: "350px",
        padding: "0px",
        height: "calc(100% - 56px)",
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
    const {t, i18n} = useTranslation("common");

    const apps: Array<MenuItemTO> = useSelector((state: RootState) => state.menuItems.menuItems);
    const menuSynced: boolean = useSelector((state: RootState) => state.dataSynced.menuSynced);

    useEffect(() => {
        if(!menuSynced){
            dispatch(fetchMenuItems());
        }
    }, [menuSynced, dispatch])

    const getIcon = (iconName: string): React.ElementType => {
        switch(iconName) {
            case "Home":
                return Home;
            case "Formulare":
                return FormatShapes;
            case "Integrationsbausteine":
                return Widgets;
            default:
                return Home;
        }
    }

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
                            active={app.name === "home"}
                            key={app.name}
                            title={t(app.name)}
                            icon={getIcon(app.name)}
                            onClick={() => window.open(`/${app.url}`, "_self")}/>
                    ))}

                    <MenuSpacer/>

                    <DrawerApp
                        dense
                        title="Support kontaktieren"
                        description="lhm.digitalwf@muenchen.de"
                        icon={Help}/>

                </div>

            </Drawer>
        </>
    );
};

export default AppMenu;
