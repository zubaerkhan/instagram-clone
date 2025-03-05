"use client"
import { Button, TextArea } from "@radix-ui/themes"
import Avatar from "./Avatar"
import { postComment } from "@/actions"
import { useRouter } from "next/navigation"
import { useRef } from "react"

export default function CommentForm({avatar, postId}:{avatar:string, postId:String}) {
    const router = useRouter()
    const textAreaRef = useRef<HTMLTextAreaElement>(null)
  return (
    <form action={async data=>{
        await postComment(data);
        if(textAreaRef.current){
            textAreaRef.current.value = "" 
        }
        router.refresh()

    }}>
        <input type="hidden" name="postId" value={postId as string} />
    <div className="flex gap-2">
        <div>
            <Avatar src={avatar} />
        </div>
        <div className="w-full flex flex-col gap-2">
            <TextArea ref={textAreaRef} name="text" placeholder="Tell the world what you thing..." />
            <div>
                <Button>Post Comment</Button>
            </div>
        </div>
    </div>
</form>
  )
}
