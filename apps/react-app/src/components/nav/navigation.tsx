import { useState } from 'react';
import { Link } from 'react-router-dom';

export const Navigation = () => {
  const [email] = useState(localStorage.getItem('email'));

  const handeLogout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('id');
  };

  return (
    <ul className="flex gap-4 p-4 bg-slate-200">
      {!email && (
        <li>
          <Link to="/login">Login</Link>
        </li>
      )}
      {email && (
        <li>
          <a href="/" onClick={handeLogout}>
            Logout
          </a>
        </li>
      )}
      <li>
        <Link to="/">Overview</Link>
      </li>
    </ul>
  );
};
