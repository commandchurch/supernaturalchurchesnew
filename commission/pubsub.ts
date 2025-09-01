import { Topic } from "encore.dev/pubsub";

export interface PaymentCompletedEvent {
  userId: string;
  planCode: string;
  amountPaid: number; // in cents
  stripeCustomerId: string;
  stripeSubscriptionId: string;
}

export const paymentTopic = new Topic<PaymentCompletedEvent>("payment-completed", {
  deliveryGuarantee: "at-least-once",
});
