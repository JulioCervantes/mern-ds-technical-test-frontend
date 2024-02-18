import endpoints from "./constant";

export default function Auth({client}) {
  return {
    register: ({email, password, username, role}) => {
      console.log(endpoints.auth.register, { email, password, username, role });
      return client.post(endpoints.auth.register, { email, password, username, role });
    },
    login: ({username, password}) => {
      console.log(endpoints.auth.login, { username, password });
      return client.post(endpoints.auth.login, { username, password });
    }
  }
}
