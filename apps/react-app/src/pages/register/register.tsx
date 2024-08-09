import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../../shared/queries';
import { EmailIcon } from '../../components/Icons/email-icon';
import { PasswordIcon } from '../../components/Icons/password-icon';
import { CrossIcon } from '../../components/Icons/cross-icon';

type RegisterUserInput = {
  createUserInput: {
    email: string;
    password: string;
  };
};

type RegisterUserResponse = {
  createUser: {
    email: string;
  };
};

const Register: React.FC = () => {
  const [registerUser] = useMutation<RegisterUserResponse, RegisterUserInput>(
    REGISTER_USER
  );
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

    try {
      const { data } = await registerUser({
        variables: { createUserInput: { email, password } },
      });

      if (data && data.createUser) {
        window.location.href = '/login';
      } else {
        setError('Registration failed.');
      }
    } catch (err) {
      setError('A user with this email address already exists.');
    }
  };

  return (
    <div className="flex justify-center">
      <div className="card w-96 bg-base-100 shadow-xl mt-20 mb-20">
        <div className="card-body">
          <h2 className="card-title">Register</h2>
          {error && (
            <div role="alert" className="alert alert-error">
              <CrossIcon className="h-6 w-6 shrink-0 stroke-current" />
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
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
