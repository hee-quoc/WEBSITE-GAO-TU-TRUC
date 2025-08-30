// src/app/_components/BlogView.tsx
// import { type Blog } from "@prisma/client";
import Image from "next/image";
// import type { JSONValue } from "node_modules/superjson/dist/types";
import { type BlogWithDetails } from "~/app/types/Types";
type ContentBlock = {
  type: string
  payload: Record<string, unknown>;

}


// type Blog = {
//   title: string;
//   slug: string;
//   tag: string;
//   content: ContentBlock[];
//   // published: boolean;
//   createdAt: Date;
//   updatedAt: Date;
//   createdBy: string;
//   thumbnailUrl: string | null;
// }

interface BlogViewProps {
  blog: BlogWithDetails ;
}


export default function BlogView({ blog }: BlogViewProps) {
  const blocks: ContentBlock[] = blog.content
    // if(blog.content){
    //   try {
    //     blocks = JSON.parse(blog.content);
    //   } catch (error) {
    //     console.error('Invalid JSON content:', error);
    //     return <p className="text-red-500">Nội dung không hợp lệ.</p>;
    //   }
    // }
    
    return (
      <article className="mx-auto max-w-4xl py-12 px-4">

        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
          {blog.title}
        </h1>
        <div className="flex flex-row items-center py-6 gap-4 md:flex-[1]">
          <Image
            src={blog.user.image??"/"}
            alt={blog.user.name??"Unknown"}
            width={56}
            height={56}
            className="rounded-full"
          />
          <div className="text-left">
            <h4 className="text-[36px] md:text-[20px] md:text-[20px] font-[500] font-alegreya-sans leading-[140%]  mb-1" style={{color:"#0A5B89"}}>
              {blog.user.name}
            </h4>
            <p className="text-[14px] sm:text-[16px] font-fz-poppins font-[400] text-gray-500">
              Published on {new Date(blog.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        {/* <div >

          <p className="mb-8 text-lg text-gray-500">
            Published on {new Date(blog.createdAt).toLocaleDateString()}
          </p>
        </div> */}
        

        {blog.thumbnailUrl && (
          <div className="relative mb-8 h-96 md:w-full ">
            <Image
              src={blog.thumbnailUrl}
              alt={blog.title}
              layout="fill"
              objectFit="cover"
              objectPosition="left"
              className="rounded-lg md:object-center"
            />
          </div>
        )}

        {/* Render the Quill content safely */}
        {/* <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        /> */}
        {blocks && (
        <div className="flex flex-col gap-2">
          {blocks.map((block, index) => {
            switch (block.type) {
              case 'header':
                return (
                  <h3 key={index} className="text-[18px] md:text-[20px] font-semibold font-alegreya-sans leading-[120%]">
                    {block.payload.text as string}
                  </h3>
                );
              case 'image':
                return (
                  <div key={index} className="relative md:w-full my-4 overflow-hidden rounded-lg md:w-[740px]">
                    <Image
                      src={block.payload.image as string}
                      alt={block.payload.caption as string ?? 'Blog Image'}
                      width={800}
                      height={450}
                      className="rounded-lg object-contain max-w-[740px] md:max-w-full md:w-full  object-cover "
                    />
                    {block.payload.caption as string && (
                      <p className="text-sm text-center mt-2 text-gray-600">
                        {block.payload.caption as string}
                      </p>
                    )}
                  </div>
                );
              case 'description':
                // block.payload.code = `<p>${block.payload.code.replaceAll("\n","<br/>")}</p>`;
    
                const content=`<p>${(block.payload.code as string).replaceAll("\n","<br/>")}</p>`;
                return (
                  <p key={index} className="text-base leading-relaxed font-fz-poppins" dangerouslySetInnerHTML={{ __html: content }}>
                    {/* {block.payload.code as string} */}
                  </p>
                );
              default:
                return null;
            }
          })}
        </div>)}
      </article>
    );
  
}