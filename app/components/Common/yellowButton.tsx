import React from "react";

type Props = {
    text?: string;
    onClick?: () => void;
}

export const YellowButton: React.FC<Props> = ({ text, onClick }) => {
    return (
        <button
            style={{
                backgroundColor: "rgb(0, 76, 128)",
                color: "#FFC531",
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


