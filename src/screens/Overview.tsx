import React, {useEffect, useState} from 'react';
import DiagramContainer from "./DiagramContainer";
import '../App.css';
import {useStore} from "../providers/RootStoreProvider";
import {observer} from "mobx-react";
import LatestDiagrams from "./LatestDiagrams";


const Overview: React.FC =  observer(() => {
    const store = useStore();

//    const [repository, setRepository] = useState<BpmnRepositoryTO>();


    useEffect(() => {
        (async () => await store.repoStore.initialize())();
    }, [store.repoStore])


    //store.repoStore.getRepo("6c713b08-a11b-4a23-8bcb-961c202ffd68")?.bpmnRepositoryName

    return (
        <div>
          <h1></h1>
            <p>testOverview</p>
            <p>bla {store.repoStore.getRepo("3cd5059e-bd2b-464c-a8b3-f50c10000647")?.bpmnRepositoryName}</p>
            <LatestDiagrams repoIds={store.repoStore.getListOfRepoIds()}/>
            <DiagramContainer category="abc"/>
            <DiagramContainer category="Starred"/>
        </div>
    );
});

export default Overview;
