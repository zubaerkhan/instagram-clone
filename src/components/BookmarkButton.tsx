"use client"
import { bookmarkPost, unbookmarkPost } from "@/actions";
import { Like, Post } from "@prisma/client";
import { BookmarkIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BookmarkButton({
    post,
    sessionBookmark,
}: {
    post: Post,
    sessionBookmark: Like | null,
}) {
    const router = useRouter();
    const [bookmarkByMe, setBookmarkByMe] = useState(!!sessionBookmark)

    return (

        <form action={async (data: FormData) => {
            setBookmarkByMe((prev) => !prev);

            if (bookmarkByMe) {
                // Remove Bookmark
                await unbookmarkPost(post.id)
            } else {
                // Add Bookmark
                await bookmarkPost(post.id)
               
            }
            router.refresh()
        }}
            className="flex items-center gap-2"
        >
            <button type="submit">
                <BookmarkIcon 
                className={`${bookmarkByMe ? "fill-gray-800 dark:text-white dark:fill-gray-300" : "dark:text-white text-gray-600"}`} />
            </button>
        </form>
    )
}

