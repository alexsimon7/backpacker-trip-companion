import React from "react";

function NavBar() {
  return (
    <nav className="bg-gray-300">
      <form>
        <ul className="flex flew-row justify-end gap-2">
          <li>
            <label className="pr-1">Email:</label>
            <input name="email" type="email" className="border-solid border-2 border-black rounded-md p-1"/>
          </li>
          <li>
            <label className="pr-1">Password:</label>
            <input name="password" type="password" className="border-solid border-2 border-black rounded-md p-1"/>
          </li>
          <li>
            <input type="submit" className="border-solid border-2 border-black rounded-md bg-gray-500 p-1"/>
          </li>
        </ul>
      </form>
    </nav>
  );
}

export default NavBar;