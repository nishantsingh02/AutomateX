import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiGetWorkflow, type Workflow } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, History, Pencil, Eye, X } from "lucide-react";
import { ReactFlow, Background, Controls } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { PriceTrigger } from "@/nodes/triggers/priceTrigger";
import { Timer } from "@/nodes/triggers/timmer";
import { HyperLiquid } from "@/nodes/actions/hyper-liquid";
import { Backpack } from "@/nodes/actions/backpack";
import { Lighter } from "@/nodes/actions/Lighter";

const nodeTypes = {
  "price-trigger": PriceTrigger,
  "timer": Timer,
  "hyper-liquid": HyperLiquid,
  "backpack": Backpack,
  "lighter": Lighter,
};

const WorkflowDetail = () => {
  const { workflowId } = useParams();
  const [workflow, setWorkflow] = useState<Workflow | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkflow = async () => {
      if (!workflowId) return;
      try {
        const data = await apiGetWorkflow(workflowId);
        setWorkflow(data.workflow);
      } catch (err: any) {
        setError("Failed to load workflow details");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkflow();
  }, [workflowId]);

  // Convert backend nodes to ReactFlow format for the preview
  const previewNodes = useMemo(() => {
    if (!workflow) return [];
    return workflow.nodes.map((node) => ({
      id: node.id,
      type: node.nodeId,
      position: node.position,
      data: {
        kind: node.data.kind,
        metadata: node.data.metadata || {},
      },
    }));
  }, [workflow]);

  const previewEdges = useMemo(() => {
    if (!workflow) return [];
    return workflow.edges.map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
    }));
  }, [workflow]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error || !workflow) return <div className="p-8 text-center text-destructive">{error || "Workflow not found"}</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <Button variant="ghost" onClick={() => navigate("/dashboard")} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
      </Button>

      <div className="bg-background border rounded-xl p-8 shadow-sm">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Workflow Detail</h1>
            <p className="text-muted-foreground truncate max-w-md">ID: {workflow._id}</p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => navigate(`/workflow/${workflow._id}/edit`)}
              variant="outline"
              className="border-primary/30 hover:bg-primary/10 hover:border-primary transition-all"
            >
              <Pencil className="mr-2 h-4 w-4" /> Edit
            </Button>
            <Button
              variant={showPreview ? "default" : "outline"}
              className={showPreview
                ? "transition-all"
                : "border-primary/30 hover:bg-primary/10 hover:border-primary transition-all"
              }
              onClick={() => setShowPreview((prev) => !prev)}
            >
              <Eye className="mr-2 h-4 w-4" /> Preview
            </Button>
            <Button onClick={() => navigate(`/workflow/${workflow._id}/executions`)} variant="outline">
              <History className="mr-2 h-4 w-4" /> Execution History
            </Button>
            <Button disabled>
              <Play className="mr-2 h-4 w-4" /> Run Now
            </Button>
          </div>
        </div>

        {/* Visual Preview — ReactFlow read-only canvas */}
        {showPreview && (
          <div className="mb-8 border rounded-xl overflow-hidden relative" style={{ height: "500px" }}>
            <div className="absolute top-3 right-3 z-10">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPreview(false)}
                className="bg-background/80 backdrop-blur-sm hover:bg-background shadow-sm"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <ReactFlow
              nodes={previewNodes}
              edges={previewEdges}
              nodeTypes={nodeTypes}
              nodesDraggable={false}
              nodesConnectable={false}
              elementsSelectable={false}
              panOnDrag={true}
              zoomOnScroll={true}
              fitView
            >
              <Background variant={"dots" as any} gap={12} size={1} color="#cbd5e1" />
              <Controls className="bg-background border shadow-md rounded-md p-1 fill-foreground mb-4 ml-4" />
            </ReactFlow>
          </div>
        )}

        {/* Details Section */}
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Structure</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-secondary/20 rounded-lg border">
                <p className="text-sm font-medium text-muted-foreground uppercase mb-1">Nodes</p>
                <p className="text-2xl font-bold">{workflow.nodes.length}</p>
              </div>
              <div className="p-4 bg-secondary/20 rounded-lg border">
                <p className="text-sm font-medium text-muted-foreground uppercase mb-1">Edges</p>
                <p className="text-2xl font-bold">{workflow.edges.length}</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Nodes Configuration</h2>
            <div className="space-y-3">
              {workflow.nodes.map((node, index) => (
                <div key={node.id} className="p-4 bg-background border rounded-lg flex justify-between items-center group hover:border-primary/50 transition-colors">
                  <div>
                    <span className="text-xs font-mono bg-secondary px-2 py-0.5 rounded mr-3">Node {index + 1}</span>
                    <span className="font-medium">{node.nodeId}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {node.data.kind}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default WorkflowDetail;
