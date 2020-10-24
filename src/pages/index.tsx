import React from "react";
import { Link } from "gatsby";

interface IHomePageProps {}

export default function Home({}: IHomePageProps) {
    return (
        <div className="container">
            <h1>Health food</h1>
            <Link to="/login">Login</Link>
        </div>
    )
}
