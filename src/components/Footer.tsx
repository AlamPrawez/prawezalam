const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold text-gray-900">Prawez Alam</h3>
            <p className="mt-2 max-w-sm text-sm text-gray-600">
              Full Stack Engineer specializing in modern web technologies,
              scalable systems, and cloud solutions.
            </p>
          </div>

          {/* Navigation */}
          <nav>
            <ul className="flex flex-wrap gap-4 text-sm text-gray-600">
              <li><a href="#home" className="hover:text-gray-900">Home</a></li>
              <li><a href="#about" className="hover:text-gray-900">About</a></li>
              <li><a href="#skills" className="hover:text-gray-900">Skills</a></li>
              <li><a href="#experience" className="hover:text-gray-900">Experience</a></li>
              {/* <li><a href="#contact" className="hover:text-gray-900">Contact</a></li> */}
            </ul>
          </nav>

          {/* Social */}
          <div className="flex gap-4">
            <a
              href="https://github.com/AlamPrawez"
              target="_blank"
              className="text-gray-500 hover:text-gray-900"
            >
              GitHub
            </a>
            <a
              href="https://gitlab.com/prawezAlam"
              target="_blank"
              className="text-gray-500 hover:text-gray-900"
            >
              GitLab
            </a>
            <a
              href="https://www.linkedin.com/in/prawez-alam/"
              target="_blank"
              className="text-gray-500 hover:text-gray-900"
            >
              LinkedIn
            </a>
            <a
              href="prawezalam9@gmail.com"
              className="text-gray-500 hover:text-gray-900"
            >
              Email
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Prawez Alam. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;