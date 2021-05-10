import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Button, FormControl, TextField} from '@material-ui/core';
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
    textField: {
        margin: "10px"
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


const CreateRepoForm: React.FC = () => {

    const classes = useStyles();
    const store = useStore();

    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');



    const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }

    const handleChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value)
    }


    const handleSubmit = () => {
        store.repoStore.createRepo(title, description).then(() => {
            location.reload();
        });
    }

    return(
        <div>
            <div className={classes.formTitle}>
                Create New Repository
            </div>


            <form className={classes.root} noValidate autoComplete="on">
                <FormControl component="fieldset">

                    <TextField id="repoName" className={classes.textField} label="Title" required={true} variant="outlined" onInput={handleChangeTitle}/>
                    <TextField id="repoDescription" className={classes.textField} label="Description" variant="outlined" onInput={handleChangeDescription}/>

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
export default CreateRepoForm;
