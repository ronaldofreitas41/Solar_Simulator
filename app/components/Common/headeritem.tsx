import React from "react";

interface Props {
    text: string;
    href: string;
}

const HeaderItem: React.FC<Props> = ({ text, href }) => {
    return (
        <a href={href}
            style={{
                color: 'white',
                textDecoration: 'none',
                padding: '10px',
                fontSize: '1.2em',
                paddingLeft: '20px',
                fontFamily:'Averia Serif Libre'
            }}>
            {text}
        </a>
    );
};

export default HeaderItem;