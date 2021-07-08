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
export const DEFAULT_BPMN_SVG = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
    "<!-- created with bpmn-js / http://bpmn.io -->\n" +
    "<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n" +
    "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"287\" height=\"92\" viewBox=\"167 74 287 92\" version=\"1.1\"><defs><marker id=\"sequenceflow-end-white-black-egrhm21ehmhmllnvjlm26ue3z\" viewBox=\"0 0 20 20\" refX=\"11\" refY=\"10\" markerWidth=\"10\" markerHeight=\"10\" orient=\"auto\"><path d=\"M 1 5 L 11 10 L 1 15 Z\" style=\"fill: black; stroke-width: 1px; stroke-linecap: round; stroke-dasharray: 10000, 1; stroke: black;\"/></marker></defs><g class=\"djs-group\"><g class=\"djs-element djs-connection\" data-element-id=\"Flow_1btmw3a\" style=\"display: block;\"><g class=\"djs-visual\"><path d=\"m  209,120L260,120 \" style=\"fill: none; stroke-width: 2px; stroke: black; stroke-linejoin: round; marker-end: url('#sequenceflow-end-white-black-egrhm21ehmhmllnvjlm26ue3z');\"/></g><polyline points=\"209,120 260,120 \" class=\"djs-hit djs-hit-stroke\" style=\"fill: none; stroke-opacity: 0; stroke: white; stroke-width: 15px;\"/><rect x=\"203\" y=\"114\" width=\"63\" height=\"12\" class=\"djs-outline\" style=\"fill: none;\"/></g></g><g class=\"djs-group\"><g class=\"djs-element djs-connection\" data-element-id=\"Flow_0m4j7xp\" style=\"display: block;\"><g class=\"djs-visual\"><path d=\"m  360,120L412,120 \" style=\"fill: none; stroke-width: 2px; stroke: black; stroke-linejoin: round; marker-end: url('#sequenceflow-end-white-black-egrhm21ehmhmllnvjlm26ue3z');\"/></g><polyline points=\"360,120 412,120 \" class=\"djs-hit djs-hit-stroke\" style=\"fill: none; stroke-opacity: 0; stroke: white; stroke-width: 15px;\"/><rect x=\"354\" y=\"114\" width=\"64\" height=\"12\" class=\"djs-outline\" style=\"fill: none;\"/></g></g><g class=\"djs-group\"><g class=\"djs-element djs-shape\" data-element-id=\"StartEvent_1\" style=\"display: block;\" transform=\"matrix(1 0 0 1 173 102)\"><g class=\"djs-visual\"><circle cx=\"18\" cy=\"18\" r=\"18\" style=\"stroke: black; stroke-width: 2px; fill: white; fill-opacity: 0.95;\"/></g><rect class=\"djs-hit djs-hit-all\" x=\"0\" y=\"0\" width=\"36\" height=\"36\" style=\"fill: none; stroke-opacity: 0; stroke: white; stroke-width: 15px;\"/><rect x=\"-6\" y=\"-6\" width=\"48\" height=\"48\" class=\"djs-outline\" style=\"fill: none;\"/></g></g><g class=\"djs-group\"><g class=\"djs-element djs-shape\" data-element-id=\"Activity_0lwu3p2\" style=\"display: block;\" transform=\"matrix(1 0 0 1 260 80)\"><g class=\"djs-visual\"><rect x=\"0\" y=\"0\" width=\"100\" height=\"80\" rx=\"10\" ry=\"10\" style=\"stroke: black; stroke-width: 2px; fill: white; fill-opacity: 0.95;\"/><text lineHeight=\"1.2\" class=\"djs-label\" style=\"font-family: Arial, sans-serif; font-size: 12px; font-weight: normal; fill: black;\"><tspan x=\"50\" y=\"43.599999999999994\"/></text></g><rect class=\"djs-hit djs-hit-all\" x=\"0\" y=\"0\" width=\"100\" height=\"80\" style=\"fill: none; stroke-opacity: 0; stroke: white; stroke-width: 15px;\"/><rect x=\"-6\" y=\"-6\" width=\"112\" height=\"92\" class=\"djs-outline\" style=\"fill: none;\"/></g></g><g class=\"djs-group\"><g class=\"djs-element djs-shape selected\" data-element-id=\"Event_0pf42bb\" style=\"display: block;\" transform=\"matrix(1 0 0 1 412 102)\"><g class=\"djs-visual\"><circle cx=\"18\" cy=\"18\" r=\"18\" style=\"stroke: black; stroke-width: 4px; fill: white; fill-opacity: 0.95;\"/></g><rect class=\"djs-hit djs-hit-all\" x=\"0\" y=\"0\" width=\"36\" height=\"36\" style=\"fill: none; stroke-opacity: 0; stroke: white; stroke-width: 15px;\"/><rect x=\"-6\" y=\"-6\" width=\"48\" height=\"48\" class=\"djs-outline\" style=\"fill: none;\"/></g></g></svg>";
