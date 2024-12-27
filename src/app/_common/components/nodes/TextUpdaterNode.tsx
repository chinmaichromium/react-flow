import { useCallback } from "react";
import {
  Handle,
  Node,
  NodeProps,
  Position,
  useNodeId,
  useNodes,
  useReactFlow,
} from "@xyflow/react";
import { BaseNode } from "./base-node";
import UITextField from "../UITextField";

const handleStyle = { left: 10 };

export type TextUpdaterNodeData = {
  label: string;
  value?: string;
};

export type TextUpdaterNodeType = Node<TextUpdaterNodeData>;

export function TextUpdaterNode({
  data,
  id,
  selected,
}: NodeProps<TextUpdaterNodeType>) {
  const { updateNodeData } = useReactFlow();

  const onChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    updateNodeData(id, { value: evt.target.value });
  }, []);

  return (
    <BaseNode id={id} selected={selected}>
      <Handle type="target" position={Position.Left} id="a" />
      <UITextField
        className="nodrag"
        label="Text Input"
        fieldSize="small"
        id="text"
        name="text"
        value={data.value}
        onChange={onChange}
      />
      <Handle type="source" position={Position.Right} id="b" />
    </BaseNode>
  );
}
