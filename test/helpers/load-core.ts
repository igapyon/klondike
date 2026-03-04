import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

function runCoreScript(filePath: string, contextSeed: Record<string, unknown>, exportExpr: string) {
  const source = fs.readFileSync(filePath, "utf8");
  const script = new vm.Script(`${source}\n;globalThis.__core_exports = (${exportExpr});`, {
    filename: path.basename(filePath)
  });
  const contextObject = { ...contextSeed } as Record<string, unknown>;
  const context = vm.createContext(contextObject);
  contextObject.globalThis = contextObject;
  script.runInContext(context);
  return contextObject.__core_exports;
}

export function loadRulesModule(contextSeed: Record<string, unknown>) {
  const filePath = path.resolve("src/core/rules.ts");
  return runCoreScript(filePath, contextSeed, "{ Rules, getCardKey, snapshotCard }") as {
    Rules: {
      isSafeToAutoMove: (card: any) => boolean;
      getCid: (card: any) => string;
      checkFoundationMove: (card: any, fIdx: number) => { ok: boolean };
      canPlaceOnTableau: (card: any, tIdx: number) => { ok: boolean; type?: string };
    };
    getCardKey: (card: any) => string;
    snapshotCard: (card: any) => any;
  };
}

export function loadSolverModule(contextSeed: Record<string, unknown>) {
  const filePath = path.resolve("src/core/solver.ts");
  return runCoreScript(filePath, contextSeed, "{ Simulator }") as {
    Simulator: new () => {
      getNextMove: (state: any) => any;
      checkF: (state: any, card: any, fIdx: number) => boolean;
      findTabTarget: (state: any, card: any, ignoreIdx: number) => number;
      canSolve: (state: any, opts?: { limit?: number; noProgressLimit?: number }) => boolean;
    };
  };
}
