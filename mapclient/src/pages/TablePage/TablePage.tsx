import React from "react";
import { JSCrimeEvent } from "../../App";
import { CrimeTable } from "../../components/CrimeTable";

export type TablePageProperties = { crimes: JSCrimeEvent[] };
export const TablePage: React.FC<TablePageProperties> = (properties) => {
  const { crimes } = properties;
  return (
    <div style={{ minHeight: "1px", flex: 1, overflowY: "auto" }}>
      <CrimeTable crimes={crimes}></CrimeTable>
    </div>
  );
};
