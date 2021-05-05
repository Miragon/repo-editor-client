import {makeStyles, Theme} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import clsx from "clsx";
import React from "react";
import {createTestAttributes} from "../../util/TestUtils";

export interface Props {
    icon?: React.ElementType;
    iconRight?: React.ElementType;
    active?: boolean;
    grow?: boolean;
    label: string;
    tooltip?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    testId?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
    label: {
        textTransform: "none"
    },
    button: {
        transition: theme.transitions.create(["background-color", "border-color"]),
        borderWidth: "1px",
        margin: "0.25rem 0.5rem",
        borderColor: "white",
        color: "white",
        "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
            borderColor: "white",
            color: "white",
        }
    },
    buttonActive: {
        borderColor: "rgba(0, 0, 0, 0.87)",
        color: "white",
        backgroundColor: "rgba(0, 0, 0, 0.87)",
        pointerEvents: "none"
    },
    buttonGrow: {
        flexGrow: 1
    },
    tooltip: {
        backgroundColor: "rgba(0,0,0,0.87)"
    },
    arrow: {
        color: "rgba(0,0,0,0.87)"
    }
}));

const MenuButton: React.FC<Props> = props => {
    const classes = useStyles();

    const button = (
        <Button
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...createTestAttributes(props.testId)}
            color="primary"
            disableElevation
            variant="outlined"
            onClick={props.onClick}
            classes={{ label: classes.label }}
            startIcon={props.icon && React.createElement(props.icon)}
            endIcon={props.iconRight && React.createElement(props.iconRight)}
            className={clsx(
                classes.button,
                props.grow && classes.buttonGrow,
                props.active && classes.buttonActive,
                props.className
            )}>

            {props.label}

        </Button>
    );

    if (props.tooltip) {
        return (
            <Tooltip
                arrow
                placement="top"
                title={props.tooltip}
                classes={{ tooltip: classes.tooltip, arrow: classes.arrow }}>

                {button}

            </Tooltip>
        );
    }

    return button;
};

export default MenuButton;
