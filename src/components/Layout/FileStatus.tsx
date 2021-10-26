import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/reducers/rootReducer";
import {Snackbar} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {useParams} from "react-router";
import {lockArtifact, unlockArtifact} from "../../store/actions";
import Button from "@material-ui/core/Button";
import {ArtifactMilestoneTO, ArtifactTO, UserInfoTO} from "../../api";
import helpers from "../../util/helperFunctions";
import {DEPLOYED, LOCKED, READONLY, READYTOEDIT, READYTOLOCK} from "../../store/reducers/fileStatusReducer";
import {DateTime} from "luxon";


const FileStatus: React.FC = props => {
    const {t} = useTranslation("common");
    const dispatch = useDispatch();
    const currentUser: UserInfoTO = useSelector((state: RootState) => state.users.currentUserInfo);

    const { artifactId } = useParams<{ artifactId: string }>();

    const artifact: ArtifactTO = useSelector((state: RootState) => state.artifacts.artifact)
    const milestone: ArtifactMilestoneTO = useSelector((state: RootState) => state.milestones.milestone)
    const status: string = useSelector((state: RootState) => state.fileStatus.status);
    const info: string = useSelector((state: RootState) => state.fileStatus.info);

    useEffect(() => {
        if(artifact && milestone) {
            if (!milestone.latestMilestone || milestone.deployments.length > 0) {
                if(!milestone.latestMilestone){
                    dispatch({type: READONLY})
                }
                if(milestone.deployments.length > 0){
                    dispatch({type: DEPLOYED})
                }
            } else {
                if (artifact.lockedUntil) {
                    //Locked by active user
                    if (artifact.lockedBy !== null && artifact.lockedBy === currentUser.username) {
                    //Lock is still active
                        if (DateTime.fromISO(artifact.lockedUntil) > DateTime.now()) {
                            dispatch({type: READYTOEDIT})
                        } else {
                            dispatch({type: READYTOLOCK})
                        }
                    //Locked by another user
                    } else {
                    //Lock is still active
                        if (DateTime.fromISO(artifact.lockedUntil) > DateTime.now()) {
                            dispatch({type: LOCKED})
                        } else {
                            dispatch({type: READYTOLOCK})
                        }
                    }
                //No entry in the locked until field
                } else {
                    dispatch({type: READYTOLOCK})
                }
            }
        }
    }, [artifact, currentUser, dispatch, milestone])

    const openLatestFile = () => {
        artifact ? window.open(`/editor/#/${artifact.id}/latest`, "_blank") : console.log("no artifact");
    }

    const lockAndEdit = useCallback(() => {
        artifact ?
            lockArtifact(artifact.id).then(response => {
                if (Math.floor(response.status / 100) === 2) {
                    dispatch({type: READYTOEDIT})
                } else {
                    helpers.makeErrorToast(t(response.data.toString()), () => lockAndEdit())
                }
            }, error => {
                helpers.makeErrorToast(t(error.response.data), () => lockAndEdit())
            })
            :
            console.log("no artifact")
    }, [artifact, dispatch, t])


    let action = (<></>);
    
    const snackBar = (): JSX.Element => {
        switch (status) {
            case "locked":
                action = (
                    <React.Fragment>
                        <Button color="secondary" size="small" onClick={() => window.location.reload()}>
                            {t("fileStatus.action.reload")}
                        </Button>
                    </React.Fragment>
                )
                return <Snackbar open={true} anchorOrigin={{ vertical: "top", horizontal: "center" }} message={t(info)}/>


            case "readyToLock":
                action = (
                    <React.Fragment>
                        <Button color="secondary" size="small" onClick={() => lockAndEdit()}>
                            {t("fileStatus.action.lock")}
                        </Button>
                    </React.Fragment>
                )
                return <Snackbar open={true} anchorOrigin={{ vertical: "top", horizontal: "center" }} message={t(info)} action={action}/>
                

            case "readOnly":
                action = (
                    <React.Fragment>
                        <Button color="secondary" size="small" onClick={() => openLatestFile()}>
                            {t("fileStatus.action.openRecent")}
                        </Button>
                    </React.Fragment>
                )
                return <Snackbar open={true} anchorOrigin={{ vertical: "top", horizontal: "center" }} message={t(info)} action={action}/>
            
            case "readyToEdit":
                action = (
                    <React.Fragment>
                        <Button color="secondary" size="small" onClick={() => unlockArtifact(artifactId)}>
                            {t("fileStatus.action.endEditing")}
                        </Button>
                    </React.Fragment>
                )
                return <Snackbar open={true} anchorOrigin={{ vertical: "top", horizontal: "center" }} message={t(info)} action={action}/>

            case "saveError":
                action = (
                    <React.Fragment>
                        <Button color="secondary" size="small" onClick={() => openLatestFile()} >
                            {t("fileStatus.action.openRecent")}
                        </Button>
                    </React.Fragment>
                )
                return <Snackbar open={true} anchorOrigin={{ vertical: "top", horizontal: "center" }} message={t(info)} action={action}/>

            case "deployed":

                return <Snackbar open={true} anchorOrigin={{ vertical: "top", horizontal: "center" }} message={t(info)} />


            default:
                return <></>


        }
    }
    

    return (
        <>
            {
                snackBar()
            }

        </>
    );
}

export default FileStatus