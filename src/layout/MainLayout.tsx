
import { Header } from '../components/layout/Header'
import { NavBar } from '../components/layout/NavBar'
import "../assets/css/MainCss.css";
type Props = {
  children: React.ReactNode;
};

export const MainLayout = ({children}: Props) => {
  return (
    <div className="app">
      <Header />
      <NavBar />
       <main className="main-content">{children}</main>
    </div>

  )
}
