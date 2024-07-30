import { useLocalStorage } from "@/hooks/useLocalStorage";
import { LocalStorageKey } from "@/types/global";
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "https://socialmotion-api.socialmotion.biz/graphql",
});
const authLink = setContext((_: any, { headers }: any) => {
  const { item } = useLocalStorage<LocalStorageKey>("AUTH_TOKEN");
  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${item}`,
    },
  };
});
export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
