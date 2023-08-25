"use client";
import React, { Children, useState } from 'react';
import style from './index.module.css'
import '@/app/globals.css'
import Link from 'next/link';
import { BsChevronLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";
import { BsPersonCircle } from "react-icons/bs";

const index = ({children}) => {
    const [toggle , setToggle] = useState(false)
    return (
        <html lang='en'>
            <body className={style.body}>
                <div className={style.layout_container}>
                    <div className={toggle?style.layout_wrapper1_toggle:style.layout_wrapper1}>
                        <div className={style.layout_logo}>
                            POS
                        </div>
                        <div className={style.layout_route}>
                            <Link className={style.layout_link} href='/'>{toggle?"icon":"Dashboard"}</Link>
                            <Link className={style.layout_link}  href='/sale'>{toggle?"icon":"Sale"}</Link>
                            <Link className={style.layout_link}  href='/'>{toggle?"icon":"Buy"}</Link>
                        </div>
                        <button className={style.layout_toggle} onClick={()=>setToggle(!toggle)}>
                            {toggle?<BsChevronRight/>:<BsChevronLeft/>}
                        </button>
                    </div>
                    <div className={toggle?style.layout_wrapper2_toggle:style.layout_wrapper2}>
                        <div className={style.layout_header}>
                            <div className={style.layout_profile}>
                                <div className={style.layout_profile_icon}><BsPersonCircle/></div>
                                <div className={style.layout_profile_name}>Phearith</div>
                            </div>
                        </div>
                        <main className={style.layout_main}>
                            {children}
                        </main>
                    </div>
                </div>
            </body>
        </html>
    );
}

export default index;
