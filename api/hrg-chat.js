import { createChatHandler } from '../server/hrg-chat.js';

export const maxDuration = 30;
const handle = createChatHandler();
export const GET = handle;
export const POST = handle;
