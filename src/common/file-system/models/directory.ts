import File from "./file";

interface Directory extends File {
  files: File[];
}

export default Directory;
