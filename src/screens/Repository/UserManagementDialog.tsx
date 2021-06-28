import React, {useCallback, useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import PopupDialog from "../../components/Form/PopupDialog";
import {getAllAssignedUsers} from "../../store/actions/assignmentAction";
import {AssignmentTORoleEnumEnum, UserInfoTO} from "../../api/models";
import {RootState} from "../../store/reducers/rootReducer";
import {List, Paper} from "@material-ui/core";
import {AssignmentTO} from "../../api/models/assignment-to";
import UserListItem from "./UserListItem";
import {makeStyles} from "@material-ui/core/styles";
import {HANDLEDERROR, SEARCH_USERS} from "../../store/actions/diagramAction";
import AddUserSearchBar from "./AddUserSearchBar";

interface Props {
    open: boolean;
    onCancelled: () => void;
    repoId: string;
}

const useStyles = makeStyles(() => ({
    textField: {
        left: "0px",
        width: "80%"
    },
    button: {

        right: "0px",
        width: "80%"
    }
}));


const UserManagementDialog: React.FC<Props> = props => {
    const dispatch = useDispatch();

    const { open, onCancelled } = props;

    const assignmentTOs: Array<AssignmentTO> = useSelector((state: RootState) => state.assignedUsers.assignedUsers)
    const syncStatus: boolean = useSelector((state: RootState) => state.dataSynced.dataSynced)
    const currentUser: UserInfoTO = useSelector((state: RootState) => state.currentUserInfo.currentUserInfo)

    const [error, setError] = useState<string | undefined>(undefined);
    const [hasAdminPermissions, setHasAdminPermissions] = useState<boolean>(false);


    const fetchAssignedUsers = useCallback((repoId: string) => {
        try {
            dispatch(getAllAssignedUsers(repoId))
        } catch (err) {
            console.log(err)
        }
    }, [dispatch])

    useEffect(() => {
        fetchAssignedUsers(props.repoId)
        if(!syncStatus){
            fetchAssignedUsers(props.repoId)
        }
    }, [fetchAssignedUsers, syncStatus, props])



    const checkForAdminPermissions = useMemo(() => {
            const currentUserAssignment = assignmentTOs.find(assignmentTO => assignmentTO.userName === currentUser.userName)
            try{
                if(currentUserAssignment?.roleEnum === AssignmentTORoleEnumEnum.ADMIN || currentUserAssignment?.roleEnum === AssignmentTORoleEnumEnum.OWNER){
                    setHasAdminPermissions(true)
                    return true
                } else {
                    setHasAdminPermissions(false)
                    return  false
                }
            } catch (err){
                dispatch({type: HANDLEDERROR, message: "Error while checking permissions for this repository"})
            }
        }, [assignmentTOs, currentUser, dispatch])

    const onCancel= (() => {
        dispatch({type: SEARCH_USERS, searchedUsers: []})
        onCancelled()
    })


    //#TODO: Style the Input field
    return (
        <PopupDialog
            open={open}
            title={"Users"}
            error={error}
            onCloseError={() => setError(undefined)}
            secondTitle="close"
            onSecond={onCancel} >
            <List dense={false}>
                {checkForAdminPermissions && (
                    <AddUserSearchBar repoId={props.repoId}/>
                )}
                <Paper>

                {assignmentTOs?.map(assignmentTO => (
                    <UserListItem assignmentTO={assignmentTO} hasAdminPermissions={hasAdminPermissions} key={assignmentTO.userId} />

                ))}
                </Paper>

            </List>
        </PopupDialog>
    );
};


export default UserManagementDialog;