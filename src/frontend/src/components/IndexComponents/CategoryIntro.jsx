import React from "react";

import breakfast from '../../assets/categories/breakfast.png'
import vegan from '../../assets/categories/vegan.png'
import meat from '../../assets/categories/meat.png'
import dessert from '../../assets/categories/dessert.png'
import lunch from '../../assets/categories/lunch.png'
import chocolate from '../../assets/categories/chocolate.png'

import CategoryButton from "../CategoryButton";
import Button from "../Button";


export default function CategoryIntro() {

    return (
        <div className="w-full my-10 px-10">
            <div className="flex flex-row justify-between mb-5">
                <h2 className="text-[38px] font-medium">Category</h2>
                <Button name="View all Categories" className="px-5 py-3 bg-[#E7FAFE] rounded-xl"></Button>
            </div>
            
            <div className="flex flex-row justify-between pt-12" > 
                <CategoryButton name="Breakfast" imageSrc={breakfast} />
                <CategoryButton name="Vegan" imageSrc={vegan} />
                <CategoryButton name="Meat" imageSrc={meat} />
                <CategoryButton name="Dessert" imageSrc={dessert} />
                <CategoryButton name="Lunch" imageSrc={lunch} />
                <CategoryButton name="Chocolate" imageSrc={chocolate} />
            </div>
        </div>  
    );
}