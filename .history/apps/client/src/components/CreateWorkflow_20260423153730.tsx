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
import {PriceTrigger} from "@/nodes/triggers/priceTrigger";
import type { PriceTriggerNodeMetadeta } from "common/types";
import { Timer } from "@/nodes/triggers/timmer";
import { Lighter} from "@/nodes/actions/Lighter";
import type { TradingMetadata } from "common/types";
import type { TimmerNodeMetadeta } from "common/types";
import { HyperLiquid } from "@/nodes/actions/hyper-liquid";
import { Backpack } from "@/nodes/actions/backpack";

import { useNavigate } from "react-router-dom";
import { apiCreateWorkflow } from "@/lib/api";
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
    kind: "action" | "trigger";
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

export default function CreateWorkflow() {
  const [nodes, setNodes] = useState<NodeType[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectAction, setSelectAction] = useState<{
    position: {
      x: number;
      y: number;
    };
    startingNodeId: string;
  } | null>(null);


  const [loading, setLoading ] = useState(false);
  const navigate = useNavigate();

  const handleSave = () => {
    if (nodes.length)
  }

  const POSSETION_OFFSET = 100

  const onNodesChange: OnNodesChange = useCallback((changes: any) => {
    setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot!));
  }, []);

  const onEdgesChange: OnEdgesChange = useCallback((changes) => {
    setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot!));
  }, []);

  const onConnect: OnConnect = useCallback((params: Connection) => {
    setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot!));
  }, []);

  const onConnectEnd = useCallback((params, connectionInfo) => {
    // console.log(connectionInfo);
    // user wants to create new node
    if (!connectionInfo.isValid) {
      setSelectAction({
        startingNodeId: connectionInfo.fromNode.id,
        // position: connectionInfo.to,
        position: {
          x: connectionInfo.from.x + POSSETION_OFFSET,
          y: connectionInfo.from.y + POSSETION_OFFSET
        }
      });
    }
  });

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      {/* if there is no node then show TriggerSheet */}

      {/* this is the one check for the TriggerSheet */}
      {!nodes?.length && nodes?.length <= 0 && (
        <TriggerSheet
          onSelect={(type, metadata) =>
            setNodes([
              ...nodes,
              {
                id: Math.random().toString(), // random id
                type,
                data: {
                  kind: "trigger",
                  metadata,
                },
                position: { x: 0, y: 0 },
              },
            ])
          }
          // onClose={() => {}}
        />
      )}

      {/* this is the check for the Action Sheet */}
      {selectAction && nodes?.length > 0 && (
        <ActionSheet
          onSelect={(type, metadata) => {
            const nodeId = Math.random().toString();
            setNodes([
              ...nodes,
              {
                id: nodeId, // id of new genrated node
                type,
                data: {
                  kind: "action",
                  metadata,
                },
                position: selectAction.position,
              },
            ]);
            setEdges([
              ...edges,
              {
                id: `${selectAction.startingNodeId}-${nodeId}`,
                source: selectAction.startingNodeId, // node Ids
                target: nodeId, // nodeIDs
              },
            ]);
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
      />
    </div>
  );
}
