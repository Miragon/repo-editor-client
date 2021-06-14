import React, {useCallback, useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import PopupDialog from "../../components/Form/PopupDialog";
import * as assignmentAction from "../../store/actions/assignmentAction";
import * as userAction from "../../store/actions/userAction";
import {getAllAssignedUsers} from "../../store/actions/assignmentAction";
import {AssignmentTORoleEnumEnum, UserInfoTO} from "../../api/models";
import {RootState} from "../../store/reducers/rootReducer";
import {IconButton, List, ListItem, ListItemSecondaryAction, Paper, TextField} from "@material-ui/core";
import {Add} from "@material-ui/icons";
import {AssignmentTO} from "../../api/models/assignment-to";
import UserListItem from "./UserListItem";
import SettingsTextField from "../../components/Form/SettingsTextField";
import {makeStyles} from "@material-ui/core/styles";
import {HANDLEDERROR, SEARCH_USERS} from "../../store/actions/diagramAction";
import {Autocomplete} from "@material-ui/lab";
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
    const classes = useStyles();
    const dispatch = useDispatch()

    const { open, onCancelled } = props;

    const assignmentTOs: Array<AssignmentTO> = useSelector((state: RootState) => state.assignedUsers.assignedUsers)
    const syncStatus: boolean = useSelector((state: RootState) => state.dataSynced.dataSynced)
    const currentUser: UserInfoTO = useSelector((state: RootState) => state.currentUserInfo.currentUserInfo)

    const [error, setError] = useState<string | undefined>(undefined);
    const [user, setUser] = useState<string>("");
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
    }, [fetchAssignedUsers, syncStatus])



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
        }, [assignmentTOs])

    const onCancel= (() => {
        setUser("")
        dispatch({type: SEARCH_USERS, searchedUsers: []})
        onCancelled()
    })


//#TODO: Autosuggestions? Load all usernames on Input? Load Users after  x letters entered? ...
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