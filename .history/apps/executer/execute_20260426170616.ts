import type { z } from "zod";
import type { CreateWorkflowSchema } from "common/types";

type WorkflowNodes = z.infer<typeof CreateWorkflowSchema>["nodes"];
type WorkflowEdges = z.infer<typeof CreateWorkflowSchema>["edges"];

export async function execute(nodes?: WorkflowNodes, edges?: WorkflowEdges) {
    await executeRecursive()
}

export async function executeRecursive(sourceId: string, nodes: WorkflowNodes, edges: WorkflowEdges) {

}