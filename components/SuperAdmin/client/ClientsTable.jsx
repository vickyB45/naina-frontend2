// ❌ NO "use client"
import ClientsDataGrid from "./ClientsDataGrid";

export const ClientsTable = ({ clients }) => {
  return (
        <ClientsDataGrid clients={clients} />
  );
};
