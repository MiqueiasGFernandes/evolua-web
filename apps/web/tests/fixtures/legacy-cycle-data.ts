import { mixedCycles } from "./pdi-cycle-data";
export const legacyCycles = mixedCycles.map((cycle, index) => ({ ...cycle, durationType: "YEAR" as const, description: index ? null : "Texto histórico preservado" }));
