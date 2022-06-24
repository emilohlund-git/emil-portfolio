/* eslint-disable react-hooks/exhaustive-deps */
import { EVENTS } from '@/config/events';
import { SocketContext } from '@/context/socket';
import { setActive } from '@/features/rooms/activeSlice';
import { setRooms } from '@/features/rooms/roomsSlice';
import { setUser } from '@/features/users/userSlice';
import { setUsers } from '@/features/users/usersSlice';
import { RootState } from '@/store';
import { Avatar, Badge, Button, Divider, Menu, Navbar, Paper, Text, TextInput, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CirclePlus, MoodEmpty, Users } from 'tabler-icons-react';
import { v4 } from 'uuid';
import { ChatUser, Room } from '../../../types';
import UserAvatar from './UserAvatar';

type Props = {}

const ChatNavigation = ({ user }: { user: ChatUser | null }) => {
    const socket = useContext(SocketContext);
    const users = useSelector((state: RootState) => state.users.users);
    const rooms = useSelector((state: RootState) => state.rooms.rooms);
    const active = useSelector((state: RootState) => state.active.active);

    const [opened, handlers] = useDisclosure(false);
    const [groupName, setGroupName] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        socket.on(EVENTS.SERVER.ALL_ROOMS, (rooms: Room[]) => {
            if (rooms) {
                if (rooms.find(r => r.uid === active?.uid) === null) {
                    dispatch(setActive(null));
                }
                dispatch(setRooms(rooms));
            }
        });

        socket.on(EVENTS.SERVER.ALL_USERS, (users: ChatUser[]) => {
            dispatch(setUsers(users));
            users.forEach(u => {
                if (u.uid === user?.uid) dispatch(setUser(u));
            })
        });
        return () => { }
    }, [])

    useEffect(() => {
        if (active) {
            socket.emit(EVENTS.CLIENT.JOIN_ROOM, { user, room: active });
        }

        return () => {
            socket.off(EVENTS.CLIENT.JOIN_ROOM);
        }
    }, [active])

    const addGroupToGroups = async (e: FormEvent) => {
        e.preventDefault();
        socket.emit(EVENTS.CLIENT.CREATE_ROOM, {
            name: groupName,
            creator_id: user?.uid,
            created_at: new Date(),
            updated_at: new Date(),
            uid: v4()
        } as Room)
        setGroupName('');
        handlers.close();
    }

    return (
        <Navbar p="md" className={`max-w-xl font-Poppins font-normal bg-white z-0 shadow-sm w-full`}>
            <Navbar.Section className="p-0 m-0">
                <Paper
                    radius="md"
                    p="lg"
                >
                    <Avatar src={null} size={120} radius={120} mx="auto" />
                    <Text align="center" className="font-Poppins font-bold lowercase" size="lg" weight={500} mt="md">
                        {user?.username?.toUpperCase()}
                    </Text>
                    <Text align="center" color="dimmed" size="sm">
                        {user?.email}
                    </Text>
                </Paper>
            </Navbar.Section>
            <div className="flex items-center justify-between">
                <p className={`items-center no-underline text-2xl font-bold text-black px-4 py-4 rounded-lg`}>Groups</p>
                <Menu opened={opened} onOpen={handlers.open} onClose={handlers.close} control={<Button className="hover:bg-gray-200"><CirclePlus className="text-black" /></Button>} position={"bottom"} className="text-black mt-1 z-10">
                    <form onSubmit={addGroupToGroups} className="flex gap-2">
                        <TextInput className="flex-grow" required value={groupName} onChange={(e) => setGroupName(e.target.value)} autoFocus placeholder="Name.." style={{ flex: 1 }} />
                        <Button type="submit" className="bg-gray-600 hover:bg-gray-700">Add</Button>
                    </form>
                </Menu>
            </div>
            <Navbar.Section>
                <div className="flex py-4 overflow-x-scroll scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-400">
                    {rooms && rooms.length > 0 ? rooms.map((room: Room) =>
                        <div key={room.uid} className="text-center">
                            <UnstyledButton
                                className={`rounded-full bg-white text-center min-w-[60px] flex flex-col justify-center items-center p-2 m-2 ${active?.uid === room.uid ? 'ring-2 ring-gray-500' : ''}`}
                                onClick={async () => {
                                    if (!active) dispatch(setActive(room))
                                    if (active && active.uid !== room.uid) {
                                        socket.emit(EVENTS.CLIENT.LEFT_ROOM, { user, room: active });
                                        dispatch(setActive(room))
                                    }
                                }}
                            >
                                <Users className={`text-black opacity-75`} />
                                <Badge variant="filled" color="dark">{room.users?.length}</Badge>
                            </UnstyledButton>
                            <span className="text-black text-sm">{room.name}</span>
                        </div>
                    ) : <div className="flex cursor-default items-center no-underline my-2 text-sm text-black px-4 py-4 rounded-lg font-medium"><MoodEmpty className="text-black opacity-75 mr-4" />No groups!</div>
                    }
                </div>
                <Divider my="xl" />
            </Navbar.Section>
            <div className="flex items-center justify-between">
                <p className={`items-center no-underline text-2xl text-black px-4 py-4 rounded-lg font-bold`}>People</p>
            </div>
            <Navbar.Section>
                {users && users.map((user: ChatUser) =>
                    <UserAvatar user={user} key={user.uid} />
                )}
            </Navbar.Section>
        </Navbar>
    )
}

export default ChatNavigation