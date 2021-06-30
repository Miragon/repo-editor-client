import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles(() => ({
    divider: {
        height: "1px",
        margin: "0.5rem -21px",
        backgroundColor: "#CCC",
    }
}));

const DrawerDivider: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.divider} />
    );
};

export default DrawerDivider;
