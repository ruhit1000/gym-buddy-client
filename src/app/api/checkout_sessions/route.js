import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getUserSession } from "@/lib/core/session";
import { stripe } from "@/lib/stripe";

export async function POST(request) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    const user = await getUserSession();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const formData = await request.formData();
    const price = formData.get("price");
    const classId = formData.get("classId");
    const className = formData.get("className");
    const trainerName = formData.get("trainerName");

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: Number(price) * 100,
            product_data: {
              name: className,
              description: `Trainer: ${trainerName}`,
            }
          },
          quantity: 1,
        },
      ],
      metadata: {
        price: Number(price),
        userId: user.id,
        classId: classId,
        className: className,
        trainerName: trainerName,
        userEmail: user.email,
      },
      mode: "payment",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
