import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { Character, client } from '../client';

export function useStaff(queryOptions?: UseQueryOptions<Character[], Error>) {
  return useQuery({
    queryKey: ['staff'],
    queryFn: () => client.getStaff(),
    ...queryOptions,
  });
}
