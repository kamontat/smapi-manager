import React, { PropsWithChildren } from "react";
import tw from "twin.macro";

import { TableRow } from ".";

const TBody = tw.tbody`
  bg-white divide-y divide-gray-200
`;

export const TableBodyElement = (
  props: React.DetailedHTMLProps<React.TdHTMLAttributes<HTMLTableDataCellElement>, HTMLTableDataCellElement>
): JSX.Element => {
  return (
    <td tw="px-4 py-3 whitespace-nowrap" scope="col" {...props}>
      {props.children}
    </td>
  );
};

type TableBodyType = "empty" | "exist";

interface TableBodyProperty {
  type: TableBodyType;
  size: number;
}

export const TableBody = ({ type, size, children }: PropsWithChildren<TableBodyProperty>): JSX.Element => {
  return (
    <TBody>
      {type === "empty" ? (
        <TableRow>
          <TableBodyElement tw="text-center" colSpan={size}>
            Empty
          </TableBodyElement>
        </TableRow>
      ) : (
        children
      )}
    </TBody>
  );
};
