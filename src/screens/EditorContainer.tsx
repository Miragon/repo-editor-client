import {observer} from "mobx-react";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import "react-toastify/dist/ReactToastify.css";
import PathStructure from "../components/Layout/PathStructure";
import {useDispatch, useSelector} from "react-redux";

import Editor from "./Editor";
import {useHistory} from "react-router-dom";
import CreateArtifactDialog from "./CreateArtifactDialog";
import {useTranslation} from "react-i18next";
import DropdownButton, {DropdownButtonItem} from "../components/Form/DropdownButton";
import {RootState} from "../store/reducers/rootReducer";
import {ArtifactTO, ArtifactTypeTO, ArtifactVersionTO, RepositoryTO} from "../api";
import {makeStyles} from "@material-ui/styles";
import {
    fetchFileTypes,
    fetchRepositories,
    getArtifact,
    getLatestVersion,
    getSingleRepository,
    getSingleVersion
} from "../store/actions";

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
    }
}))


const EditorContainer: React.FC = observer(() => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory();
    const {t} = useTranslation("common");


    const { artifactId } = useParams<{ artifactId: string }>();
    const { versionId } = useParams<{ versionId: string }>();


    const fileTypes: Array<ArtifactTypeTO> = useSelector((state: RootState) => state.artifacts.fileTypes);
    const repository: RepositoryTO = useSelector((state: RootState) => state.repos.activeRepo);
    const artifact: ArtifactTO = useSelector((state: RootState) => state.artifacts.artifact);
    const createdArtifact: ArtifactTO = useSelector((state: RootState) => state.artifacts.createdArtifact);
    const version: ArtifactVersionTO = useSelector((state: RootState) => state.versions.version);
    const artifactSynced: boolean = useSelector((state: RootState) => state.dataSynced.artifactSynced)
    const versionSynced: boolean = useSelector((state: RootState) => state.dataSynced.versionSynced)



    const [createArtifactOpen, setCreateArtifactOpen] = useState<boolean>(false);
    const [createArtifactType, setCreateArtifactType] = useState<string>("");
    const [artifactOptions, setArtifactOptions] = useState<Array<DropdownButtonItem>>([]);


    useEffect(() => {
        if(!versionSynced || !artifactSynced){
            if (artifactId && (versionId === "latest")) {
                dispatch(getArtifact(artifactId))
                dispatch(getLatestVersion(artifactId))
            }
            if (artifactId && (versionId !== "latest")) {
                dispatch(getArtifact(artifactId))
                dispatch(getSingleVersion(artifactId, versionId))
            }
        }
    }, [dispatch, artifactId, versionId, versionSynced, artifactSynced])



    useEffect(() => {
        if(createdArtifact){
            history.push(`/${createdArtifact.id}/latest`)
        }
    }, [createdArtifact, history])


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
        link: `#/editor/${artifactId}`
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


    //TODO: Add the Create File dropdown again (within CreateContainer, under PathStructure
    /*
                    <DropdownButton
                    type={"default"}
                    title={t("artifact.create")}
                    onClick={() => setCreateArtifactOpen(true)}
                    options={artifactOptions}/>
     */

    return (
        <>
            <div className={classes.createContainer}>

                <PathStructure structure={path} />


            </div>

            {repository &&
                <div className={classes.header}>
                    <div className={classes.title}>
                        <span>{`${repository?.name} /`}</span>
                        <span className={classes.artifact}> {artifact.name}</span>
                    </div>
                    <span className={classes.description}>
                        {artifact.description}
                    </span>
                    <span className={classes.comment}>
                        {version.comment}
                    </span>
                </div>
            }
            <Editor/>



            <CreateArtifactDialog
                open={createArtifactOpen}
                type={createArtifactType}
                onCancelled={() => setCreateArtifactOpen(false)} />

        </>
    );
});

export default EditorContainer;
