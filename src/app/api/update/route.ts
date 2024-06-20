import { updateCards } from "@/lib/actions";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        const updateCard = await updateCards();
        revalidateTag('timeCron')
        return NextResponse.json(updateCard);
    } catch (error) {
        console.error(error);
        return new NextResponse("Server error", { status: 500 });
    }
}
