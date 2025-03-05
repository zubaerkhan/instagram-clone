import PostsGrid from "@/components/PostsGrid"
import { prisma } from "@/db"

export default async function BrowsePage(){
    const posts = await prisma.post.findMany({
        orderBy:{
            createAt:"desc",
        },
        take: 100
    })

    return (
        <div>
            <div className="mb-4 text-center">
                <h1 className="text-4xl font-bold text-slate-700">Browe</h1>
                <p className="text-gray-500">Check Treding Posts and find inspiration.</p>
            </div>
            <PostsGrid posts={posts}/>
        </div>
    )
}