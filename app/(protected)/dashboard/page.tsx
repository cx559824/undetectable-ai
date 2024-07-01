import { getDocuments } from "@/data/get-documents";
import ClientForm from "./_components/client-form";
import DocumentList from "./_components/document-list";

export default async function Dashboard() {
  const documents = await getDocuments();

  return (
    <>
      <div className="grid h-full w-full grid-cols-2 gap-5 px-4 py-4">
        <div>
          <ClientForm />
        </div>
        {documents ? <DocumentList documents={documents} /> : "Loading..."}
      </div>
    </>
  );
}
