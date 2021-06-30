import { makeStyles } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { UserControllerApi } from "../../api";
import helpers from "../../constants/Functions";
import RegisterNewUserScreen from "../../screens/RegisterNewUserScreen";
import { CURRENT_USER_INFO, SUCCESS, UNHANDLEDERROR } from "../../store/constants";
import { RootState } from "../../store/reducers/rootReducer";
import Menu from "./Menu";
import Router from "./Router";
import Toast from "./Toast";

const useStyles = makeStyles((theme: Theme) => ({
    contentWrapper: {
        flexGrow: 1,
        display: "flex",
        paddingLeft: "32px",
        transition: theme.transitions.create("margin")
    },
    contentWrapperShift: {
        marginLeft: "350px"
    },
    content: {
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
        maxHeight: "calc(100vh - 60px)",
        padding: "40px 16px",
        maxWidth: "1232px",
        margin: "0 auto"
    },
    loadingScreen: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        width: "100%",
        paddingTop: "40vh",
    },
    loadingCircle: {
        color: "green",
    }
}));

/**
 * Diese Komponente erzeugt das Layout auf oberster Ebene der Anwendung.
 * Es enthält sowohl das Menü als auch sämtlichen Inhalt der Anwendung. + Toasts für
 * Fehlgeschlagene bzw. erfolgreiche API calls Die primäre Aufgabe des Layouts ist die einheitliche
 * Darstellung des globalen Menüs sowie das Routing.
 *
 * Die Komponente bietet keine Anpassungsmöglichkeiten und besitzt
 * keine Parameter.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Layout = (): any => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const apiErrorState = useSelector((state: RootState) => state.api.errorMessage);
    const apiErrorRetryMethod = useSelector((state: RootState) => state.api.retryMethod);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const apiErrorRetryPayload = useSelector((state: RootState) => state.api.retryPayload);
    const apiSuccessState = useSelector((state: RootState) => state.api.successMessage);

    useEffect(() => {
        if (apiErrorState) {
            // toast can contain any component, the Retry Method (and the message: apiErrorState)
            // has to be passed here
            toast.error(<Toast
                errorMessage={apiErrorState}
                retryMethod={apiErrorRetryMethod}
                retryPayload={apiErrorRetryPayload} />, {
                autoClose: 8000,
                pauseOnHover: true,
                role: "alert"
            });
            dispatch({ type: UNHANDLEDERROR, errorMessage: "" });
        }
        if (apiSuccessState) {
            toast.success(apiSuccessState, { autoClose: 4000, pauseOnHover: true });
            dispatch({ type: SUCCESS, successMessage: "" });
        }
    }, [apiErrorState, apiSuccessState, apiErrorRetryMethod, apiErrorRetryPayload, dispatch]);

    const classes = useStyles();
    const [userController] = useState<UserControllerApi>(new UserControllerApi());

    const [userDoesExist, setUserDoesExist] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        const config = helpers.getClientConfig();
        userController.getUserInfo(config)
            .then(response => {
                if (response.data) {
                    setUserDoesExist(true);
                    dispatch({ type: CURRENT_USER_INFO, currentUserInfo: response.data });
                } else {
                    setUserDoesExist(false);
                }
            })
            .catch(() => setUserDoesExist(false));
    }, [userController, dispatch]);

    if (userDoesExist === undefined) {
        return null;
    }

    if (!userDoesExist) {
        return <RegisterNewUserScreen />;
    }

    return (
        <>
            <Menu
                open={open}
                setOpen={setOpen} />
            <div className={clsx(
                open && classes.contentWrapperShift,
                classes.contentWrapper
            )}>
                <div className={classes.content}>
                    <Router />
                    <ToastContainer />
                </div>
            </div>
        </>
    );
};

export default Layout;
