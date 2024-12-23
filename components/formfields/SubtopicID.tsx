import React, { useEffect, useState } from 'react'
import { FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select";
import { getSubtopicsByTopicsId } from '@/actions/college.action';

interface SubtopicProps {
  form: any
  topic_id: number
}

export default function SubtopicID({form, topic_id}: SubtopicProps) {
  const [subtopics, setSubtopics] = useState([])

  useEffect(() => {
    async function fetchData(){
        const res = await getSubtopicsByTopicsId(topic_id)
        if(res){
          setSubtopics(res.subtopics)
        }
    }
    fetchData()
  },[topic_id])

  return (
    <FormField
      control={form.control}
      name="subtopic_id"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Subtopic</FormLabel>
          <Select
            onValueChange={(value) => field.onChange(value)}
            value={field.value?.toString()}
            
          >
            <SelectTrigger>
              <SelectValue placeholder="Select subtopic" />
            </SelectTrigger>
            <SelectContent>
              {subtopics?.length > 0 ? (
                subtopics?.map((subtopic: any) => (
                  <SelectItem key={subtopic.id} value={subtopic.id.toString()}>
                    {subtopic.subtopic_name}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="empty">No Subtopic for this topic</SelectItem>
              )}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
