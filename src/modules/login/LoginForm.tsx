import { SocketContext } from '@/context/socket';
import {
    Button, Checkbox, Container,
    Group, Paper, PasswordInput, Text, TextInput, Title
} from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';

type Props = {}

const LoginForm = (props: Props) => {
    const socket = useContext(SocketContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const login = async () => {

    }

    return (
        <NotificationsProvider>
            <Container size={420} my={40}>
                <Title
                    align="center"
                    sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
                >
                    Welcome back!
                </Title>
                <Text color="dimmed" size="sm" align="center" mt={5}>
                    Do not have an account yet?{' '}
                    <Link href="/register">
                        <a className="text-sm hover:underline text-blue-500">Create account</a>
                    </Link>
                </Text>
                <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                    <TextInput value={email} onChange={(e) => setEmail(e.target.value)} label="Email" placeholder="you@mantine.dev" required />
                    <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} label="Password" placeholder="Your password" required mt="md" />
                    <Group position="apart" mt="md">
                        <Checkbox label="Remember me" />
                        <Link href="/forgot-password">
                            <a className="text-sm hover:underline">Forgot password?</a>
                        </Link>
                    </Group>
                    <Button onClick={login} className="bg-blue-500 hover:bg-blue-600" fullWidth mt="xl">
                        Sign in
                    </Button>
                </Paper>
            </Container>
        </NotificationsProvider>
    )
}

export default LoginForm