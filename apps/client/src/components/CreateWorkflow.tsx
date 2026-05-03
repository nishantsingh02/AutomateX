import { useState, useCallback } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Background,
  Controls,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
  type Connection,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { TriggerSheet } from "./TriggerSheet";
import { ActionSheet } from "./ActionSheet";
import { PriceTrigger } from "@/nodes/triggers/priceTrigger";
import type { PriceTriggerNodeMetadeta } from "common/types";
import { Timer } from "@/nodes/triggers/timmer";
import { Lighter } from "@/nodes/actions/Lighter";
import type { TradingMetadata } from "common/types";
import type { TimmerNodeMetadeta } from "common/types";
import { HyperLiquid } from "@/nodes/actions/hyper-liquid";
import { Backpack } from "@/nodes/actions/backpack";
import { useNavigate } from "react-router-dom";
import { apiCreateWorkflow, apiUpdateWorkflow } from "@/lib/api";

import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";

export type NodeKind =
  | "price-trigger"
  | "timer"
  | "hyper-liquid"
  | "backpack"
  | "lighter";

export type NodeMetadata =
  | TradingMetadata
  | PriceTriggerNodeMetadeta
  | TimmerNodeMetadeta;

const nodeTypes = {
  "price-trigger": PriceTrigger,
  "timer": Timer,
  "hyper-liquid": HyperLiquid,
  "backpack": Backpack,
  "lighter": Lighter,
};

interface NodeType {
  type: NodeKind;
  data: {
    kind: "ACTION" | "TRIGGER";
    metadata: NodeMetadata;
  };
  id: string;
  position: { x: number; y: number };
}

interface Edge {
  id: string;
  source: string;
  target: string;
}

interface CreateWorkflowProps {
  initialNodes?: NodeType[];
  initialEdges?: Edge[];
  workflowId?: string;
  mode?: "create" | "edit";
}

