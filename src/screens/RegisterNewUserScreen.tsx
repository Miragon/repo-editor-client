import React, {useCallback, useEffect, useState} from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import LockIcon from "@material-ui/icons/Lock";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import {useHistory} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {UserApi} from "../api/api";
import helpers from "../constants/Functions";
import {SUCCESS, UNHANDLEDERROR} from "../store/constants";
import {RootState} from "../store/reducers/rootReducer";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://flowsquad.io">
                FlowSquad GmbH
            </Link>
            {", "}
            {new Date().getFullYear()}
            .
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    createUserProfilePage: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    createUserProfileContent: {
        width: "100%",
        maxWidth: "960px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingLeft: "30px",
        paddingRight: "30px",
        paddingTop: "20vh",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: "deeppink"
    },
    infoText: {
        textAlign: "center",
        fontSize: "15px",
        width: "100%",
        maxWidth: "500px",
    },
    form: {
        width: "100%",
        maxWidth: "500px",
        marginTop: theme.spacing(3),
    },
    confirmationCheckbox: {
        marginTop: "15px",
    },
    createUserProfileButton: {
        marginTop: "25px",
        marginBottom: "50px",
        backgroundColor: "#0bb538",
    },
}));

/**
 * Creates a FlowRepo User profile
 * if a User with a given oAuth key does not have one yet.
 */
const RegisterNewUserScreen: React.FC = () => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    const [userController] = useState<UserApi>(new UserApi());
    const [isButtonDisabled, setButtonDisabled] = useState<boolean>(true);

    const apiErrorState: string = useSelector((state: RootState) => state.api.errorMessage);
    const apiSuccessState: string = useSelector((state: RootState) => state.api.successMessage);

    useEffect(() => {
        if (apiErrorState) {
            toast.error(apiErrorState, { autoClose: 8000, pauseOnHover: true });
            dispatch({ type: UNHANDLEDERROR, errorMessage: "" });
        }
        if (apiSuccessState) {
            toast.success(apiSuccessState, { autoClose: 4000, pauseOnHover: true });
            dispatch({ type: SUCCESS, successMessage: "" });
        }
    }, [userController, dispatch, apiErrorState, apiSuccessState]);

    /**
     * Persist a new User-profile in the FlowRepo-backend
     */
    const handleCreateUserProfile = useCallback(async (): Promise<void> => {
        try {
            const config = helpers.getClientConfig();
            await userController.createUser(config);
            history.push("/");
        } catch (response) {
            toast.error("Could not persist the new User");
        }
    }, [history, userController]);

    return (
        <div className={classes.createUserProfilePage}>
            <div className={classes.createUserProfileContent}>
                <Avatar className={classes.avatar}>
                    <LockIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up for Miragon Cloud Services
                </Typography>

                <p className={classes.infoText}>
                    This is the first time you are trying to access Miragon Cloud Services.
                    <br />
                    To use this service you need an account.
                    To create a new account, choose a name and accept the Terms and Conditions.
                </p>

                <form className={classes.form} noValidate>

                    <FormControlLabel
                        className={classes.confirmationCheckbox}
                        control={(
                            <Checkbox
                                checked={!isButtonDisabled}
                                onClick={() => setButtonDisabled(!isButtonDisabled)}
                                value="allowExtraEmails"
                                color="primary" />
                        )}
                        label="I agree to the terms of service" />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.createUserProfileButton}
                        onClick={handleCreateUserProfile}
                        disabled={isButtonDisabled}>
                        Create a new User Profile
                    </Button>
                </form>
                <Copyright />
            </div>
            <ToastContainer />
        </div>
    );
};

export default RegisterNewUserScreen;
