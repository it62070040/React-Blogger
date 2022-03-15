import { Link } from "react-router-dom";

const Navbar = (props) => {
    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-light " style={{backgroundColor:"#E789E4"}}>
                    
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <Link to="/" className="nav-link">Home</Link>
                        <Link to="/Post" className="nav-link">Post</Link>
                        <Link to="/Author" className="nav-link">Author</Link>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar