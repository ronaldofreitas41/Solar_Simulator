export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#0D3048",
        color: "white",
        textAlign: "center",
        padding: "20px",
        marginTop: "20px",
      }}
    >
      <p>&copy; 2025 Solar Simulator. Todos os direitos reservados.</p>
      <p>
        Contato:{" "}
        <a href="mailto:ronaldinho.lfs@gmail.com" style={{ color: "#FFC531" }}>
          ronaldinho.lfs@gmail.com
        </a>
      </p>
      <p>
        Github:{" "}
        <a
          href="https://github.com/ronaldofreitas41"
          style={{ color: "#FFC531" }}
        >
          github.com/ronaldofreitas41
        </a>
      </p>
      <p>
        Whatsapp:{" "}
        <a href="https://wa.me/553197152525231" style={{ color: "#FFC531" }}>
          (31) 97152-525231
        </a>
      </p>
    </footer>
  );
}
