import React, {useCallback} from "react";
import {IconButton, makeStyles} from "@material-ui/core";
import {Replay} from "@material-ui/icons";
import {useDispatch} from "react-redux";
import * as actions from "../../store/actions/actions";
import {ActionType} from "../../store/actions/actions";
import {HANDLEDERROR} from "../../store/actions";

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
    retryMethod: ActionType;
    retryPayload: Array<any>;
}




const Toast: React.FC<Props> = props => {
    const classes = useStyles();
    const dispatch = useDispatch();


    const retry = useCallback(() => {
        dispatch({type: HANDLEDERROR, errorMessage: ""})


        dispatch(actions.actionMapper(props.retryMethod, props.retryPayload))
        console.log("dispatched retry")
    }, [dispatch, props])

    return (
    <div className={classes.container}>
        <p>
            {props.errorMessage}
        </p>
        <IconButton className={classes.retryButton} onClick={() => {
            retry()
        }}>
            <Replay/>
        </IconButton>
    </div>
    );
};

export default Toast;