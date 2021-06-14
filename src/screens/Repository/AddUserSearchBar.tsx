import React, {useCallback, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import {useDispatch, useSelector} from "react-redux";
import * as userAction from "../../store/actions/userAction";
import {UserInfoTO} from "../../api/models";
import {RootState} from "../../store/reducers/rootReducer";
import {searchUsers} from "../../store/actions/userAction";
import {IconButton, ListItem, ListItemSecondaryAction} from "@material-ui/core";
import {Add} from "@material-ui/icons";
import * as assignmentAction from "../../store/actions/assignmentAction";


interface Props {
    repoId: string;
}

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

const AddUserSearchBar: React.FC<Props> = props => {
    const dispatch = useDispatch();

    const searchedUsers: Array<UserInfoTO> = useSelector((state: RootState) => state.searchedUsers.searchedUsers)
    const results: number = useSelector((state: RootState) => state.resultsCount.resultsCount)

    const [user, setUser] = useState("");
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState<UserInfoTO[]>([]);
    let loading = open && options.length === 0 && user != "" && results != 0;


    //#TODO: Loading animation is never displayed at the moment
    React.useEffect(() => {
        let active = true;
        if (!loading) {
            return undefined;
        }

        if(results === 0){
            active = false
            loading = false
        }
        console.log(loading)
        console.log(results)

        return () => {
            active = false;
        };
    }, [loading, results]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
        if(open) {
            setOptions(searchedUsers)
        }
    }, [open, searchedUsers]);


    const onChangeWithTimer = ((input: string) => {
        //#TODO: How to reset the timer if this method is called a second time?
        if(input != "") {
            setUser(input)
            fetchUserSuggestions(input)
        }
    })

    const fetchUserSuggestions = useCallback((input: string) => {
        dispatch(userAction.searchUsers(input))
    }, [dispatch])


    const addUser = useCallback(() => {
        try {
            dispatch(assignmentAction.createOrUpdateUserAssignment(props.repoId, user))
            setUser("")
        } catch (err) {
            console.log(err)
        }

    }, [dispatch, user])


    return (
        <ListItem>
        <Autocomplete
            id="asynchronous-demo"
            style={{ width: 500 }}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            getOptionSelected={(option, value) => option.userName === value.userName}
            getOptionLabel={(option) => option.userName}
            options={options}
            loading={loading}
            onChange={(event, value) => setUser(value?.userName)}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Add user"
                    variant="outlined"
                    onChange={(event) => onChangeWithTimer(event.target.value)}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
            <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => addUser()}>
                    <Add/>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
}

export default AddUserSearchBar
