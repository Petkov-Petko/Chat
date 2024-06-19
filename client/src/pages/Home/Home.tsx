import axios from "axios"
import "./Home.css"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const Home = () => {
    const [auth, setAuth] = useState(false)
    axios.defaults.withCredentials = true;
    const navigate = useNavigate();

    const handleDelete = () => {
        axios.get("http://localhost:5055/logout")
        .then(() => {
           navigate("/")
        })
        .catch((err) => console.log(err));
    }

    useEffect(() => {
        axios.get("http://localhost:5055")
        .then((res) => {
          if (res.data.Status === "Success") {
            setAuth(true)
          } else {
            setAuth(false)
          }
        })
        .catch((err) => console.log(err));
    }, [])
  return (
    <div>
        {auth ? (
            <div>
                <h1>Welcome to Home Page</h1>
                <button onClick={handleDelete}>Log out</button>
            </div>
        ) : (
            <div>
                <h1>Not Authorized</h1>
            </div>
        
        )}
    </div>
  )
}

export default Home