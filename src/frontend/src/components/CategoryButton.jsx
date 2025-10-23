import React from 'react';
import Button from './Button';
import CATEGORY_COLOR from '../constants/CategoryColor';


export default function CategoryButton({ name, imageSrc, buttonClass }) {
    return (
        <Button
        name={
            <div className="flex flex-col items-center">
            <div className="relative w-full h-full flex justify-center items-center transform -translate-y-1/2">
                <img
                src={imageSrc}
                alt={name}
                className="w-3/4 z-20 relative"
                />
                <div
                className="absolute inset-0 left-1/4 w-3/4 bg-gray-200 bg-center bg-cover bg-no-repeat blur-[10px] z-10"
                style={{ backgroundImage: `url(${imageSrc})` }}
                ></div>
            </div>
            <p className="text-[18px] font-medium mt-2">{name}</p>
            </div>
        }
        className={`w-36 rounded-2xl flex flex-col p-4  ${buttonClass}`}
        style={{
            background: `linear-gradient(to top, ${CATEGORY_COLOR[name]}, white)`
        }}
        />
    );
}
