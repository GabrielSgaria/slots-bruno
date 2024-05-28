import { updateCards } from "@/lib/actions";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
let lastUpdateTime = null;

export async function GET() {
    try {
        const updateCard = await updateCards();
        lastUpdateTime = new Date().toISOString();
        revalidatePath('/'); 
        revalidateTag('timeCron')
        return NextResponse.json(updateCard);
    } catch (error) {
        console.error(error);
        return new NextResponse("Server error", { status: 500 });
    }
}
