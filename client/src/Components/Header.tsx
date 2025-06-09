"use client"
import React from "react";
import "@/Components/Styles/Header.css";
import { useRouter } from "next/navigation";
const Header = () => {
    const router=useRouter();
  return (
    <header className="header">
      <h1 onClick={()=>router.push('/')}>CheckFlow</h1>
      <nav className="nav-buttons">
        <button onClick={()=>router.push('/AddTask')}>📝</button>
        <button onClick={()=>router.push('/AllTask')}>✅</button>
        <button onClick={()=>router.push('/PendingTask')}>⏳</button>
      </nav>
    </header>
  );
};

export default Header;
