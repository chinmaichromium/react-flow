"use client";

import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
  useReactFlow,
  type OnConnect,
} from "@xyflow/react";
import { useCallback, useRef } from "react";

import "@xyflow/react/dist/style.css";

import {
  DnDProvider,
  useDnDProvider,
} from "@/app/_common/providers/DNDProvider";
import { CustomEdgeType, edgeTypes } from "./edges";
import SideBar from "../SideBar";
import { CustomNodeType, nodeTypes } from "./nodes/utils/nodeTypes";

let id = 0;
const getId = () => `dndnode_${id++}`;
interface DragEvent extends React.DragEvent<HTMLDivElement> {}

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, , onNodesChange] = useNodesState<CustomNodeType>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<CustomEdgeType>([]);
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges]
  );
  const { screenToFlowPosition, setNodes } = useReactFlow();
  const { type } = useDnDProvider();

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      if (!type) {
        return;
      }
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode: CustomNodeType = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type]
  );

  return (
    <div className="dndflow">
      <div className="reactflow-wrapper" ref={reactFlowWrapper}>
        <ReactFlow<CustomNodeType, CustomEdgeType>
          nodes={nodes}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          edges={edges}
          edgeTypes={edgeTypes}
          onEdgesChange={onEdgesChange}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onConnect={onConnect}
          fitView
        >
          <Background />
          <MiniMap />
          <Controls />
        </ReactFlow>
      </div>
      <SideBar />
    </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <DnDProvider>
      <DnDFlow />
    </DnDProvider>
  </ReactFlowProvider>
);
