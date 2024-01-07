import SearchBar from '../Searchbar/Search'
import { useDispatch } from 'react-redux'
import style from "./Nav.module.css";
import { Link } from "react-router-dom";
import { clearSearch } from '../../redux/actions/actions'
/* import style from "./searchBar/SearchBar.module.css"; */
export default function NavBar({ onSearch }) {
  const dispatch = useDispatch()
  const handleHomeClick = () => {
    dispatch(clearSearch());
  };
  return (
    <nav className={style.nav}>
      <Link to='/' className={style.icon}>
      <img className={style.logoImg}
        src=""
        alt=""
        border="0"
      />
      </Link>
        <Link to='/' className={style.links}>Inicio</Link>
        <Link to='/home' onClick={handleHomeClick} className={style.links}>Home</Link>
        <Link to='/adddog' className={style.links}>Añadir Nuevo</Link>
        <SearchBar onSearch={onSearch}/>
    </nav>
  );
}
