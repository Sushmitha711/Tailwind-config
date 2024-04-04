import React, { useEffect, useState } from 'react';
import { Button, Divider, Image, Input, Link, useNavbar, Card, CardHeader, CardFooter } from "@nextui-org/react"
import { LeftArrow } from "../../Images/LeftArrow";
import { EyeSlashFilledIcon } from '../../Images/EyeSlashFilledIcon';
import { EyeFilledIcon } from '../../Images/EyeFilledIcon';
import RightArrow from '../../Images/RightArrow.jsx';
import Github from "../../Images/Github.jsx";
import Google from '../../Images/Google.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getAllData } from '../../controllers/strapiController.js';
import { LoginUserGrabJwt, NavigateSign } from '../../controllers/loginController.js';
import { useNavigate } from 'react-router-dom';

import Card1 from '../../Images/Card1.svg'
import Card2 from '../../Images/Card2.svg'
import Card3 from '../../Images/Card3.svg'
import BlankCard from '../../Images/BlankCard.svg'

const Onboarding = () => {
    const navigate = useNavigate();
    const handleCardClick = (route) => {

        navigate(route);
    };
    return (
        <div className="flex flex-col min-h-[590px] h-screen items-center justify-center">
            <main className='mx-auto  w-full max-w-[450px]'>
                <div className='flex items-center gap-4 '>

                    <Image
                        width={50}
                        alt="NextUI hero Image"
                        src="Assets/haya-logo.png"
                    />

                </div>
                <div className='mt-8 sm:text-left text-2xl tracking-[-0.16px] text-slate-12 font-bold pb-8'>
                    Tell us about yourself
                </div>
                <Input
                    isRequired
                    key="outside"
                    type="text"

                    label="First Name"
                    labelPlacement="outside"
                    placeholder="Enter your collection folder name"
                />
                <Input
                    isRequired
                    key="outside"
                    type="text"

                    label="Last Name"
                    labelPlacement="outside"
                    placeholder="Enter your collection folder name"
                />


            </main>

            <div className=' pt-8 gap-8 mx-auto  w-full max-w-[900px]'>

            </div>
        </div>

    )
}

export default Onboarding