import {
    Anchor, Box, Button, Center, Container, createStyles, Group, Paper, Text,
    TextInput, Title
} from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft } from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
    title: {
        fontSize: 26,
        fontWeight: 900,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },

    controls: {
        [theme.fn.smallerThan('xs')]: {
            flexDirection: 'column-reverse',
        },
    },

    control: {
        [theme.fn.smallerThan('xs')]: {
            width: '100%',
            textAlign: 'center',
        },
    },
}));

const ForgotPassword: NextPage = () => {
    const { classes } = useStyles();

    const [email, setEmail] = useState('');

    const handleSubmit = (e: any) => {
        e.preventDefault();

    }

    return (
        <NotificationsProvider>
            <Container size={460} my={30}>
                <Title className={classes.title} align="center">
                    Forgot your password?
                </Title>
                <Text color="dimmed" size="sm" align="center">
                    Enter your email to get a reset link
                </Text>

                <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
                    <TextInput value={email} onChange={(e) => setEmail(e.target.value)} label="Your email" placeholder="me@mantine.dev" required />
                    <Group position="apart" mt="lg" className={classes.controls}>
                        <Anchor color="dimmed" size="sm" className={classes.control}>
                            <Center inline>
                                <ArrowLeft size={12} />
                                <Box ml={5}>
                                    <Link href="/login">
                                        <a className="text-sm hover:underline">Back to login page</a>
                                    </Link>
                                </Box>
                            </Center>
                        </Anchor>
                        <Button onClick={handleSubmit} className={`${classes.control} bg-blue-400`}>Reset password</Button>
                    </Group>
                </Paper>
            </Container>
        </NotificationsProvider>
    );
}

export default ForgotPassword;