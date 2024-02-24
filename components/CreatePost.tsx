"use client"
import React, { useState } from 'react'
import {data} from "../public/category"
import { CldUploadButton, CldUploadWidgetResults } from "next-cloudinary";
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const CreatePost = () => {
const router=useRouter();
    const [title,setTitle]=useState("");
    const [content,setContent]=useState("");
    const [imageUrl, setImageUrl]=useState("");
    const [category,setCategory]=useState("");
    const [publicId,setPublicId]=useState("");
    const [links, setLinks] = useState<string[]>([]);
    const [linkInput, setLinkInput] = useState("");

    const handleImageUpload = (result: CldUploadWidgetResults) => {
        console.log("result: ", result);
        const info = result.info as object;
    
        if ("secure_url" in info && "public_id" in info) {
          const url = info.secure_url as string;
          const public_id = info.public_id as string;
          setImageUrl(url);
          setPublicId(public_id);
          console.log("url: ", url);
          console.log("public_id: ", public_id);
        }
      };


      const addLink = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (linkInput.trim() !== "") {
          setLinks((prev) => [...prev, linkInput]);
          setLinkInput("");
        }
      };
    
      const deleteLink = (index: number) => {
        setLinks((prev) => prev.filter((_, i) => i !== index));
      };

      const handleSubmit=async (e:React.FormEvent<HTMLElement>)=>{
        e.preventDefault();

        try {
            const res = await fetch("api/post/", {
                method: "POST",
                headers: {
                  "Content-type": "application/json",
                },
                body: JSON.stringify({
                  title,
                  content,
                  links,
                  category,
                  imageUrl,
                  publicId,
                }),
              });

              if(res.ok)
              {
        setTitle("");
        setLinks([]);
        setImageUrl("");
        setCategory("")
        setContent("")
        router.push("/dashboard");
              }
        } catch (error) {
            console.log(error);
        }
      }



  return (
    <div className='m-2 mb-4'>
        <form onSubmit={handleSubmit}>
        <div className="max-w-md mx-auto">
  <h2 className="text-2xl font-semibold mb-4">Create a new Blog</h2>
  <div className="mb-4">
    <label htmlFor="title" className="block text-gray-700">Title</label>
    <input 
      type="text" 
      id="title" 
      name="title" 
      value={title} 
      onChange={(e) => setTitle(e.target.value)} 
      placeholder="Enter title" 
      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black" 
    />
  </div>
  <div className="mb-4">
    <label htmlFor="content" className="block text-gray-700">Content</label>
    <textarea 
      id="content" 
      name="content" 
      value={content} 
      onChange={(e) => setContent(e.target.value)} 
      placeholder="Enter content" 
      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500  text-black"
    ></textarea>
  </div>
  <div className="mb-4">
    <label htmlFor="imageUrl" className="block text-gray-700">CLick the Box to Upload</label>
     <CldUploadButton
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
          className={`h-48 w-48 border-2 mt-4 border-dotted grid place-items-center  text-black rounded-md relative ${
            imageUrl && "pointer-events-none"
          }`}
          onUpload={handleImageUpload}
        >
          {imageUrl && (
            <Image
              src={imageUrl}
              fill
              className="absolute object-cover inset-0"
              alt={title}
            />
          )}
        </CldUploadButton>
  </div>
  <div className=" flex mb-4 items-center">
  <label htmlFor="links" className="block text-gray-700">Category</label>
          <select name='catName' value={category} onChange={(e)=>setCategory(e.target.value)} className='p-2 bg-transparent'>
            <option value="">Select a category</option>
            {data.map((category,key) => { return(
              <option key={key} value={category.category}>{category.category}</option>
            )})}
          </select>
  </div>
  {links &&
          links.map((link, i) => (
            <div key={i} className="flex items-center gap-4">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                  />
                </svg>
              </span>
              <Link className="link" href={link}>
                {link}
              </Link>
              <span className="cursor-pointer" onClick={() => deleteLink(i)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </span>
            </div>
          ))}

        <div className="flex gap-2">
          <input
            className="flex-1 text-black p-3 rounded-xl"
            type="text"
            onChange={(e) => setLinkInput(e.target.value)}
            value={linkInput}
            placeholder="Paste the link and click on Add"
          />
          <button onClick={addLink} className="btn flex gap-2 items-center">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
              </svg>
            </span>
            Add
          </button>
        </div>
  <button className='p-3 text-white rounded-xl bg-red-600 mt-2' type='submit'>
    Submit
</button>
</div>

        </form>

    </div>
  )
}

export default CreatePost
