/* eslint-disable react/jsx-no-undef */

import Image from "next/image";
const getPosts = async ({id}:{id:string}) => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/post/${id}`, {
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


export default  async function Page({ params }: { params: { id: string } }) {
  const post=await getPosts(params);
  return ( 
      <div>
        {post ? (
          <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <p>Category: {post.catName}</p>
            <p>Author: {post.author.name}</p>
            {/* Render other properties as needed */}
            <Image src={post.imageUrl} alt="Image" width={100} height={100}  />
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    )
}