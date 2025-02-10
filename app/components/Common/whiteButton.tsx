import React from "react";

type Props = {
    text?: string;
    onClick?: () => void;
}

const WhiteButton: React.FC<Props> = ({ text, onClick }) => {
    return (
        <button
            style={{
                backgroundColor: "#fff",
                color: "#0D3048",
                padding: "10px",
                borderRadius: "4px",
                border: "none",
                cursor: "pointer",
            }}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default WhiteButton;


