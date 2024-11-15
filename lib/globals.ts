import {
  File,
  GraduationCap,
  HeadsetIcon,
  LayoutDashboard,
  SchoolIcon,
} from "lucide-react";

export const links = [
  { tag: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { tag: "Colleges", href: "/dashboard/colleges", icon: SchoolIcon },
];

export const collegeLinks = [
  { tag: "Dean/Program Head", icon: HeadsetIcon, href: "deans" },
  { tag: "Faculty", icon: HeadsetIcon, href: "faculty" },
  { tag: "Students", icon: GraduationCap, href: "students" },
  { tag: "Reviewers", icon: File, href: "reviewers" },
];

