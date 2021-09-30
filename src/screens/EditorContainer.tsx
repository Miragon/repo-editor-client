import {observer} from "mobx-react";
import React, {useCallback, useEffect, useState} from "react";
import {useParams} from "react-router";
import "react-toastify/dist/ReactToastify.css";
import PathStructure from "../components/Layout/PathStructure";
import {useDispatch, useSelector} from "react-redux";

import Editor from "./Editor";
import {useHistory} from "react-router-dom";
import CreateArtifactDialog from "./CreateArtifactDialog";
import DropdownButton, {DropdownButtonItem} from "../components/Form/DropdownButton";
import {RootState} from "../store/reducers/rootReducer";
import {ArtifactTO, ArtifactTypeTO, ArtifactVersionTO, RepositoryTO} from "../api";
import {makeStyles} from "@material-ui/styles";
import {
    fetchFileTypes,
    fetchRepositories,
    getArtifact,
    getLatestVersion,
    getMilestoneVersion,
    getSingleRepository
} from "../store/actions";
import {useTranslation} from "react-i18next";
import helpers from "../util/helperFunctions";
import {SYNC_STATUS_ARTIFACT, SYNC_STATUS_VERSION} from "../constants/Constants";
import {openFileInTool} from "../util/Redirections";

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
    const history = useHistory();
    const {t} = useTranslation("common");


    const { artifactId } = useParams<{ artifactId: string }>();
    const { milestone } = useParams<{ milestone: string }>();


    const fileTypes: Array<ArtifactTypeTO> = useSelector((state: RootState) => state.artifacts.fileTypes);
    const repository: RepositoryTO = useSelector((state: RootState) => state.repos.activeRepo);

    const [artifact, setArtifact] = useState<ArtifactTO>();
    const [version, setVersion] = useState<ArtifactVersionTO>();

    const [createArtifactOpen, setCreateArtifactOpen] = useState<boolean>(false);
    const [createArtifactType, setCreateArtifactType] = useState<string>("");
    const [artifactOptions, setArtifactOptions] = useState<Array<DropdownButtonItem>>([]);


    const fetchArtifact = useCallback(() => {
        getArtifact(artifactId).then(response => {
            if (Math.floor(response.status / 100) === 2) {
                setArtifact(response.data)
                dispatch({type: SYNC_STATUS_ARTIFACT, dataSynced: true})
            } else {
                helpers.makeErrorToast(t(response.data.toString()), () => fetchArtifact())
            }
        }, error => {
            helpers.makeErrorToast(t(error.response.data), () => fetchArtifact())
        })
    }, [artifactId, dispatch, t])

    const fetchLatestVersion = useCallback(() => {
        getLatestVersion(artifactId).then(response => {
            if (Math.floor(response.status / 100) === 2) {
                setVersion(response.data);
                dispatch({type: SYNC_STATUS_VERSION, dataSynced: true})
            } else {
                helpers.makeErrorToast(t(response.data.toString()), () => fetchLatestVersion())
            }
        }, error => {
            helpers.makeErrorToast(t(error.response.data), () => fetchLatestVersion())

        })
    }, [artifactId, dispatch, t])

    const fetchMilestoneVersion = useCallback(() => {
        getMilestoneVersion(artifactId, milestone).then(response => {
            if (Math.floor(response.status / 100) === 2) {
                setVersion(response.data);
                dispatch({type: SYNC_STATUS_VERSION, dataSynced: true})
            } else {
                helpers.makeErrorToast(t(response.data.toString()), () => fetchMilestoneVersion())
            }
        }, error => {
            helpers.makeErrorToast(t(error.response.data), () => fetchMilestoneVersion())
        })
    }, [artifactId, dispatch, milestone, t])

    
    useEffect(() => {
        if (artifactId && (milestone === "latest")) {
            fetchArtifact()
            fetchLatestVersion()
        }
        if (artifactId && (milestone !== "latest")) {
            fetchArtifact()
            fetchMilestoneVersion()
        }
    }, [artifactId, milestone, fetchMilestoneVersion, fetchArtifact, fetchLatestVersion])



    useEffect(() => {
        dispatch(fetchFileTypes())
        dispatch(fetchRepositories())
    }, [dispatch])


    useEffect(() => {
        if(artifact?.repositoryId !== undefined) {
            dispatch(getSingleRepository(artifact.repositoryId))
        }
    }, [artifact, dispatch])

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
                        {version?.comment}
                    </span>
                    {(!version?.latestVersion && artifact) &&
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
            {(version && artifact) &&

                <Editor version={version} artifact={artifact}/>
            }


            <CreateArtifactDialog
                open={createArtifactOpen}
                type={createArtifactType}
                onCancelled={() => setCreateArtifactOpen(false)} />

        </>
    );
});

export default EditorContainer;
