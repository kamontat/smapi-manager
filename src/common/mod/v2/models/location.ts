interface ModLocation {
  /**
   * absolute directory path directory of mod location
   */
  dirpath: string;

  /**
   * shown mod directory name (remove all beginning dot and ending dot)
   */
  name: string;
}

const builder = (dirpath: string, filename: string): ModLocation => {
  return {
    dirpath,
    name: filename,
  };
};

export default builder;
export type { ModLocation };
