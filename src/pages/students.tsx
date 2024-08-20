import { client } from '@/lib/client';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetStaticProps } from 'next';
import { useStudents } from '@/lib/react-query/useStudents';
import { Layout } from '@/components/Layout';
import { revalidateDuration } from '@/utils';

export default function Staff() {
  const { data: characters, error } = useStudents();

  if (error) return <div>An error occurred: {(error as Error).message}</div>;

  return <Layout characters={characters} title="Students" />;
}

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['students'],
    queryFn: () => client.getStudents(),
  });
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: revalidateDuration,
  };
};
