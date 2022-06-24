import { ActionIcon, Container, Group } from '@mantine/core';
import { BrandInstagram, BrandTwitter, BrandYoutube } from 'tabler-icons-react';

type Props = {}

const Footer = (props: Props) => {
    return (
        <footer className={`border-t-2`}>
            <Container className={`flex justify-between items-center py-4`}>
                <p className="font-extrabold text-4xl">E</p>
                <Group spacing={0} className={``} position="right" noWrap>
                    <ActionIcon size="lg">
                        <BrandTwitter size={18} />
                    </ActionIcon>
                    <ActionIcon size="lg">
                        <BrandYoutube size={18} />
                    </ActionIcon>
                    <ActionIcon size="lg">
                        <BrandInstagram size={18} />
                    </ActionIcon>
                </Group>
            </Container>
        </footer>
    )
}

export default Footer