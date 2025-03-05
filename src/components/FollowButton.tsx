"use client"
import { followProfile, unfollowProfile } from "@/actions";
import { Follower } from "@prisma/client";
import { Button } from "@radix-ui/themes";
import { UserMinusIcon, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FollowButton({
    profileIdToFollow,
    ourFollow
}: {
    profileIdToFollow: string;
    ourFollow: Follower | null
}) {

    const router = useRouter();
    const [isFollowed, setIsFollowed] = useState<boolean>(!!ourFollow)

    return (
        <form action={async data => {
            if (isFollowed) {
                //unfollow
                setIsFollowed(false)
                await unfollowProfile(profileIdToFollow)
            } else {
                // follow
                setIsFollowed(true)
                await followProfile(profileIdToFollow)
            }

            router.refresh();
        }}>
            <Button 
            size='3'
            className={
                isFollowed? 
                "bg-gradient-to-tr from-ig-orange to-ig-red form-50% " 
                : "bg-gradient-to-tr from-ig-orange to-ig-red to-80% "}>
                {isFollowed? <UserMinusIcon/> : <UserPlus />}
                {isFollowed? "Unfollow" : "Follow"}
            </Button>
        </form>
    )
}