import { WorkflowModel, ExecutionModel } from "db/client";
import { execute } from "./execute";
import mongoose from "mongoose";

async function main() {
  const mongoUrl = process.env.MONGO_URL;
  if (!mongoUrl) throw new Error("MONGO_URL required");

  await mongoose.connect(mongoUrl);

  while (true) {
    const workflows = await WorkflowModel.find({});

    for (const workflow of workflows) {
      const trigger = workflow.nodes?.find(
        (x: any) => x.data?.kind === "trigger"
      );

      if (!trigger) continue;

      switch (trigger.nodeId) {
        case "timer":
          const timeInS = trigger.data?.metadata?.time;

          if (!timeInS) continue;

          const execution = await ExecutionModel.findOne({
            workflowId: workflow._id,
          }).sort({ startTime: 1 });

          if (
            !execution ||
            execution.startTime.getTime() + timeInS * 1000 < Date.now()
          ) {
            const newExecution = await ExecutionModel.create({
              workflowId: workflow._id,
              status: "PENDING",
              startTime: new Date(),
            });

            await execute(workflow.nodes as any, workflow.edges);

            newExecution.endTime = new Date();
            await newExecution.save();
          }
      }
    }

    await new Promise((r) => setTimeout(r, 5000)); // prevent CPU burn
  }
}

main().catch(console.error);