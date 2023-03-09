import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { auth, provider } from '../firebase';
import tw from 'tailwind-styled-components/dist/tailwind-styled-components.cjs';

function Login() {

    const router = useRouter();

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                router.push('/');
            };
        });
    }, []);

    return (
        <Wrapper>
            <Title class="text-center">Toolie</Title>
            <Title class="text-center">Login to access your account</Title>
            <HeadImage class="image-center Login_logo"  src='https://www.pngkey.com/png/full/332-3327509_toolbox-hand-tool-toy-tool-box-clip-art.png'/>
            <SignInButton onClick={() => signInWithPopup(auth, provider)}>Sign in with Google</SignInButton>
        </Wrapper>
    )
}

export default Login

const Wrapper = tw.div`
    flex flex-col h-screen bg-gray-200 p-4
`

const SignInButton = tw.button`
    bg-black text-white text-center py-4 mt-8 self-center w-full
`

const UberLogo = tw.img`
    h-20 w-auto object-contain self-start
`
const Title = tw.div`
    text-5xl pt-4 text-gray-500
`

const HeadImage = tw.img`
    object-scale-down
    
`