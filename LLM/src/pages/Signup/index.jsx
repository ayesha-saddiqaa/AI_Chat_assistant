import { useState } from "react";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(db, "users", userCredential.user.uid), {
        email,
        createdAt: Date.now(),
      });

      alert("Signup successful!");
      navigate("/");
    } catch (error) {
      alert(error.message);
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-900 text-zinc-100">
      <form
        onSubmit={handleSignup}
        className="bg-zinc-800 p-6 rounded-xl shadow-md w-80"
      >
        <h2 className="text-xl mb-4 font-semibold">Create Account</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-3 rounded bg-zinc-700 border border-zinc-600"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-3 rounded bg-zinc-700 border border-zinc-600"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-zinc-600 hover:bg-zinc-700 py-2 rounded"
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>
        <p
          onClick={() => navigate("/login")}
          className="mt-3 text-sm text-center text-zinc-200 cursor-pointer"
        >
          Already have an account? Login
        </p>
      </form>
    </div>
  );
}