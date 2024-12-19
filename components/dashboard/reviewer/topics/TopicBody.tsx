"use client";
import React, { useEffect, useState } from "react";

import { Subtopic, Topic } from "@/lib/types";
import { getSubtopicsByTopicsId } from "@/actions/college.action";
import Loading from "../../Loading/Loading";
import Subtopic_Table from "./Subtopic_Table";

interface TopicBodyProps{
  topic: Topic
}

export default function TopicBody({ topic }: TopicBodyProps) {
  const [subtopics, setSubtopics] = useState<Subtopic[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (topic) {
      const handleGetSubtopics = async () => {
        if (topic) {
          try {
            setLoading(true);
            const res = await getSubtopicsByTopicsId(topic.id);
            if (res) {
              setSubtopics(res.subtopics);
            } else {
              setSubtopics([]);
            }
          } catch (error) {
            console.error(error);
            setError(true);
          } finally {
            setLoading(false);
          }
        }
      };
      handleGetSubtopics();
    }
  }, [topic]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <div>ERROR OCCURED</div>;
  }
  return (
    <main>
      <h2>Subtopics</h2>
      <Subtopic_Table subtopics={subtopics} />
    </main>
  );
}
