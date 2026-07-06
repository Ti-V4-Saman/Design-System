export type MessageVariant = "incoming" | "outgoing"

export type MessageDeliveryStatus =
  | "sending"
  | "sent"
  | "delivered"
  | "read"
  | "failed"
