import { colleges } from '@/app/dashboard/colleges/Colleges'

import React from 'react'
import { FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../ui/select'

interface CollegeIDProps {
    form: any
    handleCollegeChange: (value: string) => void 
}

export default function CollegeID({form, handleCollegeChange}: CollegeIDProps) {
  return (
    <FormField
            control={form.control}
            name="college_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>College</FormLabel>
                <Select
                  onValueChange={(value) => handleCollegeChange(value)}
                  defaultValue={field.value?.toString()}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select college" />
                  </SelectTrigger>
                  <SelectContent>
                    {colleges.map((college) => (
                      <SelectItem
                        key={college.id}
                        value={college.id.toString()}
                      >
                        {college.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
  )
}
