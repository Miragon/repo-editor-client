import React, {Dispatch} from "react";
import {IconButton, makeStyles} from "@material-ui/core";
import {Replay} from "@material-ui/icons";
import {useDispatch} from "react-redux";

const useStyles = makeStyles(() => ({
    container: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        width: "100%",
        justifyContent: "space-between"
    },
    retryButton: {
        color: "white",
        selfAlign: "flex-end",
    }
}));

interface Props {
    errorMessage: string;
    retryMethod: any;
}


const Toast: React.FC<Props> = props => {
    const classes = useStyles();
    const dispatch = useDispatch();

    return (
    <div className={classes.container}>
        <p>
            {props.errorMessage}
        </p>
        <IconButton className={classes.retryButton} onClick={dispatch(props.retryMethod)}>
            <Replay/>
        </IconButton>
    </div>
    );
};

export default Toast;