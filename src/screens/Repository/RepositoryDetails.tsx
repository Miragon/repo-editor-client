import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {BpmnRepositoryRequestTO} from "../../api/models";
import {useSelector} from "react-redux";
import {RootState} from "../../store/reducers/rootReducer";
import {Description, People} from '@material-ui/icons/';
import UserManagementDialog from "./UserManagementDialog";
import {IconButton} from "@material-ui/core";
import {Settings} from "@material-ui/icons";
import EditRepoDialog from "./EditRepoDialog";


const useStyles = makeStyles(() => ({
header: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between"
},
headerText: {
    color: "black",
    fontSize: "20px"
},
repoInfo: {
    display: "flex",
    color: "black",
    fontSize: "15px"
},
description: {
    color: "black",
    fontSize: "14px",
    fontWeight: "lighter",
    fontStyle: "italic"
},
icon: {
    width: "70px",
    margin: "0 0.25rem 0 0.5rem"
}

}));
const RepositoryDetails: React.FC = (() => {
    const classes = useStyles();

    const activeRepo: BpmnRepositoryRequestTO = useSelector((state: RootState) => state.activeRepo.activeRepo)

    const [userManagementOpen, setUserManagementOpen] = useState<boolean>(false);
    const [repoManagementOpen, setRepoManagementOpen] =  useState<boolean>(false);



    if(activeRepo){
        return (
            <>
                <div className={classes.header}>
                    <div className={classes.headerText} >
                        {activeRepo.bpmnRepositoryName}
                    </div>
                    <div className={classes.repoInfo} >
                        <IconButton>
                            <Description/>
                            {activeRepo.existingDiagrams}
                        </IconButton>
                        <IconButton onClick={() => setUserManagementOpen(true)}>
                            <People/>
                            {activeRepo.assignedUsers}
                        </IconButton>
                        <IconButton onClick={() => setRepoManagementOpen(true)}>
                            <Settings/>
                        </IconButton>

                    </div>
                </div>
                <div className={classes.description}>
                    {activeRepo.bpmnRepositoryDescription}
                </div>
                <UserManagementDialog
                    open={userManagementOpen}
                    onCancelled={() => setUserManagementOpen(false)}
                    repoId={activeRepo.bpmnRepositoryId}
                />

                <EditRepoDialog
                    open={repoManagementOpen}
                    onCancelled={() => setRepoManagementOpen(false)}
                    repoId={activeRepo.bpmnRepositoryId}
                    repoName={activeRepo.bpmnRepositoryName}
                    repoDescription={activeRepo.bpmnRepositoryDescription}
                />
            </>
        );
    }
    else {
        return (
            <div></div>
        );
    }

});
export default RepositoryDetails;