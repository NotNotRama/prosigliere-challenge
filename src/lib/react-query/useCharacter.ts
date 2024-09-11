import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { client, Character } from '@/lib/client';

export const useCharacter = (id: string, queryOptions?: UseQueryOptions<Character, Error>) => {
  return useQuery({
    queryKey: ['character', id],
    queryFn: () => client.getCharacter(id),
    enabled: !!id,
    ...queryOptions,
  });
};
