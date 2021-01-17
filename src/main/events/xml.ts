import { MainHandler } from "../models/main";

export const loadXmlFile: MainHandler<Promise<string>> = async (_, data) => {
  console.log(data);

  return "";
};
