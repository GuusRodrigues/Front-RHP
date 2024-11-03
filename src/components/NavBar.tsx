import Image from 'next/image';

export default function NavBar() {
  return (
    <nav className="flex justify-center items-center h-20">
      <header className="header">
        <Image id="LogoName"src="/LogoName.png" alt="Logo RHP" width={200} height={100} />
      </header>
    </nav>
  );
}
