import React, {useEffect} from "react";
import {useStore} from "../../providers/RootStoreProvider";
import {observer} from "mobx-react";
import RepoCard from "./Holder/RepoCard";
import {makeStyles} from "@material-ui/core/styles";
import {Button, Popover} from "@material-ui/core";
import {Add} from "@material-ui/icons";
import CreateRepoForm from "./CreateRepoForm";
import {COLORS} from "../../design";

const useStyles = makeStyles(() => ({
    body: {
        background: "rgba(0, 0, 0, 0)"
    },
    RepoContainer: {

        height: "175px;",
        width: "93%",
        top: "0px",
        left: "100px",
        position: "relative",
        backgroundColor: "white",
    },
    ContainerHeader: {
        paddingLeft: "20px",
    },

    headerText: {
        display: "inline-block",
        color:"black",
        fontSize: "20px",
        fontFamily: "Arial"
    },

ScrollBar: {
    height: "150px",
    top: "50px",
    width: "auto",
    overflowX: "auto",
    display: "flex",
    flexWrap: "nowrap"
},

    addIcon: {
        width: "30px",
        height: "30px",
        alignContent: "center",
        display: "inline-block",
        marginLeft: "15px",
        cursor: "pointer",
        color: "grey",
        border: "1px solid grey",
        borderRadius: "5px",
        transition: "border .3s, color .3s",
        "&:hover": {
            backgroundColor: COLORS.primary,
            color: COLORS.secondary,
            border: "1px solid " + COLORS.secondary
        }
    },
    hidden: {
        display: "none"
    }

}));

const RepoContainer: React.FC = observer(() => {

    const classes = useStyles();

    const store = useStore();
    const category = "Repositories";

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    const handleClickAdd = (event: React.BaseSyntheticEvent) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    useEffect(() => {
        (async () => await store.repoStore.initialize())();

    }, [store.repoStore])

//            {store.repoStore.getAllRepos().map(repo => (
//
//             ))}
    return <div className={classes.RepoContainer}>
        <div className={classes.ContainerHeader}>
            <div className={classes.headerText}>
                <p>{category}</p>
            </div>
            <Button onClick={handleClickAdd}>
                {React.createElement(Add, {
                    className: classes.addIcon
                })}
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <CreateRepoForm/>
            </Popover>
        </div>

                <div className={classes.ScrollBar}>
                    {store.repoStore.getAllRepos().map(repo => (
                        // eslint-disable-next-line react/jsx-key
                        <RepoCard
                            repoTitle={repo.bpmnRepositoryName}
                            description={repo.bpmnRepositoryDescription}
                            existingDiagrams={repo.existingDiagrams}
                            assignedUsers={repo.assignedUsers}/>
                    ))}
                        <RepoCard repoTitle={"Hardcoded Title"} description={"Hardcoded desc"} existingDiagrams={4} assignedUsers={5} />


                </div>
            </div>

});

export default RepoContainer;

