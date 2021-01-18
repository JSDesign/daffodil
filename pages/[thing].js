import { useRouter } from 'next/router';

const Thing = () => {
    const router = useRouter();
    const { thing } = router.query;
    console.log(thing);

    return <h1>Welcome, you've landed on { thing }. It's really the crux of everything.</h1>;
};

export default Thing;
