import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { login } from "@/api/auth";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

const AuthLogin = ({
  openSignup,
  closeLogin,
}: {
  openSignup: () => void;
  closeLogin: () => void;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await login({
      email,
      password,
    });
    if (res?.token) {
      closeLogin();
      router.push("/");
    }
  };

  return (
    <div className="bg-card rounded-xl w-[90%] max-w-md mx-auto flex flex-col gap-10">
      <h2 className="text-2xl font-semibold text-foreground text-center">
        Login to Your Account
      </h2>
      <div className="flex flex-col gap-4">
        <Button
          className="flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-100  bg-white text-black"
          onClick={() => {
            window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
          }}
        >
          <FcGoogle size={20} />
          Continue with Google
        </Button>
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <hr className="flex-1" />
          <span>or</span>
          <hr className="flex-1" />
        </div>
      </div>

      <form className="space-y-5 text-foreground" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="mt-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="mt-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button
          type="submit"
          className="w-full mt-2 bg-green-900 hover:bg-green-800"
        >
          Login
        </Button>
      </form>

      <p className="text-sm text-muted-foreground text-center">
        Not registered?{" "}
        <button onClick={openSignup} className="text-primary hover:underline ">
          Sign up here
        </button>
      </p>
    </div>
  );
};

export default AuthLogin;
