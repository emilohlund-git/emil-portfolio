import { EVENTS } from '@/config/events';
import { SocketContext } from '@/context/socket';
import ChatMessage from '@/modules/chat/ChatMessage';
import { RootState } from '@/store';
import { TextInput } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useContext, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { ArrowRight, Pencil } from "tabler-icons-react";
import { v4 } from 'uuid';
import { ChatUser, Message } from '../../../types';
import RoomHeader from './RoomHeader';

type Props = {}

const ChatContainer = (props: Props) => {
    const socket = useContext(SocketContext);
    const user = useSelector((state: RootState) => state.user.user);
    const active = useSelector((state: RootState) => state.active.active);
    const [userTyping, setUserTyping] = useState({
        user: undefined as ChatUser | undefined,
        isTyping: false as boolean
    });
    const [messages, setMessages] = useState([] as any);
    const [messageToSend, setMessageToSend] = useState("");
    const ref = useRef(null) as any;

    const scrollToMyRef = () => {
        const scroll =
            ref.current.scrollHeight -
            ref.current.clientHeight;
        ref.current.scrollTo(0, scroll);
    };

    useEffect(() => {
        if (messageToSend) {
            socket.emit(EVENTS.CLIENT.USER_TYPING, {
                user,
                isTyping: true
            });
        } else {
            socket.emit(EVENTS.CLIENT.USER_TYPING, {
                user,
                isTyping: false
            });
        }

        return () => {
            socket.off(EVENTS.CLIENT.USER_TYPING)
        }
    }, [messageToSend, socket, user])

    useEffect(() => {
        scrollToMyRef();
    }, [messages, setMessages])

    useEffect(() => {
        socket.on(EVENTS.SERVER.USER_TYPING, ({ user, isTyping }: {
            user: ChatUser,
            isTyping: boolean
        }) => {
            setUserTyping({
                user: user,
                isTyping: isTyping
            });
        })
        socket.on(EVENTS.SERVER.ALL_MESSAGES, (data: Message[]) => {
            setMessages(data);
            scrollToMyRef();
        });
        socket.on(EVENTS.SERVER.USER_JOINED_ROOM, message => {
            showNotification({
                title: message.sender,
                message: `${message.sender} joined the room`,
            })
            scrollToMyRef();
        })
        socket.on(EVENTS.SERVER.USER_LEFT_ROOM, message => {
            showNotification({
                title: message.sender,
                message: `${message.sender} left the room`,
            });
        })

        return () => {
            socket.off(EVENTS.SERVER.USER_TYPING);
            socket.off(EVENTS.SERVER.ALL_MESSAGES);
            socket.off(EVENTS.SERVER.USER_JOINED_ROOM);
            socket.off(EVENTS.SERVER.USER_LEFT_ROOM);
        }
    }, [socket])

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (messageToSend) {
            const message = {
                content: messageToSend,
                sender_id: user?.uid,
                room_id: active?.uid,
                created_at: new Date(),
                uid: v4(),
            } as Message
            socket.emit(EVENTS.CLIENT.SEND_MESSAGE, { message: message })
            setMessageToSend("");
        }
    };

    return (
        <div className="lg:flex lg:flex-col">
            <RoomHeader />
            <div className="relative bg-gradient-to-t from-white to-gray-100 rounded-2xl h-[775px] w-full overflow-y-scroll scrollbar scrollbar-thumb-blue-400 scrollbar-track-blue-100" ref={ref}>
                {messages && messages.map((message: any) => (
                    <ChatMessage key={message.uid} message={message} user={user} />
                ))}
                {userTyping.isTyping && userTyping?.user?.uid !== user?.uid && (
                    <div className="flex justify-center items-center w-full">
                        <div className="flex items-center justify-center bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                            {userTyping.user?.username} is typing...
                        </div>
                    </div>
                )}
            </div>
            <div className="align-bottom py-4 flex flex-1">
                <form className="w-full" onSubmit={handleSubmit}>
                    <TextInput
                        icon={<Pencil size={18} />}
                        className="w-full align-bottom"
                        size="md"
                        radius="xl"
                        disabled={active === null}
                        value={messageToSend}
                        onChange={(e) => {
                            setMessageToSend(e.target.value);
                        }}
                        rightSection={
                            <button type="submit" className="bg-white border-2 border-gray-300 rounded-full p-1 cursor-pointer">
                                <ArrowRight size={18} className="text-gray-400" />
                            </button>
                        }
                        placeholder="Write your message.."
                        rightSectionWidth={42}
                    />
                </form>
            </div>
        </div>
    )
}

export default ChatContainer