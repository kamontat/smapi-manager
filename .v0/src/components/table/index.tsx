import tw from "twin.macro";

const Table = tw.table`
  table-auto w-full divide-y divide-gray-200
`;

export default Table;

export * from "./caption";
export * from "./header";
export * from "./body";

export const TableRow = tw.tr``;
