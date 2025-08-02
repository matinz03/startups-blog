import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
import { client } from "@/sanity/lib/client";
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import { formatDate } from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
export const experimental_ppr = true;
const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const search = { id: id || null };
  const post = await client.fetch(STARTUP_BY_ID_QUERY, search);
  if (!post) return notFound();
  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <p className=" tag">{formatDate(post?._createdAt)}</p>
        <h1 className="heading">{post.title}</h1>
        <p className="sub-heading !max-w-5xl">{post.description}</p>
      </section>
      <section className="section_container">
        <img
          src={post.image}
          alt="thumbnail"
          className=" h-auto mx-auto rounded-xl"
        />
        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link
              href={`/user/${post.author?._id}`}
              className="flex gap-2 items-center mb-3"
            >
              <Image
                src={post.author?.image}
                alt="avatar"
                height={64}
                width={64}
                className="rounded-full drop-shadow-lg"
              />
            </Link>
            <p className="category-tag">{post.category}</p>
          </div>
          <h3 className="text-30-bold">Pitch Details</h3>
          {post.pitch ? (
            <article
              className="text-center text-24-medium font-work-sans break-all max-w-4xl"
              dangerouslySetInnerHTML={{ __html: post.pitch }}
            />
          ) : (
            <p className="no-result">no pitch ideas provided</p>
          )}
        </div>
        <hr className="divider" />
      </section>

      <Suspense fallback={<Skeleton className="view_skeleton" />}>
        <View id={id} />
      </Suspense>
    </>
  );
};

export default page;
