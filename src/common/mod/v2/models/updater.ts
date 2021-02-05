interface ModUpdater {
  /**
   * updater provider name
   */
  provider: string;

  /**
   * mod id in that provider system
   */
  id: string;
}

const empty = (): ModUpdater => {
  return {
    provider: "none",
    id: "0",
  };
};

const builder = (keys: string[]): ModUpdater => {
  if (keys.length < 1) return empty();

  const array = keys[0].split(":");
  if (array.length !== 2) return empty();

  const provider = array[0].toLowerCase();
  const id = array[1];

  return {
    provider,
    id,
  };
};

export default builder;
export type { ModUpdater };
