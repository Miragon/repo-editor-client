import {ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper} from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import {makeStyles} from "@material-ui/styles";
import theme from "../../theme";
import {DropdownButtonItem} from "./DropdownButton";

const useStyles = makeStyles(() => ({
    popupContainer: {
        zIndex: 1000
    },
    popup: {
        borderTopLeftRadius: "0px",
        borderTopRightRadius: "0px",
        backgroundColor: theme.palette.secondary.main,
    },
    list: {
        outline: "none"
    },
    menuItem: {
        color: theme.palette.secondary.contrastText,
        fontSize: theme.typography.button.fontSize,
        fontWeight: theme.typography.button.fontWeight,
        "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.1)"
        }
    },
    menuItemDivider: {
        height: "1px",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        opacity: "1 !important",
        marginTop: "0.25rem",
        marginBottom: "0.25rem",
        padding: 0
    },
}));


interface Props {
    open: boolean;
    reference: HTMLButtonElement | null;
    onCancel: () => void;
    options: Array<DropdownButtonItem>;

}

const PopupSettings: React.FC<Props> = ((props: Props) => {
    const classes = useStyles();


    return (
        <>
            <Popper
                open={props.open}
                anchorEl={props.reference}
                role={undefined}
                transition
                disablePortal
                className={classes.popupContainer}>
                {({ TransitionProps }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: "top" }}>
                        <Paper className={classes.popup}>
                            <ClickAwayListener onClickAway={() => props.onCancel()}>
                                <MenuList className={classes.list}>
                                    {props.options.map(option => (
                                        <MenuItem
                                            key={option.id}
                                            disabled={option.disabled || option.type !== "button"}
                                            className={clsx(
                                                classes.menuItem,
                                                option.type === "divider" && classes.menuItemDivider
                                            )}
                                            onClick={() => {
                                                if (option.onClick) {
                                                    option.onClick();
                                                } else {
                                                    console.log("No Action provided")
                                                }
                                                props.onCancel();
                                            }}>
                                            {(option.label)}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    );
})

export default PopupSettings;