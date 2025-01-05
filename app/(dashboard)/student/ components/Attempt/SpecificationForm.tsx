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
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { Subtopic, Topic } from "@/lib/types";
import { getSubtopicsByTopicsId } from "@/actions/college.action";
import { testSpecificationSchema } from "@/lib/ZodSchemas/TestSpecificationSchema";
import { z } from "zod";
import { generateAttempt } from "@/actions/attempt.action";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

interface TestSpecificationFormProps {
  topics: Topic[] | null;
  user_id: number;
  reviewer_id: number;
}
export type TestSpecificationFormData = z.infer<typeof testSpecificationSchema>;

const TestSpecificationForm = ({
  topics,
  user_id,
  reviewer_id,
}: TestSpecificationFormProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [subtopics, setSubtopics] = useState<Subtopic[]>([]);
  const navigate = useRouter()
  const form = useForm<TestSpecificationFormData>({
    resolver: zodResolver(testSpecificationSchema),
    defaultValues: {
      user_id,
      reviewer_id,
      status: "pending",
      score: 0,
      topic_ids: [],
      subtopic_ids: [],
      time_limit: 30,
      question_amount: 10,
    },
  });

  const { watch, setValue } = form;

  const selectedTopicIds = watch("topic_ids");
  const selectedSubtopicIds = watch("subtopic_ids");

  const onSubmit = async (values: TestSpecificationFormData) => {
    try {
      setLoading(true);
      const res = await generateAttempt(values);
      if (res) {
        toast({
          title: `Test specification added succesfully`,
          description: "You may now be able to take this test",
          variant: "default",
        });
        navigate.push(`/student/reviewers/${reviewer_id}/attempt/${res.data.reviewer_attempt.id}`)
      } else {
        setError(true);
      }
    } catch (error) {
      console.error(error)
      setError(true);
    } finally {
      setLoading(false);
      if (error) {
        toast({
          title: "Error",
          description: "Failed to create test specification. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  useEffect(() => {
    const fetchSubtopics = async () => {
      if (selectedTopicIds.length > 0) {
        const newSubtopics: Subtopic[] = [];
        for (const topicId of selectedTopicIds) {
          const data = await getSubtopicsByTopicsId(
            topicId as unknown as number
          );

          if (data && Array.isArray(data?.subtopics)) {
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-10"
      >
        <div className="flex flex-wrap gap-10">
          {/* Topics Selection */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Topics</h2>
            {topics && topics?.length > 0 ? (
              topics.map((topic: Topic) => (
                <div key={topic.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`topic-${topic.id}`}
                    checked={selectedTopicIds.includes(String(topic.id))}
                    onCheckedChange={(checked) => {
                      const newSelected: string[] = [...selectedTopicIds];
                      if (checked) {
                        newSelected.push(String(topic.id));
                      } else {
                        const index = newSelected.indexOf(String(topic.id));
                        if (index > -1) {
                          newSelected.splice(index, 1);
                        }
                      }
                      setValue(
                        "topic_ids",
                        newSelected as [string, ...string[]],
                        { shouldValidate: true }
                      );
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
                    checked={selectedSubtopicIds.includes(String(subtopic.id))}
                    onCheckedChange={(checked) => {
                      const newSelected: string[] = [...selectedSubtopicIds];
                      if (checked) {
                        newSelected.push(String(subtopic.id));
                      } else {
                        const index = newSelected.indexOf(String(subtopic.id));
                        if (index > -1) {
                          newSelected.splice(index, 1);
                        }
                      }
                      setValue(
                        "subtopic_ids",
                        newSelected as [string, ...string[]],
                        { shouldValidate: true }
                      );
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

       <div className="flex gap-10"> <FormField
          control={form.control}
          name="user_id"
          render={() => (
            <FormItem>
              <FormLabel>User ID</FormLabel>
              <FormControl>
                <Input type="number" defaultValue={user_id} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="reviewer_id"
          render={() => (
            <FormItem>
              <FormLabel>Reviewer ID</FormLabel>
              <FormControl>
                <Input type="number" defaultValue={reviewer_id} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /></div>
        <div className="flex gap-10"><FormField
          control={form.control}
          name="time_limit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time Limit</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="question_amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Items</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /></div>
        <div className="flex gap-10">

          <FormField
            control={form.control}
            name="score"
            render={() => (
              <FormItem>
                <FormLabel>Score</FormLabel>
                <FormControl>
                  <Input type="number" defaultValue={0} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={() => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Input type="string" defaultValue={"pending"} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Loading..." : "Take Test"}
        </Button>
      </form>
    </Form>
  );
};

export default TestSpecificationForm;
