import {observer} from "mobx-react";
import React from 'react';
import CreateContainer from "../CreateContainer/CreateContainer";
import RecentDiagrams from "./RecentDiagrams";
import RepoContainer from "./RepoContainer";
import FavoriteDiagrams from "./FavoriteDiagrams";
import 'react-toastify/dist/ReactToastify.css';
import DiagramSearchBar from "./DiagramSearchBar";


const Overview: React.FC = observer(() => {



    return (
        <>
            <CreateContainer />
            <RepoContainer />
            <DiagramSearchBar />
            <RecentDiagrams />
            <FavoriteDiagrams />
        </>
    );
});

export default Overview;
