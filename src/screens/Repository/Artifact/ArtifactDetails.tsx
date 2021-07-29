import {makeStyles} from "@material-ui/styles";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ArtifactTO, FileTypesTO} from "../../../api";
import {fetchArtifactsFromRepo} from "../../../store/actions";
import {RootState} from "../../../store/reducers/rootReducer";
import ArtifactListItem from "./ArtifactListItem";
import {useParams} from "react-router";
import SimpleButton from "../../../components/Form/SimpleButton";
import {Checkbox, FormControlLabel, Radio, RadioGroup} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import ArtifactManagementContainer from "../Administration/ArtifactManagementContainer";


const useStyles = makeStyles(() => ({
    container: {
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap"
    },
    buttonContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: "1rem"
    },
    filterContainer: {
        display: "flex",
        flexDirection: "row",
    },
    types: {
        display: "flex",
        flexDirection: "column"
    },
    sort: {
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
    const [filteredArtifacts, setFilteredArtifacts] = useState<Array<ArtifactTO>>(activeArtifacts);
    const [filterOpen, setFilterOpen] = useState<boolean>(false);
    const [sortValue, setSortValue] = useState<string>("lastEdited");




    useEffect(() => {
        setFilteredArtifacts(activeArtifacts)
    }, [activeArtifacts])

    useEffect(() => {
        dispatch(fetchArtifactsFromRepo(repoId))
    }, [dispatch, repoId])


    useEffect(() => {
        if (!synced) {
            dispatch(fetchArtifactsFromRepo(repoId))
        }
    }, [dispatch, synced, repoId]);


    const changeFileTypeFilter = (selectedValue: string) => {
        const currentList = displayedFileTypes
        if(displayedFileTypes.find(fileType => fileType === selectedValue)){
            currentList.splice(currentList.indexOf(selectedValue), 1)
        }
        else{
            currentList.push(selectedValue)
        }
        setDisplayedFileTypes(currentList)
        applyFilters()
    }

    const applyFilters = () => {
        setFilteredArtifacts(activeArtifacts.filter(artifact => displayedFileTypes.includes(artifact.fileType)))

    }

    const handleChangeSorting = (event: React.FormEvent<HTMLInputElement>) => {
        setSortValue((event.target as HTMLInputElement).value)
        sort((event.target as HTMLInputElement).value);
    }

    const sort = (value: string) => {
        switch (value){
            case "created":
                setFilteredArtifacts(filteredArtifacts.sort(compareCreated));
                return;
            case "lastEdited":
                setFilteredArtifacts(filteredArtifacts.sort(compareEdited));
                return;
            case "name":
                setFilteredArtifacts(filteredArtifacts.sort(compareName));
                return;
        }
    }

    const compareCreated = (a: ArtifactTO, b: ArtifactTO) => {
        if(a.createdDate < b.createdDate) {
            return -1;
        }
        if(a.createdDate > b.createdDate) {
            return 1;
        }
        return 0;
    }
    const compareEdited = (a: ArtifactTO, b: ArtifactTO) => {

        if(a.updatedDate < b.updatedDate) {
            return -1;
        }
        if(a.updatedDate > b.updatedDate) {
            return 1;
        }
        return 0;
    }
    const compareName = (a: ArtifactTO, b: ArtifactTO) => {
        if(a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
        }
        if(a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
        }
        return 0;
    }

    return (
        <>
            <div className={classes.buttonContainer}>
                <SimpleButton
                    title={"Filter"}
                    onClick={() => setFilterOpen(!filterOpen)} />
                <ArtifactManagementContainer/>
            </div>





            {filterOpen &&
                <div className={classes.filterContainer}>
                    <div className={classes.types}>
                        {fileTypes?.map(fileType =>
                            <FormControlLabel
                                key={fileType.name}
                                control={
                                    <Checkbox
                                        defaultChecked
                                        onClick={() => {
                                            changeFileTypeFilter(fileType.name)
                                        }}/>}

                                label={fileType.name}/>)}
                    </div>




                    <div className={classes.sort}>
                        <FormControl component="fieldset">
                            <RadioGroup value={sortValue} onChange={handleChangeSorting} defaultValue={"lastEdited"}>
                                <FormControlLabel
                                    value={"lastEdited"}
                                    control={<Radio/>}
                                    label={"Last edited"} />
                                <FormControlLabel
                                    value={"name"}
                                    control={<Radio/>}
                                    label={"Name"} />
                                <FormControlLabel
                                    value={"created"}
                                    control={<Radio/>}
                                    label={"Created"} />
                            </RadioGroup>
                        </FormControl>
                    </div>



                </div>
            }


            <div className={classes.container}>
                {filteredArtifacts?.map(artifact => (
                    <ArtifactListItem
                        key={artifact.id}
                        artifactTitle={artifact.name}
                        image={artifact.svgPreview}
                        updatedDate={artifact.updatedDate}
                        createdDate={artifact.createdDate}
                        description={artifact.description}
                        repoId={artifact.repositoryId}
                        artifactId={artifact.id}
                        fileType={artifact.fileType}/>
                    
                ))}
            </div>
        </>
    );
});
export default ArtifactDetails;
