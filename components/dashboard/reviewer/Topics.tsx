import {
  getSubtopicsByTopicsId,
  getTopicsByReviewerId,
} from "@/actions/college.action";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import { Reviewer, Subtopic, Topic } from "@/lib/types";
import React, { useEffect, useState } from "react";

interface TopicsProps {
  reviewer: Reviewer;
}

export default function Topics({ reviewer }: TopicsProps) {
  const [topics, setTopics] = useState<Topic[] | null>(null);
  const [subTopics, setSubtopics] = useState<Subtopic[] | null>(null);
  const [expandedTopicId, setExpandedTopicId] = useState<number | null>(null);

  useEffect(() => {
    async function handleGetTopics() {
      if (reviewer) {
        const res = await getTopicsByReviewerId(reviewer?.id);
        setTopics(res.topics);
      }
    }
    handleGetTopics();
  }, [reviewer]);
  const handleGetSubtopics = async (id: number) => {
    if (topics) {
      const res = await getSubtopicsByTopicsId(id);
      setSubtopics(res.subtopics);
    }
  };
  const toggleTopicsDetails = async (id: number) => {
    handleGetSubtopics(id);
    setExpandedTopicId(expandedTopicId === id ? null : id);
  };

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Topic Name</TableCell>
            <TableCell>Topic Description</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {topics ? (
            topics.length > 0 ? (
              topics.map((row, index) => (
                <React.Fragment key={index}>
                  <TableRow
                    className={`transition-all duration-300 ${
                      expandedTopicId === row.id ? "h-auto" : "h-16"
                    }`}
                  >
                    <TableCell>{row.topic_name}</TableCell>
                    <TableCell>{row.topic_description}</TableCell>
                    <TableCell>
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => toggleTopicsDetails(row.id)}
                        onMouseEnter={() => handleGetSubtopics(row.id)}
                        
                      >
                        View
                      </button>
                    </TableCell>
                  </TableRow>

                  {expandedTopicId === row.id &&
                  subTopics &&
                  subTopics.length > 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={3}
                        className="p-2 bg-gray-100 rounded"
                      >
                        <h3 className="font-semibold">Subtopics</h3>
                        <ul className="flex flex-col gap-2">
                          {subTopics.map((subTopic, idx) => (
                            <li key={idx}>{subTopic.subtopic_name}</li>
                          ))}
                        </ul>
                      </TableCell>
                    </TableRow>
                  ) : null}
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center">
                  No data available
                </TableCell>
              </TableRow>
            )
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                Loading...
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
