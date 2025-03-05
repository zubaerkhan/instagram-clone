"use client"
import { Post } from '@prisma/client'
import Link from 'next/link'
import Masonry from 'react-masonry-css'

export default function PostsGrid({posts}:{posts:Post[]}) {
    
    return (
        <div className='max-w-4xl mx-auto'>
            
        <Masonry
            breakpointCols={{
                default: 4,
                860: 3,
                500: 2
            }}
            className="flex -ml-4"
            columnClassName="pl-4">
            {
                posts && posts.map((post,i) => (
                    <div
                    className='mb-4'
                    key={i}>
                        <Link href={`/posts/${post.id}`} className=''>
                            <img src={post.image} alt="" className='rounded-lg'/>
                        </Link>
                    </div>
                )
            )
        }
        </Masonry>
        </div>
    )
}