import React from "react";

type Props = {
    text?: string;
    onClick?: () => void;
}

export const BlueButton: React.FC<Props> = ({ text, onClick }) => {
    return (
        <button
            style={{
                backgroundColor: "rgb(0, 76, 128)",
                color: "#FFF",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #FFF",
                cursor: "pointer",
            }}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default BlueButton;


