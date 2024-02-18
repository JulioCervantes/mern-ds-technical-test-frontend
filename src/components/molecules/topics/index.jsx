import { useEffect, useState } from "react";
import Topic from "../topic";
import client from "../../../client";

export default function Topics() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const loadTopics = async () => {
      const response = await client.topic.getTopics();
      const { data: topics } = response;
      const topicsMapped = topics.map((topic) => {  
        return {
          name: topic.name,
          coverImage: topic.coverImage,
        }
      });
      setTopics(topicsMapped);
    };
    loadTopics();
  }, []);

  return (
    <div className="bg-blue-600 pt-4">
      {topics.length === 0 && (
        <div>
          Aún no existen temáticas
        </div>
      )}
      {topics.map((topic, index) => (
        <Topic key={index} name={topic.name} coverImage={topic.coverImage}></Topic>
      ))}
    </div>
  )
}