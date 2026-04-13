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
import type { PriceTriggerNodeMetadeta } from "@/nodes/triggers/priceTrigger";
import type { TimmerNodeMetadeta } from "@/nodes/triggers/timmer";
import { Input } from "./ui/input";

const SUPPORTED_TRIGGERS = [
  {
    id: "timer",
    title: "Timer",
    description: "Run this trigger every x seconds/minutes",
  },
  {
    id: "price-trigger",
    title: "Price Trigger",
    description:
      "Runs whenevre the price goes above or below a certain number for an asset",
  },
];

export const SUPPORTED_ASSET = ["SOL", "ETH", "BTC"];

export const TriggerSheet = ({
  onSelect,
  // onClose
}: {
  onSelect: (kind: NodeKind, metadata: NodeMetadata) => void;
  // onClose: () => void;
}) => {
  const [metadata, setMetadata] = useState<
    PriceTriggerNodeMetadeta | TimmerNodeMetadeta
  >({
    time: 3600,
  });
  const [selectedTrigger, setSelecetedTrigger] = useState(
    SUPPORTED_TRIGGERS[0].id,
  );
  return (
    <Sheet open={true}>
      <SheetContent className="p-2">
        <SheetHeader>
          <SheetTitle>Select Trigger</SheetTitle>
          <SheetDescription>
            Select the type of trigger you need
          </SheetDescription>
        </SheetHeader>
        <Select
          value={selectedTrigger}
          onValueChange={(value) => setSelecetedTrigger(value)}
        >
          <SelectTrigger className="w-full max-w-48">
            <SelectValue placeholder="Select the trigger" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {SUPPORTED_TRIGGERS.map(({ id, title, description }) => (
                <>
                  <SelectItem key={id} value={id}>
                    {title}
                  </SelectItem>
                </>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {selectedTrigger == "timer" && <div>
          Numbher of Seconds after which the to run the timer
          {/* <Input type=""></Input> */}
          <Input
          value={metadata.time}
          onChange={(e) => setMetadata(metadata => ({
            ...metadata,
            time: Number(e.target.value)
          }))}
        >
        </Input>
          </div>}

        {selectedTrigger == "price-trigger" && (
          <div>
            Price:
            <Input
              type="text"
              onChange={(e) =>
                setMetadata((m) => ({
                  ...m,
                  price: Number(e.target.value),
                }))
              }
            ></Input>
            Asset:
            <Select
              value={metadata.asset}
              onValueChange={(value) =>
                setMetadata((metadata) => ({
                  ...metadata,
                  asset: value,
                }))
              }
            >
              <SelectTrigger className="w-full max-w-48">
                <SelectValue placeholder="Select an asset" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {SUPPORTED_ASSET.map((id) => (
                    <>
                      <SelectItem key={id} value={id}>
                        {id}
                      </SelectItem>
                    </>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}

        <SheetFooter>
          <Button
            onClick={() => {
              onSelect(selectedTrigger as NodeKind, metadata);
              // onClose?.()
            }}
            type="submit"
          >
            Create Trigger
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
