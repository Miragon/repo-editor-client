import {makeStyles} from "@material-ui/styles";
import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ArtifactTO, FileTypesTO} from "../../../api/models";
import {fetchArtifactsFromRepo} from "../../../store/actions";
import {RootState} from "../../../store/reducers/rootReducer";
import ArtifactListItem from "./ArtifactListItem";
import {useParams} from "react-router";
import SimpleButton from "../../../components/Form/SimpleButton";
import {Checkbox, FormControlLabel} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    container: {
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap"
    },
    filterContainer: {
        display: "flex",
        flexDirection: "row",
    },
    types: {
        display: "flex",
        flexDirection: "column"
    }
}));

const ArtifactDetails: React.FC = (() => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const { repoId } = useParams<{ repoId: string }>();
    const activeArtifacts: Array<ArtifactTO> = useSelector(
        (state: RootState) => state.artifacts.artifacts
    );
    const synced = useSelector((state: RootState) => state.dataSynced.artifactSynced);
    const fileTypes: Array<FileTypesTO> = useSelector((state: RootState) => state.artifacts.fileTypes)

    const [displayedFileTypes, setDisplayedFileTypes] = useState<Array<string>>(fileTypes.map(type => type.name));
    const [filterOpen, setFilterOpen] = useState<boolean>(false);


    const fetchActiveArtifacts = useCallback((repoId: string) => {
        try {
            dispatch(fetchArtifactsFromRepo(repoId));
        } catch (err) {
            console.log(err);
        }
    }, [dispatch]);

    useEffect(() => {
        if (!synced) {
            fetchActiveArtifacts(repoId);
        }
    }, [synced, fetchActiveArtifacts, repoId]);


    const addOrRemoveFromList = (selectedValue: string) => {
        const currentList = displayedFileTypes
        if(displayedFileTypes.find(fileType => fileType === selectedValue)){
            const index = currentList.indexOf(selectedValue)
            currentList.splice(index, 1)
        }
        else{
            currentList.push(selectedValue)

        }
        //#TODO: Why does the rerender method not start after updating state? (if you click the filter button again, filter options are applied
        setDisplayedFileTypes(currentList)
        
        console.log(displayedFileTypes)
    }
    return (
        <>

            <SimpleButton
                title={"Filter"}
                onClick={() => setFilterOpen(!filterOpen)} />

            {filterOpen &&
                <div className={classes.filterContainer}>
                    <div className={classes.types}>
                        {fileTypes?.map(fileType =>
                            <FormControlLabel
                                key={fileType.name}
                                control={
                                    <Checkbox
                                        defaultChecked={displayedFileTypes.includes(fileType.name)}
                                        onClick={() => {
                                            addOrRemoveFromList(fileType.name)
                                        }}/>}

                                label={fileType.name}/>)}
                    </div>
                </div>
            }


            <div className={classes.container}>
                {activeArtifacts?.map(artifact => (
                    displayedFileTypes.includes(artifact.fileType) ?
                        <ArtifactListItem
                            key={artifact.id}
                            displayed={displayedFileTypes.includes(artifact.fileType)}
                            artifactTitle={artifact.name}
                            image={artifact.svgPreview}
                            updatedDate={artifact.updatedDate}
                            createdDate={artifact.createdDate}
                            description={artifact.description}
                            repoId={artifact.repositoryId}
                            artifactId={artifact.id}
                            fileType={artifact.fileType}/>
                            
                        :

                        <div>Filtered Out</div>
                    
                ))}
            </div>
        </>
    );
});
export default ArtifactDetails;
