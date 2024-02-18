import endpoints from "./constants";

export default function Content({client}) {
  return {
    getContents: () => {
      return client.get(endpoints.content.get);
    },
    create: (formData, token) => {
      console.log('token', token);
      return client.post(endpoints.content.post, formData, {
        'Authorization': `Bearer ${token}`
      });
    },
  }
}
