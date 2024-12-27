import { CustomNodeType } from "@/components/nodes/utils/nodeTypes";
import { createContext, useContext, useState } from "react";

const DnDContext = createContext({
  type: null as string | null,
  setType: (type: string | null) => {},
  initialData: {} as CustomNodeType["data"],
  setInitialData: (data: CustomNodeType["data"]) => {},
});

export const DnDProvider = ({ children }: { children: React.ReactNode }) => {
  const [type, setType] = useState<string | null>(null);
  const [initialData, setInitialData] = useState<CustomNodeType["data"]>(
    {} as CustomNodeType["data"]
  );

  return (
    <DnDContext.Provider value={{ type, setType, initialData, setInitialData }}>
      {children}
    </DnDContext.Provider>
  );
};

export default DnDContext;

export const useDnDProvider = () => {
  return useContext(DnDContext);
};
