import { getDocuments } from "@/data/get-documents";
import ClientForm from "./_components/client-form";
import DocumentList from "./_components/document-list";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

export default async function Dashboard() {
  const documents = await getDocuments();

  return (
    <>
      <div className="grid h-full w-full grid-cols-2 gap-5 px-4 py-4">
        <div>
          <ClientForm />
        </div>
        <Suspense fallback={<Loader2 className="animate-spin items-center" />}>
          {documents ? <DocumentList documents={documents} /> : "Loading..."}
        </Suspense>
      </div>
    </>
  );
}
