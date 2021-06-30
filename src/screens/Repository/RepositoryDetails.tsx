import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Description, People, Settings } from "@material-ui/icons/";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RepositoryTO } from "../../api/models";
import { RootState } from "../../store/reducers/rootReducer";
import EditRepoDialog from "./EditRepoDialog";

import UserManagementDialog from "./UserManagementDialog";

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

    const activeRepo: RepositoryTO = useSelector((state: RootState) => state.activeRepo.activeRepo);

    const [userManagementOpen, setUserManagementOpen] = useState<boolean>(false);
    const [repoManagementOpen, setRepoManagementOpen] = useState<boolean>(false);

    if (activeRepo) {
        return (
            <>
                <div className={classes.header}>
                    <div className={classes.headerText}>
                        {activeRepo.name}
                    </div>
                    <div className={classes.repoInfo}>
                        <IconButton>
                            <Description />
                            {activeRepo.existingDiagrams}
                        </IconButton>
                        <IconButton onClick={() => setUserManagementOpen(true)}>
                            <People />
                            {activeRepo.assignedUsers}
                        </IconButton>
                        <IconButton onClick={() => setRepoManagementOpen(true)}>
                            <Settings />
                        </IconButton>

                    </div>
                </div>
                <div className={classes.description}>
                    {activeRepo.description}
                </div>
                <UserManagementDialog
                    open={userManagementOpen}
                    onCancelled={() => setUserManagementOpen(false)}
                    repoId={activeRepo.id} />

                <EditRepoDialog
                    open={repoManagementOpen}
                    onCancelled={() => setRepoManagementOpen(false)}
                    repoId={activeRepo.id}
                    repoName={activeRepo.name}
                    repoDescription={activeRepo.description} />
            </>
        );
    }
    return (
        <div />
    );
});
export default RepositoryDetails;
