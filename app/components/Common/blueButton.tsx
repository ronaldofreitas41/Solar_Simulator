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
                color: "#FFC531",
                padding: "15px",
                borderRadius: "4px",
                border: "1px solid #FFF",
                cursor: "pointer",
                fontFamily: "Averia Serif Libre",
                fontSize: "1.2rem",
            }}
            type="button"
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default BlueButton;


