export const GET_REPOS = "GET_REPOS";
export const ACTIVE_REPO = "ACTIVE_REPO";
export const ACTIVE_DIAGRAMS = "ACTIVE_DIAGRAMS";
export const GET_FAVORITE = "GET_FAVORITE";
export const GET_RECENT = "GET_RECENT";
export const DIAGRAM_UPLOAD = "DIAGRAM_UPLOAD";
export const UNHANDLEDERROR = "UNHANDLEDERROR";
export const UNHANDLEDERRORRETRY = "UNHANDLEDERRORRETRY";
export const SYNC_STATUS = "SYNC_STATUS";
export const SUCCESS = "SUCCESS";
export const GET_VERSIONS = "GET_VERSIONS";
export const ASSIGNED_USERS = "ASSIGNED_USERS";
export const CURRENT_USER_INFO = "CURRENT_USER_INFO";
export const SEARCH_USERS = "SEARCH_USERS";
export const USERQUERY_EXECUTED = "USERQUERY_EXECUTED";
export const SEARCH_DIAGRAMS = "SEARCH_DIAGRAMS";
export const CREATED_DIAGRAM = "CREATED_DIAGRAM";
export const DEFAULT_BPMN_SVG = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n"
    + "<!-- created with bpmn-js / http://bpmn.io -->\n"
    + "<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n"
    + "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"48\" height=\"48\" viewBox=\"266 206 48 48\" version=\"1.1\"><defs><marker id=\"sequenceflow-end-white-black-6ih3q5btdcklkri32s87g3gfc\" viewBox=\"0 0 20 20\" refX=\"11\" refY=\"10\" markerWidth=\"10\" markerHeight=\"10\" orient=\"auto\"><path d=\"M 1 5 L 11 10 L 1 15 Z\" style=\"fill: black; stroke-width: 1px; stroke-linecap: round; stroke-dasharray: 10000, 1; stroke: black;\"/></marker></defs><g class=\"djs-group\"><g class=\"djs-element djs-shape selected\" data-element-id=\"StartEvent_1\" style=\"display: block;\" transform=\"matrix(1 0 0 1 272 212)\"><g class=\"djs-visual\"><circle cx=\"18\" cy=\"18\" r=\"18\" style=\"stroke: black; stroke-width: 2px; fill: white; fill-opacity: 0.95;\"/></g><rect class=\"djs-hit djs-hit-all\" x=\"0\" y=\"0\" width=\"36\" height=\"36\" style=\"fill: none; stroke-opacity: 0; stroke: white; stroke-width: 15px;\"/><rect x=\"-6\" y=\"-6\" width=\"48\" height=\"48\" class=\"djs-outline\" style=\"fill: none;\"/></g></g></svg>";
