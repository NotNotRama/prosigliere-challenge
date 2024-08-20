import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { Character, client } from '../client';

export function useAllCharacters(
  queryOptions?: UseQueryOptions<Character[], Error>
) {
  return useQuery({
    queryKey: ['allCharacters'],
    queryFn: () => client.getAllCharacters(),
    ...queryOptions,
  });
}
