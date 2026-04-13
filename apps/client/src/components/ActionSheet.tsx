import type { NodeKind } from "./CreateWorkflow";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import type { NodeMetadata } from "./CreateWorkflow";
import { Input } from "./ui/input";
import { SUPPORTED_ASSET } from "common/types";
import type { TradingMetadata } from "common/types";

const SUPPORTED_ACTIONS = [
  {
    id: "hyper-liquid",
    title: "Hyperliquid",
    description: "Execute trades or actions using HyperLiquid exchange",
  },
  {
    id: "backpack",
    title: "Backpack",
    description: "Interact with Backpack wallet or perform transactions",
  },
  {
    id: "lighter",
    title: "Lighter",
    description: "Run actions using the Lighter protocol or service",
  },
];

export const ActionSheet = ({
  onSelect,
  onClose
}: {
  onSelect: (kind: NodeKind, metadata: NodeMetadata) => void;
  onClose?: () => void // this is to close the action sheet aftre creating new node
}) => {
  const [metadata, setMetadata] = useState<TradingMetadata>({});
  const [selectedAction, setSelecetedAction] = useState(
    SUPPORTED_ACTIONS[0].id,
  );
  return (
    <Sheet open={true} onOpenChange={(open) => !open && onClose?.()}>
      <SheetContent className="p-2">
        <SheetHeader>
          <SheetTitle>Select Action</SheetTitle>
          <SheetDescription>
            Select the type of Action you need
          </SheetDescription>
        </SheetHeader>
        <Select
          value={selectedAction}
          onValueChange={(value) => setSelecetedAction(value)}
        >
          <SelectTrigger className="w-full max-w-48">
            <SelectValue placeholder="Select the trigger" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {SUPPORTED_ACTIONS.map(({ id, title, description }) => (
                <>
                  <SelectItem key={id} value={id}>
                    {title}
                  </SelectItem>
                </>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {(selectedAction == "lighter" ||
          selectedAction == "hyper-liquid" ||
          selectedAction == "backpack") && (
            <div>
              <div className="pt-4 pb-1">Type</div>
              <Select
                value={metadata?.type}
                onValueChange={(value) =>
                  setMetadata((metadata) => ({
                    ...metadata,
                    type: value as "LONG" | "SHORT",
                  }))
                }
              >
                <SelectTrigger className="w-full max-w-48">
                  <SelectValue placeholder="Select an asset" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value={"LONG"}>LONG</SelectItem>
                    <SelectItem value={"SHORT"}>SHORT</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <div className="pt-4 pb-1">Qty</div>
              <Input
                type="text"
                onChange={(e) =>
                  setMetadata((m) => ({
                    ...m,
                    qty: Number(e.target.value),
                  }))
                }
              ></Input>

              <div className="pt-4 pb-1">Symbol</div>
              <Select
                value={metadata?.symbol}
                onValueChange={(value) =>
                  setMetadata((metadata) => ({
                    ...metadata,
                    symbol: value,
                  }))
                }
              >
                <SelectTrigger className="w-full max-w-48">
                  <SelectValue placeholder="Select an Symbol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {SUPPORTED_ASSET.map((asset) => (
                      <SelectItem key={asset} value={asset}>
                        {asset}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          )}

        <SheetFooter>
          <Button
            onClick={() => {
              onSelect(selectedAction as NodeKind, metadata);
               onClose?.()
            }
        }
            type="submit"
          >
            Create Action
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
