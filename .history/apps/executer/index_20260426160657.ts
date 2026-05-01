import { WorkflowModel } from "db/client"

// async function main () {

//     while (1) {
//         const workflows = await WorkflowModel.find({})
//         workflows.map(async workflow => {
//             const trigger = workflow.nodes.find((x: { data: { kind: string; }; }) => x.data.kind === "TRIGGER");
//         })
//     }

// }




while (true) {
  const workflows = await WorkflowModel.find({});

  for (const workflow of workflows) {
    const trigger = workflow.nodes.find(
      (x: any) => x.data.kind === "trigger"
    );

    console.log(trigger);
  }

  await new Promise(r => setTimeout(r, 5000)); // wait 5s
}