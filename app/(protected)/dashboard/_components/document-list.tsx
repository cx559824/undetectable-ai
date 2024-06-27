"use client";

import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getDocuments } from "@/data/get-documents";

export default function DocumentList() {
  const { data, error } = useQuery({
    queryKey: ["documents"],
    queryFn: getDocuments,
  });

  if (error) <h2>{error.message}</h2>;
  if (data)
    return (
      <>
        <Card
          onClick={() => console.log("click")}
          className='mx-auto flex h-full w-full flex-col space-y-2 py-2'
        >
          {data.map((item) => (
            <>
              <div
                className='mx-4 cursor-pointer items-center truncate rounded-md border border-solid border-gray-300 px-3 py-2 text-sm shadow-lg duration-300 hover:scale-105'
                key={item.id}
              >
                <p> {item.output}</p>
                <span>{item.strength}</span>
              </div>
            </>
          ))}
        </Card>
      </>
    );
}
