import React, { useRef, useState, useEffect } from "react";
import "./index.css";

import {
  ChannelRepository,
  ChannelFilter,
  UserRepository,
} from "@amityco/js-sdk";

import { ChannelItem } from "../ChannelItem";

export function ChannelList({
  activeChannelId,
  searchQuery,
  onClick = () => {},
}) {
  const [channels, setChannels] = useState([]);
  const [top, setTop] = useState(true);

  const collection = useRef();
  const makeSearchApi = (searchQuery) => {
    try {
      console.log("searching");
      const liveUserCollection = UserRepository.queryUsers({
        keyword: searchQuery,
        // filter?: 'all' | 'flagged',
        // sortBy?: 'lastCreated' | 'firstCreated' | 'displayName'
      });
      console.log("pass this");

      liveUserCollection.on("dataUpdated", (models) => {
        console.log("models: ", models);
        setChannels(models);
      });
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    makeSearchApi(searchQuery);
    collection.current = ChannelRepository.queryChannels({
      keyword: searchQuery?.length ? searchQuery : undefined,
      filter: searchQuery ? ChannelFilter.All : ChannelFilter.Member,
    });
    collection.current.on("dataUpdated", setChannels);
    return () => collection.current.dispose();
  }, [searchQuery]);

  const onScroll = (e) => {
    setTop(e.target.scrollTop === 0);

    if (!collection?.current.hasMore) return;

    const visibleHeight = e.target.scrollHeight - e.target.clientHeight;

    if (e.target.scrollTop >= visibleHeight - 1) {
      collection.current?.nextPage();
    }
  };

  return (
    <div className={`ChannelList ${top ? "top" : ""}`} onScroll={onScroll}>
      {channels.map((channel) => (
        <ChannelItem
          key={channel.userID}
          {...channel}
          active={channel.channelId === activeChannelId}
          onClick={onClick}
        />
      ))}
    </div>
  );
}
