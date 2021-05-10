import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Button, FormControl, MenuItem, TextField} from '@material-ui/core';
import {useStore} from "../../providers/RootStoreProvider";


const useStyles = makeStyles(() => ({
    root: {
        '& > *': {
            margin: "50px",
            width: '600px',
        },
    },
    formTitle: {
        padding: "15px",
        textAlign: "center",
        fontSize: "20px"
    },
    button: {
        position: "relative",
        top: "40px"
    },
    textField: {
        margin: "10px"
    },
    selection: {
        position: "relative",
        margin: "10px"
    }

}));


const CreateDiagramForm: React.FC = () => {

    const classes = useStyles();
    const store = useStore();

    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [repoId, setRepoId] = React.useState('');

    const [titleError, setTitleError] = useState(false);
    const [titleHelper, setTitleHelper] = useState("");



    const repositories = store.repoStore.getListOfRepoNamesAndIds();



    const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }

    const handleChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value)
    }

    const handleChangeRepo = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRepoId(event.target.value);
    };


    const handleSubmit = () => {
        store.diagramStore.createNewDiagram(title, description, repoId).then(returnedDiagram => {
            if(returnedDiagram.bpmnDiagramId !=  undefined && returnedDiagram.bpmnDiagramId != ""){
                store.versionStore.createDiagramVersion(repoId, returnedDiagram.bpmnDiagramId).then(() => {
                    window.open(("/modeler/#/" + repoId + "/" + returnedDiagram.bpmnDiagramId + "/latest/"))
                })

            }
        });
    }

    //#TODO Validation is called after "Title" loses focus, but not after "Repository" loses focus
    const validateTitel = () => {
        const enteredTitle = title;
        setTitleError(false);
        setTitleHelper("");
        if(enteredTitle == ""){
            setTitleHelper("required");
            setTitleError(true);
        }
        if(repoId != ""){
            store.diagramStore.fetchAllDiagrams(repoId).then(bpmnDiagramTO => {
                bpmnDiagramTO.forEach(diagram => {
                    console.log(diagram.bpmnDiagramName);
                    if (diagram.bpmnDiagramName.toUpperCase() === enteredTitle.toUpperCase()) {
                        setTitleError(true);
                        setTitleHelper("Title already in use");
                    }
                });
            })
        }
    }

    return(
        <div>
                <div className={classes.formTitle}>
                    Create New File
                </div>


                <form className={classes.root} noValidate autoComplete="on">
                    <FormControl component="fieldset">


                        <TextField error={titleError} helperText={titleHelper} id="diagramName" label="Title" required={true} className={classes.textField} variant="outlined" onBlur={validateTitel} onInput={handleChangeTitle}/>
                        <TextField id="diagramDescription" label="Description" className={classes.textField} variant="outlined" onInput={handleChangeDescription}/>
                        <TextField className={classes.selection}
                                id="outlined-select-currency"
                                select
                                value={repoId}
                                label="Repository"
                                onChange={handleChangeRepo}
                                variant="outlined"
                                   onBlur={validateTitel}
                        >
                                {repositories.map((option) => (
                                    <MenuItem key={option.repoName} value={option.repoId}>
                                        {option.repoName}
                                    </MenuItem>
                                ))}
                        </TextField>
                        <Button
                            onClick={handleSubmit}
                            variant="contained"
                            color="primary"
                            className={classes.button}
                        >
                            Create
                        </Button>
                    </FormControl>
                </form>


        </div>    );


}
export default CreateDiagramForm;
