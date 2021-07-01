import React, {useCallback} from "react";
import {IconButton, makeStyles} from "@material-ui/core";
import {Replay} from "@material-ui/icons";
import {useDispatch} from "react-redux";
import * as actions from "../../store/actions/actions";
import {ActionType} from "../../store/actions/actions";
import {UNHANDLEDERROR} from "../../store/constants";

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    retryPayload: Array<any>;
}

const Toast: React.FC<Props> = props => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const retry = useCallback(() => {
        dispatch({type: UNHANDLEDERROR, errorMessage: ""});
        dispatch(actions.actionMapper(props.retryMethod, props.retryPayload));
    }, [dispatch, props]);

    return (
        <div className={classes.container}>
            <p>
                {props.errorMessage}
            </p>
            <IconButton
                className={classes.retryButton}
                onClick={() => {
                    retry();
                }}>
                <Replay/>
            </IconButton>
        </div>
    );
};

export default Toast;
