export interface IOpenAiResult {
  leverage: number;
  stop_loss: number;
  entry_point: number | string;
  symbol_pair: string;
}

export interface IBinanceMarketPrice {
  symbol: string;
  price: string;
  time: number;
}
