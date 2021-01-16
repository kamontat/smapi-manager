import { dirname, basename, join } from "path";

import { readDir } from "./read-directory";
import { Directory, File } from "./models";

const listDirectories = async (fullpath: string, limit: number): Promise<Directory[]> => {
  const ls = await readDir(fullpath);

  const files = ls.filter(f => f.isFile());
  const dirs = ls.filter(d => d.isDirectory());

  const results: Directory[] = [
    {
      fullpath,
      dirpath: dirname(fullpath),
      basename: basename(fullpath),
      files: files.map(
        f =>
          ({
            basename: f.name,
            dirpath: fullpath,
            fullpath: join(fullpath, f.name),
          } as File)
      ),
    },
  ];

  for (const dir of dirs) {
    const result = await listDirectories(join(fullpath, dir.name), limit - 1);
    results.push(...result);
  }

  return results;
};

export default listDirectories;
