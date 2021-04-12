import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import React from "react";

const useStyles = makeStyles(() => ({
    drawerAppContainer: {
        display: "flex",
        flexDirection: "row",
        padding: "8px",
        minWidth: "100%",
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
        marginLeft: "16px",
        marginRight: "24px"
    },
    drawerAppIconActive: {
        color: "#3c91b0"
    },
    drawerAppTitle: (props: Props) => ({
        textTransform: "none",
        fontSize: "1.1rem",
        textAlign: "left",
        marginBottom: props.dense ? 0 : "0.25rem"
    }),
    drawerAppTitleActive: {
        color: "#3c91b0",
        fontWeight: 600
    },
    drawerAppDescription: {
        fontSize: "0.85rem",
        fontWeight: 300,
        textTransform: "none",
        wordWrap: "break-word",
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

    const title = (
        <Typography
            className={clsx(
                classes.drawerAppTitle,
                props.active && classes.drawerAppTitleActive
            )}
            variant="body1">
            {props.title}
        </Typography>
    );

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

        </Button>
    );
};

export default DrawerApp;
