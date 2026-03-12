export interface BaseMessage {
  fullname?: string;
  email?: string;
  subject?: string;
  message?: string;
}
export interface MessagePayload extends BaseMessage {}
export interface Message extends BaseMessage {
  id: string | number;
  created_at: string; // API-safe format
}

// export interface MessagePayload {
//     fullname?: string;
//     email?: string;
//     subject?: string;
//     message?: string;
// }

// export interface Message {
//     id?: string | number;
//     fullname?: string;
//     email?: string;
//     subject?: string;
//     message?: string;
//     created_at?: string | number | Date | undefined;
// }