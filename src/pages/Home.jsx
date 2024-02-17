import Bookshelf from "../components/organisms/bookshelf";
import Turnstone from 'turnstone';
import Styles from "./styles";

export default function Home() {

  const listBoxes = [
    {
      id: 'topics',
      name: 'Temática',
      //ratio: 3,
      //displayField: 'name',
      data: ['Topic 1', 'Topic 2', 'Topic 3', 'Topic 4', 'Topic 5', 'Topic 6','Deportes'],
      searchType: 'startswith',
    },
    {
      id: 'contents',
      name: 'Contenidos',
      ratio: 3,
      //displayField: 'title',
      data: ['Content 1', 'Content 2', 'Content 3', 'Content 4', 'Content 5', 'Content 6','Deportes de contacto'],
      searchType: 'startswith',
    }
  ]

  return (
    <div>
      <div className="p-2">
        <Turnstone listbox={listBoxes} placeholder='Busqueda rápida' styles={Styles.searchStyles} clearButton={true}/>
      </div>
      <Bookshelf />
    </div>
  );
}