import React from "react";
import Post from "@/components/Post";


export interface TPost  {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  publicId?: string;
  catName?: string;
  links: null | string[];
  createdAt: string;
  authorEmail: string;
  author: {
    name: string;
  };
};

export const getPosts = async () => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/post`, {
      cache: "no-store",
    });

    if (res.ok) {
      const posts = await res.json();
      return posts;
    }
  } catch (error) {
    console.log(error);
  }

  return null;
};

const page = async () => {
  const posts=await getPosts();

  return(
    <div className="grid md:grid-cols-3 justify-around items-center">

    {posts && posts.length > 0 ? (
      posts.map((post:TPost) => (
        <Post
          key={post.id}
          id={post.id}
          author={post.author.name}
          authorEmail={post.authorEmail}
          date={post.createdAt}
          thumbnail={post.imageUrl}
          category={post.catName}
          title={post.title}
          content={post.content}
          links={post.links || []}
        />
      ))
    ) : (
      <div className="py-6">No posts to display</div>
    )}
  </div>
  )
}

export default page;
