import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  EdgeChange,
  NodeChange,
} from "@xyflow/react";
import { create } from "zustand";
import { CustomEdgeType } from "./components/edges";
import { CustomNodeType } from "./components/nodes/utils/nodeTypes";

type StoreState = {
  nodes: CustomNodeType[];
  edges: CustomEdgeType[];
  setNodes: (nodes: CustomNodeType[]) => void;
  setEdges: (edges: CustomEdgeType[]) => void;
  onConnect: (connection: any) => void;
};

export const useLocalStore = create<StoreState>((set) => ({
  nodes: [],
  edges: [],
  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  onConnect: (connection) =>
    set((state) => ({ edges: addEdge(connection, state.edges) })),
}));

export const onNodesChange = (changes: NodeChange<CustomNodeType>[]) => {
  useLocalStore.setState((state) => ({
    nodes: applyNodeChanges(changes, state.nodes),
  }));
};

export const onEdgesChange = (changes: EdgeChange<CustomEdgeType>[]) => {
  useLocalStore.setState((state) => ({
    edges: applyEdgeChanges(changes, state.edges),
  }));
};
