import { createContext, useContext, ReactNode } from "react";
import { useCalculate } from "./hooks/useCalculate";

type CalculateContextValue = ReturnType<typeof useCalculate>;

const CalculateContext = createContext<CalculateContextValue | undefined>(
  undefined
);

export const CalculateProvider = ({ children }: { children: ReactNode }) => {
  const value = useCalculate();
  return (
    <CalculateContext.Provider value={value}>
      {children}
    </CalculateContext.Provider>
  );
};

export const useCalculateContext = (): CalculateContextValue => {
  const ctx = useContext(CalculateContext);
  if (!ctx) {
    throw new Error(
      "useCalculateContext must be used within a CalculateProvider"
    );
  }
  return ctx;
};

export default CalculateContext;
