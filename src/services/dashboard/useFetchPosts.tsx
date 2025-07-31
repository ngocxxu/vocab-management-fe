import { useQuery } from 'react-query'
import { httpClient } from '../settings'
import { Dashboard } from '../endPoints'

const fetchPosts = async () => {
  const { data } = await httpClient.get(Dashboard.getPosts)
  return data
}

export const useFetchPosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    onSuccess: () => {
      // console.log({ data });
    }
  })
}
