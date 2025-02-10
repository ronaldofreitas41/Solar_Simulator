"use client";
import React from "react";
import { useRouter } from "next/navigation";

interface Props {
    id?: string;
    display?: string;
    text: string;
    href: string;
}

export const HeaderItem: React.FC<Props> = ({ text, href, display, id }) => {
    const router = useRouter();

    function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        event.preventDefault();
        router.push(href);
    }

    return (
        <a
            href={href} 
            id={id ? id : ''}
            style={{
                color: '#FFC531',
                display: display ? display : 'block',
                textDecoration: 'none',
                fontSize: '20px',
                fontWeight: 'bold',
                padding: '10px 15px',
                transition: 'color 0.3s'
            }}
            onMouseOver={(e) => e.currentTarget.style.color = '#FFD700'}
            onMouseOut={(e) => e.currentTarget.style.color = '#FFC531'}
            onClick={handleClick}
        >
            {text}
        </a>
    );
};

export default HeaderItem;
