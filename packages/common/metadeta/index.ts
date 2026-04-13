export const SUPPORTED_ASSET = ["SOL", "ETH", "BTC"];


export type TradingMetadata = {
    // type: "LONG | SHORT",
    type: "LONG" | "SHORT",
    qty: number,
    symbol: typeof SUPPORTED_ASSET[number]
}

export type PriceTriggerNodeMetadeta = {
  asset: string;
  price: number;
};

export type TimmerNodeMetadeta = {
  time: number;
};