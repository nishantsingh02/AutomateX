import express from "express";
import jwt from "jsonwebtoken";
import { ExecutionModel, NodesModel, UserModel, WorkflowModel, connectDB } from "db/client";
import bcrypt from "bcryptjs";
import { userSignUpSchema, userSignInSchema, CreateWorkflowSchema } from "common/types";
import { authMiddleware } from "./middleware";
import cors from "cors";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))

app.use(express.json());


app.post("/signup", async (req, res) => {
  try {
    const parseData = userSignUpSchema.safeParse(req.body);

    if (!parseData.success) {
      return res.status(400).json({
        message: "Invalid Input",
        errors: parseData.error.flatten(),
      });
    }

    const { email, password } = parseData.data;

    const existingUser = await UserModel.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already Exists",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      email: email,
      password: hashPassword,
    });

    res.status(201).json({
      message: "User created successfully",
      userId: user._id,
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      errors: err instanceof Error ? err.message : "Unknown error",
    });
  }
});

app.post("/signin", async (req, res) => {
  try {
    const parseData = userSignInSchema.safeParse(req.body);

    if (!parseData.success) {
      return res.status(401).json({
        message: "Invalid Input",
        error: parseData.error.flatten(),
      });
    }

    const { email, password } = parseData.data;

    const user = await UserModel.findOne({
      email: email,
    });

    if (!user) {
      return res.status(402).json({
        message: "user not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "incorrect Credentials",
      });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECERTE as string,
      {
        expiresIn: "7d",
      },
    );

    return res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      errors: err instanceof Error ? err.message : "Unknown error",
    });
  }
});

app.post("/workflow", authMiddleware, async (req, res) => {
  const userId = req.userId!;

  if (!userId) {
    return res.status(401).json({
      message: "Unauthorized"
    })
  }

  const {success, data} = CreateWorkflowSchema.safeParse(req.body);
  if(!success) {
    return res.status(403).json({
      message: "Incorrect inputs"
    })
  }
  try {
    const workflow = await WorkflowModel.create({
      userId,
      nodes: data.nodes,
      edges: data.edges
    })
    return res.status(200).json({
      message: "Workflow Created",
      workflowId: workflow._id
    })
  } catch (err) {
    console.log(err)
    res.status(411).json({
      message: "Failed to create a workflow"
    })
  }
});

app.put("/workflow/:workflowId", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const workflowId = req.params.workflowId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const parsedData = CreateWorkflowSchema.safeParse(req.body);

    if (!parsedData.success) {
      return res.status(400).json({
        message: "Incorrect inputs",
        errors: parsedData.error.flatten(),
      });
    }

    // update only if its belong to the user, if the userId matched
    const updated = await WorkflowModel.findOneAndUpdate(
      { _id: workflowId, userId },
      {
        nodes: parsedData.data.nodes,
        edges: parsedData.data.edges,
      },
      { returnDocument: "after" } // return updated doc
    );

    if (!updated) {
      return res.status(404).json({
        message: "Workflow not found",
      });
    }

    return res.status(200).json({
      message: "Workflow updated",
      workflow: updated,
    });

  } catch (err) {
    return res.status(500).json({
      message: "Failed to update workflow",
    });
  }
});

app.get("/workflow/executions/:workflowId", authMiddleware, async (req, res) => {
  // TODO: make sure the workflow belongs to the user
  const executions = await ExecutionModel.find({
    workflowId: req.params.workflowId
  })
  return res.json({ executions })
});

app.get("/workflow/:workflowId", authMiddleware, async (req, res) => {
  const workflow = await WorkflowModel.findById(req.params.workflowId);
  
  if(!workflow || workflow.userId.toString() != req.userId) {
    return res.status(404).json({
      message: "workflow not found"
    })
  }
  return res.json({ workflow })
});

app.get("/workflow", authMiddleware, async(req,res) => {
  const workflow = await WorkflowModel.find({
    userId: req.userId
  });
  return res.status(200).json({
    workflow
  })
})

app.get("/nodes", async (req, res) => {
  const nodes = await NodesModel.find();
  res.json(nodes)
});

console.log("⏳ Connecting to MongoDB:", process.env.MONGO_URL ? "URL loaded ✓" : "⚠️  MONGO_URL is undefined!");

connectDB(process.env.MONGO_URL!)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    app.listen(process.env.PORT || 3000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 3000}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message || err);
    process.exit(1);
  });
