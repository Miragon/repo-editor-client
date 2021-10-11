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
import {SYNC_STATUS_ARTIFACT, SYNC_STATUS_MILESTONE} from "../constants/Constants";
import {openFileInTool} from "../util/Redirections";
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

    const [repository, setRepository] = useState<RepositoryTO>();
    const [artifact, setArtifact] = useState<ArtifactTO>();
    const [milestone, setMilestone] = useState<ArtifactMilestoneTO>();

    const [createArtifactOpen, setCreateArtifactOpen] = useState<boolean>(false);
    const [createArtifactType, setCreateArtifactType] = useState<string>("");
    const [artifactOptions, setArtifactOptions] = useState<Array<DropdownButtonItem>>([]);

    const fetchRepository = useCallback((repoId: string) => {
        getRepository(repoId).then(response => {
            if (Math.floor(response.status / 100) === 2) {
                setRepository(response.data)
            } else {
                helpers.makeErrorToast(t(response.data.toString()), () => fetchRepository(repoId))
            }
            
        }, error => {
            helpers.makeErrorToast(t(error.response.data), () => fetchRepository(repoId))
        })
    }, [t])

    const fetchArtifact = useCallback(() => {
        getArtifact(artifactId).then(response => {
            if (Math.floor(response.status / 100) === 2) {
                setArtifact(response.data)
                fetchRepository(response.data.repositoryId)
                dispatch({type: SYNC_STATUS_ARTIFACT, dataSynced: true})
            } else {
                helpers.makeErrorToast(t(response.data.toString()), () => fetchArtifact())
            }
        }, error => {
            helpers.makeErrorToast(t(error.response.data), () => fetchArtifact())
        })
    }, [artifactId, dispatch, fetchRepository, t])

    const fetchLatestMilestone = useCallback(() => {
        getLatestMilestone(artifactId).then(response => {
            if (Math.floor(response.status / 100) === 2) {
                setMilestone(response.data);
                dispatch({type: SYNC_STATUS_MILESTONE, dataSynced: true})
            } else {
                helpers.makeErrorToast(t(response.data.toString()), () => fetchLatestMilestone())
            }
        }, error => {
            helpers.makeErrorToast(t(error.response.data), () => fetchLatestMilestone())

        })
    }, [artifactId, dispatch, t])

    const fetchByMilestoneNumber = useCallback(() => {
        getByMilestoneNumber(artifactId, parseInt(milestoneNumber)).then(response => {
            if (Math.floor(response.status / 100) === 2) {
                setMilestone(response.data);
                dispatch({type: SYNC_STATUS_MILESTONE, dataSynced: true})
            } else {
                helpers.makeErrorToast(t(response.data.toString()), () => fetchByMilestoneNumber())
            }
        }, error => {
            helpers.makeErrorToast(t(error.response.data), () => fetchByMilestoneNumber())
        })
    }, [artifactId, dispatch, milestoneNumber, t])

    
    useEffect(() => {
        if (artifactId && (milestoneNumber === "latest")) {
            fetchArtifact()
            fetchLatestMilestone()
        }
        if (artifactId && (milestoneNumber !== "latest")) {
            fetchArtifact()
            fetchByMilestoneNumber()
        }
    }, [artifactId, fetchArtifact, fetchByMilestoneNumber, fetchLatestMilestone, milestoneNumber])


    useEffect(() => {
        if(!milestoneSynced){
            milestoneNumber === "latest" ? fetchLatestMilestone() : fetchByMilestoneNumber();
        }
    }, [fetchByMilestoneNumber, fetchLatestMilestone, milestoneNumber, milestoneSynced])

    const element = {
        name: "path.overview",
        link: "/",
    }
    const element2 = {
        name: "path.editor",
        link: `#/editor/${artifactId}/${milestone}`
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
                    {(!milestone?.latestMilestone && artifact) &&
                        <div  className={classes.oldMilestoneHint} onClick={() => openFileInTool(fileTypes, artifact?.fileType, artifact?.repositoryId, artifact?.id, t("error.missingTool", artifact?.fileType))}>
                            <span>
                                {t("exception.oldMilestone")}
                            </span>
                        </div>

                    }
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
