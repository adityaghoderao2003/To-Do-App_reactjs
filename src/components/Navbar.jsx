import React from 'react'

const Navbar = ({ setShowHome }) => {
  return (
    <nav className="bg-blue-800 text-white py-2">
      <div className="max-w-6xl mx-auto flex justify-around items-center">

        <div className="logo">
          <span className="font-bold text-xl">iTask</span>
        </div>

        <ul className="flex gap-8">
          <li
            onClick={() => setShowHome(true)}
            className="cursor-pointer hover:font-extrabold transition-all font-bold"
          >
            Home
          </li>

          <li
            onClick={() => setShowHome(false)}
            className="cursor-pointer hover:font-extrabold transition-all font-bold"
          >
            Your Tasks
          </li>
        </ul>

      </div>
    </nav>
  )
}

export default Navbar