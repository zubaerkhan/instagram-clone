import { auth } from "@/auth";
import PostsGrid from "@/components/PostsGrid";
import ProfileNav from "@/components/ProfileNav";
import ProfilePageInfo from "@/components/ProfilePageInfo";
import { prisma } from "@/db";
import { redirect } from "next/navigation";

export default async function BookmarkedPage() {
    const session = await auth();
    if (!session?.user?.email) {
        return "Not logged in.."
    }

    const profile = await prisma.profile.findFirst({
        where: {
            email: session?.user?.email as string
        }
    })
    if (!profile) {
        redirect("/settings")
    }

    const bookmarks = await prisma.bookmark.findMany({
        where: {
            author: session?.user?.email as string
        }
    })

    const posts = await prisma.post.findMany({
        where: {
            id: {
                in: bookmarks.map(b => b.postId)
            }
        }
    })

    return (
        <div>
            <ProfilePageInfo
                profile={profile}
                isOurProfile={true}
                ourFollow={null}
            />
            <ProfileNav
                isOurProfile={true}
                username={profile.username || ""}
            />
            <div className="mt-4">
            <PostsGrid posts={posts} />
            </div>
        </div>
    )
}