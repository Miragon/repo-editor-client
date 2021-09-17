import {makeStyles} from "@material-ui/core";
import {Theme} from "@material-ui/core/styles";
import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {ToastContainer} from "react-toastify";
import {ArtifactApi, UserApi} from "../../api";
import helpers from "../../util/helperFunctions";
import RegisterNewUserScreen from "../../screens/RegisterNewUserScreen";
import Menu from "./Menu";
import Router from "./Router";
import {useTranslation} from "react-i18next";
import {CURRENT_USER_INFO, FILETYPES} from "../../constants/Constants";

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
    const dispatch = useDispatch();

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
