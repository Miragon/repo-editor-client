import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import { NavLink } from "react-router-dom";
import MenuButton, { Props as MenuButtonProps } from "./MenuButton";

interface Props extends MenuButtonProps {
    target: string;
    exact?: boolean;
    activeClassName?: string;
    buttonClassName?: string;
}

const useStyles = makeStyles(() => ({
    navLink: {
        textDecoration: "none"
    },
    activeNavLink: {
        "&>button": {
            backgroundColor: "black",
            color: "white",
            "&:hover": {
                backgroundColor: "#333",
                color: "white"
            }
        }
    }
}));

const MenuNavButton: React.FC<Props> = props => {
    const classes = useStyles();
    const {
        className,
        buttonClassName,
        activeClassName,
        ...buttonProps
    } = props;

    return (
        <NavLink
            to={props.target}
            exact={props.exact}
            className={clsx(classes.navLink, className)}
            activeClassName={clsx(classes.activeNavLink, activeClassName)}>

            <MenuButton
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...buttonProps}
                className={buttonClassName} />

        </NavLink>
    );
};

export default MenuNavButton;
