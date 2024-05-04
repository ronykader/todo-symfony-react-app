const Nav = () => {
  return (
    <>
      <nav className="py-6">
        <div className="container mx-auto flex items-center justify-between gap-x-6">
          {/* Logo */}
          <a href="/">
            <h1 className="text-lg">UpWork</h1>
            {/* <img className="h-[40px]" src={Logo} alt="Lws" /> */}
          </a>
          {/* Logo Ends */}
          <a className="px-5 py-2 bg-[#172227] rounded-[44px]" href="#">
            Contact Us
          </a>
        </div>
      </nav>
    </>
  );
};

export default Nav;
