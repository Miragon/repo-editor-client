import {Drawer} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {FormatShapes, Help, Home, Widgets} from "@material-ui/icons";
import React from "react";
import MenuSpacer from "../../Menu/MenuSpacer";
import DrawerApp from "./AppMenu/DrawerApp";

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
        marginTop: "64px",
        width: "350px",
        padding: "0px",
        height: "calc(100% - 64px)",
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

    return (
        <>

            <Drawer
                classes={{paper: classes.drawerPaper}}
                variant="persistent"
                anchor="left"
                open={props.open}>

                <div className={classes.drawerContent}>

                    <DrawerApp
                        active
                        title="Modellverwaltung"
                        onClick={() => window.open("/", "_self")}
                        icon={Home}/>

                    <DrawerApp
                        title="Formulare"
                        onClick={() => window.open("/formulare", "_self")}
                        icon={FormatShapes}/>

                    <DrawerApp
                        title="Integrationsbausteine"
                        onClick={() => window.open("/bausteine", "_self")}
                        icon={Widgets}/>

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
