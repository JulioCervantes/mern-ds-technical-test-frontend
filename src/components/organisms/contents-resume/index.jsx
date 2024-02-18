import { useEffect, useState } from "react";
import client from "../../../client";
import { Link } from "react-router-dom";

export default function ContentsResume({ topicName }) {
  const [contents, setContents] = useState([]);
  const [contentsCount, setContentsCount] = useState({});

  const generatedPath = (contentTitle) => `/content/${contentTitle}`;

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const response = await client.content.getContents({topicName});
        setContents(response.data?.contents);
        setContentsCount(response.data?.count);
      } catch (error) {
        console.log({ error });
      }
    }
    fetchContents();
  }, [topicName]);

  return (
    <div>
      <h1 className="text-white text-2xl">{topicName}</h1>
      <hr/>
      <p className="bg-blue-800 text-xl text-gray-300">
        {contentsCount.images} image(s) | {contentsCount.videos} video(s) | {contentsCount.text} text(s)
      </p>
      {contents.map(content => (
        <div className="flex flex-row gap-2" key={content._id}>
          <Link to={generatedPath(content.title)} className="bg-gray-300 w-52 m-1">
              <div className="bg-blue-800 m-1 text-white text-center">
                {content.title}
                <div className="bg-blue-600 text-xs">
                  Creado: {content.createdAt.substring(0, 19)}
                </div>
              </div>
          </Link>
        </div>
      ))}
    </div>
  )
}