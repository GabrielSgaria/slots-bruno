import { updateCards } from "@/lib/actions";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const updateCard = await updateCards();
        return NextResponse.json(updateCard)
    } catch (error) {
        console.error(error);
        return new NextResponse("Server error", { status: 500 })
    }
    revalidatePath('/');
}