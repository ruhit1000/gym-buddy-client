import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import PaymentSuccessClient from "@/Components/Payment/PaymentSuccessClient";
import { savePaymentBooking } from "@/lib/action/payment";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error("Please provide a valid session_id (`cs_test_...`)");
  }

  const {
    status,
    metadata,
    payment_intent,
    customer_details: { email: customerEmail },
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    const amountTotal = Number(metadata?.price) || 0;
    const classId = metadata?.classId || "";
    const userId = metadata?.userId || "";
    const className = metadata?.className || "";
    const trainerName = metadata?.trainerName || "";
    const transactionId = typeof payment_intent === "object" ? payment_intent?.id : "";

    try {
      await savePaymentBooking({
        sessionId: session_id,
        customerEmail,
        amount: amountTotal,
        transactionId,
        classId,
        userId,
        className,
        trainerName
      });
    } catch (dbError) {
      console.error("Failed to sync Stripe payment with local bookings DB:", dbError);
    }

    return (
      <div className="w-full min-h-[80vh] flex items-center justify-center bg-background text-foreground px-4 py-12 transition-colors duration-300">
        <PaymentSuccessClient
          customerEmail={customerEmail}
          amount={amountTotal}
          transactionId={transactionId}
        />
      </div>
    );
  }
}