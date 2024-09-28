import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import axios from "axios";
import DeleteDialog from "@/components/DeleteDialog";

export default function ReusableTable({
  data = [],
  columns = [],
  setPatients,
  doctors,
  handleDelete,
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((col, index) => (
            <TableHead key={index}>{col.header}</TableHead>
          ))}
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((row, index) => (
          <TableRow key={index}>
            {columns.map((col, colIndex) => (
              <TableCell key={colIndex}>
                {col.render ? col.render(row[col.accessor]) : row[col.accessor]}
              </TableCell>
            ))}
            <TableCell className="text-right">
              <DeleteDialog
                title={"Delete Doctor"}
                description={"Are you sure you want to delete this doctor?"}
                onClick={handleDelete(row.id)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
