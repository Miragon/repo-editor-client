import React, {useEffect, useState} from 'react';
import DiagramContainer from "./DiagramContainer";

import '../App.css';
import {useStore} from "../providers/RootStoreProvider";
import {observer} from "mobx-react";
import LatestDiagrams from "./LatestDiagrams";


const Overview: React.FC =  observer(() => {
    //{store.repoStore.fetchAllRepos()}
    const store = useStore();

//    const [repository, setRepository] = useState<BpmnRepositoryTO>();


    useEffect(() => {
        (async () => await store.repoStore.initialize())();

    }, [store.repoStore])



    return (
        <div>
          <h1></h1>
            <p>testOverview</p>
            <p>bla {store.repoStore.getRepo("3cd5059e-bd2b-464c-a8b3-f50c10000647")?.bpmnRepositoryName}</p>
            <LatestDiagrams repoIds={store.repoStore.getListOfRepoIds()}/>
            <DiagramContainer category="Frequently used"/>
            <DiagramContainer category="Starred"/>
        </div>
    );
});

export default Overview;
