import { useEffect, useState } from "react";
import Topic from "../topic";
import client from "../../../client";

export default function Topics({categoriesSelected}) {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const loadTopics = async () => {
      const response = await client.topic.getTopics();
      const { data: topics } = response;
      const topicsMapped = topics.filter((topic) => {
        console.log({topic});
        const {contentTypes} = topic;
        const matchContent = contentTypes.filter((contentType) => {
          return categoriesSelected[contentType._id];
        });
        console.log({matchContent, categoriesSelected, contentTypes});
        return matchContent.length > 0;
      }).map((topic) => {
        return {
          name: topic.name,
          coverImage: `data:image/png;base64, ${topic.coverImage}`,
        }
      });
      setTopics(topicsMapped);
    };
    loadTopics();
  }, [categoriesSelected]);

  return (
    <div className="bg-blue-600 pt-4">
      {topics.length === 0 && (
        <div>
          Aún no existen temáticas o no hay temáticas que coincidan con las categorías seleccionadas
        </div>
      )}
      {topics.map((topic, index) => (
        <Topic key={index} name={topic.name} coverImage={topic.coverImage}></Topic>
      ))}
    </div>
  )
}