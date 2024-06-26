import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center px-10 py-3 h-[80px]">
      <img src="/logo.jpeg" alt="Logo" className="h-20 w-20" />
      <Link className="text-red font-bold" href={"/"}>  
        Catatan Sesi Cuci Darah (Hemodialisis)
      </Link>
    </nav>
  );
}