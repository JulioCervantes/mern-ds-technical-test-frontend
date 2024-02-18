import endpoints from "./constants";

export default function Category({client}) {
  return {
    getCategories: () => {
      return client.get(endpoints.category.get);
    }
  }
}
