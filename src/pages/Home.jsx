import Bookshelf from "../components/organisms/bookshelf";
import Turnstone from 'turnstone';
import Styles from "./styles";
import client from "../client";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const navigateTo = (ev) => {
    if(ev){
      if(ev.type === 'topic'){
        navigate(`/topic/${ev.name}`);
      } else if(ev.type === 'content'){
        navigate(`/content/${ev.title}`);
      }
    }
  };

  const listBoxes = [
    {
      id: 'topics',
      name: 'Tematica',
      ratio: 3,
      data: (name) =>{
        return client.topic.getTopics({name}).then((response) => {
          const topics = response.data.map((topic) => {
            return {
              name: topic.name,
              type: 'topic',
            };
          });
          console.log(topics);
          return topics;
        });
      },
      searchType: 'startswith'
    },
    {
      id: 'content',
      name: 'Contenido',
      displayField: 'title',
      ratio: 3,
      data: (title) =>{
        return client.content.getContents({title}).then((response) => {
          console.log('contents',response.data);
          const contents = response.data.map((content) => {
            return {
              title: content.title,
              type: 'content',
            };
          });
          return contents;
        }).catch((error) => {
          console.error(error);
          return [];
        });
      },
      searchType: 'startswith',
    }
  ]

  return (
    <div>
      <div className="p-2">
        <Turnstone onSelect={(ev)=>{navigateTo(ev)}} typeahead={true} debounceWait={250} maxItems={15} matchText={true} listbox={listBoxes} placeholder='Búsqueda rápida' styles={Styles.searchStyles} clearButton={true}/>
      </div>
      <Bookshelf />
    </div>
  );
}