export default function Footer() {
  return (
    <footer className='bg-dark-secondary'>
      <div className='justify-between mx-auto items-center flex md:max-w-7xl lg:max-w-content'>
        <div className='flex items-center justify-between py-5'>
          MyShowList ©{ new Date().getFullYear() }
        </div>
      </div>
    </footer>
  );
}