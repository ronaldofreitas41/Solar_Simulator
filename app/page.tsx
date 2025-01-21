import NavBar from "./components/Common/navBar";
import YellowLine from "./components/Common/yellowLine";

export default function Home() {
  const usertyp = 'admin';

  return (
    <div>
      <NavBar usertype={usertyp} />
      <YellowLine />
      <div
        style={{
          backgroundColor: '#fff',
          height: '100%',
          width: '100%',
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
          // minHeight: '91%', // Define uma altura mínima
          // minWidth: '100%', // Define uma largura mínima
        }}
      >

        <div
          style={{
            position: 'relative', // Define um contêiner de referência
            width: '100%', // Largura total do contêiner
            height: '100%', // Altura para exemplo
          }}
        >
          {/* Fundo azul */}
          <div
            style={{
              backgroundColor: '#0D3048',
              position: 'absolute',
              height: '80%',
              width: '70%',
              marginTop: '80px',
              borderRadius: '0 0 181px 0',
              zIndex: 1,
              justifyContent: 'center',
            }}
          >
            <p style={{
              color: '#FFC531',
              fontFamily: 'Averia Serif Libre',
              fontSize: '80px',
              width: '100%',
              textAlign: 'center',

            }}>Solar Simulator</p>

            <p style={{
              color: '#fff',
              fontFamily: 'Averia Serif Libre',
              fontSize: '32px',
              width: '90%',
              display: 'flex',
              alignContent: 'center',
              textAlign: 'justify',
              padding: '20px',
              margin: '30px',
            }}>
            Nós somos da Solar Simulator, Solar Simulator é uma plataforma inovadora que permite
            aos usuários simular o comportamento e a eficiência de sistemas de energia solar em diferentes
            condições climáticas e geográficas. Através de algoritmos avançados, o simulador ajuda a prever
            a produção de energia, analisar o retorno sobre o investimento e otimizar o posicionamento dos
            painéis solares para maximizar a captação de luz.
            </p>

          </div>

          {/* Imagem posicionada */}
          <img
            src="/images/placas.png"
            alt="placas"
            style={{
              position: 'relative', // Define um contêiner de referência
              top: '50%', // Ajuste de posição vertical
              left: '75%', // Ajuste de posição horizontal (mover para o lado direito)
              transform: 'translate(-50%, -50%)', // Centraliza a imagem no ponto definido por top/left
              zIndex: 2,
              width: '720px', // Ajuste de tamanho
              height: 'auto', // Mantém a proporção
            }}
          />
        </div>
      </div>

    </div>
  );
}