export const DEFAULT_DMN_SVG = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
    "<!-- created with dmn-js / http://bpmn.io -->\n" +
    "<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n" +
    "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"192\" height=\"92\" viewBox=\"154 94 192 92\" version=\"1.1\"><defs><marker id=\"association-start\" viewBox=\"0 0 20 20\" refX=\"1\" refY=\"10\" markerWidth=\"10\" markerHeight=\"10\" orient=\"auto\"><path d=\"M 11 5 L 1 10 L 11 15\" style=\"stroke-width: 1.5px; stroke-linecap: round; stroke-dasharray: 10000, 1; fill: none; stroke: black;\"></path></marker><marker id=\"association-end\" viewBox=\"0 0 20 20\" refX=\"12\" refY=\"10\" markerWidth=\"10\" markerHeight=\"10\" orient=\"auto\"><path d=\"M 1 5 L 11 10 L 1 15\" style=\"stroke-width: 1.5px; stroke-linecap: round; stroke-dasharray: 10000, 1; fill: none; stroke: black;\"></path></marker><marker id=\"information-requirement-end\" viewBox=\"0 0 20 20\" refX=\"11\" refY=\"10\" markerWidth=\"20\" markerHeight=\"20\" orient=\"auto\"><path d=\"M 1 5 L 11 10 L 1 15 Z\" style=\"stroke-width: 1px; stroke-linecap: round; stroke-dasharray: 10000, 1;\"></path></marker><marker id=\"knowledge-requirement-end\" viewBox=\"0 0 20 20\" refX=\"11\" refY=\"10\" markerWidth=\"16\" markerHeight=\"16\" orient=\"auto\"><path d=\"M 1 3 L 11 10 L 1 17\" style=\"stroke-width: 2px; stroke-linecap: round; stroke-dasharray: 10000, 1; fill: none; stroke: black;\"></path></marker><marker id=\"authority-requirement-end\" viewBox=\"0 0 20 20\" refX=\"3\" refY=\"3\" markerWidth=\"18\" markerHeight=\"18\" orient=\"auto\"><circle cx=\"3\" cy=\"3\" r=\"3\" style=\"stroke-width: 1px; stroke-linecap: round; stroke-dasharray: 10000, 1;\"></circle></marker></defs><g class=\"djs-group\"><g class=\"djs-element djs-shape\" data-element-id=\"Decision_1x87kk0\" style=\"display: block;\" transform=\"matrix(1 0 0 1 160 100)\"><g class=\"djs-visual\"><rect x=\"0\" y=\"0\" width=\"180\" height=\"80\" rx=\"0\" ry=\"0\" style=\"stroke: black; stroke-width: 2px; fill: white;\"/><text lineHeight=\"1.2\" class=\"djs-label\" style=\"font-family: Arial, sans-serif; font-size: 12px; font-weight: normal;\"><tspan x=\"61.984375\" y=\"43.599999999999994\">Decision 1</tspan></text></g><rect class=\"djs-hit djs-hit-all\" x=\"0\" y=\"0\" width=\"180\" height=\"80\" style=\"fill: none; stroke-opacity: 0; stroke: white; stroke-width: 15px;\"/><rect x=\"-6\" y=\"-6\" width=\"192\" height=\"92\" class=\"djs-outline\" style=\"fill: none;\"/></g></g></svg>";
export const DEFAULT_XML_FILE = "Default XML String";
export const DEFAULT_DMN_FILE = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n"
    + "<definitions xmlns=\"https://www.omg.org/spec/DMN/20191111/MODEL/\" xmlns:dmndi=\"https://www.omg.org/spec/DMN/20191111/DMNDI/\" xmlns:dc=\"http://www.omg.org/spec/DMN/20180521/DC/\" id=\"Definitions_0rtbinw\" name=\"DRD\" namespace=\"http://camunda.org/schema/1.0/dmn\">\n"
    + "  <decision id=\"Decision_07746u8\" name=\"Decision 1\">\n"
    + "    <decisionTable id=\"DecisionTable_170t96n\">\n"
    + "      <input id=\"Input_1\">\n"
    + "        <inputExpression id=\"InputExpression_1\" typeRef=\"string\">\n"
    + "          <text></text>\n"
    + "        </inputExpression>\n"
    + "      </input>\n"
    + "      <output id=\"Output_1\" typeRef=\"string\" />\n"
    + "    </decisionTable>\n"
    + "  </decision>\n"
    + "  <dmndi:DMNDI>\n"
    + "    <dmndi:DMNDiagram>\n"
    + "      <dmndi:DMNShape dmnElementRef=\"Decision_07746u8\">\n"
    + "        <dc:Bounds height=\"80\" width=\"180\" x=\"100\" y=\"100\" />\n"
    + "      </dmndi:DMNShape>\n"
    + "    </dmndi:DMNDiagram>\n"
    + "  </dmndi:DMNDI>\n"
    + "</definitions>\n";
export const LATEST_VERSION = "LATEST_VERSION";
export const DIAGRAMQUERY_EXECUTED = "DIAGRAMQUERY_EXECUTED";