import Bundles from '../components/Bundles';
import CategoryTiles from '../components/CategoryTiles';
import FlashDeals from '../components/FlashDeals';
import Hero from '../components/Hero';

const LandingPage = () => {
    return (
        <>
            <Hero />
            <CategoryTiles />
            <FlashDeals />
            <Bundles />
        </>
    );
};

export default LandingPage;
