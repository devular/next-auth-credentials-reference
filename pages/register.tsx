import type { NextPage } from 'next';
import { signIn } from 'next-auth/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const RegisterFormSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type RegisterFormSchemaType = z.infer<typeof RegisterFormSchema>;

const Register: NextPage = () => {
  // Destructure form helpers
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormSchemaType>({
    resolver: zodResolver(RegisterFormSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormSchemaType> = async (data) => {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      }),
    });
    const responseData = await response.json();
    if (response.status == 200) {
      if (responseData.success) {
        await signIn('credentials', {
          redirect: true,
          email: data.email,
          password: data.password,
        });
      } else alert(responseData.message);
    } else alert(responseData.message);
  };

  return (
    <article>
      <section>
        <h2>Register for the App</h2>
        <p>
          Here we use a custom registration API with Prisma and Next API routes
          in <code>./pages/api/register</code>
        </p>
        <p>NextAuth.js does not provide this mechanism for us.</p>
      </section>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          <label>Confirm Password</label>
          <input
            {...register('confirmPassword')}
            placeholder="Confirm Password"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
          />
          {errors.confirmPassword && (
            <p style={{ color: 'red' }}>{errors.confirmPassword.message}</p>
          )}
          <button type="submit">Register</button>
        </fieldset>
      </form>
      <p>
        Find this code in <code>./pages/register.tsx</code>
      </p>
    </article>
  );
};

export default Register;
