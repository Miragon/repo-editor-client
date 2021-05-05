import React, {useEffect, useState} from "react";
import DiagramCard from "./Holder/DiagramCard";
import {useStore} from "../../providers/RootStoreProvider";
import {BpmnRepositoryTO} from "../../api";
import {observer} from "mobx-react";
import RepoCard from "./Holder/RepoCard";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    body: {
        background: "rgba(0, 0, 0, 0)"
    },
    RepoContainer: {

        height: "175px;",
        width: "83%",
        top: "0px",
        left: "120px",
        position: "relative",
        backgroundColor: "white",
    },
    ContainerHeader: {
        fontFamily: "Arial",
        paddingLeft: "20px",
        color:"black",
        fontSize: "20px"
    },


ScrollBar: {
    height: "150px",
    top: "50px",
    width: "auto",
    overflowX: "auto",
    display: "flex",
    flexWrap: "nowrap"
}

}));

const RepoContainer: React.FC = observer(() => {

    const classes = useStyles();

    const store = useStore();
    const category = "Repositories";

    useEffect(() => {
        (async () => await store.repoStore.initialize())();

    }, [store.repoStore])

//            {store.repoStore.getAllRepos().map(repo => (
//
//             ))}
    return <div className={classes.RepoContainer}>
                <h1 className={classes.ContainerHeader}>{category}</h1>
                <div className={classes.ScrollBar}>
                    {store.repoStore.getAllRepos().map(repo => (
                        // eslint-disable-next-line react/jsx-key
                        <RepoCard
                            repoTitle={repo.bpmnRepositoryName}
                            description={repo.bpmnRepositoryDescription}
                            existingDiagrams={repo.existingDiagrams}
                            assignedUsers={repo.assignedUsers}/>
                    ))}
                        <RepoCard repoTitle={"Hardcoded Title"} description={"Hardcoded desc"} existingDiagrams={4} assignedUsers={5} />


                </div>
            </div>

});

export default RepoContainer;

