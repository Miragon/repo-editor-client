import {makeStyles} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import React from "react";
import Theme from "../../theme";
import Layout from "./Layout";
import {RootStoreProvider} from "../../providers/RootStoreProvider";

const useStyles = makeStyles(() => ({
    root: {
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column"
    }
}));

const App: React.FC = () => {
    const classes = useStyles();

    return (
        <ThemeProvider theme={Theme}>
            <RootStoreProvider>
                    <div className={classes.root}>
                        <CssBaseline/>
                        <Layout/>
                    </div>
            </RootStoreProvider>
        </ThemeProvider>
    );
};

export default App;
