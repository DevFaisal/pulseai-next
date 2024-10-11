import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import DeleteDialog from "@/components/DeleteDialog";
import { CalendarDays, Mail, Trash2 } from "lucide-react";
import { TableRow, TableCell, Table, TableHeader, TableHead, TableBody } from "@/components/ui/table";
import { deleteUser } from "@/server/actions/users/delete-user";
import { toast } from "sonner";

export default function UserTable({ users = [], setUsers }) {
  const handleDeleteUser = async (userId) => {
    const deletedUser = deleteUser({ userId });
    if (deletedUser.error) {
      toast.error(deletedUser.error);
      return;
    }
    toast.success("User deleted successfully");
    setUsers(users.filter((user) => user.id !== userId));
  };
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-muted/50">
          <TableHead className="w-[250px] font-bold">User</TableHead>
          <TableHead className="w-[200px] font-bold">Email</TableHead>
          <TableHead className="w-[150px] font-bold">Role</TableHead>
          <TableHead className="w-[200px] font-bold">Member Since</TableHead>
          <TableHead className="w-[100px] font-bold text-center">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user, index) => (
          <TableRow
            key={user.id}
            className="hover:bg-muted/50 transition-colors"
          >
            <TableCell className="flex items-center space-x-3">
              <Avatar>
                <AvatarFallback>
                  {user.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{user.name}</p>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{user.email}</span>
              </div>
            </TableCell>
            <TableCell>
              <Badge variant="outline">{user.role}</Badge>
            </TableCell>
            <TableCell>
              <div className="flex items-center space-x-2">
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                <span>{new Date(user.createdAt).toLocaleDateString()}</span>
              </div>
            </TableCell>
            <TableCell className="text-center">
              <DeleteDialog
                title="Delete User"
                description={`Are you sure you want to delete ${user.name}? This action cannot be undone.`}
                onDelete={() => handleDeleteUser(user.id)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
