import {makeStyles} from "@material-ui/core";
import {Theme} from "@material-ui/core/styles";
import clsx from "clsx";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {toast, ToastContainer} from "react-toastify";
import {ArtifactApi, UserApi} from "../../api";
import helpers from "../../util/helperFunctions";
import RegisterNewUserScreen from "../../screens/RegisterNewUserScreen";
import {RootState} from "../../store/reducers/rootReducer";
import Menu from "./Menu";
import Router from "./Router";
import Toast from "./Toast";
import {useTranslation} from "react-i18next";
import theme from "../../theme";
import {ActionType} from "../../store/actions/actions";
import {CURRENT_USER_INFO, FILETYPES, HANDLEDERROR, SUCCESS} from "../../constants/Constants";

const useStyles = makeStyles((theme: Theme) => ({
    contentWrapper: {
        flexGrow: 1,
        display: "flex",
        maxHeight: "calc(100vh - 60px)",
        overflowY: "auto"
    },
    content: {
        display: "flex",
        flexGrow: 1,
        padding: "2rem 0",
        flexDirection: "column",
        maxWidth: "960px",
        margin: "0 auto"
    },

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
    const [open, setOpen] = useState(true);
    const [t, i18n] = useTranslation("common");
    const dispatch = useDispatch();


    const apiErrorState = useSelector((state: RootState) => state.api.errorMessage);
    const apiErrorStateWithVariables: Record<string, string> = useSelector((state: RootState) => state.api.errorMessageWithVariables)
    const apiErrorRetryMethod = useSelector((state: RootState) => state.api.retryMethod);
    const apiErrorRetryPayload = useSelector((state: RootState) => state.api.retryPayload);
    const apiSuccessState: string = useSelector((state: RootState) => state.api.successMessage);
    const apiSuccessStateWithVariables: Record<string, string> = useSelector((state: RootState) => state.api.successMessageWithVariables);

    useEffect(() => {
        if (apiErrorState) {
            toast(<Toast
                isError={true}
                errorMessage={i18n.exists(apiErrorState) ? t(apiErrorState) : apiErrorState}
                retryMethod={apiErrorRetryMethod}
                retryPayload={apiErrorRetryPayload} />, {
                autoClose: 8000,
                pauseOnHover: true,
                progressStyle: {
                    background: theme.palette.primary.main,
                },
                style: {
                    backgroundColor: theme.palette.secondary.main,
                    color: theme.palette.secondary.contrastText,
                }
            });
            dispatch({type: HANDLEDERROR, errorMessage: "", retryMethod: ActionType, retryPayload: []});
        }
    }, [apiErrorState, apiErrorRetryMethod, apiErrorRetryPayload, dispatch, t, i18n]);



    useEffect(() => {
        if (apiSuccessState) {
            toast(<Toast
                errorMessage={t(apiSuccessState)}
                isError={false} />, {
                autoClose: 4000,
                pauseOnHover: true,
                progressStyle: {
                    background: theme.palette.primary.main,
                },
                style: {
                    backgroundColor: theme.palette.secondary.main,
                    color: theme.palette.secondary.contrastText,

                }
            })
            dispatch({type: SUCCESS, successMessage: ""});
        }
    }, [apiSuccessState, dispatch, t])



    useEffect(() => {
        if(apiErrorStateWithVariables && apiErrorStateWithVariables.content){
            toast(<Toast
                isError={true}
                errorMessage={t(apiErrorStateWithVariables.content, apiErrorStateWithVariables.variables)}
                retryMethod={apiErrorRetryMethod}
                retryPayload={apiErrorRetryPayload}/>, {
                autoClose: 8000,
                pauseOnHover: true,
                progressStyle: {
                    background: theme.palette.primary.main,
                },
                style: {
                    backgroundColor: theme.palette.secondary.main,
                    color: theme.palette.secondary.contrastText,
                }
            });
            dispatch({type: HANDLEDERROR, errorMessageWithVariables: {}, retryMethod: ActionType, retryPayload: []});
        }
    }, [apiErrorRetryMethod, apiErrorRetryPayload, apiErrorStateWithVariables, dispatch, t])

    useEffect(() => {
        if(apiSuccessStateWithVariables && apiSuccessStateWithVariables.content){
            toast(<Toast
                isError={false}
                errorMessage={t(apiSuccessStateWithVariables.content, apiSuccessStateWithVariables.variables)} />, {
                autoClose: 4000,
                pauseOnHover: true,
                progressStyle: {
                    background: theme.palette.primary.main,
                },
                style: {
                    backgroundColor: theme.palette.secondary.main,
                    color: theme.palette.secondary.contrastText,
                }
            });
            dispatch({type: SUCCESS, successMessageWithVariables: {}});
        }
    }, [apiSuccessStateWithVariables, dispatch, t])




    const classes = useStyles();
    const [userController] = useState<UserApi>(new UserApi());

    const [userDoesExist, setUserDoesExist] = useState<boolean | undefined>(undefined);
    const [fileConfigFetched, setFileConfigFetched] = useState<boolean>(false);

    useEffect(() => {
        const config = helpers.getClientConfig();
        userController.getUserInfo(config)
            .then(response => {
                if (response.data) {
                    setUserDoesExist(true);
                    dispatch({type: CURRENT_USER_INFO, currentUserInfo: response.data});


                } else {
                    setUserDoesExist(false);
                }
            })
            .catch(() => setUserDoesExist(false));
    }, [userController, dispatch]);


    const [artifactController] = useState<ArtifactApi>(new ArtifactApi());

    useEffect(() => {
        if(!fileConfigFetched){
            const config = helpers.getClientConfig();
            artifactController.getAllFileTypes(config).then(response2 => {
                if(response2.data){
                    dispatch({type: FILETYPES, fileTypes: response2.data});
                    setFileConfigFetched(true);
                }
            })

        }
    }, [artifactController, dispatch, fileConfigFetched])



    if (userDoesExist === undefined) {
        return null;
    }

    if (!userDoesExist) {
        return <RegisterNewUserScreen/>;
    }


    return (
        <>
            <Menu/>
            <div className={classes.contentWrapper}>
                <div className={classes.content}>
                    <Router/>
                    <ToastContainer/>
                </div>
            </div>
        </>
    );
};

export default Layout;
