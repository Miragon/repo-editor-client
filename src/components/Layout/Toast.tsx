import React, {useCallback} from "react";
import {IconButton, makeStyles} from "@material-ui/core";
import {Replay} from "@material-ui/icons";
import {useDispatch} from "react-redux";
import * as actions from "../../store/actions/actions";
import {ActionType} from "../../store/actions/actions";
import {UNHANDLEDERROR} from "../../store/constants";
import theme from "../../theme";

const useStyles = makeStyles(() => ({
    container: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        width: "100%",
    },
    retryButton: {
        color: theme.palette.secondary.contrastText,
        alignSelf: "flex-end",
        height: "25px",
        width: "25px"
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
            <div>
                {props.errorMessage}
            </div>
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
