import { getSessionEmail } from "@/actions"
import { auth } from "@/auth"
import ProfilePageContent from "@/components/ProfilePageContent"
import { prisma } from "@/db"

export default async function UserProfilePage(
    {
        params: { username }
    }: {
        params: { username: string }
    }
) {
    const profile = await prisma.profile.findFirstOrThrow({
        where: {
            username: username
        }
    })
    const sessionEmail = await getSessionEmail() || "";

    const ourFollow = await prisma.follower.findFirst({
        where: {
            followingProfileEmail: sessionEmail,
            followedProfileId: profile.id
        }
    })
    const session = await auth();
    return (
        <div>
            <ProfilePageContent 
            isOurProfile={profile.email === sessionEmail}
            ourFollow={ourFollow} 
            profile={profile}  />
        </div>
    )
}