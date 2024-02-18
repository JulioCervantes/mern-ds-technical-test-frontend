import { useState } from "react";
import Categories from "../../molecules/categories";
import Topics from "../../molecules/topics";

export default function Bookshelf() {
  const [ categoriesSelected, setCategoriesSelected ] = useState({});
  
  const filterTopics = (categoryId, newState) => {
    setCategoriesSelected({...categoriesSelected, [categoryId]: newState});
  };



  return (
    <div>
      <Categories filterTopics={(categoryId, newState)=>{filterTopics(categoryId,newState)}}/>
      <Topics categoriesSelected={categoriesSelected}/>
    </div>
  );
}