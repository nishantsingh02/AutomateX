import { WorkflowModel, ExecutionModel } from "db/client"
import { execute } from "./execute";

async function main () {

    while (1) {
        const workflows = await WorkflowModel.find({})
        workflows.map(async workflow => {
            const trigger = workflow.nodes.find((x: { data: { kind: string; }; }) => x.data.kind === "TRIGGER");

            if (!trigger) {
                return;
            }

            switch (trigger?.type) {
                case "timer":
                    const timeInS = trigger.data?.metadata.time
                    const execution = ExecutionModel.findOne({
                        workflowId: workflow.id,
                    }).sort({
                        startTime: 1 // shorting in ascending order or old first
                    })

                    if (!execution) {
                        await execute();
                    } else if (execution.startTime >= Data.now) {

                    }

                    

            }
        })
    }

}



