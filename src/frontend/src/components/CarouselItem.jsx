import React, { useState } from "react";
import RecipeBadge from "./RecipeBadge";
import RecipeMetadata from "./RecipeMetadata";
import AuthorInfo from "./AuthorInfo";
import Button from "./Button";
import {CirclePlay} from 'lucide-react'
export default function CarouselItem({title, description, img}) {

    return(
        <div className="w-full h-full flex flex-row bg-[#E7FAFE] rounded-3xl overflow-hidden">
            <div className="w-1/2 p-10 flex flex-col">
                <RecipeBadge text="Hot Recipes" icon="🔥" variant="hot" size="md" className="mb-5 w-fit" />
                <h3 className="text-[50px] font-bold mb-10">{title}</h3>
                <p className="text-gray-600 mb-8 text-[20px]">
                    {description}
                </p>

                <RecipeMetadata 
                time={30}
                category="Chicken"
                size="lg"
                />

                <div className="mt-auto flex flex-row justify-between">
                    <AuthorInfo 
                        name="Cong Phuong"
                        date="2022-03-15"
                    />
                    <Button 
                        className="text-white bg-black px-5 py-3 rounded-xl flex gap-3"
                        name={
                            <div className="flex gap-3">
                                View Recipes <CirclePlay/>
                            </div>
                        }
                    >
                        
                    </Button>
                </div>
            </div>
            <img src={img} alt="Food Images" className="w-1/2 h-full"/>
        </div>
    );
}
