import { z } from "zod";

export const userSignUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const userSignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const CreateWorkflowSchema = z.object({
  nodes: z.array(
    z.object({
      nodeId: z.string(),
      data: z.object({
        kind: z.enum(["ACTION", "TRIGGER"]),
        metadata: z.any()
      }),
      credentials: z.any(),
      id: z.string(),
      position: z.object({
        x: z.number(),
        y: z.number()
      })
    })
  ),
  edges: z.array(
    z.object({
      id: z.string(),
      source: z.string(),
      target: z.string()
    })
  )
});

export const UpdateWorkflowSchema = z.object({
  nodes: z.array(
    z.object({
      nodeId: z.string(),
      data: z.object({
        kind: z.enum(["ACTION", "TRIGGER"]),
        metadata: z.any()
      }),
      credentials: z.any(),
      id: z.string(),
      position: z.object({
        x: z.number(),
        y: z.number()
      })
    })
  ),
  edges: z.array(
    z.object({
      id: z.string(),
      source: z.string(),
      target: z.string()
    })
  )
});