import axios from "axios";
import type { InternalAxiosRequestConfig, AxiosError } from "axios";


// --- Constants ---
// const BACKEND_URL = "http://localhost:3000";
const BACKEND_URL = "https://backend-production-8a98.up.railway.app"; // production url
// const BACKEND_URL = import.meta.env.VITE_API_URL;
console.log("BACKEND_URL:", BACKEND_URL);

const TOKEN_KEY = "trading_auth_token";

// --- Type Definitions ---
export interface IdResponse {
  id: string;
}

export interface SigninResponse extends IdResponse {
  token: string;
}

export interface NodeMetadataSchemaItem {
  kind: string;
  title: string;
  description?: string;
  values?: string[];
}

export interface NodeCredentialsType {
  title: string;
  type: string;
  required: boolean;
}

export interface NodeDefinition {
  _id: string;
  title: string;
  description?: string;
  kind: "ACTION" | "TRIGGER";
  type: string;
  credentialsType: NodeCredentialsType[];
  metadataSchema: NodeMetadataSchemaItem[];
}

export interface WorkflowNode {
  id: string;
  nodeId: string; // reference to NodeDefinition._id
  position: { x: number; y: number };
  data: {
    kind: "ACTION" | "TRIGGER";
    metadata?: any;
  };
  credentials?: any;
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
}

export interface Workflow {
  _id: string;
  userId: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
}

// --- Token Helpers ---
export const setAuthToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeAuthToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

// --- Axios Setup ---
const api = axios.create({
  baseURL: BACKEND_URL,
});

// Request Interceptor: Auto-attach Bearer token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// --- API Functions ---

/**
 * Register a new user
 */
export const apiSignup = async (email: string, password: string): Promise<IdResponse> => {
  const response = await api.post("/signup", { email, password });
  return response.data;
};

/**
 * Sign in and store the token
 */
export const apiSignin = async (email: string, password: string): Promise<SigninResponse> => {
  const response = await api.post("/signin", { email, password });
  const data: SigninResponse = response.data;
  if (data.token) {
    setAuthToken(data.token);
  }
  return data;
};

/**
 * Create a new workflow
 */
export const apiCreateWorkflow = async (body: { nodes: any[]; edges: any[] }): Promise<IdResponse> => {
  const response = await api.post("/workflow", body);
  return response.data;
};

/**
 * Update an existing workflow
 */
export const apiUpdateWorkflow = async (workflowId: string, body: { nodes?: any[]; edges?: any[] }): Promise<{ message: string }> => {
  const response = await api.put(`/workflow/${workflowId}`, body);
  return response.data;
};

/**
 * Get details for a specific workflow
 */
export const apiGetWorkflow = async (workflowId: string): Promise<{ workflow: Workflow }> => {
  const response = await api.get(`/workflow/${workflowId}`);
  return response.data;
};

/**
 * List all workflows for the user
 */
export const apiListWorkflows = async (): Promise<{ workflow: Workflow[] }> => {
  const response = await api.get("/workflow");  // fixd URL
  return response.data;
};

/**
 * List all nodes available

 */
export const apiListNodes = async (): Promise<{ nodes: NodeDefinition[] }> => {
  const response = await api.get("/nodes");
  return response.data;
};

/**
 * List all executions for a workflow
 */
export const apiListExecutions = async (workflowId: string): Promise<{ executions: any[] }> => {
  const response = await api.get(`/workflow/executions/${workflowId}`);
  return response.data;
};

export default api;