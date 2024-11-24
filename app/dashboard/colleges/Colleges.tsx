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
  shortname: string
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
        name: "Bachelor of Science in Civil Engineering",
        shortname: "BSCE"
      },
      {
        id: "2",
        name: "Bachelor of Science in Mechanical Engineering",
        shortname: 'BSME'
      },
      {
        id: "3",
        name: "Bachelor of Science in Electrical Engineering",
        shortname: 'BSEE'
      },
      {
        id: "4",
        name: "Bachelor of Science in Electronics Engineering",
        shortname: "BSEE"
      },
    ],
  },
  {
    id: "2",
    name: "Education",
    shortname: "CED",
    color: "#808080",
    image: "/colleges/ced.png",
    programs: [
      {
        id: "1",
        name: "Bachelor in Elementary Education",
        shortname: "BED"
      },
      {
        id: "2",
        name: "Bachelor in Secondary Education - Major in English",
        shortname: "BME"
      },
      {
        id: "3",
        name: "Bachelor in Secondary Education - Major in Filipino",
        shortname: "BMF"
      },
      {
        id: "4",
        name: "Bachelor in Secondary Education - Major in Math",
        shortname: "BMM"
      }
    ],
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
    programs: [
      {
        id: '1',
        name: 'Bachelor Of Science In Criminology',
        shortname: "BSCRIM"
      },
    ],
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
