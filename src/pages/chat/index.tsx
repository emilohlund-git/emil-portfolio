import { EVENTS } from '@/config/events';
import { Status } from '@/config/status';
import { SocketContext } from '@/context/socket';
import ChatContainer from '@/modules/chat/ChatContainer';
import ChatNavigation from '@/modules/chat/ChatNavigation';
import { RootState } from '@/store';
import { Grid } from '@mantine/core';
import { NotificationsProvider, showNotification } from '@mantine/notifications';
import { useContext, useEffect } from 'react';
import { IdleTimerProvider, useIdleTimerContext } from 'react-idle-timer';
import { useSelector } from 'react-redux';
import { X } from 'tabler-icons-react';

type Props = {}

const Chat = (props: Props) => {
    const socket = useContext(SocketContext);
    const user = useSelector((state: RootState) => state.user.user);

    const onIdle = () => {
        if (user) {
            socket.emit(EVENTS.CLIENT.CHANGE_USER_STATUS, { uid: user.uid, status: Status.AWAY })
        }
    }

    const onActive = (event: any) => {
        if (user) {
            socket.emit(EVENTS.CLIENT.CHANGE_USER_STATUS, { uid: user.uid, status: Status.ONLINE })
        }
    }

    const idleTimer = useIdleTimerContext()

    useEffect(() => {
        socket.auth = { user };
        socket.connect();

        socket.on("connect_error", (err) => {
            showNotification({
                title: "Error",
                message: err.message,
                color: 'red',
                icon: <X size={10} />
            })
        });

        socket.emit(EVENTS.CLIENT.USER_INFO, user);
    }, [])

    return (
        <IdleTimerProvider
            timeout={500 * 60}
            onIdle={onIdle}
            onActive={onActive}
        >
            <NotificationsProvider>
                <Grid columns={24}>
                    <Grid.Col span={4}>
                        <ChatNavigation user={user} />
                    </Grid.Col>
                    <Grid.Col span={20}>
                        <ChatContainer />
                    </Grid.Col>
                </Grid>
            </NotificationsProvider>
        </IdleTimerProvider>
    )
}

export default Chat