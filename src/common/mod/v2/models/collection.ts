import type { Mod } from "./mod";

interface ModCollection {
  /**
   * uuid generate from path
   */
  uuid: string;

  /**
   * mod collection path
   */
  path: string;

  /**
   * all mods in this collection
   */
  mods: Mod[];

  /**
   * last updated of this collection
   */
  lastUpdated: number;
}

const emptyCollectionBuilder = (): ModCollection => {
  return {
    uuid: "",
    path: "",
    mods: [],
    lastUpdated: -1,
  };
};

export { emptyCollectionBuilder };
export type { ModCollection };
