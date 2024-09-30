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
          data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((col, colIndex) => (
                <TableCell key={colIndex}>
                  <div
                    className={`${col.accessor === "name" ? "font-bold" : ""}`}
                  >
                    {col.render
                      ? col.render(row[col.accessor])
                      : row[col.accessor] || "N/A"}
                  </div>
                </TableCell>
              ))}
              <TableCell className="text-right">
                <DeleteDialog
                  title={"Delete Entry"}
                  description={"Are you sure you want to delete this entry?"}
                  onClick={() => handleDelete(row.id)} // Safely handle row ID
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
