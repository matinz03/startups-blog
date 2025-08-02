import { client } from "@/sanity/lib/client";
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import React from "react";
export const experimental_ppr = true;
const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const search = { id: id || null };
  const post = await client.fetch(STARTUP_BY_ID_QUERY, search);
  if (!post) return notFound();
  return (
    <>
      <h1 className="test-3xl">this is a startup number:{id}</h1>
      <h4 className="text-4xl font-sans">{post?.pitch}</h4>
    </>
  );
};

export default page;
