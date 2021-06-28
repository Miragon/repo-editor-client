import {observer} from "mobx-react";
import React from 'react';
import CreateContainer from "../CreateContainer/CreateContainer";
import RecentDiagrams from "./RecentDiagrams";
import RepoContainer from "./RepoContainer";
import FavoriteDiagrams from "./FavoriteDiagrams";
import 'react-toastify/dist/ReactToastify.css';
import DiagramSearchBar from "./DiagramSearchBar";
import {ErrorBoundary} from "../../components/Exception/ErrorBoundary";


const Overview: React.FC = observer(() => {



    return (
        <>
            <ErrorBoundary>
                <CreateContainer />
            </ErrorBoundary>
            <ErrorBoundary>
                <RepoContainer />
            </ErrorBoundary>
            <ErrorBoundary>
                <DiagramSearchBar />
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
