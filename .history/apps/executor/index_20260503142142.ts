import { WorkflowModel, ExecutionModel } from "db/client"
import { execute } from "./execute";

async function main () {

    while (1) {
        const workflows = await WorkflowModel.find({})
        workflows.map(async workflow => {
            const trigger = workflow.nodes?.find((x: any) => x.data?.kind === "TRIGGER");

            if (!trigger) {
                return;
            }

            switch (trigger?.nodeId) {
                case "timer":
                    const timeInS = trigger.data?.metadata.time
                    const execution = await ExecutionModel.findOne({
                        workflowId: workflow.id,
                    }).sort({
                        startTime: 1 // shorting in ascending order or old first
                    })

                    if (!execution) {
                        await execute(workflow.nodes, workflow;);
                    } else if (execution.startTime.getTime() + timeInS * 1000 < Date.now()) {
                        await execute(workflow.nodes as any, workflow.edges as any)
                    }
            }
        })
    }

}