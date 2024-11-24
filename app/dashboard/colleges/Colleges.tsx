"use client";

export interface College {
  id: string;
  name: string;
  shortname: string;
  color: string;
  image: string;
  programs: Programs[];
}

export interface Programs {
  id: string;
  name: string;
}

export const colleges: College[] = [
  {
    id: "1",
    name: "Engineering",
    shortname: "COE",
    color: "#5521B5",
    image: "/colleges/coe.png",
    programs: [
      {
        id: "1",
        name: "Civil",
      },
      {
        id: "2",
        name: "Mechanical",
      },
      {
        id: "3",
        name: "Electrical",
      },
      {
        id: "4",
        name: "Electronics",
      },
    ],
  },
  {
    id: "2",
    name: "Education",
    shortname: "CED",
    color: "#808080",
    image: "/colleges/ced.png",
    programs: [],
  },
  {
    id: "3",
    name: "Computer Studies",
    shortname: "CCS",
    color: "#16a34a",
    image: "/colleges/ccs.png",
    programs: [],
  },
  {
    id: "4",
    name: "Arts & Sciences",
    shortname: "CAS",
    color: "#E3A008",
    image: "/colleges/cas.png",
    programs: [],
  },
  {
    id: "5",
    name: "Business Administration",
    shortname: "CBA",
    color: "#723B13",
    image: "/colleges/cba.png",
    programs: [],
  },
  {
    id: "6",
    name: "Criminology",
    shortname: "COC",
    color: "#751A3D",
    image: "/colleges/coc.png",
    programs: [],
  },
];

import SelectCollege from "@/components/dashboard/SelectCollege";
import { useState } from "react";
import CollegeData from "./CollegeData";

export function Colleges() {
  const [college, setCollege] = useState<College | null>(null);

  const handleChange = (selected: College | null) => {
    if (selected == college) {
      setCollege(null);
    } else {
      setCollege(selected);
    }
  };

  return (
    <section className="p-5">
      <SelectCollege activeCollege={college} handleChange={handleChange} />
      <CollegeData college={college} />
    </section>
  );
}
