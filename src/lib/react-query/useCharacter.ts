import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { client, Character } from '@/lib/client';
import { useRouter } from 'next/router';

export const useCharacter = (queryOptions?: UseQueryOptions<Character, Error>) => {
  const router = useRouter();
  const { id } = router.query;

  return useQuery({
    queryKey: ['character', id],
    queryFn: () => client.getCharacter(id as string),
    enabled: !!id,
    ...queryOptions,
  });
};
