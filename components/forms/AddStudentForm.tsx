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

export default function addStudentForm() {
  
  const [currentCollege, setCollege] = useState<College>()
  const [currentProgram, setProgram] = useState<Programs>()
  const [loading, setLoading] = useState(false);
  const handleAddStudent = async () => {
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
          <Label htmlFor="first_name">First Name</Label>
          <Input type="text" id="first_name" name="first_name" />
        </div>
        <div className="group mb-4 w-1/3">
          <Label htmlFor="last_name">Last Name</Label>
          <Input type="text" id="last_name" name="last_name" />
        </div>
        <div className="group mb-4 w-1/3">
          <Label htmlFor="idnum">ID Number</Label>
          <Input type="text" id="idnum" name="idnum" />
        </div>
      </div>
      <div className="input-group flex gap-5">
        <div className="group mb-4 w-1/3">
          <Label htmlFor="email">Email Address</Label>
          <Input type="email" id="email" name="email" />
        </div>
        <div className="group mb-4 w-1/3">
          <Label htmlFor="phone_number">Phone Number</Label>
          <Input type="tel" id="phone_number" name="phone_number" />
        </div>
        <div className="group mb-4">
          <Label htmlFor="Role">Role</Label>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Student">Student</SelectItem>
              
            </SelectContent>
          </Select>
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
              {currentCollege && currentCollege.programs.length > 0 ? currentCollege.programs.map((program) => {
                return (
                  <SelectItem onClick={() => setProgram(program)} key={program.id} value={program.id}>
                    {program.name}
                  </SelectItem>
                );
              }) : <SelectItem value={'Empty'}>No Program</SelectItem>}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="group w-1/3">
        <Label htmlFor="password">Password</Label>
        <Input type="password" id="password" name="password" />
      </div>
    </form>
  );
}
