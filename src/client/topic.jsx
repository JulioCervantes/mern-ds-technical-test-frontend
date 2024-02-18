import endpoints from "./constants";

export default function Topic({client}) {
  return {
    getTopics: () => {
      return client.get(endpoints.topic.get);
    },
    create: (formData) => {
      return client.post(endpoints.topic.post, formData);
    },
  }
}
