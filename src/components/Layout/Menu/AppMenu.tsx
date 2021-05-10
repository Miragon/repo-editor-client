import {useAuth0} from "@auth0/auth0-react";
import {Drawer} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {AccountCircle, Add, Apartment, BarChart, Brush, Help, PowerSettingsNew, Widgets} from "@material-ui/icons";
import React, {useCallback, useRef, useState} from "react";
import MenuSpacer from "../../Menu/MenuSpacer";
import DrawerApp from "./AppMenu/DrawerApp";
import DrawerDivider from "./AppMenu/DrawerDivider";
//Drawerpaper: 84px breit
const useStyles = makeStyles((theme) => ({
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
        width: "65px",
        padding: "0px",
        background: theme.palette.primary.main,
        overflow: "hidden",
        transition: "width .3s",
        "&:hover": {
            width: "400px"
        }
    },

    drawerBackdrop: {
        backgroundColor: "rgba(0, 0, 0, 0)"
    },
    drawerTitle: {
        margin: "2.5rem 13px 0 13px",
        fontSize: "1.5rem",
        fontWeight: 600,

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

const AppMenu: React.FC = () => {
    const classes = useStyles();

    const [open, setOpen] = useState(true);
    const [showContent, setShowContent] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);
    const handleClose = useCallback((event: React.MouseEvent<EventTarget>) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }

        setOpen(false);
    }, []);

    const { logout, user } = useAuth0();

    const getContent = (content: string) => {
        if(showContent){
            return content
        }
        else{
            return ""
        }
    }
    return (
        <>


            <Drawer
                classes={{ paper: classes.drawerPaper }}
                variant={"permanent"}
                BackdropProps={{
                    className: classes.drawerBackdrop
                }}
                anchor="left"
                open={open}
                onMouseOver={() => setShowContent(true)}
                onMouseOut={() => setShowContent(false)}
                onClose={handleClose}>


                <div className={classes.drawerContent}>

                    <DrawerApp

                        title={getContent("Building Blocks")}
                        onClick={() => window.open("https://modeler.miragon.cloud/", "_self")}
                        description={getContent("View, create, and edit BPMN and DMN models")}
                        icon={Brush} />

                    <DrawerApp title={getContent("New Diagram")}
                               onClick={() => window.open("https://modeler.miragon.cloud/", "_blank")}
                               description={getContent("Create a new BPMN diagram")}
                               icon={Add} />

                    <DrawerApp
                        active
                        title={getContent("FlowCov")}
                        onClick={() => window.open("https://flowcov.miragon.cloud/", "_self")}
                        description={getContent("Track the coverage of your process models")}
                        icon={BarChart} />

                    <DrawerApp
                        title={getContent("Diagrams")}
                        onClick={() => window.open("https://blocks.miragon.cloud/", "_blank")}
                        description={getContent("Create shared element templates")}
                        icon={Widgets} />

                    <MenuSpacer />

                    <DrawerApp
                        dense
                        title={getContent("Contact Support")}
                        description={getContent("info@flowsquad.io")}
                        icon={Help} />

                    <DrawerDivider />

                    <DrawerApp
                        dense
                        title={getContent("Your Account")}
                        description={getContent(user.email)}
                        icon={AccountCircle} />

                    <DrawerApp
                        title={getContent("Your Organization")}
                        icon={Apartment} />

                    <DrawerDivider />

                    <DrawerApp
                        dense
                        title={getContent("Sign Out")}
                        description={getContent(user.email)}
                        onClick={logout}
                        icon={PowerSettingsNew} />

                </div>

            </Drawer>
        </>
    );
};

/*
before drawercontent div:


                <Typography
                    className={classes.drawerTitle}
                    variant="h1">
                    miragon.cloud
                </Typography>

                <Typography
                    className={classes.drawerSubtitle}
                    variant="h2">
                    {user.email}
                </Typography>
 */

export default AppMenu;
