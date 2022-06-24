import { logout } from '@/features/users/userSlice';
import { RootState } from '@/store';
import { Center, Group, Navbar, Tooltip, UnstyledButton } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrandHipchat, Home2, InfoCircle, Logout
} from 'tabler-icons-react';
import { NavbarLinkProps } from '../../../types';

const mockdata = [
  { icon: Home2, label: 'Home', path: "/" },
  { icon: BrandHipchat, label: 'Chat', path: "/chat" },
  { icon: InfoCircle, label: 'Info', path: '/#' }
];

const Header = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const [active, setActive] = useState(2);
  const dispatch = useDispatch();
  const router = useRouter();

  function NavbarLink({ icon: Icon, label, path, active, onClick }: NavbarLinkProps) {
    return (
      <Link href={path}>
        <Tooltip label={label} position="right" withArrow transitionDuration={0}>
          <UnstyledButton onClick={onClick} className={`w-12 h-12 my-2 rounded-md flex items-center justify-center text-gray-500
        hover:bg-gray-200 ${router.pathname === path ? 'bg-gray-200' : ''}
        `}>
            <Icon />
          </UnstyledButton>
        </Tooltip>
      </Link>
    );
  }

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      path={link.path}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));

  const signOut = () => {
    dispatch(logout());
  }

  return (
    <Navbar className="w-min-full md:h-screen md:w-20" p="md">
      <Center>
        <p className="font-extrabold text-4xl">E</p>
      </Center>
      <Navbar.Section grow mt={50}>
        <Group direction="column" align="center" spacing={0}>
          {links}
        </Group>
      </Navbar.Section>
      <Navbar.Section>
        <Group direction="column" align="center" spacing={0}>
          {user &&
            <NavbarLink icon={Logout} onClick={signOut} path={"/"} label="Logout" />
          }
        </Group>
      </Navbar.Section>
    </Navbar>
  )
}

export default Header