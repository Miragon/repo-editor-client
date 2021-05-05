import React, {useEffect} from 'react';
import DiagramContainer from "./Elements/DiagramContainer";
import '../App.css';
import {useStore} from "../providers/RootStoreProvider";
import {observer} from "mobx-react";
import RecentDiagrams from "./Elements/RecentDiagrams";
import StarredDiagrams from "./Elements/StarredDiagrams";
import RepoContainer from "./Elements/RepoContainer";


const Overview: React.FC =  observer(() => {
    //{store.repoStore.fetchAllRepos()}
    const store = useStore();

//    const [repository, setRepository] = useState<BpmnRepositoryTO>();


    useEffect(() => {
        (async () => await store.repoStore.initialize())();

    }, [store.repoStore])



    return (
        <div>
            <RepoContainer/>
            <RecentDiagrams/>
            <StarredDiagrams/>
            <DiagramContainer category="Frequently used - no Endpoint included so far"/>
        </div>
    );
});

export default Overview;
