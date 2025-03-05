"use client"
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
    const router = useRouter()
  return (
    <ChevronLeft onClick={router.back}/>
  )
}
