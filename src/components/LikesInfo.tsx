"use client"
import { LikePost, removeLikeFormPost } from "@/actions";
import { Like, Post } from "@prisma/client";
import { HeartIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LikesInfo({
    post,
    sessionLike,
    showText = true

}: {
    post: Post,
    sessionLike: Like | null,
    showText?: boolean
}) {
    const router = useRouter();
    const [likeByMe, setLikeByMe] = useState(!!sessionLike)

    return (
        <form action={async (data: FormData) => {

            setLikeByMe((prev) => !prev);

            if (likeByMe) {
                // Remove like
                await removeLikeFormPost(data)
            } else {
                // Add like
                await LikePost(data)
            }

            router.refresh()
        }}
            className="flex items-center gap-2"
        >
            <input type="hidden" name="postId" value={post.id} />
            <button type="submit">
                <HeartIcon className={`${likeByMe ? "fill-red-600 text-red-600 dark:text-white dark:fill-gray-300" : "dark:text-white"}`} />
            </button>
        {
            showText&& (
                <p>{post.likesCount} people Like This.</p>
            )
        }
        </form>
    )
}

