import { Link } from "react-router-dom";
import "./PublicView.css"

const PublicView = () => {
  return (
    <div>
      <button><Link to="/login">Login</Link></button>
      <button><Link to="/register">Register</Link></button>
    </div>
  )
}

export default PublicView