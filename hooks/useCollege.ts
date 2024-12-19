"use client";

import { College, colleges } from "@/app/dashboard/colleges/Colleges";
import { useState, useEffect } from "react";

export const useCollege = (collegeId: string) => {
  const [college, setCollege] = useState<College | undefined>(undefined);

  useEffect(() => {
    const fetchCollege = () => {
      try {
        const foundCollege = colleges.find((c) => c.id === collegeId);
        setCollege(foundCollege);
      } catch (error) {
        console.error("Error fetching college:", error);
        setCollege(undefined);
      }
    };

    fetchCollege();
  }, [collegeId]);

  return { college };
};
