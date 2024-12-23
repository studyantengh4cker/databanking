"use client";
import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { Subtopic, Topic } from "@/lib/types";
import { getSubtopicsByTopicsId } from "@/actions/college.action";

interface TestSpecificationFormProps {
  topics: Topic[] | null;
}

const TestSpecificationForm = ({ topics }: TestSpecificationFormProps) => {
  const [loading, setLoading] = useState(false);
  const [subtopics, setSubtopics] = useState<Subtopic[]>([]);
  const [selectedTopicIds, setSelectedTopicIds] = useState(new Set());
  const [selectedSubtopicIds, setSelectedSubtopicIds] = useState(new Set());

  const form = useForm({
    defaultValues: {
      time_limit: 30,
      number_of_items: 10,
    },
  });

  const onSubmit = async () => {
    try {
      setLoading(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchSubtopics = async () => {
      if (selectedTopicIds.size > 0) {
        const newSubtopics: Subtopic[] = [];
        for (const topicId of selectedTopicIds) {
          const data = await getSubtopicsByTopicsId(topicId as number);

          if (Array.isArray(data.subtopics)) {
            newSubtopics.push(...data.subtopics);
          } else {
            console.warn(
              `Expected an array for topicId ${topicId}, but got:`,
              data
            );
          }
        }

        const uniqueSubtopics = [
          ...new Map(newSubtopics.map((s) => [s.id, s])).values(),
        ];
        setSubtopics(uniqueSubtopics);
      } else {
        setSubtopics([]);
      }
    };

    fetchSubtopics();
  }, [selectedTopicIds]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-8">
          {/* Topics Selection */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Topics</h2>
            {topics && topics?.length > 0 ? (
              topics.map((topic: Topic) => (
                <div key={topic.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`topic-${topic.id}`}
                    checked={selectedTopicIds.has(topic.id)}
                    onCheckedChange={(checked) => {
                      const newSelected = new Set(selectedTopicIds);
                      if (checked) {
                        newSelected.add(topic.id);
                      } else {
                        newSelected.delete(topic.id);
                      }
                      setSelectedTopicIds(newSelected);
                    }}
                  />
                  <label htmlFor={`topic-${topic.id}`} className="text-sm">
                    {topic.topic_name}
                  </label>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground">No topics available</p>
            )}
          </div>

          {/* Subtopics Selection */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Subtopics</h2>
            {subtopics.length > 0 ? (
              subtopics.map((subtopic: Subtopic) => (
                <div key={subtopic.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`subtopic-${subtopic.id}`}
                    checked={selectedSubtopicIds.has(subtopic.id)}
                    onCheckedChange={(checked) => {
                      const newSelected = new Set(selectedSubtopicIds);
                      if (checked) {
                        newSelected.add(subtopic.id);
                      } else {
                        newSelected.delete(subtopic.id);
                      }
                      setSelectedSubtopicIds(newSelected);
                    }}
                  />
                  <label
                    htmlFor={`subtopic-${subtopic.id}`}
                    className="text-sm"
                  >
                    {subtopic.subtopic_name}
                  </label>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground">
                Select a topic to see subtopics
              </p>
            )}
          </div>
        </div>

        <FormField
          control={form.control}
          name="number_of_items"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Items</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="time_limit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time Limit (minutes)</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default TestSpecificationForm;
