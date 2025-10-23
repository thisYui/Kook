import React from 'react';
import Navbar from '../components/NavigationBar';
import RecipeBadge from '../components/RecipeBadge';
  import RecipeMetadata from '../components/RecipeMetadata';
import AuthorInfo from '../components/AuthorInfo';

import CarouselItem from '../components/CarouselItem';
import Carousel from '../components/Carousel';
import Button from '../components/Button';

//Carousel import img test
import img1 from '../assets/images/carousel1.jpg'
import img2 from '../assets/images/carousel2.jpg'
import img3 from '../assets/images/carousel3.jpg'


//Category import img test
import breakfast from '../assets/categories/breakfast.png'
import vegan from '../assets/categories/vegan.png'
import meat from '../assets/categories/meat.png'
import dessert from '../assets/categories/dessert.png'
import lunch from '../assets/categories/lunch.png'
import chocolate from '../assets/categories/chocolate.png'

import CategoryButton from '../components/CategoryButton';


const IndexPage = () => {

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 w-full">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="Carousel-Box w-full h-[640px]">

            <Carousel className="w-full h-full">

              <CarouselItem title="Canh Ga" description="This is a descrition" img={img1}></CarouselItem>
              <CarouselItem title="Com Tam" description="This is a descrition" img={img2}></CarouselItem>
              <CarouselItem title="Bun Bo" description="This is a descrition" img={img3}></CarouselItem>

            </Carousel>
          </div>


          <div className="Category-Box my-10 px-10">
              <div className="flex flex-row justify-between mb-5">
                  <h2 className="text-[38px] font-medium">Category</h2>
                  <Button name="View all Categories" className="px-5 py-3 bg-[#E7FAFE] rounded-xl"></Button>
              </div>
              
              <div className="flex flex-row justify-between pt-12" > 
                  <CategoryButton name="Breakfast" imageSrc="https://w7.pngwing.com/pngs/154/844/png-transparent-100-vegan-icon.png" gradient="#7082461A"/>
                  <CategoryButton name="Vegan" imageSrc={vegan} gradient="#6CC63F1A" />
                  <CategoryButton name="Meat" imageSrc={meat} gradient="#CC261B1A" />
                  <CategoryButton name="Dessert" imageSrc={dessert} gradient="#F09E001A" />
                  <CategoryButton name="Lunch" imageSrc={lunch} gradient="#0000000D" />
                  <CategoryButton name="Chocolate" imageSrc={chocolate} gradient="#0000000D" />
              </div>
          </div>  
        </div>
      </main>
    </div>
  );
};

export default IndexPage;