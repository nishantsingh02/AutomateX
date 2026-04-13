// if the node is the first created node so it only need to have a handel one on righrt not on left 

import { Handle, Position } from "@xyflow/react";

export type PriceTriggerNodeMetadeta = {
  asset: string;
  price: number;
};

export function PriceTrigger({
  data,
  isConnectable,
}: {
  data: {
    metadata: PriceTriggerNodeMetadeta;
  };
  isConnectable: boolean;
}) {
  const { asset, price } = data.metadata;

  return (
    <div className="bg-white border rounded-lg px-3 py-2 shadow-sm min-w-[140px] relative">
      
      {/* Label */}
      <div className="text-xs text-gray-500">Trigger</div>

      {/* Title */}
      <div className="text-sm font-medium text-gray-800">
        Price Alert
      </div>

      {/* Content */}
      <div className="text-xs text-gray-600 mt-1">
        {asset} ≥ ${price}
      </div>

      {/* Handle */}
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className="!w-2 !h-2 !bg-blue-500"
      />
    </div>
  );
}