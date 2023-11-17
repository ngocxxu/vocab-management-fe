import axios from 'axios';
import { useQuery } from 'react-query';

const fetchPosts = async () => {
  const { data } = await axios.get(
    'https://jsonplaceholder.typicode.com/posts'
  );
  return data;
};

export const useFetchPosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    onSuccess: (data) => {
      console.log({ data });
    },
  });
};