export default function CreateWorkflow({
  initialNodes = [],
  initialEdges = [],
  workflowId,
  mode = "create",
}: CreateWorkflowProps = {}) {
  const [nodes, setNodes] = useState<NodeType[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [selectAction, setSelectAction] = useState<{
    position: { x: number; y: number };
    startingNodeId: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [saveError, setSaveError] = useState("");
  const navigate = useNavigate();

  const isEditMode = mode === "edit" && !!workflowId;

  const handleSave = async () => {
    if (nodes.length === 0) return;
    setLoading(true);
    setSaveError("");
    try {
      const backendNodes = nodes.map((node) => ({
        id: node.id,
        nodeId: node.type,
        position: node.position,
        data: {
          kind: node.data.kind,
          metadata: node.data.metadata,
        },
      }));
      if (isEditMode) {
        await apiUpdateWorkflow(workflowId, { nodes: backendNodes, edges });
        navigate(`/workflow/${workflowId}`);
      } else {
        await apiCreateWorkflow({ nodes: backendNodes, edges });
        navigate("/dashboard");
      }
    } catch (err: any) {
      console.error("Failed to save Workflow", err);
      setSaveError(err.response?.data?.message || "Failed to save. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const POSITION_OFFSET = 250;

  const onNodesChange: OnNodesChange = useCallback((changes: any) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  }, []);

  const onEdgesChange: OnEdgesChange = useCallback((changes) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  }, []);

  const onConnect: OnConnect = useCallback((params: Connection) => {
    setEdges((eds) => addEdge(params, eds));
  }, []);

  const onConnectEnd = useCallback((_: any, connectionInfo: any) => {
    if (!connectionInfo.isValid) {
      setSelectAction({
        startingNodeId: connectionInfo.fromNode?.id,
        position: connectionInfo.fromNode?.position
          ? {
              x: connectionInfo.fromNode.position.x + POSITION_OFFSET,
              y: connectionInfo.fromNode.position.y,
            }
          : { x: 250, y: 250 },
      });
    }
  }, []);

  return (
    <div className="w-screen h-screen relative bg-background overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 h-20 border-b bg-background/50 backdrop-blur-md z-30 flex items-center justify-between px-8">
        <h1 className="text-3xl font-extrabold tracking-tight">
          {isEditMode ? "Edit Workflow" : "Create Workflow"}
        </h1>
        <div className="flex items-center gap-4">
          {saveError && (
            <p className="text-sm text-red-500 font-medium">{saveError}</p>
          )}
          <Button
            onClick={handleSave}
            disabled={loading || nodes.length === 0}
            className="rounded-full px-6"
          >
            <Save className="mr-2 h-4 w-4" />
            {loading
              ? "Saving..."
              : isEditMode
                ? "Update Workflow"
                : "Save Workflow"}
          </Button>
        </div>
      </div>

      <div style={{ width: "100vw", height: "100vh" }}>

        {/* TriggerSheet — always open when no nodes */}
        {!isEditMode && !nodes.length && (
          <TriggerSheet
            onSelect={(type, metadata) => {
              setNodes([
                {
                  id: Math.random().toString(),
                  type,
                  data: {
                    kind: "TRIGGER",
                    metadata,
                  },
                  position: { x: 100, y: 100 },
                },
              ]);
            }}
            // onClose={() => {}}
          />
        )}

        {/* ActionSheet — opens when dragging edge to empty space */}
        {selectAction && nodes.length > 0 && (
          <ActionSheet
            onSelect={(type, metadata) => {
              const nodeId = Math.random().toString();
              setNodes((nds) => [
                ...nds,
                {
                  id: nodeId,
                  type,
                  data: {
                    kind: "ACTION",
                    metadata,
                  },
                  position: selectAction.position,
                },
              ]);
              setEdges((eds) => [
                ...eds,
                {
                  id: `${selectAction.startingNodeId}-${nodeId}`,
                  source: selectAction.startingNodeId,
                  target: nodeId,
                },
              ]);
              setSelectAction(null);
            }}
            onClose={() => setSelectAction(null)}
          />
        )}

        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onConnectEnd={onConnectEnd}
          fitView
        >
          <Background
            variant={"dots" as any}
            gap={12}
            size={1}
            color="#cbd5e1"
          />
          <Controls className="bg-background border shadow-md rounded-md p-1 fill-foreground mb-4 ml-4" />
        </ReactFlow>
      </div>
    </div>
  );
}


// import { useState, useCallback } from "react";
// import {
//   ReactFlow,
//   applyNodeChanges,
//   applyEdgeChanges,
//   addEdge,
//   Background,
//   Controls,
//   type OnNodesChange,
//   type OnEdgesChange,
//   type OnConnect,
//   type Connection,
// } from "@xyflow/react";
// import "@xyflow/react/dist/style.css";
// import { TriggerSheet } from "./TriggerSheet";
// import { ActionSheet } from "./ActionSheet";
// import { PriceTrigger } from "@/nodes/triggers/priceTrigger";
// import type { PriceTriggerNodeMetadeta } from "common/types";
// import { Timer } from "@/nodes/triggers/timmer";
// import { Lighter } from "@/nodes/actions/Lighter";
// import type { TradingMetadata } from "common/types";
// import type { TimmerNodeMetadeta } from "common/types";
// import { HyperLiquid } from "@/nodes/actions/hyper-liquid";
// import { Backpack } from "@/nodes/actions/backpack";

// import { useNavigate } from "react-router-dom";
// import { apiCreateWorkflow } from "@/lib/api";
// import { Save } from "lucide-react";
// import { Button } from "@/components/ui/button";

// export type NodeKind =
//   | "price-trigger"
//   | "timer"
//   | "hyper-liquid"
//   | "backpack"
//   | "lighter";
// export type NodeMetadata =
//   | TradingMetadata
//   | PriceTriggerNodeMetadeta
//   | TimmerNodeMetadeta;

// const nodeTypes = {
//   "price-trigger": PriceTrigger,
//   timer: Timer,
//   "hyper-liquid": HyperLiquid,
//   backpack: Backpack,
//   lighter: Lighter,
// };

// interface NodeType {
//   type: NodeKind;
//   data: {
//     kind: "action" | "trigger";
//     metadata: NodeMetadata;
//   };
//   id: string;
//   position: { x: number; y: number };
// }

// interface Edge {
//   id: string;
//   source: string;
//   target: string;
// }

// export default function CreateWorkflow() {
//   const [nodes, setNodes] = useState<NodeType[]>([]);
//   const [edges, setEdges] = useState<Edge[]>([]);
//   const [selectAction, setSelectAction] = useState<{
//     position: {
//       x: number;
//       y: number;
//     };
//     startingNodeId: string;
//   } | null>(null);

//   // const [showTriggerSheet, setShowTriggerSheet] = useState(true)

//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSave = async () => {
//     if (nodes.length === 0) return;
//     setLoading(true);
//     try {
//       // Map frontend nodes to backend format (type -> nodeId)
//       const backendNodes = nodes.map(node => ({
//         id: node.id,
//         nodeId: node.type,
//         position: node.position,
//         data: {
//           kind: node.data.kind.toUpperCase() as "ACTION" | "TRIGGER",
//           metadata: node.data.metadata
//         }
//       }));
//       await apiCreateWorkflow({ nodes: backendNodes, edges });
//       navigate("/dashboard");
//     } catch (err) {
//       console.error("Failed to save Workflow", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const POSSETION_OFFSET = 100;

//   const onNodesChange: OnNodesChange = useCallback((changes: any) => {
//     setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot!));
//   }, []);

//   const onEdgesChange: OnEdgesChange = useCallback((changes) => {
//     setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot!));
//   }, []);

//   const onConnect: OnConnect = useCallback((params: Connection) => {
//     setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot!));
//   }, []);

//   const onConnectEnd = useCallback((params, connectionInfo) => {
//     // console.log(connectionInfo);
//     // user wants to create new node
//     if (!connectionInfo.isValid) {
//       setSelectAction({
//         startingNodeId: connectionInfo.fromNode.id,
//         // position: connectionInfo.to,
//         position: {
//           x: connectionInfo.from.x + POSSETION_OFFSET,
//           y: connectionInfo.from.y + POSSETION_OFFSET,
//         },
//       });
//     }
//   });

//   return (
//     <div className="w-screen h-screen relative bg-background overflow-hidden">
//       {/* header */}
//       <div className="absolute top-0 left-0 right-0 h-20 border-b bg-background/50 backdrop-blur-md z-30 flex items-center justify-between px-8">
//         <h1 className="text-3xl font-extrabold tracking-tight">
//           Create workflow
//         </h1>
//         <Button
//           onClick={handleSave}
//           disabled={loading || nodes.length === 0}
//           className="rounded-full px-6"
//         >
//           <Save className="mr-2 h-4 w-4" />{" "}
//           {loading ? "Saving..." : "Save Workflow"}
//         </Button>
//       </div>

//       <div style={{ width: "100vw", height: "100vh" }}>
//         {/* if there is no node then show TriggerSheet */}

//         {/* this is the one check for the TriggerSheet */}
//         {!nodes?.length && nodes?.length <= 0 && (
//           <TriggerSheet
//             onSelect={(type, metadata) =>
//               setNodes([
//                 ...nodes,
//                 {
//                   id: Math.random().toString(), // random id
//                   type,
//                   data: {
//                     kind: "trigger",
//                     metadata,
//                   },
//                   position: { x: 0, y: 0 },
//                 },
//               ])
//             }
//             // onClose={() => (null)}
//           />
//         )}

//         {/* this is the check for the Action Sheet */}
//         {selectAction && nodes?.length > 0 && (
//           <ActionSheet
//             onSelect={(type, metadata) => {
//               const nodeId = Math.random().toString();
//               setNodes([
//                 ...nodes,
//                 {
//                   id: nodeId, // id of new genrated node
//                   type,
//                   data: {
//                     kind: "action",
//                     metadata,
//                   },
//                   position: selectAction.position,
//                 },
//               ]);
//               setEdges([
//                 ...edges,
//                 {
//                   id: `${selectAction.startingNodeId}-${nodeId}`,
//                   source: selectAction.startingNodeId, // node Ids
//                   target: nodeId, // nodeIDs
//                 },
//               ]);
//             }}
//             onClose={() => setSelectAction(null)}
//           />
//         )}

//         {/* Add an empty state with a button to re-open: */}
//         {/* {!nodes.length && (
//           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-4">
//             <p className="text-muted-foreground">No steps added yet</p>
//             <Button>
//               Add Trigger to Start
//             </Button>
//           </div>
//         )} */}

//         <ReactFlow
//           nodes={nodes}
//           edges={edges}
//           nodeTypes={nodeTypes}
//           onNodesChange={onNodesChange}
//           onEdgesChange={onEdgesChange}
//           onConnect={onConnect}
//           onConnectEnd={onConnectEnd}
//           fitView
//         >
//           <Background
//             variant={"dots" as any}
//             gap={12}
//             size={1}
//             color="#cbd5e1"
//           />
//           <Controls className="bg-background border shadow-md rounded-md p-1 fill-foreground mb-4 ml-4" />
//         </ReactFlow>
//       </div>
//     </div>
//   );
// }
