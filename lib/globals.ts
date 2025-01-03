import {
  BookIcon,
  File,
  GraduationCap,
  HeadsetIcon,
  LayoutDashboard,
  SchoolIcon,
} from "lucide-react";

export const links = [
  {
    tag: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    for: ["admin", "faculty", "student", "dean", "programhead"],
  },
  {
    tag: "Colleges",
    href: "/dashboard/colleges",
    icon: SchoolIcon,
    for: ["admin"],
  },
  {
    tag: "My College",
    href: "/dashboard/mycollege",
    icon: SchoolIcon,
    for: ["faculty", "dean", "programhead"],
  },
  {
    tag: "Reviewers",
    href: "/student/reviewers",
    icon: BookIcon,
    for: ["student"],
  },
];

export const collegeLinks = [
  { tag: "Dean/Program Head", icon: HeadsetIcon, href: "deans" },
  { tag: "Faculty", icon: HeadsetIcon, href: "faculty" },
  { tag: "Students", icon: GraduationCap, href: "students" },
  { tag: "Reviewers", icon: File, href: "reviewers" },
];
