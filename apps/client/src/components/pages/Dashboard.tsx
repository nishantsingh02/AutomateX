import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiListWorkflows, type Workflow } from "@/lib/api";

import { Button } from "@/components/ui/button";
import { Plus, Play, LayoutGrid, Clock, ChevronRight } from "lucide-react";

const Dashboard = () => {

  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkflows = async () => {
      try {
        const data = await apiListWorkflows();
        setWorkflows(data.workflows);
      } catch (err: any) {
        if (err.response?.status === 403) {
          navigate("/auth");
        } else {
          setError("Failed to load workflows");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWorkflows();
  }, [navigate]);

  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto min-h-[calc(100vh-64px)]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-2 text-lg">Manage and monitor your automated trading strategies.</p>
        </div>
        <Button onClick={() => navigate("/create-workflow")} size="lg" className="rounded-full px-6 shadow-md hover:shadow-lg transition-all">
          <Plus className="mr-2 h-5 w-5" /> Create Workflow
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 rounded-2xl bg-secondary/20 animate-pulse border" />
          ))}
        </div>
      ) : error ? (
        <div className="bg-destructive/10 text-destructive p-6 rounded-2xl border border-destructive/20 text-center max-w-xl mx-auto">
          <p className="font-semibold">{error}</p>
          <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>Retry</Button>
        </div>
      ) : workflows.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-6 border-2 border-dashed rounded-3xl bg-secondary/5 text-center">
          <div className="p-4 bg-primary/10 rounded-full mb-6">
            <LayoutGrid className="h-10 w-10 text-primary opacity-50" />
          </div>
          <h2 className="text-2xl font-bold mb-2">No workflows found</h2>
          <p className="text-muted-foreground max-w-md mb-8">
            You haven't created any trading bots yet. Start by building a workflow to automate your trading strategy.
          </p>
          <Button onClick={() => navigate("/createworkflow")} size="lg" className="rounded-full px-10">
            Build your first workflow
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {workflows.map((workflow) => (
            <div
              key={workflow._id}
              className="group relative bg-card border rounded-3xl p-8 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 cursor-pointer overflow-hidden"
              onClick={() => navigate(`/workflow/${workflow._id}`)}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-primary/10 rounded-2xl group-hover:bg-primary transition-colors duration-300">
                  <Play className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-bold truncate max-w-[150px]">
                    Bot_{workflow._id.slice(-6).toUpperCase()}
                  </h3>
                  <div className="flex items-center text-xs text-muted-foreground mt-0.5">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>Active</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center p-3 bg-secondary/30 rounded-xl border border-secondary">
                  <span className="text-sm font-medium text-muted-foreground">Nodes</span>
                  <span className="text-lg font-bold">{workflow.nodes.length}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-secondary/30 rounded-xl border border-secondary">
                  <span className="text-sm font-medium text-muted-foreground">Connections</span>
                  <span className="text-lg font-bold">{workflow.edges.length}</span>
                </div>
              </div>

              <div className="flex items-center justify-between group/btn">
                <Button 
                  variant="outline" 
                   className="rounded-full flex-1 mr-2 border-secondary hover:border-primary/50 transition-colors"
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    navigate(`/workflow/${workflow._id}/executions`);
                  }}
                >
                  History
                </Button>

                <div className="p-2.5 rounded-full bg-primary/5 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  <ChevronRight className="h-5 w-5" />
                </div>
              </div>
            </div>
          ))}

          {/* New Workflow Placeholder Card */}
          <div 
            onClick={() => navigate("/create-workflow")}
            className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-3xl bg-secondary/5 hover:bg-secondary/10 hover:border-primary/30 transition-all cursor-pointer group"
          >
            <div className="p-3 rounded-full bg-secondary mb-4 group-hover:scale-110 transition-transform">
              <Plus className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="font-semibold text-muted-foreground">Create New Bot</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

