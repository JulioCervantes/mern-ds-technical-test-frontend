import endpoints from "./constants";

export default function Content({client}) {
  return {
    getContents: (queryParams) => {
      console.log('queryParams', queryParams);
      return client.get(endpoints.content.get, {params: queryParams});
    },
    getContentByTitle: (title) => {
      return client.get(`${endpoints.content.get}/${title}`);
    },
    create: (formData, token) => {
      console.log('token', token);
      return client.post(endpoints.content.post, formData, {
        'Authorization': `Bearer ${token}`
      });
    },
  }
}
