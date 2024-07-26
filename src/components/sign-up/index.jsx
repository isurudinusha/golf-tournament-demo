import "./styles.css";

function SignUp() {
  return (
    <div class="form">
      <div class="title">Welcome</div>
      <div class="subtitle">Create your account!</div>

      <div class="input-container ic1">
        <input id="username" class="input" type="text" placeholder=" " />
        <div class="cut"></div>
        <label for="username" class="iLabel">
          Username
        </label>
      </div>

      <div class="input-container ic2">
        <input id="email" class="input" type="text" placeholder=" " />
        <div class="cut cut-short"></div>
        <label for="email" class="iLabel">
          Email
        </label>
      </div>

      <div class="input-container ic2">
        <input id="password" class="input" type="password" placeholder=" " />
        <div class="cut"></div>
        <label for="password" class="iLabel">
          Password
        </label>
      </div>

      <div class="input-container ic2">
        <input
          id="confirm-password"
          class="input"
          type="password"
          placeholder=" "
        />
        <div class="cut cut-long"></div>
        <label for="confirm-password" class="iLabel">
          Confirm Password
        </label>
      </div>

      <button type="text" class="submit">
        Sign Up
      </button>
    </div>
  );
}

export default SignUp;
