import { observer } from "mobx-react";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import DropdownButton, { DropdownButtonItem } from "../../components/Form/DropdownButton";
import CreateDiagramDialog from "../CreateContainer/CreateDiagramDialog";
import UploadDiagramDialog from "../CreateContainer/UploadDiagramDialog";
import { RepositoryTO } from "../../api/models";
import { RootState } from "../../store/reducers/rootReducer";

const useStyles = makeStyles(() => ({
    container: {
        display: "flex",
        justifyContent: "flex-end",
        marginBottom: "1rem"
    },
    diagramButton: {
        minWidth: "180px"
    }
}));

const CreateDiagramContainer: React.FC = observer(() => {
    const classes = useStyles();
    const [uploadDiagramOpen, setUploadDiagramOpen] = useState(false);
    const [createDiagramOpen, setCreateDiagramOpen] = useState(false);
    const [createDiagramType, setCreateDiagramType] = useState<"bpmn" | "dmn">("bpmn");
    const activeRepo: RepositoryTO = useSelector((state: RootState) => state.activeRepo.activeRepo);

    const diagramOptions: DropdownButtonItem[] = [
        {
            id: "bpmn",
            label: "Create BPMN Diagram",
            type: "button",
            onClick: () => {
                setCreateDiagramOpen(true);
                setCreateDiagramType("bpmn");
            }
        },
        {
            id: "dmn",
            label: "Create DMN Diagram",
            type: "button",
            onClick: () => {
                setCreateDiagramOpen(true);
                setCreateDiagramType("dmn");
            }
        },
        {
            id: "divider1",
            type: "divider",
            label: "",
            onClick: () => { /* Do nothing */
            }
        },
        {
            id: "upload",
            label: "Upload Diagram",
            type: "button",
            onClick: () => setUploadDiagramOpen(true)
        },
        {
            id: "import",
            label: "Import from Cawemo",
            type: "button",
            // eslint-disable-next-line no-console
            onClick: () => console.log("Import")
        }
    ];

    return (
        <>
            <div className={classes.container}>
                <DropdownButton
                    className={classes.diagramButton}
                    title="Add Diagram"
                    options={diagramOptions} />
            </div>

            <CreateDiagramDialog
                open={createDiagramOpen}
                type={createDiagramType}
                onCancelled={() => setCreateDiagramOpen(false)}
                repo={activeRepo} />

            <UploadDiagramDialog
                open={uploadDiagramOpen}
                onCancelled={() => setUploadDiagramOpen(false)}
                repo={activeRepo} />
        </>
    );
});

export default CreateDiagramContainer;
