import React from "react";

type Props = {
    id: String
    text: String;
}

export const Line: React.FC<Props> = ({ id, text }) => {

    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <p style={{
                color: "#fff",
                fontSize: "16px",
                fontFamily: "Averia Serif Libre",
                margin: "10px 10px 10px 0",
                fontWeight: "bold",
            }}>
                {id}
            </p>
            <p
                style={{
                    color: "#fff",
                    fontSize: "16px",
                    fontFamily: "Averia Serif Libre",
                    margin: "10px 0",
                }}
            >
                {text}
            </p>
        </div>

    )
}

export default Line;