import { SocketContext } from '@/context/socket';
import { setUser } from '@/features/users/userSlice';
import {
    Box,
    Button, Container, Paper, PasswordInput, Popover, Progress, Text, TextInput, Title
} from '@mantine/core';
import { NotificationsProvider, showNotification } from '@mantine/notifications';
import axios from 'axios';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Check, X } from 'tabler-icons-react';

type Props = {}

function PasswordRequirement({ meets, label }: { meets: boolean; label: string }) {
    return (
        <Text
            color={meets ? 'teal' : 'red'}
            sx={{ display: 'flex', alignItems: 'center' }}
            mt={7}
            size="sm"
        >
            {meets ? <Check /> : <X />} <Box ml={10}>{label}</Box>
        </Text>
    );
}

const requirements = [
    { re: /[0-9]/, label: 'Includes number' },
    { re: /[a-z]/, label: 'Includes lowercase letter' },
    { re: /[A-Z]/, label: 'Includes uppercase letter' },
    { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
];

function getStrength(password: string) {
    let multiplier = password.length > 5 ? 0 : 1;

    requirements.forEach((requirement) => {
        if (!requirement.re.test(password)) {
            multiplier += 1;
        }
    });

    return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

const Register: NextPage = (props: Props) => {
    const socket = useContext(SocketContext);
    const [popoverOpened, setPopoverOpened] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const checks = requirements.map((requirement, index) => (
        <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(password)} />
    ));
    const strength = getStrength(password);
    const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red';
    const dispatch = useDispatch();
    const router = useRouter();

    const register = async () => {
        if (strength === 100) {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_HOST!}/api/auth/register`, {
                email,
                password,
                username,
            });

            if (response.status === 200) {
                dispatch(setUser(response.data));
                router.push('/');
            } else {
                showNotification({
                    title: "Failure",
                    message: response.data.error,
                    color: 'red',
                    icon: <X size={10} />
                })
            }
        } else {
            showNotification({
                title: "Password",
                message: "Password is too weak.",
                color: 'red',
                icon: <X size={10} />
            })
        }
    }

    return (
        <NotificationsProvider>
            <Container size={420} my={40}>
                <Title
                    align="center"
                    sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
                >
                    Join me!
                </Title>
                <Text color="dimmed" size="sm" align="center" mt={5}>
                    Already have an account?{' '}
                    <Link href="/login">
                        <a className="text-sm hover:underline text-blue-500">Sign in here</a>
                    </Link>
                </Text>
                <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                    <TextInput value={email} onChange={(e) => setEmail(e.target.value)} label="Email" placeholder="you@mantine.dev" required />
                    <TextInput value={username} onChange={(e) => setUsername(e.target.value)} label="Username" placeholder="Username" required mt="md" />
                    <Popover
                        opened={popoverOpened}
                        position="bottom"
                        placement="start"
                        withArrow
                        className="w-full"
                        styles={{ popover: { width: '100%' } }}
                        trapFocus={false}
                        transition="pop-top-left"
                        onFocusCapture={() => setPopoverOpened(true)}
                        onBlurCapture={() => setPopoverOpened(false)}
                        target={
                            <PasswordInput className="w-full" value={password} onChange={(e) => setPassword(e.target.value)} label="Password" placeholder="Your password" required mt="md" />
                        }>
                        <Progress color={color} value={strength} size={5} style={{ marginBottom: 10 }} />
                        <PasswordRequirement label="Includes at least 6 characters" meets={password.length > 5} />
                        {checks}
                    </Popover>
                    <Button onClick={register} className="bg-blue-500 hover:bg-blue-600" fullWidth mt="xl">
                        Register
                    </Button>
                </Paper>
            </Container>
        </NotificationsProvider >
    )
}

export default Register