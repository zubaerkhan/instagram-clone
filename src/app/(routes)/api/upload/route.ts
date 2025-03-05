import { NextResponse, type NextRequest } from "next/server";
import { pinata } from "@/config"

export const config = {
    api:{
        bodyParser: false
    }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;
    // for create group
    // const info = await pinata.groups.create({name: "ig-clone", isPublic: true})

    // const uploadData = await pinata.upload.file(file)
    // const url = await pinata.gateways.createSignedURL({
    //   cid: uploadData.cid,
    //   expires: 3600,
    // });

    const uploadData = await pinata.upload.file(file, {
      groupId: "01937d33-be06-78d1-bfc0-ee694550fc64"
    })

    const fileUrl =`https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/files/${uploadData.cid}`

    return NextResponse.json(fileUrl, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
