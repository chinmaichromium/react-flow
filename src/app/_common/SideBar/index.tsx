import { Card } from "@/components/ui/card";
import { useDnDProvider } from "@/app/_common/providers/DNDProvider";
import { Node } from "@xyflow/react";
import React from "react";

const nodes = [
  {
    id: crypto.randomUUID(),
    type: "text-updater",
    position: { x: -100, y: 100 },
    data: { label: "Text Node" },
  },
] satisfies Node[];

const SideBar = () => {
  const { setType } = useDnDProvider();

  interface DragEvent extends React.DragEvent<HTMLDivElement> {}

  const onDragStart = (event: DragEvent, nodeType: string) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="flex flex-col p-6 gap-6 bg-background border-l">
      {nodes.map((node) => {
        return (
          <div className="dndnode">
            <Card
              className="flex flex-col px-8 py-2 w-full"
              onDragStart={(event) => onDragStart(event, node.type)}
              draggable
            >
              <div className="text-muted-foreground text-2xl">
                {node.data.label}
              </div>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default SideBar;
