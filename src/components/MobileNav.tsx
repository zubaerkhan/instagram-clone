import Link from "next/link";
import { CameraIcon, HomeIcon, LayoutGridIcon, SearchIcon, UserIcon } from "lucide-react";

export default function MobileNav(){
    return(
        <div className="block md:hidden fixed bottom-0 left-0 right-0  ">
        <div className="flex text-gray-700 *:flex *:items-center">
          <div className="pl-2 bg-white dark:bg-gray-900 dark:text-gray-300 w-full *:size-12 *:flex *:items-center *:justify-center  justify-around rounded-t-xl z-10">
            <Link href="/"><HomeIcon /></Link>
            <Link href="/search"> <SearchIcon /></Link>
          </div>
          <div className="w-[140px] size-14 relative -top-4 justify-center">
            <div className="absolute border-white dark:border-gray-900 dark:border-t-transparent dark:border-l-transparent border-[50px] border-t-transparent border-l-transparent rotate-45 rounded-full bg-blue-500 bg-clip-text">
              <div className="border-4 size-15 border-transparent">
                <Link href="" className="-rotate-4 flex items-center justify-center text-white rounded-full bg-gradient-to-tr from-ig-orange to-ig-red to-70% size-12 ">
                  <CameraIcon />
                </Link>
              </div>
            </div>
          </div>
          <div className="pr-2 bg-white dark:bg-gray-900 dark:text-gray-300 w-full *:size-12 *:flex *:items-center *:justify-center justify-around rounded-t-xl z-10">
            <Link href="" className="text-ig-red"> <LayoutGridIcon /></Link>
            <Link href="/profile"> <UserIcon /></Link>
          </div>
        </div>
      </div>
    )
}