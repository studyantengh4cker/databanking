
import { FormField, FormItem, FormLabel, FormMessage,  } from "../ui/form";
import { College, Programs } from "@/app/dashboard/colleges/Colleges";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select";

interface ProgramIDProps {
    form: any
    currentCollege: College | undefined
    
}

export default function ProgramID({form, currentCollege,}: ProgramIDProps) {
  return (
    <FormField
            control={form.control}
            name="program_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Program</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value?.toString()}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select program" />
                  </SelectTrigger>
                  <SelectContent>
                    {currentCollege ? (
                      currentCollege.programs.length > 0 ? (
                        currentCollege.programs.map((program: Programs) => (
                          <SelectItem key={program.id} value={program.id}>
                            {program.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="1">No programs</SelectItem>
                      )
                    ) : (
                      <SelectItem value="empty">No College</SelectItem>
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
  )
}
