import { auth, signIn } from "@/auth"
import Preloader from "@/components/Preloader";
import UserHome from "@/components/UserHome";
import { Suspense } from "react";

export default async function Home() {
  const session = await auth();
  return (
    <div>
      {
        session && (
         <Suspense fallback={<Preloader />}>
          <UserHome session={session}/>
         </Suspense>
        )
      }
      {
        !session && (
          <form
            action={async () => {
              "use server"
              await signIn("google")
            }}
          >
            <button type="submit"
              className="border px-4 py-2 rounded-lg bg-ig-red"
            >
              Login with Google
            </button>
          </form>
        )
      }
    </div>
  );
}
