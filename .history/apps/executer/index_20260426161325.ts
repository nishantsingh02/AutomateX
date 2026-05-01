import { WorkflowModel } from "db/client"

async function main () {

    while (1) {
        const workflows = await WorkflowModel.find({})
        workflows.map(async workflow => {
            const trigger = workflow.nodes.find((x: { data: { kind: string; }; }) => x.data.kind === "TRIGGER");

            if (!trigger) {
                return;
            }

            switch (trigger?.type) {
                case "timmer"
            }
        })
    }

}



