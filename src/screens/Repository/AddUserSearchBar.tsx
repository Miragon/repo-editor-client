import React, {useCallback, useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import {useDispatch, useSelector} from "react-redux";
import * as userAction from "../../store/actions/userAction";
import {UserInfoTO} from "../../api/models";
import {RootState} from "../../store/reducers/rootReducer";
import {IconButton, ListItem, ListItemSecondaryAction} from "@material-ui/core";
import {Add} from "@material-ui/icons";
import * as assignmentAction from "../../store/actions/assignmentAction";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(() => ({
    listItem: {
        paddingLeft: "0px",
        paddingRight: "60px"
    }
}));
interface Props {
    repoId: string;
}


let timeout: NodeJS.Timeout | undefined = undefined;

const AddUserSearchBar: React.FC<Props> = props => {
    const classes = useStyles();
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

    }, [loading, results]);

    useEffect(() => {
        if (!open) {
            setOptions([]);
        }
        if(open) {
            setOptions(searchedUsers)
        }
    }, [open, searchedUsers]);


    const onChangeWithTimer = ((input: string) => {
        setUser(input)
        if(input != "") {
            if(timeout){
                clearTimeout(timeout);
            }
            timeout = setTimeout(() => fetchUserSuggestions(input), 500);
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

    }, [dispatch, user, props])


    const updateState = (event: any) => {
        setUser(event.target.textContent)
    }

    return (
        <ListItem className={classes.listItem}>
        <Autocomplete
            id="UserSearchBar"
            freeSolo={true}
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
            onChange={updateState}
            loading={loading}
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
