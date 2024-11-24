import { College } from "@/app/dashboard/colleges/Colleges";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddDeanForm from "../forms/AddDeanForm";

interface ModalProps {
  college: College | null;
}
export function AddDeanModal({ college }: ModalProps) {
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
          Add Dean
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] min-w-[969px] min-h-[691px] !rounded-sm p-20 text-[#4f4f4f]">
        <DialogHeader className="flex flex-col gap-5">
          <DialogTitle className="text-4xl ">Add a Dean/Program Head</DialogTitle>
          <div className="buttons flex gap-10  [&_button]:text-[#4f4f4f] [&_button]:bg-transparent "><Button className="hover:text-white">Manually</Button> <Button className="hover:text-white" >Import CSV</Button></div>
        </DialogHeader>
        <AddDeanForm />
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
