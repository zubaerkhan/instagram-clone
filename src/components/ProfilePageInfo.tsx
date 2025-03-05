import { Follower, Profile } from "@prisma/client";
import BackButton from "./BackButton";
import Link from "next/link";
import { CheckIcon, CogIcon } from "lucide-react";
import FollowButton from "./FollowButton";

export default function ProfilePageInfo({
    profile,
    isOurProfile,
    ourFollow,
}:{
    profile:Profile;
    isOurProfile: boolean;
    ourFollow: Follower | null

}){
    return (
        <div>
            <section className="flex justify-between items-center ">
                <div>
                    <BackButton />
                </div>
                <div className="flex justify-center items-center font-bold gap-2">
                    {profile?.username}
                    <div className="size-5  bg-ig-red rounded-full inline-flex justify-center items-center text-white">
                        <CheckIcon size={14} />
                    </div>
                </div>
                <div>
                    {isOurProfile && (
                        <Link href={"/settings"}>
                            <CogIcon />
                        </Link>
                    )}
                </div>
            </section>
            <section className="flex justify-center mt-8">
                <div className="size-48 bg-gradient-to-tr from-ig-orange to-ig-red p-2 rounded-full">
                    <div className="size-44 bg-white p-2 rounded-full">
                        <div className="size-40 aspect-square overflow-hidden rounded-full">
                            <img src={profile?.avatar || " "} alt="" />
                        </div>
                    </div>
                </div>
            </section>
            <section className="text-center mt-4">
                <h1 className=" text-xl font-bold">{profile?.name}</h1>
                <p className="text-gray-500 my-1">{profile?.subtitle}</p>
                <p className="">
                    {profile?.bio}<br />
                    contract: jonny@gmail.com
                </p>
            </section>
            {
                !isOurProfile && (
                    <section className="flex justify-center mt-2">
                        <FollowButton
                            ourFollow={ourFollow}
                            profileIdToFollow={profile?.id || ""} />
                    </section>
                )
            }
        </div>
    )
}