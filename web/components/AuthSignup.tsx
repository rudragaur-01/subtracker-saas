import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { signup } from "@/api/auth";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

const AuthSignup = ({
  openLogin,
  closeSignup,
}: {
  openLogin: () => void;
  closeSignup: () => void;
}) => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signup({
      username,
      email,
      password,
      business_name: businessName,
      contact_number: contactNumber,
    });
    if (res?.token) {
      closeSignup();
      router.push("/");
    }
  };

  return (
    <div className="bg-card rounded-xl w-[90%] max-w-md mx-auto flex flex-col gap-10">
      <h2 className="text-2xl font-semibold text-foreground text-center">
        Create an Account
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
          <Label htmlFor="name">Username</Label>
          <Input
            id="name"
            type="text"
            placeholder="Enter your name"
            className="mt-1 bg-white"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="businessname">Business Name</Label>
          <Input
            id="businessname"
            type="text"
            placeholder="Enter your Business Name"
            className="mt-1"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="phone">Contact Number</Label>
          <Input
            id="phone"
            type="text"
            placeholder="Enter your Contact Number"
            className="mt-1"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
          />
        </div>

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
            placeholder="Enter password"
            className="mt-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button
          type="submit"
          className="w-full mt-2 bg-green-900 hover:bg-green-800"
        >
          Sign Up
        </Button>
      </form>

      <p className="text-sm text-muted-foreground text-center">
        Already have an account?{" "}
        <button onClick={openLogin} className="text-primary hover:underline">
          Login
        </button>
      </p>
    </div>
  );
};

export default AuthSignup;
