import { prisma } from "@/db"
import { Follower, Profile } from "@prisma/client"
import { Avatar } from "@radix-ui/themes";
import LikesInfo from "./LikesInfo";
import { GetSessionEmailOrThrow } from "@/actions";
import Link from "next/link";
import BookmarkButton from "./BookmarkButton";

export default async function HomePosts({
    follows,
    profiles
}: {
    follows: Follower[];
    profiles: Profile[]
}) {
    const posts = await prisma.post.findMany({
        where: {
            author: { in: profiles.map(p => p.email) }
        },
        orderBy: {
            createAt: "desc"
        },
        take: 100
    })

    const sessionEmail = await GetSessionEmailOrThrow();

    const likes = await prisma.like.findMany({
        where: {
            author: sessionEmail,
            postId: { in: posts.map(p => p.id) }
        }
    })

    const bookmarks =  await prisma.bookmark.findMany({
        where: {
            author : sessionEmail,
            postId: {in: posts.map(p=>p.id)}

        }
    })

    return (
        <div className="max-w-md mx-auto flex flex-col gap-8 mt-8 items-center">
            {posts && posts.map((post) => {
                const profile = profiles.find(p => p.email === post.author)
                return (
                    <div key={post.id} >
                        <div >
                           <Link href={`/posts/${post.id}`}>
                           <img src={post.image} alt=""
                                className="rounded-lg shadow-md shadow-black/50"
                            />
                           </Link>
                        </div>
                        <div className="flex items-center justify-between mx-auto  mt-4 ">
                            <div className="max-w-">
                                <div className="flex items-center gap-2">
                                    <Avatar
                                        fallback="Avatar"
                                        src={profile?.avatar || ""}
                                        size="2"
                                        radius="full"
                                    />
                                    <div>{profile?.name}</div>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <LikesInfo
                                        post={post}
                                        sessionLike={likes.find(like => like.postId === post.id) || null}
                                        showText={false}
                                    />
                                   <BookmarkButton post={post} sessionBookmark={bookmarks.find(b=>b.postId === post.id) || null}/>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className="text-slate-800 mt-2 dark:text-gray-400">{post.description} </p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}