export const DEFAULT_DMN_SVG = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
    "<!-- created with dmn-js / http://bpmn.io -->\n" +
    "<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n" +
    "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"192\" height=\"92\" viewBox=\"154 94 192 92\" version=\"1.1\"><defs><marker id=\"association-start\" viewBox=\"0 0 20 20\" refX=\"1\" refY=\"10\" markerWidth=\"10\" markerHeight=\"10\" orient=\"auto\"><path d=\"M 11 5 L 1 10 L 11 15\" style=\"stroke-width: 1.5px; stroke-linecap: round; stroke-dasharray: 10000, 1; fill: none; stroke: black;\"></path></marker><marker id=\"association-end\" viewBox=\"0 0 20 20\" refX=\"12\" refY=\"10\" markerWidth=\"10\" markerHeight=\"10\" orient=\"auto\"><path d=\"M 1 5 L 11 10 L 1 15\" style=\"stroke-width: 1.5px; stroke-linecap: round; stroke-dasharray: 10000, 1; fill: none; stroke: black;\"></path></marker><marker id=\"information-requirement-end\" viewBox=\"0 0 20 20\" refX=\"11\" refY=\"10\" markerWidth=\"20\" markerHeight=\"20\" orient=\"auto\"><path d=\"M 1 5 L 11 10 L 1 15 Z\" style=\"stroke-width: 1px; stroke-linecap: round; stroke-dasharray: 10000, 1;\"></path></marker><marker id=\"knowledge-requirement-end\" viewBox=\"0 0 20 20\" refX=\"11\" refY=\"10\" markerWidth=\"16\" markerHeight=\"16\" orient=\"auto\"><path d=\"M 1 3 L 11 10 L 1 17\" style=\"stroke-width: 2px; stroke-linecap: round; stroke-dasharray: 10000, 1; fill: none; stroke: black;\"></path></marker><marker id=\"authority-requirement-end\" viewBox=\"0 0 20 20\" refX=\"3\" refY=\"3\" markerWidth=\"18\" markerHeight=\"18\" orient=\"auto\"><circle cx=\"3\" cy=\"3\" r=\"3\" style=\"stroke-width: 1px; stroke-linecap: round; stroke-dasharray: 10000, 1;\"></circle></marker></defs><g class=\"djs-group\"><g class=\"djs-element djs-shape\" data-element-id=\"Decision_1x87kk0\" style=\"display: block;\" transform=\"matrix(1 0 0 1 160 100)\"><g class=\"djs-visual\"><rect x=\"0\" y=\"0\" width=\"180\" height=\"80\" rx=\"0\" ry=\"0\" style=\"stroke: black; stroke-width: 2px; fill: white;\"/><text lineHeight=\"1.2\" class=\"djs-label\" style=\"font-family: Arial, sans-serif; font-size: 12px; font-weight: normal;\"><tspan x=\"61.984375\" y=\"43.599999999999994\">Decision 1</tspan></text></g><rect class=\"djs-hit djs-hit-all\" x=\"0\" y=\"0\" width=\"180\" height=\"80\" style=\"fill: none; stroke-opacity: 0; stroke: white; stroke-width: 15px;\"/><rect x=\"-6\" y=\"-6\" width=\"192\" height=\"92\" class=\"djs-outline\" style=\"fill: none;\"/></g></g></svg>";
