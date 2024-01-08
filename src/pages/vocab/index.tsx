import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useState } from "react";
import Table from "../../components/table";

type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};

const defaultData: Person[] = [
  {
    firstName: "tanner",
    lastName: "linsley",
    age: 24,
    visits: 100,
    status: "In Relationship",
    progress: 50,
  },
  {
    firstName: "tandy",
    lastName: "해서",
    age: 40,
    visits: 40,
    status: "Single",
    progress: 80,
  },
  {
    firstName: "joe",
    lastName: "손질해서",
    age: 45,
    visits: 20,
    status: "Complicated",
    progress: 10,
  },
  {
    firstName: "tanner",
    lastName: "linsley",
    age: 24,
    visits: 100,
    status: "In Relationship",
    progress: 50,
  },
  {
    firstName: "tandy",
    lastName: "해서",
    age: 40,
    visits: 40,
    status: "Single",
    progress: 80,
  },
  {
    firstName: "joe",
    lastName: "손질해서",
    age: 45,
    visits: 20,
    status: "Complicated",
    progress: 10,
  },
  {
    firstName: "tanner",
    lastName: "linsley",
    age: 24,
    visits: 100,
    status: "In Relationship",
    progress: 50,
  },
  {
    firstName: "tandy",
    lastName: "해서",
    age: 40,
    visits: 40,
    status: "Single",
    progress: 80,
  },
  {
    firstName: "joe",
    lastName: "손질해서",
    age: 45,
    visits: 20,
    status: "Complicated",
    progress: 10,
  },
];

const columns = [
  {
    accessorKey: "firstName",
    header: () => "firstName",
  },
  {
    accessorKey: "lastName",
    header: () => "lastName",
  },
  {
    accessorKey: "age",
    header: () => "Age",
  },
  {
    accessorKey: "visits",
    header: () => "visits",
  },
  {
    accessorKey: "status",
    header: () => "status",
  },
  {
    accessorKey: "progress",
    header: () => "progress",
  },
  {
    id: "action",
    cell: () => (
      <div className="flex gap-3 items-center">
        <button className="btn btn-square btn-xs btn-outline border-white bg-white ">
          <IconEye />
        </button>
        <button className="btn btn-square btn-xs btn-outline border-white bg-white ">
          <IconEdit />
        </button>
        <button className="btn btn-square btn-xs btn-outline border-white bg-white ">
          <IconTrash />
        </button>
      </div>
    ),
  },
];

const Vocab = () => {
  const [data] = useState(() => [...defaultData]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="container mx-auto -mt-20 bg-white rounded-md p-5 shadow-md mb-10">
      <h4 className="font-medium">Datatable</h4>
      <p className="text-sm mb-6">
        Table Edits is a lightweight 해서 plugin for making table rows editable.
      </p>
      <Table table={table} />
      <div className="join mt-6 flex justify-end">
        <button className="join-item btn btn-sm">«</button>
        <button className="join-item btn btn-sm">‹</button>
        <button className="join-item btn btn-sm bg-gray-700 text-white">
          1
        </button>
        <button className="join-item btn btn-sm">2</button>
        <button className="join-item btn btn-sm">3</button>
        <button className="join-item btn btn-sm">4</button>
        <button className="join-item btn btn-sm">5</button>
        <button className="join-item btn btn-sm btn-disabled">...</button>
        <button className="join-item btn btn-sm">100</button>
        <button className="join-item btn btn-sm">›</button>
        <button className="join-item btn btn-sm">»</button>
      </div>
    </div>
  );
};

export default Vocab;
