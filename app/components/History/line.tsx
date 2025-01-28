import React from "react";

type Props = {
    text:string;
}

export const Line:React.FC<Props> = ({text}) => {

    return(
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
    )
}

export default Line;