import { WorkflowModel } from "db/client"

async function main () {

    while (1) {
        const workflows = await WorkflowModel.find({})
        workflows.map(async workflow => {
            const trigger
        })
    }

}