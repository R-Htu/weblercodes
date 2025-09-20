import { Link } from "react-router-dom";
import { useApi } from "../../../context/apiCommunication";
import { useAuth } from "../context/authContext";
import { FormEvent, useEffect, useState } from "react";
import PasswordFormControl from "../../../components/PasswordFormControl";

interface RegisterFormProps {
  onToggleClick: () => void;
  onRegister: () => void;
}

const RegisterForm = ({ onToggleClick, onRegister }: RegisterFormProps) => {
  const { sendJsonRequest } = useApi();
  const { authenticate, updateUser, deviceId } = useAuth();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [captchaId, setCaptchaId] = useState<string | null>(null);
  const [solution, setSolution] = useState("");

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await registerUser();
    setLoading(false);
  };

  const generateCaptcha = async () => {
    setCaptchaId(null);
    const result = await sendJsonRequest("/Auth/GenerateCaptcha", "POST");
    if (result) {
      setImageSrc(result.imageData);
      setCaptchaId(result.captchaId);
    }
  };

  const registerUser = async () => {
    setError("");
    const result = await sendJsonRequest("/Auth/Register", "POST", { email, name, password, captchaId, solution, deviceId });
    if (result && result.accessToken && result.user && result.expiresIn) {
      authenticate(result.accessToken, result.expiresIn);
      updateUser(result.user);
      onRegister();
    } else {
      setError(result.message);
      generateCaptcha();
    }
  };

  return (
    <div className="wb-home-register">
      <h1 className="wb-home-register__title">Sign Up</h1>
      {error && <div className="wb-home-register__alert">{error}</div>}

      <form className="wb-home-register__form" onSubmit={handleSubmit}>
        <label className="wb-home-register__label">Email</label>
        <input
          className="wb-home-register__input"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="wb-home-register__label">Name</label>
        <input
          className="wb-home-register__input"
          type="text"
          minLength={3}
          maxLength={20}
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="wb-home-register__label">Password</label>
        <PasswordFormControl password={password} setPassword={setPassword} />

        <label className="wb-home-register__label">Captcha</label>
        <input
          className="wb-home-register__input"
          type="text"
          required
          value={solution}
          onChange={(e) => setSolution(e.target.value)}
        />
        <div className="wb-home-register__captcha">
          {imageSrc && <img src={imageSrc} alt="captcha" />}
          <button
            type="button"
            className="wb-home-register__captcha-refresh"
            onClick={generateCaptcha}
            disabled={!captchaId}
          >
            ⟳
          </button>
        </div>

        <button className="wb-home-register__submit" type="submit" disabled={loading}>
          Sign Up
        </button>
      </form>

      <p className="wb-home-register__text">
        Already have an account?{" "}
        <button className="wb-home-register__link" onClick={onToggleClick}>
          Sign in
        </button>
      </p>
      <p className="wb-home-register__text">
        By signing up you agree to our <Link to="/Terms-of-use">Terms of Use</Link>
      </p>
    </div>
  );
};

export default RegisterForm;
