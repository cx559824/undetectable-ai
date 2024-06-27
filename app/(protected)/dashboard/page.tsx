import { getDocuments } from "@/data/get-documents";
import ClientForm from "./_components/client-form";
import DocumentList from "./_components/document-list";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function Dashboard() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["documents"],
    queryFn: getDocuments,
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className='grid h-screen w-full grid-cols-2 gap-5 px-4 py-4'>
          <div>
            <ClientForm />
          </div>
          <DocumentList />
        </div>
      </HydrationBoundary>
    </>
  );
}
