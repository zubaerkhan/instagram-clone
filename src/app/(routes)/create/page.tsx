"use client"
import { postEntry } from "@/actions";
import { Button, TextArea } from "@radix-ui/themes";
import { CloudUploadIcon, SendIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function CreatePage() {
    const [imageUrl, setImageUrl] = useState("");
    const [file, setFile] = useState<File | null>(null)
    const [isUploading, setIsUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const router = useRouter()

    useEffect(() => {
        if (file) {
            setIsUploading(true)
            const data = new FormData();
            data.set("file", file)
            fetch("/api/upload", {
                method: "POST",
                body: data
            })
                .then((response) => {
                    setIsUploading(false)
                    response.json().then(url => {
                        setImageUrl(url)
                    })
                })
        }
    }, [file])
    return (
        <div className="flex justify-center">
            <form className=" flex flex-col gap-2 justify-center" action={async (data) => {
                const id = await postEntry(data);
                router.push(`/posts/${id}`);
                router.refresh();
            }}>
                <div className="w-64 min-h-64 bg-gray-400 rounded-md  p-2 relative ">
                    <input type="hidden" name="image" value={imageUrl} />
                    {
                        imageUrl && (
                            <img className="rounded-md" src={imageUrl} alt="" />
                        )
                    }
                    <div className="absolute inset-0 flex justify-center items-center">
                        <input
                            onChange={fv => setFile(fv.target.files?.[0] || null)}
                            className="hidden" type="file" ref={fileInputRef}
                        />
                        <Button
                            disabled={isUploading}
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            variant="surface" className="rounded-md">
                            {!isUploading && (
                                <CloudUploadIcon size={16} />
                            )}
                            {isUploading ? "Uploding" : "Choose a Image"}
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <TextArea name="description" className="h-14" placeholder="Add a description..."></TextArea>
                </div>
                <div>
                    <Button type="submit" > <SendIcon size={16} /> Publish</Button>
                </div>
            </form>
        </div>
    )
}