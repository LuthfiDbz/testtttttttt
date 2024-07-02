import Image from "next/image"
import Link from "next/link"
import PrimaryButton from "../UI/button/PrimaryButton"
import ToggleButton from "../UI/button/ToggleButton"

const Header = ({ locale }: any) => {
  return (
    <nav className='flex justify-between items-center w-full bg-glass-white-30 px-26 py-3 fixed backdrop-blur-custom z-50'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image
          src='/assets/img/logo.png'
          alt='logo'
          width={200}
          height={200}
          className='object-contain'
        />
      </Link>

      {/* Desktop Navigation */}
      <div className='sm:flex hidden'>
        <div className='flex gap-3 items-center md:gap-10 text-xl text-primary-black font-medium'>
          <Link href='/' className='black_btn'>
            Beranda
          </Link>
          <Link href='/services' className='black_btn'>
            Layanan Kami
          </Link>
          <Link href='/blog' className='black_btn'>
            Artikel
          </Link>
          <Link href='/' className='black_btn'>
            Perusahaan
          </Link>

          <ToggleButton locale={locale} />

          <Link href={`${process.env.REACT_APP_SUBWEB_URL}/login`} target="_blank" className='black_btn'>
            <PrimaryButton
              text="Login"
            />
          </Link>

          {/* <button type='button' onClick={signOut} className='outline_btn'>
            Sign Out
          </button> */}

          <Link href='/profile'>
            {/* <Image
              src={session?.user.image}
              width={37}
              height={37}
              className='rounded-full'
              alt='profile'
            /> */}
          </Link>
        </div>
      </div>

      {/* Mobile Navigation */}
      {/* <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex'>
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className='rounded-full'
              alt='profile'
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />

            {toggleDropdown && (
              <div className='dropdown'>
                <Link
                  href='/profile'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href='/create-prompt'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type='button'
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className='mt-5 w-full black_btn'
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='black_btn'
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div> */}
    </nav>
  )
}

export default Header