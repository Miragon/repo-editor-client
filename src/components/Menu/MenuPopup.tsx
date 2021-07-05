import {makeStyles, Theme} from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import clsx from "clsx";
import React, {useState} from "react";
import {createTestAttributes} from "../../util/TestUtils";
import MenuButton, {Props as MenuButtonProps} from "./MenuButton";

interface Props extends Omit<MenuButtonProps, "onClick" | "className" | "testId"> {
    popup: React.ReactNode;
    menuButtonClassName?: string;
    paperClassName?: string;
    testIdButton?: string;
    testIdPopup?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
    backdrop: {
        backdropFilter: "blur(1px)",
        zIndex: theme.zIndex.appBar + 1,
        backgroundColor: "rgba(0, 0, 0, 0.15)",
        transition: theme.transitions.create("background-color")
    },
    menu: {
        zIndex: theme.zIndex.appBar + 2
    },
    paper: {
        padding: "12px 0px 8px 0px",
        borderTopRightRadius: "0px",
        transform: "translateY(-1px) !important"
    },
    buttonActive: {
        borderColor: "white",
        color: "rgba(0, 0, 0, 0.87)",
        backgroundColor: "white",
        pointerEvents: "none",
        zIndex: theme.zIndex.appBar + 2,
        boxShadow: theme.shadows[4],
        borderRadius: "4px 4px 0px 0px"
    }
}));

const MenuPopup: React.FC<Props> = props => {
    const classes = useStyles();

    const {
        popup,
        iconRight,
        paperClassName,
        menuButtonClassName,
        testIdButton,
        testIdPopup,
        ...menuButtonProps
    } = props;

    const [anchor, setAnchor] = useState<Element | undefined>(undefined);

    return (
        <>
            <Backdrop
                open={!!anchor}
                onClick={() => setAnchor(undefined)}
                className={classes.backdrop}/>

            <MenuButton
                testId={testIdButton}
                iconRight={iconRight || ArrowDropDown}
                className={clsx(!!anchor && classes.buttonActive, menuButtonClassName)}
                onClick={e => setAnchor(e.currentTarget)}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...menuButtonProps} />

            <Popper
                disablePortal
                transition
                open={!!anchor}
                anchorEl={anchor}
                className={classes.menu}
                placement="bottom-end">

                {({TransitionProps}) => (
                    <Grow
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        {...TransitionProps}
                        style={{transformOrigin: "right top"}}>

                        <Paper
                            // eslint-disable-next-line react/jsx-props-no-spreading
                            {...createTestAttributes(testIdPopup)}
                            className={clsx(classes.paper, paperClassName)}
                            elevation={4}>

                            <ClickAwayListener onClickAway={() => setAnchor(undefined)}>

                                {popup}

                            </ClickAwayListener>

                        </Paper>

                    </Grow>
                )}

            </Popper>
        </>
    );
};

export default MenuPopup;
