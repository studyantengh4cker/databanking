"use client";
import React from "react";
import TestSpecificationForm from "../../../ components/Attempt/SpecificationForm";
import { Topic } from "@/lib/types";

interface AttemptProps {
  topics: Topic[] | null;
}

export default function Attempt({ topics }: AttemptProps) {
  return (
    <div className="flex flex-col items-center gap-10">
      <header>
        <h1 className="text-4xl font-medium">Take this test</h1>
      </header>
      <TestSpecificationForm topics={topics} />
    </div>
  );
}
