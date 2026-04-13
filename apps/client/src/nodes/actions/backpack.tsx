

import { SUPPORTED_ASSET } from "@/components/TriggerSheet"
import { Handle, Position } from "@xyflow/react";

export type TradingMetadata = {
    // type: "LONG | SHORT",
    type: "LONG" | "SHORT",
    qty: number,
    symbol: typeof SUPPORTED_ASSET[number]
}

export const Backpack = ({
  data,
  isConnectable,
}: {
  data: {
    metadata: TradingMetadata;
  };
  isConnectable: boolean;
}) => {
  const { type, qty, symbol } = data.metadata;

  return (
    <div className="bg-white border rounded-lg px-3 py-2 shadow-sm min-w-[150px] relative">
      
      {/* Label */}
      <div className="text-xs text-gray-500">Action</div>

      {/* Title */}
      <div className="text-sm font-semibold text-gray-800">
        Lighter Trade
      </div>

      {/* Content */}
      <div className="text-xs text-gray-600 mt-1 space-y-1">
        <div>
          Type: <span className="font-medium">{type}</span>
        </div>
        <div>
          Qty: <span className="font-medium">{qty}</span>
        </div>
        <div>
          Asset: <span className="font-medium">{symbol}</span>
        </div>
      </div>

      {/* Handle (input side for action) */}
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        className="w-2! h-2! bg-blue-500!"
      />

      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className="w-2! h-2! bg-blue-500!"
      />

    </div>
  );
};