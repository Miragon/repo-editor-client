import {observer} from "mobx-react";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import {ErrorBoundary} from "../../components/Exception/ErrorBoundary";
import CreateContainer from "../CreateContainer/CreateContainer";
import FavoriteDiagrams from "./FavoriteDiagrams";
import RecentDiagrams from "./RecentDiagrams";
import RepoContainer from "./RepoContainer";
import PathStructure from "../../components/Layout/PathStructure";

const Overview: React.FC = observer(() => {

    const element = {
        name: "Overview",
        link: "/"
    }
    const path = [element]


    return (
        <>
            <PathStructure structure={path} />
            <ErrorBoundary>
                <CreateContainer />
            </ErrorBoundary>
            <ErrorBoundary>
                <RepoContainer />
            </ErrorBoundary>
            <ErrorBoundary>
                <RecentDiagrams />
            </ErrorBoundary>
            <ErrorBoundary>
                <FavoriteDiagrams />
            </ErrorBoundary>
        </>
    );
});

export default Overview;
