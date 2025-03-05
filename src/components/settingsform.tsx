"use client"
import UpdateProfile from "@/actions";
import { Profile } from "@prisma/client";
import { Button, Flex, Switch, TextArea, TextField } from "@radix-ui/themes";
import { CloudUploadIcon, Text } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";


export default function SettingsForm({
    profile
}: {
    profile: Profile | null
}) {
    const router = useRouter()
    const inputFileRef = useRef<HTMLInputElement>(null)
    const [file, setFile] = useState<File | null>(null);
    const [avatarUrl, setAvatarUrl] = useState(profile?.avatar || null);

    useEffect(() => {
        if (file) {
            const data = new FormData();
            data.set("file", file);
            fetch("/api/upload", {
                method: "POST",
                body: data,
            }).then((response) => {
                response.json().then(url => {
                    setAvatarUrl(url);
                });
            })
        }
    }, [file])


    return (
        <form action={async (data: FormData) => {
            await UpdateProfile(data)
            router.push("/profile");
            router.refresh()
        }}>

            <div className="flex items-center gap-4">
                <div>
                    <div className="bg-gray-400 size-24 rounded-full aspect-square overflow-hidden border border-gray-400 shadow-md shadow-gray-400">
                        <img src={avatarUrl || " "} alt="" />
                    </div>
                </div>
                <div>
                    <input type="file"
                        ref={inputFileRef}
                        onChange={ev => setFile(ev.target.files?.[0] || null)}
                        // onChange={ev => setFile(ev.target.files?.[0] || null)}
                        className="hidden"
                    />
                    <Button onClick={() => inputFileRef.current?.click()} type="button" variant="surface">
                        <CloudUploadIcon />
                        Change Avatar
                    </Button>
                </div>
            </div>
            <input type="hidden" name="avatar" value={avatarUrl || ""} />
            <p className="font-bold mt-2">Username</p>
            <TextField.Root defaultValue={profile?.username || ""} name="username" placeholder="Your Username" />
            <p className="font-bold mt-2">Name</p>
            <TextField.Root defaultValue={profile?.name || ""} name="name" placeholder="Jone Doe" />
            <p className="font-bold mt-2">Subtitle</p>
            <TextField.Root defaultValue={profile?.subtitle || ""} name="subtitle" placeholder="Graphic Designer" />
            <p className="font-bold mt-2">Bio</p>
            <TextArea defaultValue={profile?.bio || ""} name="bio" size="3" placeholder="Reply to comment…" />
            <label className="flex gap-2 items-center mt-4">
                <span>Dark Mode</span> 
                <Switch 
                defaultChecked={localStorage.getItem("theme") == "dark"}
                onCheckedChange={isDark=>{
                    const html = document.querySelector("html")
                    const theme = isDark? "dark" : "light";
                    if(html){
                        html.dataset.theme = theme
                    }
                    localStorage.setItem("theme",theme);
                    window.location.reload()
                }}
                />
            </label>
            <div className="mt-4 flex justify-center">
                <Button variant="solid">Save Settings</Button>
            </div>
        </form>
    )
}