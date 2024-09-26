const createLink = (label, href, icon, roles) => ({
  label,
  href,
  icon,
  visible: roles,
});

export const dashboardLinks = [
  createLink("Dashboard", "/", "home", ["admin", "doctor", "user"]),
  createLink("Appointments", "/appointments", "calendar", ["doctor"]),
  createLink("Patients", "/admin/patients", "people", ["admin"]),
  createLink("Doctors", "/admin/doctors", "people", ["admin"]),
];

export const getVisibleLinks = (userRole) => {
  return dashboardLinks.filter((link) => link.visible.includes(userRole));
};
