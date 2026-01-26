declare module 'satellite.js' {
  export interface EciVec3<T> {
    x: T;
    y: T;
    z: T;
  }

  export interface EcfVec3<T> {
    x: T;
    y: T;
    z: T;
  }

  export interface Satrec {
    satnum: number;
    epochyr: number;
    epochdays: number;
    ndot: number;
    nddot: number;
    bstar: number;
    inclo: number;
    nodeo: number;
    ecco: number;
    argpo: number;
    mo: number;
    no: number;
    [key: string]: any;
  }

  export interface PropagationResult {
    position: EciVec3<number> | false;
    velocity: EciVec3<number> | false;
  }

  export function twoline2satrec(tle1: string, tle2: string): Satrec;
  export function propagate(satrec: Satrec, date: Date): PropagationResult;
  export function gstime(date: Date): number;
  export function eciToEcef(eci: EciVec3<number>, gmst: number): EcfVec3<number>;
}
