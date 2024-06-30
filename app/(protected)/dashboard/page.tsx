import ClientForm from "./_components/client-form";
import DocumentList from "./_components/document-list";

export default async function Dashboard() {
  return (
    <>
      <div className='grid h-full w-full grid-cols-2 gap-5 px-4 py-4'>
        <div>
          <ClientForm />
        </div>
        <DocumentList />
      </div>
    </>
  );
}
