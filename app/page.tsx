import NavBar from "./components/Common/navBar";
import YellowLine from "./components/Common/yellowLine";

export default function Home() {
  const usertyp = 'admin';
  
  return (
    <div>
      <NavBar usertype={usertyp}/>
      <YellowLine/>
    </div>
  );
}
