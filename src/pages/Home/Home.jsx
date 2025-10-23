import React from 'react';
import BannerSlider from './BannerSlider';
import FeaturedProducts from './FeaturedProducts/FeaturedProducts';
import TrendingProducts from './TrendingProducts/TrendingProducts';
import SuccessStories from './SuccessStories/SuccessStories';
import TopCategories from './TopCategories/TopCategories';
import JoinCommunity from './JoinCommunity/JoinCommunity';
import HowItWorks from './HowItWorks/HowItWorks ';
import CouponCarousel from './CouponCarousel/CouponCarousel';
import { Helmet } from 'react-helmet-async';
import TechStack from './TechStack';
import FAQSection from './FAQSection';
import Newsletter from './Newsletter';
import ScrollToTop from './ScrollToTop';

const Home = () => {
    return (
        <div>
            <Helmet>
            <title>Home || Page</title>
            </Helmet>
       <BannerSlider />
       <FeaturedProducts />
       <TrendingProducts />
       <CouponCarousel/>
       <TopCategories />
       <HowItWorks />
       <SuccessStories />
       {/* <JoinCommunity /> */}
      <TechStack/>
      <FAQSection/>
      <Newsletter/>
      <ScrollToTop/>
        </div>
    );
};

export default Home;