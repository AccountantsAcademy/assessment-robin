import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';

import { GET_USER_BY_EMAIL } from '../../shared/queries';
import { useNavigate } from 'react-router-dom';
import { EmailIcon } from '../../components/Icons/email-icon';
import { PasswordIcon } from '../../components/Icons/password-icon';

type User = {
  _id: string;
  email: string;
  password: string;
};

type UserQuery = {
  findUserByEmail: User;
};

/*
  Possible improvements:
  - Use state for user and pass
  - Loading state, debounce while typing, password validation
 */

// Login form (styling: https://flowbite.com/blocks/marketing/login/)
const Login = () => {
  const [getUserByEmail] = useLazyQuery<UserQuery>(GET_USER_BY_EMAIL);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError(null);

    const email = (
      (e.target as HTMLFormElement).querySelector(
        'input[type=email]'
      ) as HTMLInputElement
    ).value;
    const password = (
      (e.target as HTMLFormElement).querySelector(
        'input[type=password]'
      ) as HTMLInputElement
    ).value;

    const { data } = await getUserByEmail({ variables: { email } });

    if (data) {
      // TODO: this is NOT a save password validation :-)
      const isValidPassword = password === data.findUserByEmail.password;
      if (isValidPassword) {
        localStorage.setItem('email', data.findUserByEmail.email);
        localStorage.setItem('id', data.findUserByEmail._id);
        window.location.href = '/';
      } else {
        setError('Please provide a valid email address and password.');
      }
    } else {
      setError('Please provide a valid email address and password.');
    }
  }

  return (
    <div className="flex justify-center">
      <div className="card w-96 bg-base-100 shadow-xl mt-20 mb-20">
        <div className="card-body">
          <h2 className="card-title">Login</h2>
          {error && (
            <div role="alert" className="alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error}</span>
            </div>
          )}
          <form onSubmit={onSubmit}>
            <div className="items-center mt-2">
              <label className="input input-bordered flex items-center gap-2 mb-2">
                <EmailIcon className="w-4 h-4 opacity-70" />
                <input
                  type="email"
                  className="grow"
                  placeholder="Email"
                  required
                />
              </label>
              <label className="input input-bordered flex items-center gap-2 mb-2">
                <PasswordIcon className="w-4 h-4 opacity-70" />
                <input
                  type="password"
                  className="grow"
                  placeholder="Password"
                  required
                />
              </label>
            </div>
            <div className="card-actions justify-end">
              <button type="submit" className="btn btn-primary w-full">
                Login
              </button>

              <p className="text-center text-gray-600 mt-8 mb-2">
                No account yet?{' '}
                <span className="font-semibold">Register for free.</span>
              </p>
              <button
                type="button"
                className="btn btn-secondary w-full mt-2"
                onClick={() => navigate('/register')}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
