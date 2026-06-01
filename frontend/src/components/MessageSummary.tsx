import type { MessageSummaryProps } from "../types";
import { formatMessageDate } from "../utils/message";

export const MessageSummary = ({ messages }: MessageSummaryProps) => {
  const unreadMessages = messages?.filter((msg) => !msg.read);
  const readMessages = messages?.filter((msg) => msg.read);

  return (
    <>
    <div className="card card-hover border border-slate-200 p-0">
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
        <div>
          <h3 className="text-3xl font-semibold text-slate-900">Messages</h3>
          <p className="text-sm text-slate-500">{unreadMessages?.length} unread</p>
        </div>
        {unreadMessages?.length > 0 && (
          <span className="badge bg-primary-600 text-xs font-semibold text-white">
            {unreadMessages?.length} new
          </span>
        )}
      </div>

      {messages.length === 0 ? (
        <p className="py-10 text-center text-slate-500">No messages</p>
      ) : (
        <div className="space-y-4 p-4">
          {unreadMessages?.length > 0 && (
            <div>
              <h4 className="mb-3 border-b border-slate-200 pb-2 text-xs font-semibold uppercase tracking-wide text-slate-600">
                Unread ({unreadMessages.length})
              </h4>
              <div className="space-y-2">
                {unreadMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className="rounded-xl border border-primary-200 bg-primary-50 p-3"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-primary-500"></span>
                      <span className="font-semibold text-slate-900">{msg.from}</span>
                      <span className="ml-auto text-xs text-slate-500">
                        {formatMessageDate(msg.receivedAt)}
                      </span>
                    </div>
                    <p className="mb-1 font-semibold text-slate-900">{msg.subject}</p>
                    <p className="text-sm text-slate-600">{msg.preview}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {readMessages?.length > 0 && (
            <div>
              <h4 className="mb-3 border-b border-slate-200 pb-2 text-xs font-semibold uppercase tracking-wide text-slate-600">
                Read ({readMessages?.length})
              </h4>
              <div className="space-y-2">
                {readMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-3"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <span className="font-semibold text-slate-700">{msg.from}</span>
                      <span className="ml-auto text-xs text-slate-500">
                        {formatMessageDate(msg.receivedAt)}
                      </span>
                    </div>
                    <p className="mb-1 font-medium text-slate-700">{msg.subject}</p>
                    <p className="text-sm text-slate-600">{msg.preview}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
    </>
  );
};
