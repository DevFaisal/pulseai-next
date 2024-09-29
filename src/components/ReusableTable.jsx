import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

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
        {data?.length > 0 ? (
          data.map((row, index) => (
            <TableRow key={index}>
              {columns.map((col, colIndex) => (
                <TableCell key={colIndex}>
                  {/* Optional chaining to safely access row data */}
                  {col.render
                    ? col.render(row?.[col.accessor])
                    : row?.[col.accessor] || "N/A"}
                </TableCell>
              ))}
              <TableCell className="text-right">
                <DeleteDialog
                  title={"Delete Doctor"}
                  description={"Are you sure you want to delete this doctor?"}
                  onClick={() => handleDelete(row?.id)} // Safely access row id
                />
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length + 1} className="text-center">
              No data available
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
