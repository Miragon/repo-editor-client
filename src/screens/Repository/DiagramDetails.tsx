import React, {useCallback, useEffect} from 'react';
import {DiagramTO, RepositoryTO} from "../../api/models";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/reducers/rootReducer";
import {makeStyles} from "@material-ui/styles";
import DiagramListItem from "./DiagramListItem";
import {SYNC_STATUS} from "../../store/constants"
import {fetchDiagramsFromRepo} from "../../store/actions/diagramAction";
import {Card} from "@material-ui/core";


const useStyles = makeStyles(() => ({
    container: {
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        backgroundColor: "white"
    },
    unstyledButton: {
        all: "unset"
    }
}));

const DiagramDetails: React.FC = (() => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const activeDiagrams: Array<DiagramTO> = useSelector((state: RootState) => state.activeDiagrams.activeDiagrams)
    const activeRepo: RepositoryTO = useSelector((state: RootState) => state.activeRepo.activeRepo)
    const synced: boolean = useSelector((state: RootState) => state.dataSynced.dataSynced)

    const fetchActiveDiagrams = useCallback((repoId: string) => {

        try {
            if (repoId) {
                dispatch(fetchDiagramsFromRepo(repoId))
            }
        } catch (err) {
            console.log(err)
        }
        if (!synced) {
            dispatch(fetchDiagramsFromRepo(repoId))
            dispatch({type: SYNC_STATUS, dataSynced: true})
        }
    }, [dispatch, synced])


    useEffect(() => {
        fetchActiveDiagrams(activeRepo?.id)
    }, [fetchActiveDiagrams, activeRepo])


    return (
        <>
            <div className={classes.container}>
                {activeDiagrams?.map(diagram => (
                    <Card
                        key={diagram.id}
                    >

                        <DiagramListItem diagramTitle={diagram.name}
                                         image={diagram.svgPreview}
                                         updatedDate={diagram.updatedDate}
                                         createdDate={diagram.createdDate}
                                         description={diagram.description}
                                         repoId={diagram.repositoryId}
                                         diagramId={diagram.id}
                        />
                    </Card>
                ))}
            </div>
        </>
    );
});
export default DiagramDetails;