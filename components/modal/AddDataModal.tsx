import { College, Programs } from "@/app/dashboard/colleges/Colleges";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
          <DialogTitle className="text-4xl ">{title}</DialogTitle>
          <div className="buttons flex gap-10  [&_button]:text-[#4f4f4f] [&_button]:bg-transparent ">
            <Button className="hover:text-white">Manually</Button>{" "}
            <Button className="hover:text-white">Import CSV</Button>
          </div>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
