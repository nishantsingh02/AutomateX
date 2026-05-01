import { WorkflowModel } from "db/client"

async function main () {

    while (1) {
        const workflow = await WorkflowModel.find({})
    }

}