export const DEFAULT_XML_FILE = "&lt;bpmn:definitions xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot; xmlns:bpmn=&quot;http://www.omg.org/spec/BPMN/20100524/MODEL&quot; xmlns:bpmndi=&quot;http://www.omg.org/spec/BPMN/20100524/DI&quot; xmlns:dc=&quot;http://www.omg.org/spec/DD/20100524/DC&quot; xmlns:di=&quot;http://www.omg.org/spec/DD/20100524/DI&quot; id=&quot;Definitions_1&quot; targetNamespace=&quot;http://bpmn.io/schema/bpmn&quot;&gt;\n" +
    "  &lt;bpmn:process id=&quot;Process_1&quot; isExecutable=&quot;false&quot;&gt;\n" +
    "    &lt;bpmn:startEvent id=&quot;StartEvent_1&quot;&gt;\n" +
    "      &lt;bpmn:outgoing&gt;Flow_1btmw3a&lt;/bpmn:outgoing&gt;\n" +
    "    &lt;/bpmn:startEvent&gt;\n" +
    "    &lt;bpmn:task id=&quot;Activity_0lwu3p2&quot;&gt;\n" +
    "      &lt;bpmn:incoming&gt;Flow_1btmw3a&lt;/bpmn:incoming&gt;\n" +
    "      &lt;bpmn:outgoing&gt;Flow_0m4j7xp&lt;/bpmn:outgoing&gt;\n" +
    "    &lt;/bpmn:task&gt;\n" +
    "    &lt;bpmn:sequenceFlow id=&quot;Flow_1btmw3a&quot; sourceRef=&quot;StartEvent_1&quot; targetRef=&quot;Activity_0lwu3p2&quot; /&gt;\n" +
    "    &lt;bpmn:endEvent id=&quot;Event_0pf42bb&quot;&gt;\n" +
    "      &lt;bpmn:incoming&gt;Flow_0m4j7xp&lt;/bpmn:incoming&gt;\n" +
    "    &lt;/bpmn:endEvent&gt;\n" +
    "    &lt;bpmn:sequenceFlow id=&quot;Flow_0m4j7xp&quot; sourceRef=&quot;Activity_0lwu3p2&quot; targetRef=&quot;Event_0pf42bb&quot; /&gt;\n" +
    "  &lt;/bpmn:process&gt;\n" +
    "  &lt;bpmndi:BPMNDiagram id=&quot;BPMNDiagram_1&quot;&gt;\n" +
    "    &lt;bpmndi:BPMNPlane id=&quot;BPMNPlane_1&quot; bpmnElement=&quot;Process_1&quot;&gt;\n" +
    "      &lt;bpmndi:BPMNEdge id=&quot;Flow_1btmw3a_di&quot; bpmnElement=&quot;Flow_1btmw3a&quot;&gt;\n" +
    "        &lt;di:waypoint x=&quot;209&quot; y=&quot;120&quot; /&gt;\n" +
    "        &lt;di:waypoint x=&quot;260&quot; y=&quot;120&quot; /&gt;\n" +
    "      &lt;/bpmndi:BPMNEdge&gt;\n" +
    "      &lt;bpmndi:BPMNEdge id=&quot;Flow_0m4j7xp_di&quot; bpmnElement=&quot;Flow_0m4j7xp&quot;&gt;\n" +
    "        &lt;di:waypoint x=&quot;360&quot; y=&quot;120&quot; /&gt;\n" +
    "        &lt;di:waypoint x=&quot;412&quot; y=&quot;120&quot; /&gt;\n" +
    "      &lt;/bpmndi:BPMNEdge&gt;\n" +
    "      &lt;bpmndi:BPMNShape id=&quot;_BPMNShape_StartEvent_2&quot; bpmnElement=&quot;StartEvent_1&quot;&gt;\n" +
    "        &lt;dc:Bounds x=&quot;173&quot; y=&quot;102&quot; width=&quot;36&quot; height=&quot;36&quot; /&gt;\n" +
    "      &lt;/bpmndi:BPMNShape&gt;\n" +
    "      &lt;bpmndi:BPMNShape id=&quot;Activity_0lwu3p2_di&quot; bpmnElement=&quot;Activity_0lwu3p2&quot;&gt;\n" +
    "        &lt;dc:Bounds x=&quot;260&quot; y=&quot;80&quot; width=&quot;100&quot; height=&quot;80&quot; /&gt;\n" +
    "      &lt;/bpmndi:BPMNShape&gt;\n" +
    "      &lt;bpmndi:BPMNShape id=&quot;Event_0pf42bb_di&quot; bpmnElement=&quot;Event_0pf42bb&quot;&gt;\n" +
    "        &lt;dc:Bounds x=&quot;412&quot; y=&quot;102&quot; width=&quot;36&quot; height=&quot;36&quot; /&gt;\n" +
    "      &lt;/bpmndi:BPMNShape&gt;\n" +
    "    &lt;/bpmndi:BPMNPlane&gt;\n" +
    "  &lt;/bpmndi:BPMNDiagram&gt;\n" +
    "&lt;/bpmn:definitions&gt;\n"
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