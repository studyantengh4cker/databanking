import React, { useEffect, useState } from 'react';
import { FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../ui/select';
import { getAllCollege } from '@/actions/college.action';
import { useFormfieldCollegeContext } from '@/context/form_field/CollegeContext';

interface CollegeIDProps {
  form: any;
  handleCollegeChange: (value: string) => void;
}

export default function CollegeID({ form, handleCollegeChange }: CollegeIDProps) {
  const [colleges, setCollege] = useState<any[]>([]);
  const { setCurrentCollege } = useFormfieldCollegeContext();

  useEffect(() => {
    const handleGetCollege = async () => {
      const data = await getAllCollege();
      setCollege(data.college || []);
      console.log('Data: ', data);
    };
    handleGetCollege();
  }, []);

  return (
    <FormField
      control={form.control}
      name="college_id"
      render={({ field }) => (
        <FormItem>
          <FormLabel>College</FormLabel>
          <Select
            onValueChange={(value) => {
              handleCollegeChange(value); 
              const selectedCollege = colleges.find((college) => college.id.toString() === value);
              if (selectedCollege) {
                setCurrentCollege(selectedCollege); 
              }
            }}
            defaultValue={field.value?.toString()}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select college" />
            </SelectTrigger>
            <SelectContent>
              {colleges && colleges.length > 0 ? (
                colleges.map((college) => (
                  <SelectItem key={college.id} value={college.id.toString()}>
                    {college.college_name}
                  </SelectItem>
                ))
              ) : (
                <p>No colleges available</p>
              )}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
