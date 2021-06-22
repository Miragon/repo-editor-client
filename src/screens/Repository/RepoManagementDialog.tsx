import React, {useCallback, useState} from "react";
import {useDispatch} from "react-redux";
import {PopupDialog} from "@flowsquad/react-utils-ui";
import {DataGrid, GridColumns, GridRowsProp} from '@material-ui/data-grid';
import {makeStyles} from "@material-ui/core/styles";
import {Input, InputLabel} from "@material-ui/core";
import * as repositoryAction from "../../store/actions/repositoryAction";

const useStyles = makeStyles(() => ({
    line: {
        display: "flex",
        flexDirection: "column"
    },
    property: {
        flexBasis: "20px"
    },
    spacer: {
        marginTop: "15px"
    }

}));

interface Props {
    open: boolean;
    onCancelled: () => void;
    repoId: string;
    repoName: string;
    repoDescription: string;
}


const RepoManagementDialog: React.FC<Props> = props => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const [error, setError] = useState<string | undefined>(undefined);
    const [title, setTitle] = useState<string>(props.repoName);
    const [description, setDescription] = useState<string>(props.repoDescription);

    const rows: GridRowsProp = [
        {
            id: "title",
            key: "Repository name",
            value: props.repoName
        },
        {
            id: "description",
            key: "Description",
            value: props.repoDescription
        },
    ]

    const columns: GridColumns = [
        {
            field: "property",
            headerName: "",
            editable: false
        },
        {
            field: "value",
            headerName: "Repository Information",
            editable: true
        }
    ]

    //#TODO: Implment the action for updating a repo
    const applyChanges = useCallback(async () => {
        try{
            console.log("Changing")
            //dispatch(repositoryAction.)
        } catch (err){
            console.log(err)
        }
    }, [title, description])



    return (
        <PopupDialog
            open={props.open}
            title={props.repoName}
            error={error}
            onCloseError={() => setError(undefined)}
            firstTitle="apply Changes"
            onFirst={applyChanges}
            secondTitle="close"
            onSecond={props.onCancelled}>
            <InputLabel style={{'fontSize': '12px'}} htmlFor="Title">Title</InputLabel>
            <Input
                    id="Title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}/>
            <div className={classes.spacer} />
            <InputLabel style={{'fontSize': '12px'}} htmlFor="Description">Description</InputLabel>
            <Input
                    id="Description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    />




        </PopupDialog>
    );
}

export default RepoManagementDialog;