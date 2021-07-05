import { List, Paper } from "@material-ui/core";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AssignmentTO, AssignmentTORoleEnumEnum } from "../../api/models";
import PopupDialog from "../../components/Form/PopupDialog";
import { getAllAssignedUsers } from "../../store/actions/assignmentAction";
import { SEARCH_USERS, UNHANDLEDERROR } from "../../store/constants";
import { RootState } from "../../store/reducers/rootReducer";
import AddUserSearchBar from "./AddUserSearchBar";
import UserListItem from "./UserListItem";

interface Props {
    open: boolean;
    onCancelled: () => void;
    repoId: string;
}

const UserManagementDialog: React.FC<Props> = props => {
    const dispatch = useDispatch();

    const { open, onCancelled } = props;

    const assignmentTOs: Array<AssignmentTO> = useSelector(
        (state: RootState) => state.assignedUsers.assignedUsers
    );
    const syncStatus = useSelector((state: RootState) => state.dataSynced.dataSynced);
    const currentUser = useSelector((state: RootState) => state.currentUserInfo.currentUserInfo);

    const [error, setError] = useState<string | undefined>(undefined);
    const [hasAdminPermissions, setHasAdminPermissions] = useState<boolean>(false);

    const fetchAssignedUsers = useCallback((repoId: string) => {
        try {
            dispatch(getAllAssignedUsers(repoId));
        } catch (err) {
            // eslint-disable-next-line no-console
            console.log(err);
        }
    }, [dispatch]);

    useEffect(() => {
        fetchAssignedUsers(props.repoId);
        if (!syncStatus) {
            fetchAssignedUsers(props.repoId);
        }
    }, [fetchAssignedUsers, syncStatus, props]);

    const checkForAdminPermissions = useMemo(() => {
        const currentUserAssignment = assignmentTOs
            .find(assignmentTO => assignmentTO.username === currentUser.username);
        try {
            if (currentUserAssignment?.roleEnum === AssignmentTORoleEnumEnum.ADMIN
                || currentUserAssignment?.roleEnum === AssignmentTORoleEnumEnum.OWNER) {
                setHasAdminPermissions(true);
                return true;
            }
            setHasAdminPermissions(false);
            return false;
        } catch (err) {
            dispatch({
                type: UNHANDLEDERROR,
                message: "Error while checking permissions for this repository"
            });
            return false;
        }
    }, [assignmentTOs, currentUser, dispatch]);

    const onCancel = (() => {
        dispatch({ type: SEARCH_USERS, searchedUsers: [] });
        onCancelled();
    });

    // #TODO: Style the Input field
    return (
        <PopupDialog
            open={open}
            title="Users"
            error={error}
            onCloseError={() => setError(undefined)}
            secondTitle="close"
            onSecond={onCancel}>
            <List dense={false}>
                {checkForAdminPermissions && (
                    <AddUserSearchBar repoId={props.repoId} />
                )}
                <Paper>

                    {assignmentTOs?.map(assignmentTO => (
                        <UserListItem
                            assignmentTO={assignmentTO}
                            hasAdminPermissions={hasAdminPermissions}
                            key={assignmentTO.userId} />

                    ))}
                </Paper>

            </List>
        </PopupDialog>
    );
};

export default UserManagementDialog;
