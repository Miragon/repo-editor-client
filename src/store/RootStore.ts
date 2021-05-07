import RepoStore from "./RepoStore";
import DiagramStore from "./DiagramStore";
import VersionStore from "./VersionStore";

export default class RootStore{
    repoStore: RepoStore;
    diagramStore: DiagramStore;
    versionStore: VersionStore;

    constructor() {
        this.repoStore = new RepoStore();
        this.diagramStore = new DiagramStore();
        this.versionStore = new VersionStore();
    }
}