import UserAuthForm from '../user-auth-form/UserAuthForm';

export default function SignIn() {
  return (
    <div>
      <p>🍞</p>

      <h1>welcome back</h1>

      <p>
        By continuing, you are creating an account and agree to our User
        Agreement and Privacy Policy.
      </p>

      {/* sign in form */}
      <UserAuthForm />
    </div>
  );
}
