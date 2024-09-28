import { Home, Calendar, Users } from "lucide-react"; // Import your icons here

const createLink = (label, href, icon, roles) => ({
  label,
  href,
  icon,
  visible: roles,
});

export const dashboardLinks = [
  createLink("Dashboard", "/", Home, ["admin", "doctor", "user"]), // Use icon component
  createLink("Appointments", "/appointments", Calendar, ["doctor"]),
  createLink("Patients", "/admin/patients", Users, ["admin"]),
  createLink("Doctors", "/admin/doctors", Users, ["admin"]),
];

export const getVisibleLinks = (userRole) => {
  return dashboardLinks.filter((link) => link.visible.includes(userRole));
};
