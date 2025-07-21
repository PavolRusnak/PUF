"use client";
import { createContext, useContext, useReducer, ReactNode } from "react";

export interface Station { id: string; stall?: string; images?: string[]; online?: boolean }
export interface Circuit { id: string; breaker: number; continuous: number; stations: Station[] }
export interface Panel { id: string; location: string; circuits: Circuit[] }
export interface Site { id: string; name: string; address: string; panels: Panel[]; stations: string[] }

interface State { site: Site | null; mode: "NEW" | "UPDATE"; }
type Action =
  | { type: "init"; payload: { site: Site; mode: "NEW" | "UPDATE" } }
  | { type: "setPanels"; panels: Panel[] };

const initial: State = { site: null, mode: "NEW" };

function reducer(s: State, a: Action): State {
  switch (a.type) {
    case "init": return { ...s, ...a.payload };
    case "setPanels": return s.site ? { ...s, site: { ...s.site, panels: a.panels } } : s;
    default: return s;
  }
}

const Ctx = createContext<[State, React.Dispatch<Action>]>([initial, () => {}]);
export const PowerUpProvider = ({ children }: { children: ReactNode }) => {
  return <Ctx.Provider value={useReducer(reducer, initial)}>{children}</Ctx.Provider>;
};
export const usePowerUp = () => useContext(Ctx); 