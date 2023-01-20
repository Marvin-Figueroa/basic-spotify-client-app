import React from 'react';
import { Avatar, Button, Dropdown, Navbar, Text } from '@nextui-org/react';
import { signOut, useSession } from 'next-auth/react';
import { FaSpotify } from 'react-icons/fa';
import Link from 'next/link';

function NavBar() {
  const { data: session } = useSession();

  return (
    <Navbar isBordered variant='floating'>
      <Navbar.Toggle showIn='xs' />
      <Navbar.Brand
        hideIn='xs'
        css={{
          '@xs': {
            w: '12%',
          },
        }}>
        <FaSpotify color='#1DB954' size='50' />
      </Navbar.Brand>
      <Navbar.Content
        hideIn='xs'
        css={{
          '@xsMin': {
            d: 'flex',
            justifyContent: 'center',
            gap: '20px',
          },
        }}>
        <Link href='/'>
          <Text b color='#1DB954'>
            Home
          </Text>
        </Link>
        <Link href='/search'>
          <Text b color='#1DB954'>
            Search
          </Text>
        </Link>
        <Link href='/profile'>
          <Text b color='#1DB954'>
            Profile
          </Text>
        </Link>
        <Link href='/library'>
          <Text b color='#1DB954'>
            Library
          </Text>
        </Link>
      </Navbar.Content>
      <Navbar.Content
        css={{
          '@xs': {
            w: '12%',
            jc: 'flex-end',
          },
        }}>
        <Button
          css={{
            '@xs': {
              d: 'none',
            },
            '@sm': {
              d: 'block',
            },
          }}
          onClick={() => signOut()}
          color='error'
          rounded
          auto
          ghost>
          Log Out
        </Button>

        <Dropdown placement='bottom-right'>
          <Navbar.Item>
            <Dropdown.Trigger>
              <Avatar
                bordered
                as='button'
                color='success'
                size='md'
                src={session?.user?.image as string}
              />
            </Dropdown.Trigger>
          </Navbar.Item>
          <Dropdown.Menu aria-label='User menu actions' color='success'>
            <Dropdown.Item key='profile' css={{ height: '$18' }}>
              <Text
                b
                color='inherit'
                css={{ d: 'flex', justifyContent: 'center' }}>
                Signed in as
              </Text>
              <Text
                b
                color='inherit'
                css={{ d: 'flex', justifyContent: 'center' }}>
                {session?.user?.name as string}
              </Text>
            </Dropdown.Item>

            <Dropdown.Item key='logout' withDivider color='error'>
              <Text
                onClick={() => signOut()}
                b
                color='error'
                css={{ d: 'flex', justifyContent: 'center' }}>
                Log Out
              </Text>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Navbar.Content>
      <Navbar.Collapse>
        <Navbar.CollapseItem>
          <Link href='/'>Home</Link>
        </Navbar.CollapseItem>
        <Navbar.CollapseItem>
          <Link href='search'>Search</Link>
        </Navbar.CollapseItem>
        <Navbar.CollapseItem>
          <Link href='profile'>Profile</Link>
        </Navbar.CollapseItem>
        <Navbar.CollapseItem>
          <Link href='library'>Library</Link>
        </Navbar.CollapseItem>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
