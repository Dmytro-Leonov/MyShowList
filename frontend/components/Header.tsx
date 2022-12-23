import Link from 'next/link';


export default function Header() {
  return (
    <header className='bg-dark-secondary sticky top-0 z-10'>
      <nav>
        <div className='justify-between mx-auto items-center flex md:max-w-7xl lg:max-w-content'>
          <div className='flex items-center justify-between py-5'>
            <Link href={'/'}>
              <h2 className='text-2xl font-bold'>MyShowList</h2>
            </Link>
          </div>
          <div>
            <div className='flex-1 justify-self-center'>
              <ul className='items-center justify-center flex space-x-6 space-y-0'>
                <li>
                  <Link href='/profile'>
                    Profile
                  </Link>
                </li>
                <li>
                  <Link href='/login'>
                    Login
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}