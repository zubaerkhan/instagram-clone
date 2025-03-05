import { prisma } from "@/db"
import PostsGrid from "./PostsGrid"
import { Suspense } from "react"

export default async function ProfilePosts({ userEmail }: { userEmail: string }) {
    const profilePosts = await prisma.post.findMany({
        where: {
            author: userEmail
        }
    })
    return (
        <Suspense fallback="loading...">
            <PostsGrid posts={profilePosts} />
        </Suspense>
    )
}