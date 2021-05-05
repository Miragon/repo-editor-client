import {Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import React from "react";

const useStyles = makeStyles(() => ({
    drawerAppContainer: {
        display: "flex",
        flexDirection: "row",
        padding: "8px",
        minWidth: "25px",
        height: "80px",
        justifyContent: "flex-start",
        margin: "4px 0"
    },
    drawerAppContainerActive: {
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.1) !important"
        }
    },
    drawerAppIcon: {
        marginLeft: "4px",
        marginRight: "0px",
        width: "32px",
        height: "32px"
    },
    drawerAppIconActive: {
        color: "#3c91b0"
    },
    drawerAppTitle: {
        textTransform: "none",
        whiteSpace: "nowrap",
        fontSize: "1.1rem",
        textAlign: "left",
        marginLeft: "10px",
        top: "2px"
    },
    drawerAppTitleActive: {
        color: "#3c91b0",
        fontWeight: 600
    },
    drawerAppDescription: {
        fontSize: "0.85rem",
        fontWeight: 300,
        textTransform: "none",
        wordWrap: "break-word",
        marginLeft: "10px",
        whiteSpace: "pre",
        textAlign: "left"
    },
    drawerAppDescriptionActive: {
        color: "#3c91b0",
        fontWeight: 400
    },
    drawerText: {
        display: "flex",
        paddingRight: "16px",
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
            <div className={classes.drawerAppTitle}>{props.title}</div>
                <div className={classes.drawerAppDescription}>{props.description}</div>
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
