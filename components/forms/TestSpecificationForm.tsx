'use client'
import React, { useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { testSpecificationSchema } from '@/lib/ZodSchemas/TestSpecificationSchema'
import { zodResolver } from '@hookform/resolvers/zod'

export default function TestSpecificationForm() {
  const [loading, setLoading] = useState(false)
  const form = useForm<z.infer<typeof testSpecificationSchema>>({
    resolver: zodResolver(testSpecificationSchema),
    defaultValues: {
        time_limit: 30,
    }
  })
  const onSubmit = async () => {
    try{
        setLoading(true)
    }catch(error){
        console.log(error)
    }finally{
        setLoading(false)
    }
  }
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
        control={form.control}
        name="time_limit"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Time Limit</FormLabel>
            <FormControl>
              <Input placeholder="Time Limit" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
     
      <Button disabled={loading} className="w-full" type="submit">
        {loading ? "Logging in..." : "Login"}
      </Button>
    </form>
  </Form>
  )
}
