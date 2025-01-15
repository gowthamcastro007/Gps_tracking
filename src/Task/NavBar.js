export default function NavBar(){
    return (
    <nav className="nav">
      <a href="/" className="site-title">CRUD Application</a>
  
      <ul>
        <li className="active">
          <a href="/noki-cargo/components/buttons/register">REGISTER</a>
          </li>
          <li className="active">
          <a href="/noki-cargo/components/buttons/manage">MANAGE</a>
        </li>
      </ul>
    </nav>
    )
  }