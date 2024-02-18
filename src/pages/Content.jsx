import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import client from "../client";
import { useSelector } from "react-redux";

export default function Content() {
  const { id: title } = useParams();
  const [contentRecord, setContentRecord] = useState({});
  const currentSession = useSelector((state) => state.session);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await client.content.getContentByTitle(title);
        console.log({ response });
        setContentRecord(response.data);
      } catch (error) {
        console.log({ error });
      }
    }
    loadContent();
  }, []);

  const getYoutubeVideoId = (url) => {
    const regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  return (
    <div>
      <div className="grid w-full bg-blue-200 rounded-lg shadow-lg p-4">
        <h1 className="text-2xl font-bold text-center">{contentRecord.title}</h1>
        <p className="text-center">{contentRecord.summary}</p>
        <hr />
        <p>Author: {contentRecord.authorId?.username}</p>
        <p>Source: [{contentRecord.contentType}]</p>
        { currentSession?.role === 'guest' && (
          <p>[HIDDEN]</p>
          )
        }
        {
          contentRecord.contentType === 'image' &&
          <img src={`data:image/png;base64, ${contentRecord.data}`} alt={contentRecord.title} />
        }
        {
          contentRecord.contentType === 'video' &&
          <iframe width="560" height="315" src={`https://www.youtube.com/embed/${getYoutubeVideoId(contentRecord.data)}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        }

        {
          contentRecord.contentType === 'text' &&
          <textarea readOnly className="w-full" value={atob(contentRecord.data)}></textarea>
        }

      </div>
    </div>
  );
}