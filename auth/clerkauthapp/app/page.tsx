import Link from 'next/link'
import React from 'react'

const Home = () => {
  return (
    <div>
      <ul>
        <Link href={"/"}>Home</Link>
        <Link href={"/about"}>About</Link>
        <Link href={"/contact"}>Contact</Link>

      </ul>
    </div>
  );
}

export default Home
