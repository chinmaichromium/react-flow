import { BuiltInNode, NodeTypes } from "@xyflow/react";
import { TextUpdaterNode, TextUpdaterNodeType } from "../TextUpdaterNode";

export const nodeTypes = {
  "text-updater": TextUpdaterNode,
} satisfies NodeTypes;

export type   CustomNodeType = BuiltInNode | TextUpdaterNodeType;
