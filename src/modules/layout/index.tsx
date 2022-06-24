import Header from '@/modules/header';
import { AppShell } from '@mantine/core';
import React from 'react';
import Footer from '../footer';

type Props = {
    children: React.ReactElement;
}

const Layout = (props: Props) => {
    return (
        <AppShell
            navbar={<Header />}
            footer={<Footer />}
        >
            {props.children}
        </AppShell>
    )
}

export default Layout