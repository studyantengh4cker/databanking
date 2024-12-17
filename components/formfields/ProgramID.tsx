
import { useCollegeContext } from "@/context/reviewers/CollegeContext";
import { FormField, FormItem, FormLabel, FormMessage,  } from "../ui/form";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select";

interface ProgramIDProps {
    form: any
}

export default function ProgramID({form}: ProgramIDProps) {
  const {currentCollege} = useCollegeContext()
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
                    {currentCollege && currentCollege?.programs && currentCollege?.programs.length > 0 ? (
                      currentCollege?.programs.length > 0 ? (
                        currentCollege?.programs.map((program: any) => (
                          <SelectItem key={program.id} value={program.id}>
                            {program.program_name}
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
