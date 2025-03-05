
import ProfilePosts from "@/components/ProfilePosts";
import { Follower, Profile } from "@prisma/client";
import ProfilePageInfo from "./ProfilePageInfo";
import ProfileNav from "./ProfileNav";

export default function ProfilePageContent({
    profile,
    isOurProfile = false,
    ourFollow = null
}: {
    profile: Profile;
    isOurProfile?: boolean;
    ourFollow: Follower | null
}) {


    return (
        <main className="w-full">
            <ProfilePageInfo
                profile={profile}
                isOurProfile={isOurProfile}
                ourFollow={ourFollow}
            />
            <ProfileNav
                isOurProfile={isOurProfile}
                username={profile.username || ""}
            />


            <section className="mt-4">
                <ProfilePosts userEmail={profile?.email as string} />
            </section>
        </main>
    )
}