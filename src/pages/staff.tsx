import { client } from '@/lib/client';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetStaticProps } from 'next';
import { Layout } from '@/components/Layout';
import { useStaff } from '@/lib/react-query';

export default function Staff() {
  const { data: characters, error } = useStaff();

  if (error) return <div>An error occurred: {(error as Error).message}</div>;

  return <Layout characters={characters} title="Staff" />;
}

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['staff'],
    queryFn: () => client.getStaff(),
  });
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 3600,
  };
}
