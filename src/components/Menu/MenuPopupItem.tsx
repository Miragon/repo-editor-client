import {makeStyles} from "@material-ui/core";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import React from "react";
import {createTestAttributes} from "../../util/TestUtils";

const useStyles = makeStyles(() => ({
    menuText: {
        fontWeight: 500
    },
    menuIcon: {
        minWidth: "32px"
    }
}));

interface Props {
    icon: React.ElementType;
    text: string;
    onClick: () => void;
    testId?: string;
}

const MenuPopupItem: React.FC<Props> = props => {
    const classes = useStyles();

    return (
        <MenuItem
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...createTestAttributes(props.testId)}
            dense
            onClick={props.onClick}>

            <ListItemIcon className={classes.menuIcon}>
                {React.createElement(props.icon, {
                    fontSize: "small"
                })}
            </ListItemIcon>

            <ListItemText
                classes={{primary: classes.menuText}}
                primary={props.text}/>

        </MenuItem>
    );
};

export default MenuPopupItem;
