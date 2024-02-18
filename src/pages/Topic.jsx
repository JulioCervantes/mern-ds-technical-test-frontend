import { useParams } from "react-router-dom";
import ContentsResume from "../components/organisms/contents-resume";

export default function Topic() {
  const { id:name } = useParams();

  return (
    <div>
      <ContentsResume topicName={name}/>
    </div>
  )
}