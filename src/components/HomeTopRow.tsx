
import { Follower, Profile } from "@prisma/client"
import { Avatar } from "@radix-ui/themes"
import { PlusIcon } from "lucide-react"

export default async function HomeTopRow({
    follows,
    profiles
}:{
    follows : Follower[];
    profiles: Profile[]
}) {
   
    return (
        <div className="flex gap-2 w-full overflow-x-auto lg:justify-center">
            <div>
                <button
                    className="size-[92px] flex justify-center rounded-full items-center bg-gradient-to-tr from-ig-orange to-ig-red text-white"
                >
                    <PlusIcon size={42} />
                </button>
                <p className="text-gray-400 text-sm text-center">New Story</p>
            </div>
            <div className="flex gap-2">
                {
                    profiles.map((profile) => (
                        <div key={profile.id}>
                            <div className="bg-gradient-to-tr from-ig-orange to-ig-red p-1 rounded-full">
                                <div className=" bg-white p-0.5 rounded-full">
                                    <Avatar
                                        size="6"
                                        fallback="Avatar"
                                        radius="full"
                                        src={profile.avatar || ""} />
                                </div>
                            </div>
                            <p className="text-gray-400 text-sm text-center">{profile.username}</p>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}