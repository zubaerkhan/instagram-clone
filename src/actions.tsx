"use server"

import { prisma } from "@/db";
import { auth } from "./auth";
import { uniq } from "lodash"

export async function getSessionEmail():Promise<string|null|undefined>{
    const session = await auth();
    return session?.user?.email
}

export async function GetSessionEmailOrThrow() {
    const userEmail = await getSessionEmail()
    if (!userEmail) {
        throw ("Not log in")
    }
    return userEmail;
}

export default async function UpdateProfile(data: FormData) {
    const userEmail = await GetSessionEmailOrThrow()
    const newUserInfo = {
        username: data.get("username") as string,
        name: data.get("name") as string,
        subtitle: data.get("subtitle") as string,
        bio: data.get("bio") as string,
        avatar: data.get("avatar") as string,
    }
    await prisma.profile.upsert({
        where: {
            email: userEmail,
        },
        update: newUserInfo,
        create: {
            email: userEmail,
            ...newUserInfo
        }
    })
}

export async function postEntry(data: FormData) {
    const userEmail = await GetSessionEmailOrThrow()
    const postDoc = await prisma.post.create({
        data: {
            author: userEmail,
            image: data.get("image") as string,
            description: data.get('description') as string || '',
        }
    })
    return postDoc.id;
}

export async function postComment(data: FormData) {
    const authorEmail = await GetSessionEmailOrThrow()

    return prisma.comment.create({
        data: {
            author: authorEmail,
            postId: data.get("postId") as string,
            text: data.get("text") as string
        }
    })
}

async function updatePostLikesCount(postId: string) {
    await prisma.post.update({
        where: {
            id: postId
        },
        data: {
            likesCount: await prisma.like.count({
                where: {
                    postId: postId
                }
            })
        }
    })
}

export async function LikePost(data: FormData) {
    const authorEmail = await GetSessionEmailOrThrow()
    const postId = data.get("postId") as string

    await prisma.like.create({
        data: {
            author: authorEmail,
            postId: postId
        }
    })

    await updatePostLikesCount(postId)
}

export async function removeLikeFormPost(data: FormData) {
    const authorEmail = await GetSessionEmailOrThrow()
    const postId = data.get("postId") as string

    await prisma.like.deleteMany({
        where: {
            author: authorEmail,
            postId: postId
        }
    })

    await updatePostLikesCount(postId)

}

export async function getSinglePostData(postId: string) {
    const post = await prisma.post?.findFirstOrThrow({ where: { id: postId } })
    const authorProfile = await prisma.profile?.findFirstOrThrow({ where: { email: post?.author } })
    const comments = await prisma.comment.findMany({
        where: {
            postId: post.id
        }
    })

    const commentAuthor = await prisma.profile.findMany({
        where: {
            email: { in: uniq(comments.map(comment => comment.author)) }
        }
    })

    const sessionEmail = await GetSessionEmailOrThrow()
    const MyLike = await prisma.like.findFirst({
        where: {
            author: sessionEmail,
            postId: post.id
        }
    })
    const myBookmark = await prisma.bookmark.findFirst({
        where: {
            author: sessionEmail,
            postId: post.id
        }
    })
    return { post, authorProfile, comments, commentAuthor, MyLike, myBookmark };
}

export async function followProfile(profileIdToFollow: string) {
    const sessionProfile = await prisma.profile.findFirstOrThrow({
        where: {
            email: await GetSessionEmailOrThrow()
        }
    })

    await prisma.follower.create({
        data: {
            followingProfileId: sessionProfile?.id,
            followingProfileEmail: sessionProfile.email,
            followedProfileId: profileIdToFollow
        }
    })
}

export async function unfollowProfile(profileIdToFollow: string) {
    const sessionProfile = await prisma.profile.findFirstOrThrow({
        where: {
            email: await GetSessionEmailOrThrow()
        }
    })

    await prisma.follower.deleteMany({
        where: {
            followingProfileId: sessionProfile?.id,
            followingProfileEmail: sessionProfile.email,
        }
    })
}

export async function bookmarkPost(postId: string){
    const sessionEmail = await GetSessionEmailOrThrow()

    await prisma.bookmark.create({
        data: {
            author: sessionEmail,
            postId
        }
    })
}
export async function unbookmarkPost(postId: string){
    const sessionEmail = await GetSessionEmailOrThrow()

    await prisma.bookmark.deleteMany({
        where: {
            author: sessionEmail,
            postId
        }
    })
}