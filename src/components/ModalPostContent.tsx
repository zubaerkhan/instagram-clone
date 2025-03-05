import { getSinglePostData } from "@/actions";
import SinglePostContent from "./SinglePostContent";

export default async function ModalPostContent({ postId }: { postId: string }) {

    const { post, authorProfile, comments, commentAuthor, MyLike, myBookmark } = await getSinglePostData(postId);
    return (
        <SinglePostContent
            post={post}
            authorProfile={authorProfile}
            comments={comments}
            commentAuthor={commentAuthor}
            MyLike={MyLike}
            myBookmark={myBookmark}
        />
    )
}