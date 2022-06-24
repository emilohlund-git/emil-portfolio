import { Avatar } from "@mantine/core";
import { DateTime } from 'luxon';
import { ChatUser } from "../../../types";

type Props = {
    message: any | null;
    user: ChatUser | null;
}

const ChatMessage = (props: Props) => {
    return (
        <div className={`relative py-4 px-4 w-full flex font-Poppins`}>
            {props?.message?.sender.uid === props.user?.uid &&
                <div className="flex max-w-2xl justify-start">
                    <div>
                        <div className="flex gap-4 bg-gradient-to-br from-blue-300 shadow-lg to-blue-500 rounded-md text-sm text-white">
                            <Avatar src={null} className="align-top shadow-lg" alt="" color="indigo">{props.user?.username?.split("")[0].toUpperCase()}</Avatar>
                            <div className="flex flex-col items-center p-2">
                                <p className="break-all p-2">{props?.message?.content}</p>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm">{DateTime.fromISO(props.message!.created_at).toRelative()}</p>
                    </div>
                </div>
            }
            {props?.message?.sender.uid !== props.user?.uid &&
                <div className="flex w-full justify-end">
                    <div>
                        <div className="flex max-w-2xl gap-4 bg-gradient-to-br from-gray-300 shadow-lg to-gray-500 rounded-md text-sm text-white">
                            <div className="flex flex-col w-full p-2">
                                <p className="break-all p-2 text-left">{props?.message?.content}</p>
                            </div>
                            <Avatar src={null} className="align-top shadow-lg" alt="" color="gray">{props.message.sender.username?.split("")[0].toUpperCase()}</Avatar>
                        </div>
                        <p className="text-gray-400 text-sm text-right">{DateTime.fromISO(props.message!.created_at).toRelative()}</p>
                    </div>
                </div>
            }
        </div>
    )
}

export default ChatMessage