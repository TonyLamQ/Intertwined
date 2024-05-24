import { CurrencyRate } from "../types/CurrencyRate";

export const CurrencyRates: CurrencyRate = {
    EUR: 1.00,
    TRY: 34.94,
    USD: 1.08,
    // Add more currencies and their conversion rates here
  };

export const getCurrencyByRate = (rates: CurrencyRate, value: number): string | undefined => {
    return Object.keys(rates).find(key => rates[key] === value);
  };