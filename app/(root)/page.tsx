import React from "react";
import SearchForm from "../../components/SearchForm";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { client } from "@/sanity/lib/client";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) => {
  const query = (await searchParams).query;
  const params = { search: query || null };

  const posts = await client.fetch(STARTUPS_QUERY, params);

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup,
          <br /> Connect With Entrepreneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed
        </p>
        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All Startups"}
        </p>
      </section>
      <ul className="mt-7 card_grid">
        {posts?.length > 0 ? (
          posts.map((StartupCardType: StartupTypeCard) => (
            <StartupCard post={StartupCardType} key={StartupCardType._id} />
          ))
        ) : (
          <p className="no-results">No startups found</p>
        )}
      </ul>
    </>
  );
};

export default Home;
