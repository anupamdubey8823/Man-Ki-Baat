import React, { useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';

import { ChannelContainer, ChannelListContainer, Auth } from './components';

import "stream-chat-react/dist/css/index.css";
import "./App.css";
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const apiKey = "wpd8s9zxwhza";
const authToken = cookies.get("token");

const client = StreamChat.getInstance(apiKey);

if (authToken) {
  client.connectUser({
    name: cookies.get('username'),
    fullName: cookies.get('fullName'),
    id: cookies.get('userId'),
    phoneNumber: cookies.get('phoneNumber'),
    image: cookies.get('avatarURL'),
    hashedPassword: cookies.get('hashedPassword')
  }, authToken);
}

const App = () => {

  const [createType, setCreateType] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  if(!authToken) {
    return <Auth />
  }

  return (
    <div className="app__wrapper">
      <Chat client={client} theme="team light">
        <ChannelListContainer 
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
        />

        <ChannelContainer 
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          createType={createType}
        />
      </Chat>      
    </div>
  );
};

export default App;

