import Image from 'next/image'
import Link from 'next/link'
const navIcons = [
    {src: '/assets/icons/search.svg', alt: 'Search'},
    {src: '/assets/icons/black-heart.svg', alt: 'Heart'},
    {src: '/assets/icons/user.svg', alt: 'User'}
]
const Navbar = () => {
  return (
    <header className='w-full'>
        <nav className='nav'>
        <Link href="/" className='flex  gap-1'>
            <Image 
            src="/assets/icons/logo.svg"
            height={27}
            width={27}
            alt='Logo'
            />
            <p className="nav-logo">
            Loot<span className='text-primary'>Finder</span> 
            </p>
        </Link>
        <div className="flex items-center gap-5">
            {navIcons.map((icon) => (
            <Image
                src={icon.src}
                height={27}
                width={27}
                alt={icon.alt}
                key={icon.alt}
            />
            ))}
        </div>
        </nav>
    </header>
  )
}

export default Navbar