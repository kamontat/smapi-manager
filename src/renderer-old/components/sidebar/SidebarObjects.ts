interface SidebarObject {
  key: string;
  name: string;
  element: JSX.Element;
}

type SidebarObjects<T extends string> = {
  [name in T]: SidebarObject;
};

const build = <T extends string>(obj: SidebarObjects<T>): SidebarObjects<T> => {
  return obj;
};

export default SidebarObjects;
export { SidebarObject, build };
