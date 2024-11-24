import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { College, colleges, Programs } from "@/app/dashboard/colleges/Colleges";

export default function addReviewerForm() {
  
  const [currentCollege, setCollege] = useState<College>()
  const [currentProgram, setProgram] = useState<Programs>()
  const [loading, setLoading] = useState(false);
  const handleAddReviewer = async () => {
    try {
    } catch (error) {
      alert(error);
    } finally {
    }
  };
  return (
    <form>
      <div className="input-group flex gap-4">
        <div className="group mb-4 w-1/3">
          <Label htmlFor="Title">Title</Label>
          <Input type="text" id="Title" name="Title" />
        </div>
        <div className="group mb-4 w-1/3">
          <Label htmlFor="Description">Description</Label>
          <Input type="text" id="Description" name="Description" />
        </div>
        <div className="group mb-4 w-1/3">
          <Label htmlFor="School-Year">School Year</Label>
          <Input type="text" id="School-Year" name="School-Year" />
        </div>
      </div>
      <div className="input-group flex gap-5">
        <div className="group">
          <Label htmlFor="College">College</Label>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="College" />
            </SelectTrigger>
            <SelectContent>
              {colleges.map((college) => {
                return (
                  <SelectItem onClick={() => setCollege(college)} key={college.id} value={college.id}>
                    {college.name}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        <div className="group">
          <Label htmlFor="Program">Program</Label>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Program" />
            </SelectTrigger>
            <SelectContent>
              {currentCollege ? currentCollege.programs.length > 0 && currentCollege.programs.map((program) => {
                return (
                  <SelectItem onClick={() => setProgram(program)} key={program.id} value={program.id}>
                    {program.name}
                  </SelectItem>
                );
              }) : <SelectItem value={'Empty'}>No Program</SelectItem> }
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="input-group flex gap-5">
        <div className="group mb-4 w-1/3">
          <Label htmlFor="time-limit">Time Limit {"(*Optional*)"}</Label>
          <Input type="text" id="time-limit" name="time-limit" />
        </div>
        <div className="group mb-4 w-1/3">
          <Label htmlFor="from">From</Label>
          <Input type="text" id="from" name="from" />
        </div>
        <div className="group mb-4 w-1/3">
          <Label htmlFor="To">To</Label>
          <Input type="text" id="To" name="To" />
        </div>
        
      </div>
    
    </form>
  );
}
