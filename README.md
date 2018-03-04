# Down2Hang

An app to make the world a little less bored, and a bit more spontanious.

## Phase Two

### User Stories

* Users should be able to chat with individuals.
* Users should be able to select a list of peolple.
* Users should be able to start a group chat room with selected people.
* Users should be able to leave the page, return, and resume chatting.

### Core Components

* Chat
  * Persistance
    * Chat data model
    * Load chat's based on user
  * Chat groups ("rooms")
    * Group chat data Model

### Notes

#### Chat Client

* On page load, fetch all chat information
  * Ping api
  * Api returns chat room objects
    * Chat room data model: participants, messages, createdAt
  * Take data and render
    * Chat room view: One chat in focus (By default, youngest chat). Chat list ordered chronologically on the left.
  * Socket Client listens for ...
    * Create new chat
    * Send message

#### Chat Server

* Sockets Listen for ...
  * Create new chat room
  * New messages sent
    * Saves each message/conversation
