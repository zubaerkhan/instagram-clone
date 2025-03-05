import { Comment } from "@/components/Comment"
import SessionCommentForm from "@/components/SessionCommentForm"
import { Suspense } from "react"
import { BookmarkIcon } from "lucide-react"
import LikesInfo from "@/components/LikesInfo"
import { Bookmark, Comment as CommentModal, Like, Post, Profile } from "@prisma/client"
import BookmarkButton from "./BookmarkButton"

export default function SinglePostContent({
    post,
    authorProfile,
    comments,
    commentAuthor,
    MyLike,
    myBookmark
}:{
   
    post: Post;
    authorProfile: Profile;
    comments: CommentModal[];
    commentAuthor: Profile[];
    MyLike: Like | null
    myBookmark: Bookmark | null
}){
    
    
    return (
        <div className="grid md:grid-cols-2 gap-4">
            <div>
                <img src={post?.image} alt={post?.description} className="rounded-md" />
            </div>
            <div>
                <Comment authorProfile={authorProfile} text={post.description} createdAt={post.createAt} />
                <div className="pt-8">
                    Comment listed:
                    {
                        comments && comments.map((comment) => (
                            <div key={comment.id}>
                                <Comment
                                    authorProfile={commentAuthor.find(a => a.email === comment.author)}
                                    text={comment.text}
                                    createdAt={comment.createdAt}
                                />

                            </div>
                        ))
                    }
                </div>
                <div className="flex justify-between text-gray-700 py-4  border-t border-t-gray-300 dark:border-t-gray-700 mt-4">
                    <LikesInfo post={post} sessionLike={MyLike} />
                    <div className="flex items-center">
                        <BookmarkButton post={post} sessionBookmark={myBookmark}/>
                    </div>
                </div>
                <div className="pt-4 border-t border-t-gray-300 dark:border-t-gray-700">
                    <Suspense>
                        <SessionCommentForm postId={post.id} />
                    </Suspense>
                </div>
            </div>
        </div>
    )
}