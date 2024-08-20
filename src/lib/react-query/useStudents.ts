import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { Character, client } from '../client';

export function useStudents(queryOptions?: UseQueryOptions<Character[], Error>) {
  return useQuery({
    queryKey: ['students'],
    queryFn: () => client.getStudents(),
    ...queryOptions,
  });
}
