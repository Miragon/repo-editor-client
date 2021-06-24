import React, {useCallback, useState} from "react";
import {useDispatch} from "react-redux";
import PopupDialog from "../../components/Form/PopupDialog";
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


const EditRepoDialog: React.FC<Props> = props => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const [error, setError] = useState<string | undefined>(undefined);
    const [title, setTitle] = useState<string>(props.repoName);
    const [description, setDescription] = useState<string>(props.repoDescription);


    const applyChanges = useCallback(async () => {
        try{
            dispatch(repositoryAction.updateRepository(props.repoId, title, description))
            props.onCancelled()
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
            firstTitle="apply changes"
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

export default EditRepoDialog;