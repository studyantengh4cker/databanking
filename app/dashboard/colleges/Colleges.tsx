"use client";

export interface College {
  name: string;
  shortname: string;
  color: string;
  image: string;
}

export const colleges: College[] = [
  {
    name: "Engineering",
    shortname: "COE",
    color: "#5521B5",
    image: "/colleges/coe.png",
  },
  {
    name: "Education",
    shortname: "CED",
    color: "#808080",
    image: "/colleges/ced.png",
  },
  {
    name: "Computer Studies",
    shortname: "CCS",
    color: "#16a34a",
    image: "/colleges/ccs.png",
  },
  {
    name: "Arts & Sciences",
    shortname: "CAS",
    color: "#E3A008",
    image: "/colleges/cas.png",
  },
  {
    name: "Business Administration",
    shortname: "CBA",
    color: "#723B13",
    image: "/colleges/cba.png",
  },
  {
    name: "Criminology",
    shortname: "COC",
    color: "#751A3D",
    image: "/colleges/coc.png",
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
