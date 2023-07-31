import React, { useState, useRef } from "react";
import "./index.css";

import { ChannelList } from "../ChannelList";
import { AiOutlinePlus } from "react-icons/ai";
export function ChannelBrowser({
  userId,
  activeChannelId,
  onChange = () => {},
}) {
  const [searchQuery, setSearchQuery] = useState();

  const timer = useRef();

  const handleSearchQuery = (e) => {
    clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      setSearchQuery(e.target.value);
    }, 200);
  };

  const createChannel = () => {};
  return (
    <div className="ChannelBrowser">
      <div className="Header">
        <h2>Chats</h2>
        <h4 onClick={createChannel}>
          create Channel
          <AiOutlinePlus />
        </h4>

        <input
          type="search"
          name="search"
          placeholder="Search a channel..."
          onChange={handleSearchQuery}
        />
      </div>

      <ChannelList
        activeChannelId={activeChannelId}
        searchQuery={searchQuery}
        onClick={onChange}
      />
    </div>
  );
}
