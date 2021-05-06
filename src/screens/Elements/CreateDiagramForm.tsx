import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    MenuItem,
    Radio,
    RadioGroup,
    TextField
} from '@material-ui/core';
import {useStore} from "../../providers/RootStoreProvider";


const useStyles = makeStyles(() => ({
    root: {
        '& > *': {
            margin: "50px",
            width: '600px',
        },
    },
    formTitle: {
        textAlign: "center",
        fontSize: "20px"
    },
    button: {
        position: "relative",
        top: "40px"
    },
    selection: {
        position: "relative",
        top: "20px"
    }

}));


const CreateDiagramForm: React.FC = () => {

    const classes = useStyles();
    const store = useStore();

    const [file, setFile] = React.useState('BPMN');
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [repoId, setRepoId] = React.useState("repo");
    const [diagramId, setDiagramId] = React.useState('');


    const repositories = store.repoStore.getListOfRepoNamesAndIds();

    const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFile(event.target.value);
    };

    const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }

    const handleChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value)
    }

    const handleChangeRepo = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRepoId(event.target.value);
    };


    //#TODO: redirect is blocked by material UI-Form
    const handleSubmit = () => {
        store.diagramStore.createNewDiagram(title, description, repoId).then(returnedDiagram => {
            if(returnedDiagram.bpmnDiagramId !=  undefined && returnedDiagram.bpmnDiagramId != ""){
                setDiagramId(returnedDiagram.bpmnDiagramId)
                window.open(("/modeler/#/" + repoId + "/" + diagramId + "/latest/"))
                console.log("Selected filytype: " + file)
            }
        });
    }

    return(
        <div>
                <div className={classes.formTitle}>
                    Create New File
                </div>


                <form className={classes.root} onSubmit={handleSubmit} noValidate autoComplete="on">
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Choose filetype</FormLabel>
                        <RadioGroup onChange={handleChangeFile}>
                            <FormControlLabel value="BPMN" control={<Radio color={"primary"} />} label="BPMN" />
                            <FormControlLabel value="DMN" control={<Radio color={"primary"}/>} label="DMN" />
                        </RadioGroup>

                        <TextField id="diagramName" label="Title" onInput={handleChangeTitle}/>
                        <TextField id="diagramDescription" label="Description" onInput={handleChangeDescription}/>
                        <TextField className={classes.selection}
                                id="outlined-select-currency"
                                select
                                value={repoId}
                                label="Repository"
                                onChange={handleChangeRepo}
                                variant="outlined"
                            >
                                {repositories.map((option) => (
                                    <MenuItem key={option.repoName} value={option.repoId}>
                                        {option.repoName}
                                    </MenuItem>
                                ))}
                        </TextField>
                        <Button
                            type="submit"
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
