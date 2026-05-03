import { WorkflowModel, ExecutionModel, NodesModel } from "db/client";
import { execute, NodeDocument } from "./execute.js";
import mongoose from "mongoose";

async function main() {
    await mongoose.connect(process.env.MONGO_URL!);
    while (1) {
        const workflows = await WorkflowModel.find({}).populate("nodes.nodeId");

        await Promise.all(workflows.map(async (workflow) => {
            const trigger = workflow.nodes.find(x => x.data?.kind === "TRIGGER");
            if (!trigger) return;

            const nodeInfo = trigger.nodeId as any;
            const type = nodeInfo?.type;

            if (type === "timer") {
                const timeInS = trigger.data?.metadata?.time;
                const execution = await ExecutionModel.findOne({
                    workflowId: workflow.id,
                }).sort({ startTime: "desc" });

                if (!execution || new Date(execution.startTime).getTime() < Date.now() - (timeInS * 1000)) {
                    const execution = await ExecutionModel.create({
                        workflowId: workflow.id,
                        status: "PENDING",
                        startTime: new Date(),
                    });

                    await execute(workflow.nodes as any, workflow.edges as any);

                    execution.status = "SUCCESS";
                    execution.endTime = new Date();
                    await execution.save();
                }
            }
        }));

        // 2 second brather
        await new Promise(x => setTimeout(x, 2000));
    }
}

main();







// import { WorkflowModel, ExecutionModel } from "db/client";
// import { execute } from "./execute";
// import mongoose from "mongoose";

// async function main() {
  
//     const mongoUrl = process.env.MONGO_URL;
//   if (!mongoUrl) throw new Error("MONGO_URL environment variable is required");

//   await mongoose.connect(mongoUrl);

//   while (1) {
//     const workflows = await WorkflowModel.find({});
//     workflows.map(async (workflow) => {
//       const trigger = workflow.nodes?.find(
//         (x: any) => x.data?.kind === "TRIGGER",
//       );

//       if (!trigger) {
//         return;
//       }

//       switch (trigger?.nodeId) {
//         case "timer":
//           const timeInS = trigger.data?.metadata.time;
//           const execution = await ExecutionModel.findOne({
//             workflowId: workflow.id,
//           }).sort({
//             startTime: 1, // shorting in ascending order or old first
//           });

//           if (
//             !execution ||
//             execution.startTime.getTime() + timeInS * 1000 < Date.now()
//           ) {
//             const execution = await ExecutionModel.create({
//               workflowId: workflow.id,
//               status: "PENDING",
//               startTime: new Date(),
//             });
//             await execute(workflow.nodes as any, workflow.edges);

//             execution.endTime = new Date();
//             await execution.save();
//           }
//       }
//     });
//   }
// }

