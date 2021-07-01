import {Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import React from "react";

const useStyles = makeStyles(theme => ({
    drawerAppContainer: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "64px",
        color: "black",
        justifyContent: "flex-start",
        margin: "0px 0",
        "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.05)"
        }
    },
    drawerAppContainerActive: {
        backgroundColor: "rgba(0, 0, 0, 0.05) !important",
        "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.05) !important"
        }
    },
    drawerAppIcon: {
        marginLeft: "8px",
        marginRight: "0px",
        width: "32px",
        height: "32px",
        color: "rgba(0, 0, 0, 0.54)"
    },
    drawerAppIconActive: {
        color: theme.palette.secondary.main
    },
    drawerAppTitle: {
        color: "rgba(0, 0, 0, 0.87)",
        textTransform: "none",
        whiteSpace: "nowrap",
        fontSize: "1.1rem",
        textAlign: "left",
        marginLeft: "10px",
        top: "2px",
        fontWeight: 600
    },
    drawerAppTitleActive: {
        color: "rgba(0, 0, 0, 0.87)"
    },
    drawerAppDescription: {
        fontSize: "0.85rem",
        color: "rgba(0, 0, 0, 0.54)",
        textTransform: "none",
        wordWrap: "break-word",
        marginLeft: "10px",
        whiteSpace: "pre",
        textAlign: "left"
    },
    drawerAppDescriptionActive: {
        color: "rgba(0, 0, 0, 0.87)",
        fontWeight: 400
    },
    drawerText: {
        color: "rgba(0, 0, 0, 0.54)",
        display: "flex",
        paddingRight: "16px",
        paddingLeft: "10px",
        flexDirection: "column"
    }
}));

interface Props {
    title: string;
    description?: string;
    icon: React.ElementType;
    active?: boolean;
    dense?: boolean;
    onClick?: () => void;
}

const DrawerApp: React.FC<Props> = props => {
    const classes = useStyles(props);

    return (
        <Button
            onClick={props.onClick}
            className={clsx(
                classes.drawerAppContainer,
                props.active && classes.drawerAppContainerActive
            )}>

            {React.createElement(props.icon, {
                className: clsx(
                    classes.drawerAppIcon,
                    props.active && classes.drawerAppIconActive
                )
            })}
            <div className={classes.drawerText}>
                <div className={clsx(classes.drawerAppTitle,
                    props.active && classes.drawerAppTitleActive)}>
                    {props.title}
                </div>
                <div className={clsx(classes.drawerAppDescription,
                    props.active && classes.drawerAppDescriptionActive)}>
                    {props.description}
                </div>
            </div>
        </Button>
    );
};
//            <div className={classes.drawerAppDescription}>{props.description}</div>
/*
 Removed - was in front of button close tag
 {props.description && (
 <div className={classes.drawerText}>
 {title}
 <Typography
 className={clsx(
 classes.drawerAppDescription,
 props.active && classes.drawerAppDescriptionActive
 )}
 variant="body2">
 {props.description}
 </Typography>
 </div>
 )}

 {!props.description && title}

 */
export default DrawerApp;
