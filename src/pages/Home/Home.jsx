import React from 'react';
import BannerSlider from './BannerSlider';
import FeaturedProducts from './FeaturedProducts/FeaturedProducts';
import TrendingProducts from './TrendingProducts/TrendingProducts';
import SuccessStories from './SuccessStories/SuccessStories';
import TopCategories from './TopCategories/TopCategories';
import JoinCommunity from './JoinCommunity/JoinCommunity';
import HowItWorks from './HowItWorks/HowItWorks ';

const Home = () => {
    return (
        <div>
       <BannerSlider />
       <FeaturedProducts />
       <TrendingProducts />
       <TopCategories />
       <HowItWorks />
       <SuccessStories />
       <JoinCommunity />

        </div>
    );
};

export default Home;