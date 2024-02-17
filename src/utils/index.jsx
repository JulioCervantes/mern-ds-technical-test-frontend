const buildDynamicListBox = ({id,name,ratio=8,displayField='name',endpoint,keyword,maxItems=15,searchType='contains'}) => {
  const asyncData = (query=keyword) => {
    return fetch(`${endpoint}?keyword=${query}&limit=${maxItems}`).then(response => response.json());
  }
  return {
    id,
    name,
    ratio,
    displayField,
    asyncData,
    searchType
  }
};

export default buildDynamicListBox;
