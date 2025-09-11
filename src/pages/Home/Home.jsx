import React from 'react';
import BannerSlider from './BannerSlider';
import FeaturedProducts from './FeaturedProducts/FeaturedProducts';
import TrendingProducts from './TrendingProducts/TrendingProducts';

const Home = () => {
    return (
        <div>
           <BannerSlider></BannerSlider>
           <FeaturedProducts></FeaturedProducts>
           <TrendingProducts></TrendingProducts>
        </div>
    );
};

export default Home;