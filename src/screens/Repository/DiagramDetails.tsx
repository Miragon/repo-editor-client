import React, {useCallback, useEffect} from 'react';
import {BpmnDiagramTO, BpmnRepositoryRequestTO} from "../../api/models";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/reducers/rootReducer";
import {makeStyles} from "@material-ui/styles";
import DiagramListItem from "./DiagramListItem";
import {fetchDiagramsFromRepo} from "../../store/actions/diagramAction";
import {Card} from "@material-ui/core";


const useStyles = makeStyles(() => ({
    container: {
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap"
    },
    unstyledButton: {
        all: "unset"
    }
}));

const DiagramDetails: React.FC = (() => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const activeDiagrams: Array<BpmnDiagramTO> = useSelector((state: RootState) => state.activeDiagrams.activeDiagrams)
    const activeRepo: BpmnRepositoryRequestTO = useSelector((state: RootState) => state.activeRepo.activeRepo)
    const synced: boolean = useSelector((state: RootState) => state.dataSynced.dataSynced)

    const fetchActiveDiagrams = useCallback((repoId: string) => {

        try  {
            dispatch(fetchDiagramsFromRepo(repoId))
        } catch (err) {
            console.log(err)
        }
        if(!synced){
            dispatch(fetchDiagramsFromRepo(repoId))
        }
    }, [dispatch, synced])

    useEffect(() => {
        fetchActiveDiagrams(activeRepo?.bpmnRepositoryId)
    }, [fetchActiveDiagrams, activeRepo])

    const openModeler = (repoId: string, diagramId: string) => {
        console.error("err");

        window.open(`/modeler/#/${repoId}/${diagramId}/latest/`, '_blank');
    }

    return (
        <>
      <div className={classes.container}>
          {activeDiagrams?.map(diagram => (
              <Card
                  key={diagram.bpmnDiagramId} >

              <DiagramListItem diagramTitle={diagram.bpmnDiagramName}
                               image={diagram.svgPreview}
                               updatedDate={diagram.updatedDate}
                               createdDate={diagram.createdDate}
                               description={diagram.bpmnDiagramDescription}
                               repoId={diagram.bpmnRepositoryId}
                               diagramId={diagram.bpmnDiagramId}
                                />
              </Card>
          ))}
      </div>
        </>
    );
});
export default DiagramDetails;