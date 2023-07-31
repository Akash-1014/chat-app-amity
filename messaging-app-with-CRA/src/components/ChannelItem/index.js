import React from "react";
import "./index.css";

import humanize from "tiny-human-time";
import { Image } from "../Image";
import { MemberIcon } from "../Icons";

export function ChannelItem({
  userId,
  displayName,
  avatarFileId,
  lastActivity,
  memberCount,
  unreadCount,
  channelId,
  active,
  onClick = () => {},
}) {
  return (
    <div
      className={`ChannelItem ${active ? "active" : ""}`}
      onClick={() => onClick(userId || channelId)}
    >
      <div className="Avatar">
        {avatarFileId && <Image fileId={avatarFileId} />}
      </div>
      <div className="DisplayName">{displayName}</div>
      <div className="Metadata">
        {humanize(Date.now(), lastActivity)} • {memberCount} <MemberIcon />
      </div>
      {!!unreadCount && <div className="UnreadCount">{unreadCount}</div>}
    </div>
  );
}
