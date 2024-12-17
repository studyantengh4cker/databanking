import React, { useEffect, useState } from 'react';


import { getTopics } from '@/actions/college.action';
import { Topic } from '@/lib/types';
import { FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem  } from '../ui/select';

interface TopicIDProps {
  form: any;
}

export default function TopicID({ form }: TopicIDProps) {
  const [topics, setTopics] = useState<Topic[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getTopics();
        setTopics(res.topics || []);
      } catch (error) {
        console.error('Error fetching topics:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <FormField
      control={form.control}
      name="topic_id"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Topic</FormLabel>
          <Select
            onValueChange={(value) => field.onChange(value)}
            value={field.value?.toString()}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Topic" />
            </SelectTrigger>
            <SelectContent>
              {topics.length > 0 ? (
                topics.map((topic) => (
                  <SelectItem key={topic.id} value={topic.id.toString()}>
                    {topic.topic_name}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="empty" disabled>
                  No Topics Available
                </SelectItem>
              )}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
