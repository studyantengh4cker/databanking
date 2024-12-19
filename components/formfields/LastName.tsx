import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

export default function LastName({form}: any) {
  return (
    <FormField
      control={form.control}
      name="first_name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Last Name</FormLabel>
          <FormControl>
            <Input placeholder="Enter last name" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
