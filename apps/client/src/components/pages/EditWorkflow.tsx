import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiGetWorkflow, type Workflow } from "@/lib/api";
import CreateWorkflowComponent from "@/components/CreateWorkflow";
import type { NodeKind } from "@/components/CreateWorkflow";

const EditWorkflow = () => {
  const { workflowId } = useParams();
  const [workflow, setWorkflow] = useState<Workflow | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkflow = async () => {
      if (!workflowId) return;
      try {
        const data = await apiGetWorkflow(workflowId);
        setWorkflow(data.workflow);
      } catch (err: any) {
        setError("Failed to load workflow for editing");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkflow();
  }, [workflowId]);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground text-lg font-medium">Loading workflow...</p>
        </div>
      </div>
    );
  }

  if (error || !workflow) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-destructive text-lg font-semibold">{error || "Workflow not found"}</p>
          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Convert backend workflow nodes to ReactFlow format expected by CreateWorkflow
  // Backend stores: { id, nodeId (e.g. "hyper-liquid"), position, data: { kind, metadata } }
  // ReactFlow needs: { id, type (e.g. "hyper-liquid"), position, data: { kind, metadata } }
  const initialNodes = workflow.nodes.map((node) => ({
    id: node.id,
    type: node.nodeId as NodeKind, // nodeId in backend = type in ReactFlow
    position: node.position,
    data: {
      kind: node.data.kind,
      metadata: node.data.metadata || {},
    },
  }));

  const initialEdges = workflow.edges.map((edge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
  }));

  return (
    <div className="h-screen w-screen overflow-hidden">
      <CreateWorkflowComponent
        initialNodes={initialNodes}
        initialEdges={initialEdges}
        workflowId={workflowId}
        mode="edit"
      />
    </div>
  );
};

export default EditWorkflow;
