import { useEffect, useState } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import tw from 'tailwind-styled-components'
import Map from './components/Map';
import Link from 'next/link';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/router';

export default function Home() {

  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    return onAuthStateChanged(auth, user => {
      if (user) {
        setUser({
          name: user.displayName,
          photoUrl: user.photoURL,
        });
      } else {
        setUser(null);
        router.push('/login');
      }
    })
  }, []);

  return (
    <Wrapper>
      <Map />
      <ActionItems >
        <Header>

          Toolie
          
          <Profile>

            <Name>{user && user.name}</Name>
            <UserImage
              src={user && user.photoUrl}
              onClick={() => signOut(auth)}
            />

          </Profile>

        </Header>
        <ActionButtons>

          <Link href='/search' >
            <ActionButton>
              <ActionButtonImage src='https://cdn.pixabay.com/photo/2015/07/28/20/55/tools-864983_960_720.jpg' />
              List an Item
            </ActionButton>
          </Link>

          <Link href='/reservation'>
          <ActionButton>
            <ActionButtonImage src='https://i.ibb.co/5RjchBg/uberschedule.png' />
            Reserve
          </ActionButton>
          </Link>

          
        </ActionButtons>
        <Link href='/about' >
            <ActionButton>
              <ActionButtonImage src='https://img.freepik.com/free-vector/illustration-web-design-template_53876-37648.jpg?w=900&t=st=1678309835~exp=1678310435~hmac=426afa896f6b7451986ff0a01e1349fe60f5afa3a3facd123a0d7a041e97d95a' />
              Contact Form
            </ActionButton>
          </Link>

        <InputButton>
          My Items
        </InputButton>

      </ActionItems>
    </Wrapper>
  )
};

const Wrapper = tw.div`
  flex flex-col h-screen
`

const ActionItems = tw.div`
  flex-1 p-4
`

const Header = tw.div`
  flex justify-between items-center
`

const UberLogo = tw.img`
  h-28
`

const Profile = tw.div`
  flex items-center
`

const Name = tw.div`
  mr-4 w-20 text-sm
`

const UserImage = tw.img`
  h-12 w-12 rounded-full border border-gray-200 p-px object-cover cursor-pointer
`

const ActionButtons = tw.div`
  flex
`

const ActionButton = tw.div`
  flex flex-col flex-1 bg-gray-200 m-1 h-32 items-center justify-center rounded-lg transform hover:scale-105 transition text-xl
`

const ActionButtonImage = tw.img`
  h-3/5
`

const InputButton = tw.div`
  h-20 bg-gray-200 text-2xl p-4 flex items-center mt-8
`