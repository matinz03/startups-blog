"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "@/lib/utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";
import { revalidatePath } from "next/cache";

export const deletePitch = async (id: string) => {
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });
  try {
    await writeClient
      .delete({
        query: '*[_type == "startup" && _id == $id][0]',
        params: { id },
      })
      .catch((err) => {
        console.error("Delete failed: ", err.message);
      });

    revalidatePath(`/startup/${id}`);
  } catch (error) {
    console.log("error deleting the pitch", error);
  }
};

export const createPitch = async (
  state: Record<string, string>,
  form: FormData,
  pitch: string
) => {
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });
  const authorId = "" + session.id; // This will be used as _id

  // Check if author exists
  const existingAuthor = await writeClient.fetch(
    `*[_type == "author" && _id == $id][0]`,
    { id: authorId }
  );

  if (!existingAuthor) {
    await writeClient.createIfNotExists({
      _type: "author",
      _id: authorId,
      id: session.id,
      name: session.user?.name,
      username: session.user?.username,
      email: session.user?.email,
      image: session.user?.image,
      bio: "",
    });
  }

  const { title, description, category, link } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== "pitch")
  );

  const slug = slugify(title as string, { lower: true, strict: true });

  try {
    const startup = {
      title,
      description,
      category,
      image: link,
      slug: {
        _type: slug,
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: authorId,
      },
      views: 0,
      pitch,
    };

    const result = await writeClient.create({ _type: "startup", ...startup });

    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};
