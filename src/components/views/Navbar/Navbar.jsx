import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <>
            <h1>React Router Contacts</h1>
            <nav>
                <ul>
                    <li>
                        <Link to={`/contacts/1`}>Your Name</Link>
                    </li>
                    <li>
                        <Link to={`/contacts/2`}>Your Friend</Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}