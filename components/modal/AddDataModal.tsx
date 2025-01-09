import { useState } from "react";
import { College, Programs } from "@/app/dashboard/colleges/Colleges";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import QuestionsForm from "../forms/QuestionsForm";

interface ModalProps {
  title: string;
  buttonTitle: string;
  college:
    | College
    | null
    | {
        currentProgram: Programs | undefined;
        id?: string | undefined;
        name?: string | undefined;
        shortname?: string | undefined;
        color?: string | undefined;
        image?: string | undefined;
        programs?: Programs[] | undefined;
      };
  children: React.ReactNode;
}
export function AddDataModal({
  title,
  buttonTitle,
  college,
  children,
}: ModalProps) {
  const [selectedMode, setSelectedMode] = useState<"manual" | "csv">("manual");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          style={{
            backgroundColor: college?.color || "#720000",
            color: "white",
          }}
          variant="outline"
        >
          {buttonTitle}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] min-w-[969px] min-h-[691px] !rounded-sm p-20 text-[#4f4f4f] flex flex-col justify-start">
        <DialogHeader className="flex flex-col gap-5">
          <DialogTitle className="text-4xl">{title}</DialogTitle>
          <div className="buttons flex gap-10  [&_button]:text-[#4f4f4f] [&_button]:bg-transparent ">
            <Button
              className={`hover:text-white ${
                selectedMode === "manual" ? "bg-[#720000]" : ""
              }`}
              onClick={() => setSelectedMode("manual")}
            >
              Manually
            </Button>
            <Button
              className={`hover:text-white ${
                selectedMode === "csv" ? "bg-gray-200" : ""
              }`}
              onClick={() => setSelectedMode("csv")}
            >
              Import CSV
            </Button>
          </div>
        </DialogHeader>
        {/* Conditional rendering of children */}
        <div className="mt-5">
          {selectedMode === "manual" ? (
            children
          ) : (
            <div className="overflow-auto max-h-[60vh]">
              {/* <UsersForm role={"dean"}  /> */}
              <QuestionsForm reviewer_id={1} />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
