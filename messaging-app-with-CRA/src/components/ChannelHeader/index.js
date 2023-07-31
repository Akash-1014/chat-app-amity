import React, { useState, useEffect } from "react";
import "./index.css";

import { ChannelRepository, ChannelType } from "@amityco/js-sdk";

import { MemberIcon } from "../Icons";

export function ChannelHeader({ channelId }) {
  const [channel, setChannel] = useState();

  useEffect(() => {
    // const liveObject = ChannelRepository.getChannel(channelId);
    // liveObject.on("dataUpdated", setChannel);
    // liveObject.model && setChannel(liveObject.model);
    // return () => liveObject.dispose();
  }, [channelId]);
  const handleSubmitForAcceChat = () => {
    const liveChannel = ChannelRepository.createChannel({
      type: ChannelType.Conversation,
      userIds: [channelId, "chandan"],
      displayName: `test Channel`,
    });
    liveChannel.once("dataUpdated", (data) => {
      console.log("channel created", data);
    });
  };

  useEffect(() => {
    // if (channelId) handleSubmitForAcceChat();
  }, [channelId]);
  return (
    <div className="ChannelHeader">
      <h3>{channel?.displayName ?? channel?.channelId}</h3>
      {channel?.memberCount > 0 && (
        <>
          {" • "}
          {channel?.memberCount} <MemberIcon />
        </>
      )}
    </div>
  );
}
