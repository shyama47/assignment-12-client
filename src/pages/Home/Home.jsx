import React from 'react';
import BannerSlider from './BannerSlider';
import FeaturedProducts from './FeaturedProducts/FeaturedProducts';
import TrendingProducts from './TrendingProducts/TrendingProducts';
import SuccessStories from './SuccessStories/SuccessStories';
import TopCategories from './TopCategories/TopCategories';
import JoinCommunity from './JoinCommunity/JoinCommunity';
import HowItWorks from './HowItWorks/HowItWorks ';
import CouponCarousel from './CouponCarousel/CouponCarousel';

const Home = () => {
    return (
        <div>
       <BannerSlider />
       <FeaturedProducts />
       <TrendingProducts />
       <CouponCarousel/>
       <TopCategories />
       <HowItWorks />
       <SuccessStories />
       <JoinCommunity />

        </div>
    );
};

export default Home;