import { BookAIcon, LayoutDashboard, Paperclip } from "lucide-react";

export const AdminLinks = [
  {
    tag: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    tag: "Reviewers",
    href: "/admin/reviewers",
    icon: BookAIcon,
  },
];

export const StudentLinks = [
  {
    tag: "Dashboard",
    href: "/student/dashboard",
    icon: LayoutDashboard,
  },
  {
    tag: "Reviewer",
    href: "/student/reviewer",
    icon: Paperclip,
  },
];

export const FacultyLinks = [
  {
    tag: "Dashboard",
    href: "/faculty/dashboard",
    icon: LayoutDashboard,
  },
];
