import { prisma } from "@/db"
import { Avatar } from "@radix-ui/themes"
import Link from "next/link"
import PostsGrid from "./PostsGrid"

export default async function SearchResultPosts({ query }: { query: string }) {

    const profiles = await prisma.profile.findMany({
        where: {
            OR: [
                { username: { contains: query } },
                { name: { contains: query } }
            ]
        },
        take:10
    })

    const posts = await prisma.post.findMany({
        where: {
            description: {contains: query}
        },
        take: 100
    })

    return (
        <div>
            <div className="text-center w-full">
                <h1 className="text-lg mt-4 mb-2 ">Search Result for "{query}"</h1>
                {/* {!profiles.length && (
                    <div className="text-4xl flex justify-center mt-8 text-gray-600">Profile not found..</div>
                )} */}
            </div>
            <div className="max-w-md flex justify-center mx-auto">
                <div className="grid sm:grid-cols-2 gap-2 w-full">
                    {
                        profiles.map((profile) => (
                            <Link
                            key={profile.id}
                                href={`/user/${profile.username}`}
                                className="flex items-center gap-2 bg-gray-200 dark:bg-gray-900  border-gray-300 rounded-full overflow-hidden p-2"
                            >
                                <div>
                                    <Avatar 
                                    size="4"
                                    fallback="User Avator" 
                                    radius="full"
                                    src={profile?.avatar || ""} />
                                </div>
                                <div>
                                    <h3>{profile.name}</h3>
                                    <h4 className="text-gray-500 dark:text-gray-400 text-sm">@{profile?.username}</h4>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
            <div className="mt-8">
                <PostsGrid posts={posts}/>
            </div>
        </div>
    )
}
