"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ProfileNav({ 
    isOurProfile=false,
    username
 }: { 
    isOurProfile: boolean;
    username: string
 }) {
    const path = usePathname()

    const hightlightsActive = path.includes("/hightlights");
    const bookmarkedActive = path.includes("/bookmarked");
    const PostsAction = !hightlightsActive && !bookmarkedActive


    return (
        <section className="mt-2">
            <div className="flex gap-2 font-bold justify-center">
                <Link
                    className={PostsAction ? "text-gray-800 dark:text-gray-300" : "text-gray-400 dark:text-gray-600"}
                    href={isOurProfile ? "/profile" : `/user/${username}`}>
                    Posts</Link>
                <Link
                    className={hightlightsActive ? "text-gray-800 dark:text-gray-300" : "text-gray-400 dark:text-gray-600"}
                    href={`/hightlights`}>Hightlights</Link>
                {isOurProfile && (
                    <Link
                        className={bookmarkedActive ? "text-gray-800 dark:text-gray-300" : "text-gray-400 dark:text-gray-600"}
                        href={`/profile/bookmarked`}>Bookmarked</Link>
                )}
            </div>
        </section>
    )
}