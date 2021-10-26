import {observer} from "mobx-react";
import React, {useCallback, useEffect, useState} from "react";
import {useParams} from "react-router";
import "react-toastify/dist/ReactToastify.css";
import PathStructure from "../components/Layout/PathStructure";
import {useDispatch, useSelector} from "react-redux";

import Editor from "./Editor";
import CreateArtifactDialog from "./CreateArtifactDialog";
import DropdownButton, {DropdownButtonItem} from "../components/Form/DropdownButton";
import {RootState} from "../store/reducers/rootReducer";
import {ArtifactMilestoneTO, ArtifactTO, ArtifactTypeTO, RepositoryTO} from "../api";
import {makeStyles} from "@material-ui/styles";
import {getArtifact, getByMilestoneNumber, getLatestMilestone,} from "../store/actions";
import {useTranslation} from "react-i18next";
import helpers from "../util/helperFunctions";
import {ACTIVEARTIFACT, MILESTONE} from "../constants/Constants";
import {getRepository} from "../store/actions/repositoryAction";

const useStyles = makeStyles(() => ({
    createContainer: {
        display: "flex",
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: "20px",
        alignItems: "center"
    },
    header: {
        display: "flex",
        flexDirection: "column",
        maxWidth: "100%"
    },
    title: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        fontSize: "1.2rem",
        marginBottom: "15px"
    },
    artifact: {
        marginLeft: "5px",
        fontWeight: "bold"
    },
    description: {
        fontWeight: "lighter",
        fontStyle: "italic"
    },
    comment: {
        fontWeight: "lighter",
        marginBottom: "25px",
        fontStyle: "italic"
    },
    oldMilestoneHint: {
        fontStyle: "bold",
        color: "red",
        cursor: "pointer"
    }
}))


const EditorContainer: React.FC = observer(() => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const {t} = useTranslation("common");


    const { artifactId } = useParams<{ artifactId: string }>();
    const { milestoneNumber } = useParams<{ milestoneNumber: string }>();

    const milestoneSynced: boolean = useSelector((state: RootState) => state.dataSynced.milestoneSynced);
    const fileTypes: Array<ArtifactTypeTO> = useSelector((state: RootState) => state.artifacts.fileTypes);

    const [repositoryId, setRepositoryId] = useState<string>("");
    const [repository, setRepository] = useState<RepositoryTO>();
    const [artifact, setArtifact] = useState<ArtifactTO>();
    const [milestone, setMilestone] = useState<ArtifactMilestoneTO>();

    const [createArtifactOpen, setCreateArtifactOpen] = useState<boolean>(false);
    const [createArtifactType, setCreateArtifactType] = useState<string>("");
    const [artifactOptions, setArtifactOptions] = useState<Array<DropdownButtonItem>>([]);


    const fetchArtifact = useCallback(() => {
        getArtifact(artifactId).then(response => {
            if (Math.floor(response.status / 100) === 2) {
                setArtifact(response.data)
                dispatch({type: ACTIVEARTIFACT, artifact: response.data})
                setRepositoryId(response.data.repositoryId)
            } else {
                helpers.makeErrorToast(t(response.data.toString()), () => fetchArtifact())
            }
        }, error => {
            helpers.makeErrorToast(t(error.response.data), () => fetchArtifact())
        })

    }, [artifactId, dispatch, t])

    const fetchMilestone = useCallback(() => {
        getLatestMilestone(artifactId).then(response => {
            if (Math.floor(response.status / 100) === 2) {
                setMilestone(response.data)
                dispatch({type: MILESTONE, milestone: response.data})
            } else {
                helpers.makeErrorToast(t(response.data.toString()), () => fetchMilestone())
            }
        }, error => {
            helpers.makeErrorToast(t(error.response.data), () => fetchMilestone())
        })
    }, [artifactId, dispatch, t])

    const fetchMilestoneByNumber = useCallback(() => {
        getByMilestoneNumber(artifactId, parseInt(milestoneNumber)).then(response => {
            if (Math.floor(response.status / 100) === 2) {
                setMilestone(response.data)
                dispatch({type: MILESTONE, milestone: response.data})
            } else {
                helpers.makeErrorToast(t(response.data.toString()), () => fetchMilestone())
            }
        }, error => {
            helpers.makeErrorToast(t(error.response.data), () => fetchMilestone())
        })
    }, [artifactId, dispatch, fetchMilestone, milestoneNumber, t])

    const fetchRepository = useCallback(() => {
        getRepository(repositoryId).then(response => {
            if (Math.floor(response.status / 100) === 2) {
                setRepository(response.data)
            } else {
                helpers.makeErrorToast(t(response.data.toString()), () => fetchRepository())
            }
        }, error => {
            helpers.makeErrorToast(t(error.response.data), () => fetchRepository())
        })
    }, [repositoryId, t])

    useEffect(() => {
        fetchArtifact()
        if(milestoneNumber === "latest"){
            fetchMilestone()
        } else {
            fetchMilestoneByNumber()
        }
    }, [fetchArtifact, fetchMilestone, fetchMilestoneByNumber, fetchRepository, milestoneNumber])

    useEffect(() => {
        if(repositoryId){
            fetchRepository()
        }
    }, [fetchRepository, repositoryId])

    useEffect(() => {
        if(!milestoneSynced){
            fetchMilestone()
        }
    }, [fetchMilestone, milestoneSynced])

    const element = {
        name: "path.overview",
        link: "/",
    }
    const element2 = {
        name: "path.editor",
        link: `/${artifactId}/${milestone}`
    }
    const path = [element, element2]


    useEffect(() => {
        const opts: Array<DropdownButtonItem> = []
        fileTypes?.forEach(fileType => {
            fileType.fileExtension === "json" &&
            opts.push({id: fileType.name,
                label: `artifact.create${fileType.name}`,
                type: "button",
                onClick: () => {
                    setCreateArtifactOpen(true);
                    setCreateArtifactType(fileType.name)
                }});
        })
        setArtifactOptions(opts)

    }, [fileTypes])



    return (
        <>
            <div className={classes.createContainer}>

                <PathStructure structure={path} />

                <DropdownButton
                    type={"default"}
                    title={t("artifact.create")}
                    onClick={() => setCreateArtifactOpen(true)}
                    options={artifactOptions}/>

            </div>

            {repository ?
                <div className={classes.header}>
                    <div className={classes.title}>
                        <span>{`${repository?.name} /`}</span>
                        <span className={classes.artifact}> {artifact?.name}</span>
                    </div>
                    <span className={classes.description}>
                        {artifact?.description}
                    </span>
                    <span className={classes.comment}>
                        {milestone?.comment}
                    </span>

                </div>
                :
                <div className={classes.header}>
                    <div className={classes.title}>
                        <div className={classes.artifact}>
                            <span>New Text File</span>
                        </div>
                    </div>
                </div>
            }
            {(milestone && artifact) &&

                <Editor milestone={milestone} artifact={artifact}/>
            }

            <CreateArtifactDialog
                open={createArtifactOpen}
                type={createArtifactType}
                onCancelled={() => setCreateArtifactOpen(false)} />

        </>
    );
});

export default EditorContainer;
