import { Handle, Position } from "@xyflow/react";
import type { TimmerNodeMetadeta } from "common/types";

// export type TimmerNodeMetadeta = {
//   time: number;
// };

export function Timer({
  data,
  isConnectable,
}: {
  data: {
    metadata: TimmerNodeMetadeta;
  };
  isConnectable: boolean;
}) {
  const seconds = data.metadata.time;

  let display = "";
  if (seconds < 60) display = `${seconds}s`;
  else if (seconds < 3600) display = `${Math.floor(seconds / 60)}m`;
  else display = `${Math.floor(seconds / 3600)}h`;

  return (
    <div className="bg-white border rounded-lg px-2 py-1 shadow-sm min-w-[120px] relative">
      
      <div className="text-xs text-gray-500">Timer</div>

      <div className="text-sm font-medium text-gray-800">
        Every {display}
      </div>

      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className="w-2! h-2! bg-green-500!"
      />
    </div>
  );
}