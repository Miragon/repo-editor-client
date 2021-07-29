import {makeStyles} from "@material-ui/styles";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ArtifactTO, FileTypesTO} from "../../../api";
import {fetchArtifactsFromRepo} from "../../../store/actions";
import {RootState} from "../../../store/reducers/rootReducer";
import ArtifactListItem from "./ArtifactListItem";
import {useParams} from "react-router";
import ArtifactManagementContainer from "../Administration/ArtifactManagementContainer";
import theme from "../../../theme";
import FilterDropdownButton from "./FilterDropdownButton";
import {DropdownButtonItem} from "../../../components/Form/DropdownButton";
import SortDropdownButton from "./SortDropdownButton";
import {useTranslation} from "react-i18next";


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
    },
    popup: {
        borderTopLeftRadius: "0px",
        borderTopRightRadius: "0px",
        backgroundColor: theme.palette.secondary.main,
    },
    list: {
        outline: "none"
    },
    menuItem: {
        color: theme.palette.secondary.contrastText,
        fontSize: theme.typography.button.fontSize,
        fontWeight: theme.typography.button.fontWeight,
        "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.1)"
        }
    },
    button: {
        textTransform: "none",
        fontWeight: 600,
        transition: theme.transitions.create("border-radius"),
        "&:hover": {
            backgroundColor: theme.palette.secondary.main
        }
    },
    spacer: {
        marginLeft: "10px"
    }
}));

const ArtifactDetails: React.FC = (() => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {t} = useTranslation("common");

    const { repoId } = useParams<{ repoId: string }>();
    const activeArtifacts: Array<ArtifactTO> = useSelector(
        (state: RootState) => state.artifacts.artifacts
    );
    const synced = useSelector((state: RootState) => state.dataSynced.artifactSynced);
    const fileTypes: Array<FileTypesTO> = useSelector((state: RootState) => state.artifacts.fileTypes)

    const [displayedFileTypes, setDisplayedFileTypes] = useState<Array<string>>(fileTypes.map(type => type.name));
    const [filteredArtifacts, setFilteredArtifacts] = useState<Array<ArtifactTO>>(activeArtifacts);
    const [sortValue, setSortValue] = useState<string>("lastEdited");


    useEffect(() => {
        dispatch(fetchArtifactsFromRepo(repoId))
    }, [dispatch, repoId])

    useEffect(() => {
        if (!synced) {
            dispatch(fetchArtifactsFromRepo(repoId))
        }
    }, [dispatch, synced, repoId]);

    useEffect(() => {
        setFilteredArtifacts(activeArtifacts)
    }, [activeArtifacts])



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
        sort(sortValue)
    }


    const sort = (value: string) => {
        switch (value){
            case "created":
                setSortValue("created")
                setFilteredArtifacts(filteredArtifacts.sort(compareCreated));
                return;
            case "lastEdited":
                setSortValue("lastEdited")
                setFilteredArtifacts(filteredArtifacts.sort(compareEdited));
                return;
            case "name":
                setSortValue("name")
                setFilteredArtifacts(filteredArtifacts.sort(compareName));
                return;
        }
    }

    const compareCreated = (a: ArtifactTO, b: ArtifactTO) => {
        const c = new Date(a.createdDate)
        const d = new Date(b.createdDate)
        if(c < d) {
            return 1;
        }
        if(c > d) {
            return -1;
        }
        return 0;
    }
    const compareEdited = (a: ArtifactTO, b: ArtifactTO) => {
        const c = new Date(a.updatedDate)
        const d = new Date(b.updatedDate)
        if(c < d) {
            return 1;
        }
        if(c > d) {
            return -1;
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


    const filterOptions: DropdownButtonItem[] = [];
    fileTypes.map(fileType => (
        filterOptions.push(
            {
                id: fileType.name,
                label: fileType.name,
                type: "button",
                onClick: () => {
                    changeFileTypeFilter(fileType.name)
                }
            }
        )
    ))

    const sortOptions: DropdownButtonItem[] = [
        {
            id: "created",
            label: t("sort.created"),
            type: "button",
            onClick: () => {
                sort("created")
            }
        },
        {
            id: "lastEdited",
            label: t("sort.lastEdited"),
            type: "button",
            onClick: () => {
                sort("lastEdited")
            }
        },
        {
            id: "name",
            label: t("sort.name"),
            type: "button",
            onClick: () => {
                sort("name")

            }
        },
    ]




    return (
        <>
            <div className={classes.buttonContainer}>
                <div>
                    <FilterDropdownButton title={t("filter.filter")} options={filterOptions} />
                    <SortDropdownButton title={t("sort.sort")} options={sortOptions} defaultValue={"lastEdited"} className={classes.spacer}/>
                </div>
                <ArtifactManagementContainer/>
            </div>




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
