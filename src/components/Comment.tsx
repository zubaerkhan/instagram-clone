import { Profile } from "@prisma/client";
import Avatar from "./Avatar";
import { format } from "date-fns";

export function Comment({
    text,
    authorProfile,
    createdAt
}: {
    text: string,
    authorProfile?: Profile,
    createdAt: Date
}) {

    return (
        <div className="flex">
            <Avatar src={authorProfile?.avatar || ""} />
            <div className="w-full">
                <div>
                    <h3 className="dark:text-gray-300">{authorProfile?.name}</h3>
                    <h4 className="text-sm text-gray-600 dark:text-gray-500 -mt-1">@{authorProfile?.username}</h4>
                </div>
                <div>
                    <div className="bg-gray-200 dark:bg-gray-800 dark:text-gray-300 border dark:border-0 border-gray-200 p-4 mt-2 rounded-md ">
                        {text}
                    </div>
                    <div className="text-gray-400 text-xs text-right">
                        {format(createdAt, "yyyy-MM-dd HH:mm:ss ")}
                    </div>
                </div>
            </div>
        </div>
    )
}