export default function SingInPage() {
  return (
    <div>
      <h1>Sign In</h1>
      <form method="post" action="/api/auth/signin">
        <label>
          Hospital Code
          <input name="hospitalCode" type="text" />
        </label>
        <label>
          Username
          <input name="username" type="text" />
        </label>
        <label>
          Password
          <input name="password" type="password" />
        </label>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}
