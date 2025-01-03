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
import { Reviewer, Subtopic, Topic, User } from "@/lib/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loading from "../Loading/Loading";

interface TopicsProps {
  reviewer: Reviewer;
  user: User | undefined;
}

export default function Topics({ reviewer, user }: TopicsProps) {
  const navigate = useRouter();
  const [topics, setTopics] = useState<Topic[] | null>(null);
  const [subTopics, setSubtopics] = useState<Subtopic[] | null>(null);
  const [expandedTopicId, setExpandedTopicId] = useState<number | null>(null);

  useEffect(() => {
    async function handleGetTopics() {
      if (reviewer) {
        const res = await getTopicsByReviewerId(reviewer?.id);
        if (res) {
          setTopics(res.topics);
        }
      }
    }
    handleGetTopics();
  }, [reviewer]);

  const handleClickViewButton = (reviewer_id: number, topic_id: number) => {
    if (user?.role === "student") {
      handleGetSubtopics(topic_id);
      setExpandedTopicId(expandedTopicId === topic_id ? null : topic_id);
    } else {
      navigate.push(`/dashboard/reviewer/${reviewer_id}/topic/${topic_id}`);
    }
  };

  const handleGetSubtopics = async (id: number) => {
    if (topics) {
      const res = await getSubtopicsByTopicsId(id);
      if(res){
        setSubtopics(res.subtopics);
      }
    }
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
                        onClick={() =>
                          handleClickViewButton(row.reviewer_id, row.id)
                        }
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
                <TableCell colSpan={3} className="text-center"><Loading /></TableCell>
              </TableRow>
            )
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
