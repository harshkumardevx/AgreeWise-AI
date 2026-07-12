import {
  LayoutDashboard,
  Upload,
  FileText,
  BrainCircuit,
  History,
  Settings,
  LogOut,
} from "lucide-react";


const sidebarLinks = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    title: "Upload Contract",
    icon: Upload,
    path: "/upload-contract",
  },
  {
    title: "Documents",
    icon: FileText,
    path: "/documents",
  },
  {
    title: "AI Analysis Reports",
    icon: BrainCircuit,
    path: "/reports",
  },
  {
    title: "History",
    icon: History,
    path: "/history",
  },
];

export const bottomLinks = [
  {
    title: "Settings",
    icon: Settings,
    path: "/dashboard/settings",
  },
  {
    title: "Logout",
    icon: LogOut,
    action: "logout",
  },
];

export default sidebarLinks;