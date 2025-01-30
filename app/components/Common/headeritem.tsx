"use client";
import React from "react";
import { useRouter } from "next/navigation";

interface Props {
    text: string;
    href: string;
}

const HeaderItem: React.FC<Props> = ({ text, href }) => {
    const router = useRouter();

    function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        event.preventDefault();
        const url = href.startsWith('http://') || href.startsWith('https://') ? href : `http://${href}`;
        console.log("teste");
        router.push(url);
    }

    return (
        <a href={href}
            style={{
                color: '#FFC531',
                textDecoration: 'none',
                padding: '10px',
                fontSize: '1.2em',
                paddingLeft: '40px',
                fontFamily: 'Averia Serif Libre'
            }}
            onClick={handleClick}
        >
            {text}
        </a>
    );
};

export default HeaderItem;