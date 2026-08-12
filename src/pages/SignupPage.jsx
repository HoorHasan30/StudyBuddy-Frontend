import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { signUp } from "../services/authService";
import styles from '../styles/SignupPage.module.css'
import { use } from "react";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConf: "",
  });
  const [submitting, setSubmitting] = useState(false)

  const { username, password, passwordConf } = formData;

  function handleChange(event) {
    setError("");
    setFormData({ ...formData, [event.target.name]: event.target.value });

  }


  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setSubmitting(true)
      await signUp(formData);
      navigate('/sign-in')
    } catch (err) {
      setError(err.response.data.message);
      setSubmitting(false)
    }
  }

  function isFormInvalid() {
    return !(username && password && password === passwordConf);
  };

  useEffect(
    () => {
      document.title = "Sign Up | StudyBuddy";
    },
    []
  )

  return (

    <div className={styles.signUpContainer}>

      <div className={styles.authContent}>
        <h1 id="signUp-Title">Sign Up</h1>
        <p className="error">{error}</p>
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit}>
            <div className={styles.formElement}>
              <label htmlFor="username">Username:</label>
              <input
                className={styles.formInput}
                type="text"
                id="username"
                value={username}
                name="username"
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formElement}>
              <label htmlFor="password">Password:</label>
              <input
                className={styles.formInput}
                type="password"
                id="password"
                value={password}
                name="password"
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formElement}>
              <label htmlFor="confirm">Confirm Password:</label>
              <input
                className={styles.formInput}
                type="password"
                id="confirm"
                value={passwordConf}
                name="passwordConf"
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.btnContainer}>
              <button className={styles.btn} disabled={isFormInvalid() || submitting}>{submitting ? 'Signing up...' : 'Sign Up'}</button>
              <button className={styles.btn} onClick={() => navigate("/")}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
      
      <div className={styles.noContent}>
        <img id="auth-pic" src="../src/assets/circle-logo.png" alt="logo" />
      </div>

    </div>
  );
}
export default Signup;
