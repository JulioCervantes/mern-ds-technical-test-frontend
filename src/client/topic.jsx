import endpoints from "./constants";

export default function Topic({client}) {
  return {
    getTopics: (queryParams) => {
      return client.get(endpoints.topic.get,{params:queryParams});
    },
    create: (formData) => {
      return client.post(endpoints.topic.post, formData);
    },
  }
}
