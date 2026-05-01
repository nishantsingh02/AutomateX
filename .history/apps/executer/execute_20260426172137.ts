import type { z } from "zod";
import type { CreateWorkflowSchema } from "common/types";
import { NodesModel } from "db/client";

type WorkflowNodes = z.infer<typeof CreateWorkflowSchema>["nodes"];
type WorkflowEdges = z.infer<typeof CreateWorkflowSchema>["edges"];

export async function execute(nodes?: WorkflowNodes, edges?: WorkflowEdges) {
    const trigger = nodes?.find(x => x.data.kind === "TRIGGER")
    if (! trigger) {
        return;
    }
    await executeRecursive(trigger?.id, nodes!, edges!)
}

export async function executeRecursive(sourceId: string, nodes: WorkflowNodes, edges: WorkflowEdges) {
    const nodesToExecute = edges.filter(({source, target}) => source === sourceId).map(({target}) => target)

    await Promise.all(nodesToExecute.map(async (nodeid) => {
        
    }))

    await Promise.all(nodesToExecute.map(id => executeRecursive(id, nodes, edges)))
}