import mongoose, { Schema, model } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
});

const PositionSchema = new Schema(
  {
    x: {
      type: Number,
      required: true,
    },
    y: {
      type: Number,
      required: true,
    },
  },
  {
    _id: false,
  },
);

const NodeDataSchema = new Schema(
  {
    kind: {
      type: String,
      enum: ["ACTION", "TRIGGER"],
    },
    metadata: mongoose.Schema.Types.Mixed, // any
  },
  {
    _id: false,
  },
);

const WorkflowNodeSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    // nodeId: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "Nodes",
    //   required: true
    // },
    nodeId: {type: String, required: true}, // type : timmer or 
    data: NodeDataSchema,
    position: PositionSchema,
    credentials: {
      type: mongoose.Schema.Types.Mixed, // any
    },
  },
  {
    _id: false,
  },
);

const EdgesSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    target: {
      type: String,
      required: true,
    },
  },
  {
    _id: false, // means not auto genrate the object id by mongoDB
  },
);

const WorkflowSchema = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  nodes: [WorkflowNodeSchema],
  edges: [EdgesSchema],
});

const CredentialsTypeSchema = new Schema(
  {
    title: { type: String, required: true },
    type: { type: String, required: true },
    required: {
      type: Boolean,
      required: true,
    },
  },
  {
    _id: false,
  },
);

// its define the type , qty , or symbol on the action sheet
const metadataSchemaItemSchema = new Schema({
  kind: { type: String, required: true},  // select or number
  title: { type: String, required: true},
  description: { type: String },
  value: [String],
}, {
  _id: false
})

const NodesSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    unique: true
  },
  kind: { type: String, enum: ["ACTION", "TRIGGER"]},
  metadataSchema: [metadataSchemaItemSchema],
  credentialsType: [CredentialsTypeSchema], // evry nodes can have multiple credentials
});

const ExecutionSchema = new Schema(
    {
        workflowId: {
            type: mongoose.Types.ObjectId, // forgin key
            ref: "Workflows",
            required: true
        },
        status: {
            type: String,
            enum: ["PENDING", "SUCCESS", "FAILURE"],
            required: true
        },
        startTime: {
            type: Date,
            required: true,
            default: Date.now
        },
        endTime: {
            type: Date
        }
    }
)

export const ExecutionModel = model("Executions", ExecutionSchema)

export const NodesModel = model("Nodes", NodesSchema);

export const WorkflowModel = model("Workflows", WorkflowSchema);

export const UserModel = model("Users", UserSchema);



















// import mongoose, { Schema, model } from "mongoose";

// const UserSchema = new Schema({
//   email: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   password: {
//     type: String,
//     required: true,
//   },
// });

// const PositionSchema = new Schema(
//   {
//     x: {
//       type: Number,
//       required: true,
//     },
//     y: {
//       type: Number,
//       required: true,
//     },
//   },
//   {
//     _id: false,
//   },
// );

// const NodeDataSchema = new Schema(
//   {
//     kind: {
//       type: String,
//       enum: ["ACTION", "TRIGGER"],
//     },
//     metadata: mongoose.Schema.Types.Mixed, // any
//   },
//   {
//     _id: false,
//   },
// );

// const WorkflowNodeSchema = new Schema(
//   {
//     id: {
//       type: String,
//       required: true,
//     },
//     nodeId: {
//       type: mongoose.Types.ObjectId,
//       ref: "Nodes",
//       required: true
//     },
//     data: NodeDataSchema,
//     position: PositionSchema,
//     Credentials: {
//       type: mongoose.Schema.Types.Mixed, // any
//     },
//   },
//   {
//     _id: false,
//   },
// );

// const EdgesSchema = new Schema(
//   {
//     id: {
//       type: String,
//       required: true,
//     },
//     source: {
//       type: String,
//       required: true,
//     },
//     target: {
//       type: String,
//       required: true,
//     },
//   },
//   {
//     _id: false, // means not auto genrate the object id by mongoDB
//   },
// );

// const WorkflowSchema = new Schema({
//   userId: {
//     type: mongoose.Types.ObjectId,
//     ref: "Users",
//     required: true,
//   },
//   nodes: [WorkflowNodeSchema],
//   edges: [EdgesSchema],
// });

// const CredentialsTypeSchema = new Schema(
//   {
//     title: { type: String, required: true },
//     required: {
//       type: Boolean,
//       required: true,
//     },
//   },
//   {
//     _id: false,
//   },
// );

// const NodesSchema = new Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   type: {
//     type: String,
//     enum: ["ACTION", "TRIGGER"],
//     required: true,
//   },
//   credentialsType: [CredentialsTypeSchema], // evry nodes can have multiple credentials
// });

// const ExecutionSchema = new Schema(
//     {
//         workflowId: {
//             type: mongoose.Types.ObjectId, // forgin key
//             ref: "Workflows",
//             required: true
//         },
//         status: {
//             type: String,
//             enum: ["PENDING", "SUCCESS", "FAILURE"],
//             required: true
//         },
//         startTime: {
//             type: Date,
//             required: true,
//             default: Date.now
//         },
//         endTime: {
//             type: Date,
//         }
//     }
// )

// export const ExecutionModel = model("Executions", ExecutionSchema)

// export const NodesModel = model("Nodes", NodesSchema);

// export const WorkflowModel = model("Workflows", WorkflowSchema);

// export const UserModel = model("Users", UserSchema);
