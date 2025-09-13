import { IBinanceMarketPrice } from "../types/types";

const useBinanceApi = () => {
  const getBinanceMarketPrice = async (
    symbolPair = "btcusdt"
  ): Promise<IBinanceMarketPrice> => {
    try {
      const response = await fetch(
        `https://fapi.binance.com/fapi/v1/ticker/price?symbol=${symbolPair}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.code) {
        // The latest price is in the ticker object
        return data;
      } else {
        throw new Error(`API error: ${data.msg}`);
      }
    } catch (error: any) {
      console.error("Error fetching binance market price:", error);
      throw new Error(error);
    }
  };

  return { getBinanceMarketPrice };
};

export default useBinanceApi;
