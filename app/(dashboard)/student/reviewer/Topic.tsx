import { getTopicSubtopics } from "@/actions/topic.action";

export default async function Topic({ topic }: { topic: any }) {
  const subtopics = await getTopicSubtopics(topic.id);

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      {/* Topic Information */}
      <section className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          {topic.topic_name}
        </h1>
        <p className="text-gray-600">{topic.topic_description}</p>
      </section>

      {/* Subtopics */}
      <section>
        <h2 className="text-xl font-semibold text-gray-700">Subtopics</h2>
        {subtopics.length > 0 ? (
          <ul className="list-disc list-inside text-gray-800">
            {subtopics.map((subtopic: any) => (
              <li key={subtopic.id} className="mb-2">
                <strong>{subtopic.subtopic_name}</strong>:{" "}
                {subtopic.subtopic_description}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No subtopics available.</p>
        )}
      </section>
    </div>
  );
}
