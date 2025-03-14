"use client";
import BlueButton from "@/app/components/Common/blueButton";
import Footer from "@/app/components/Common/footer";
import { NavBar } from "@/app/components/Common/navBar";
import YellowLine from "@/app/components/Common/yellowLine";
import React, { useState } from "react";
import emailjs from "@emailjs/browser";

export default function Page() {
  const [name, setName] = useState("");
  const [emailContent, setEmailContent] = useState("");

  const sendEmail = (e: any) => {
    e.preventDefault();
    alert("teste");
    emailjs.sendForm(
      "service_5hcllt8",
      "template_iyv6o4o",
      e.target,
      "nZ78nBt9XtkeF7GhT"
    );
  };

  return (
    <div>
      <NavBar />
      <YellowLine />
      <form
        style={{
          backgroundColor: "#fff",
          height: "100%",
          width: "100%",
          position: "absolute",
          justifyContent: "center",
          alignItems: "center",
        }}
        onSubmit={sendEmail}
      >
        <div
          style={{
            justifyContent: "space-between",
            display: "flex",
          }}
        >
          <div
            style={{
              paddingLeft: "10%",
              paddingTop: "5%",
            }}
          >
            <h1
              style={{
                paddingLeft: "35%",
                fontFamily: "Averia Serif Libre",
                fontSize: "40px",
                color: "#000",
              }}
            >
              Suporte
            </h1>
            <p
              style={{
                paddingTop: "5%",
                color: "#000",
                fontFamily: "Averia Serif Libre",
                fontSize: "18px",
              }}
            >
              Relate por aqui o seu problema, e entraremos em contato o mais
              rápido possível.
            </p>
            <div style={{ marginTop: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "10px",
                  color: "#000",
                }}
              >
                Nome:
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    marginTop: "5px",
                    border: "3px solid #083553",
                  }}
                />
              </label>
              <label
                style={{
                  display: "block",
                  marginBottom: "10px",
                  color: "#000",
                }}
              >
                Conteúdo do E-mail:
                <textarea
                  value={emailContent}
                  onChange={(e) => setEmailContent(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    marginTop: "5px",
                    border: "3px solid #083553",
                  }}
                  rows={5}
                ></textarea>
              </label>
            </div>
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
              type="submit"
            >
                Enviar
            </button>
          </div>

          <img
            src="/images/suporte.png"
            alt="suporteimg"
            style={{
              height: "90%",
              width: "50%",
              float: "right",
            }}
          />
        </div>
        <Footer />
      </form>
      <Footer />
    </div>
  );
}
