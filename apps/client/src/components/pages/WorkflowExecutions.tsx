import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiListExecutions } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

interface Execution {
  _id: string;
  status: "SUCCESS" | "FAILED" | "PENDING";
  createdAt: string;
  endedAt?: string;
  startTime?: string;
  endTime?: string;
}

const WorkflowExecutions = () => {
  const { workflowId } = useParams();
  const [executions, setExecutions] = useState<Execution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExecutions = async () => {
      if (!workflowId) return;
      try {
        const data = await apiListExecutions(workflowId);
        setExecutions(data.executions);
      } catch (err: any) {
        setError("Failed to load executions");
      } finally {
        setLoading(false);
      }
    };

    fetchExecutions();
  }, [workflowId]);

  const formatDateTime = (dateStr?: string) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}, ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider shadow-sm";
    switch (status) {
      case "SUCCESS":
        return <span className={`${baseClasses} bg-green-100 text-green-800 border border-green-200`}>Success</span>;
      case "FAILED":
        return <span className={`${baseClasses} bg-red-100 text-red-800 border border-red-200`}>Failed</span>;
      default: // PENDING
        return <span className={`${baseClasses} bg-amber-100 text-amber-800 border border-amber-200`}>Pending</span>;
    }
  };

  if (loading) return (
    <div className="p-10 text-center animate-pulse">
        <div className="h-8 w-48 bg-secondary/20 rounded mx-auto mb-4" />
        <div className="h-4 w-64 bg-secondary/10 rounded mx-auto" />
    </div>
  );

  return (
    <div className="p-6 md:p-12 max-w-7xl mx-auto min-h-screen bg-slate-50/50">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Executions</h1>
          <p className="text-muted-foreground text-sm font-mono bg-slate-100 px-3 py-1 rounded-full inline-block border">
            Workflow ID: {workflowId}
          </p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <Button variant="outline" onClick={() => navigate(`/workflow/${workflowId}`)} className="flex-1 md:flex-none rounded-full px-6 font-semibold shadow-sm hover:shadow-md transition-all bg-white border-slate-200">
            Open workflow
          </Button>
          <Button onClick={() => navigate("/dashboard")} className="flex-1 md:flex-none rounded-full px-6 font-semibold shadow-md hover:shadow-lg transition-all bg-slate-900 text-white hover:bg-slate-800">
            Back to dashboard
          </Button>
        </div>
      </div>

      {error ? (
        <div className="bg-destructive/10 text-destructive p-8 rounded-2xl border border-destructive/20 text-center shadow-sm">
          <p className="font-bold text-xl mb-4">{error}</p>
          <Button variant="outline" className="rounded-full px-8" onClick={() => window.location.reload()}>Retry</Button>
        </div>
      ) : executions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 px-6 border-2 border-dashed rounded-3xl bg-white text-center shadow-sm">
          <div className="h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center mb-6">
            <Clock className="h-8 w-8 text-slate-400" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">No executions found</h2>
          <p className="text-muted-foreground max-w-sm">
            Once this workflow is triggered, its performance and history logs will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {executions.map((execution) => (
            <div key={execution._id} className="group flex flex-col md:flex-row items-start md:items-center justify-between p-8 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-xl hover:border-slate-200 transition-all duration-300">
              <div className="space-y-4 w-full">
                <div className="flex items-center gap-3">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">
                        Execution <span className="font-mono text-slate-400 text-base font-normal">{execution._id}</span>
                    </h3>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-6 sm:gap-12">
                    <div className="space-y-1">
                        <p className="text-xs uppercase tracking-widest font-bold text-slate-400">Started</p>
                        <p className="text-sm font-medium text-slate-600">
                            {formatDateTime(execution.createdAt || execution.startTime)}
                        </p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs uppercase tracking-widest font-bold text-slate-400">Ended</p>
                        <p className="text-sm font-medium text-slate-600">
                            {formatDateTime(execution.endedAt || execution.endTime || execution.createdAt)}
                        </p>
                    </div>
                </div>
              </div>

              <div className="mt-6 md:mt-0 pt-6 md:pt-0 border-t md:border-0 w-full md:w-auto flex items-center justify-end">
                {getStatusBadge(execution.status)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkflowExecutions;
