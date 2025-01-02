"use server";

import api from "@/lib/api";

export async function getReviewerTopics(reviewer_id: number) {
  try {
    const res = await api.get(`/topic`, {
      params: {
        reviewer_id,
      },
    });
    if (res.data.status === "success") {
      console.log(res.data.data.topics);

      return res.data.data.topics;
    }
  } catch (error) {
    console.error("Error fetching topics:", error);
  }
}

export const getTopicSubtopics = async (topicID: number) => {
  try {
    const res = await api.get(`/subtopics?topic_id=${topicID}`);
    if (res.data.status === "success") {
      return res.data.data.subtopics;
    }
  } catch (error) {
    console.error("Error fetching subtopics:", error);
  }
};
