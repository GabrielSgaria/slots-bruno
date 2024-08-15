import { updateCards } from "@/lib/actions";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
export const runtime = 'edge';


export async function GET() {
    try {
        const updateCard = await updateCards();
        revalidateTag('cards-pg')
        revalidateTag('cards-pp')
        return NextResponse.json(updateCard);
    } catch (error) {
        console.error(error);
        return new NextResponse("Server error", { status: 500 });
    }
}
