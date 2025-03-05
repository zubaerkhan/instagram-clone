import { auth, signOut } from "@/auth";
import SettingsForm from "@/components/settingsform";
import { prisma } from "@/db";
import { Button } from "@radix-ui/themes";


export default async function SettingsPage() {
	const session = await auth()
	if (!session?.user?.email) return "not log in";
	const profile = await prisma.profile.findFirst({
		where: {
			email: session.user.email
		}
	})
	return (
		<div className="max-w-md mx-auto">
			 <h2 className="mb-4 font-bold text-2xl text-center">Profile Settings</h2>
			 <p className="text-center -mt-4 mb-4 text-gray-400">{session?.user?.email}</p>
			<SettingsForm profile={profile} />
			<div className="flex justify-center mt-4 border-t border-gray-200 pt-4">
				<form
					action={async () => {
						"use server"
						await signOut()
					}}
				>
					<Button type="submit" variant="outline">Logout</Button>
				</form>
			</div>
		</div>
	)
}