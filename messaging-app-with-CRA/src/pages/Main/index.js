import React, { useEffect, useState } from "react";
import "./index.css";
import { StreamRepository, StreamResolutions } from "@amityco/js-sdk";

import {
  ChannelRepository,
  ChannelMembershipRepository,
  ChannelType,
  ChannelMembership,
} from "@amityco/js-sdk";

import { ChannelBrowser } from "../../components/ChannelBrowser";
import { ChatRoom } from "../../components/ChatRoom";

export function Main() {
  const [channelId, setChannelId] = useState("");
  const [overlay, setOverlay] = useState(true);

  // useEffect(() => {
  //   (async () => {
  //     await ChannelRepository.joinChannel({
  //       channelId,
  //       type: ChannelType.Conversation,
  //     });

  //     await ChannelRepository.startReading(channelId);
  //   })();
  // }, [channelId]);

  const handleChange = async (value) => {
    console.log({ value });
    try {
      await ChannelRepository.stopReading(channelId);
    } catch (err) {}

    setChannelId(value);
  };

  return (
    <div className={`Main ${overlay ? "overlay" : ""}`}>
      <button onClick={() => setOverlay(!overlay)}>
        {overlay ? "..." : "╳"}
      </button>

      <ChannelBrowser activeChannelId={channelId} onChange={handleChange} />
      <ChatRoom channelId={channelId} />
    </div>
  );
}
