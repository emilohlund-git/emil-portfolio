import { EVENTS } from '@/config/events'
import { SocketContext } from '@/context/socket'
import { setActive } from '@/features/rooms/activeSlice'
import { RootState } from '@/store'
import { Avatar, AvatarsGroup, Button, Menu, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ArrowsLeftRight, Trash } from 'tabler-icons-react'
import { ChatUser, Room } from '../../../types'

type Props = {}

const RoomHeader = (props: Props) => {
    const user = useSelector((state: RootState) => state.user.user);
    const active = useSelector((state: RootState) => state.active.active);
    const rooms = useSelector((state: RootState) => state.rooms.rooms);
    const socket = useContext(SocketContext);

    const [opened, handlers] = useDisclosure(false);
    const [formOpened, setFormOpened] = useState(false);
    const [groupName, setGroupName] = useState('');

    const dispatch = useDispatch();

    const handleDelete = async (e: any) => {
        e.preventDefault();
        setFormOpened(false);
        socket.emit(EVENTS.CLIENT.DELETE_ROOM, { room: active });
        dispatch(setActive(null));
    }

    const handleNameChange = async (e: any) => {
        e.preventDefault();

        const r = rooms.find((room) => {
            return room.uid === active?.uid
        });

        const room = {} as Room;
        Object.entries(r!).forEach(([key, value]) => {
            /*@ts-ignore*/
            room[key] = value;
        });

        room!.name = groupName;
        socket.emit(EVENTS.CLIENT.UPDATE_ROOM, { room: room });
        dispatch(setActive(room));
    }

    return (
        <div className="px-6 py-6 font-Poppins shadow-sm shadow-gray-300 bg-white mb-4 z-20 flex items-center justify-between h-24">
            <div className="flex items-center gap-2">
                {active && active.creator_id === user?.uid &&
                    <Menu opened={opened} onOpen={handlers.open} onClose={handlers.close} className="bg-gray-100 hover:bg-gray-200">
                        <Menu.Label>Group</Menu.Label>
                        <div className="flex items-center gap-2 ml-3 mb-2 cursor-pointer text-sm" onClick={() => setFormOpened(!formOpened)}><ArrowsLeftRight size={14} />Change name</div>
                        {formOpened ?
                            <form onSubmit={handleNameChange} className="flex gap-2">
                                <TextInput autoFocus className="flex-grow" required value={groupName} onChange={(e) => setGroupName(e.target.value)} placeholder="Name.." style={{ flex: 1 }} />
                                <Button type="submit" className="bg-blue-400">Update</Button>
                            </form>
                            : <></>}
                        <Menu.Item onClick={handleDelete} color="red" icon={<Trash size={14} />}>Delete this group</Menu.Item>
                    </Menu>
                }
                <p className="font-semibold text-2xl">{active?.name}</p>
            </div>
            <div className="flex items-center gap-2">
                <AvatarsGroup limit={2} total={rooms.find(room => room.uid === active?.uid)?.users?.length}>
                    {rooms?.find(room => room.uid === active?.uid)?.users?.map((user: ChatUser) => {
                        return (
                            <Avatar key={user.uid} src={null} color="indigo">{user?.username?.split("")[0].toUpperCase()}</Avatar>
                        )
                    })}
                </AvatarsGroup>
            </div>
        </div>
    )
}

export default RoomHeader