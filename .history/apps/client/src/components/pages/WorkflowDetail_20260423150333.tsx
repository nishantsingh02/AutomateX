import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiGetWorkflow, type Workflow } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, History } from "lucide-react";

const WorkflowDetail = () => {
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
        setError("Failed to load workflow details");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkflow();
  }, [workflowId]);

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
            <Button onClick={() => navigate(`/workflow/${workflow._id}/executions`)} variant="outline">
              <History className="mr-2 h-4 w-4" /> Execution History
            </Button>
            <Button disabled>
              <Play className="mr-2 h-4 w-4" /> Run Now
            </Button>
          </div>
        </div>

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
