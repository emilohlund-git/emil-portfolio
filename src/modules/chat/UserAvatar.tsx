import { EVENTS } from '@/config/events'
import { Status } from '@/config/status'
import { SocketContext } from '@/context/socket'
import { setActive } from '@/features/rooms/activeSlice'
import { RootState } from '@/store'
import { Avatar, Badge, Group, Indicator, Text, UnstyledButton } from '@mantine/core'
import { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ChatUser } from '../../../types'

type Props = {
    user: ChatUser | null
}

const UserAvatar = (props: Props) => {
    const socket = useContext(SocketContext)
    const user = useSelector((state: RootState) => state.user.user);
    const rooms = useSelector((state: RootState) => state.rooms.rooms);
    const active = useSelector((state: RootState) => state.active.active);
    const dispatch = useDispatch();
    const [group, setGroup] = useState({} as any);

    useEffect(() => {
        if (props.user) {
            const group = rooms.find(r => r.users?.find((u: ChatUser) => u.uid === props?.user?.uid) !== undefined);
            setGroup(group);
        }
    }, [rooms]);

    return (
        <UnstyledButton className={`flex items-center gap-4 mb-4 w-full cursor-default p-4 text-black rounded-lg`}>
            <Indicator inline size={16} offset={7} position="bottom-end" color={`${props.user?.status === Status.ONLINE && "green" ||
                props.user?.status === Status.AWAY && "yellow" ||
                props.user?.status === Status.OFFLINE && "gray"
                }`} withBorder>
                <Avatar src={null} alt={props.user?.username || undefined} color="indigo">{props.user?.username?.split("")[0].toUpperCase()}</Avatar>
            </Indicator>
            <Group>
                <div className="flex-1">
                    <Text className="font-medium" size="lg">
                        {props.user?.username}
                    </Text>
                    {group ? (
                        <Text key={group.uid} className="text-xs">
                            <Badge onClick={() => {
                                if (!active) dispatch(setActive(group))
                                if (active && active.uid !== group.uid) {
                                    socket.emit(EVENTS.CLIENT.LEFT_ROOM, { user, room: active });
                                    dispatch(setActive(group))
                                }
                            }} className="cursor-pointer" size="sm" color="dark" variant="filled">{group.name}</Badge>
                        </Text>
                    )
                        :
                        <></>
                    }
                </div>
            </Group>
        </UnstyledButton>
    )
}

export default UserAvatar