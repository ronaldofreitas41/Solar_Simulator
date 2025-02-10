import React from "react";

type Props = {
    text?: string;
    onClick?: () => void;
}

const YellowButton: React.FC<Props> = ({ text, onClick }) => {
    return (
        <button
            style={{
                backgroundColor: "#FFC531",
                color: "#0D3048",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #FFC531",
                cursor: "pointer",
            }}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default YellowButton;


