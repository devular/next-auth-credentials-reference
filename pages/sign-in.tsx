import type { NextPage } from 'next';
import { signIn } from 'next-auth/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const SignInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type SignInFormSchemaType = z.infer<typeof SignInFormSchema>;

const SignIn: NextPage = () => {
  // Destructure form helpers
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormSchemaType>({
    resolver: zodResolver(SignInFormSchema),
  });

  const onSubmit: SubmitHandler<SignInFormSchemaType> = async (data) => {
    await signIn('credentials', {
      callbackUrl: '/app/dashboard',
      email: data.email,
      password: data.password,
    });
  };

  return (
    <article>
      <section>
        <h2>Sign in to the app</h2>
        <p>
          Here we use <code>{'import {signIn} from next-auth/react'}</code> to
          sign in
        </p>
      </section>
      <form onSubmit={handleSubmit(onSubmit)} data-cy="sign-in-form">
        <fieldset>
          <label>Email Address</label>
          <input
            {...register('email')}
            placeholder="jamiedoe@email.com"
            name="email"
            type="email"
            autoComplete="email"
          />
          {errors.email && (
            <p style={{ color: 'red' }}>{errors.email.message}</p>
          )}
          <label>Password</label>
          <input
            {...register('password')}
            placeholder="Secret Password"
            name="password"
            type="password"
            autoComplete="new-password"
          />
          {errors.password && (
            <p style={{ color: 'red' }}>{errors.password.message}</p>
          )}
          <button type="submit">Sign In</button>
        </fieldset>
      </form>
      <p>
        Find this code in <code>./pages/sign-in.tsx</code>
      </p>
    </article>
  );
};

export default SignIn;
