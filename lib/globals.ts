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
  { tag: "Faculty", icon: HeadsetIcon },
  { tag: "Students", icon: GraduationCap },
  { tag: "Reviewers", icon: File },
];
