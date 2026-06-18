"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { Mail, Lock, Eye } from "lucide-react";
import {
  Button,
  Form,
  Input,
  Label,
  TextField,
  FieldError,
  InputGroup,
} from "@heroui/react";
import { EyeSlash } from "@gravity-ui/icons";
import { Icon } from "@iconify/react";

const LoginPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData.entries());
    console.log("Form submitted:", userData);

  }

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center bg-background px-6 transition-colors duration-300">
      {/* Visual background elements mimicking reference image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-y-0 right-0 w-1/12 bg-[url('/dotted-pattern.png')] bg-repeat-y opacity-20 dark:opacity-30" />
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/90 to-background/50 transition-colors duration-300" />
      </div>

      {/* Main Login Card Container */}
      <div className="relative z-10 w-full max-w-lg bg-card text-foreground border border-border p-10 md:p-14 rounded-3xl transition-all duration-300 shadow-2xl">
        {/* Header Area */}
        <div className="text-center mb-10">
          <h1 className="font-heading font-black text-4xl uppercase tracking-wider text-brand mb-3 transition-colors duration-300">
            GYM BUDDY
          </h1>
          <h2 className="font-heading font-bold text-3xl text-foreground mb-2 transition-colors duration-300">
            Welcome Back
          </h2>
          <p className="font-sans text-sm text-foreground/70 transition-colors duration-300">
            Unleash your strength. Log in to continue.
          </p>
        </div>

        {/* Hero UI Form Implementation */}
        <Form className="flex flex-col gap-6" onSubmit={onSubmit}>
          {/* Email Field with customized visual icon */}
          <TextField
            isRequired
            name="email"
            type="email"
            className="w-full"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <div className="flex items-center space-x-2 mb-2 text-foreground/60 transition-colors duration-300">
              <Mail className="size-4 shrink-0 text-brand" />
              <Label className="font-sans text-sm font-medium tracking-wide">
                Email Address
              </Label>
            </div>
            <InputGroup>
              <Input
                placeholder="name@email.com"
                className="font-sans text-base transition-colors duration-300 w-full"
              />
            </InputGroup>
            <FieldError className="font-sans text-xs pt-1.5" />
          </TextField>

          {/* Password Field combining Form validation & Toggle functionality */}
          <TextField
            isRequired
            minLength={8}
            name="password"
            className="w-full"
            validate={(value) => {
              // Simplified validation: only 8 characters long
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }
              return null;
            }}
          >
            <div className="flex items-center space-x-2 mb-2 text-foreground/60 transition-colors duration-300">
              <Lock className="size-4 shrink-0 text-brand" />
              <Label className="font-sans text-sm font-medium tracking-wide">
                Password
              </Label>
            </div>
            <InputGroup>
              <InputGroup.Input
                placeholder="••••••••"
                type={isVisible ? "text" : "password"}
                className="w-full font-sans text-base transition-colors duration-300 pr-12"
              />
              <InputGroup.Suffix className="absolute right-15 pr-1 text-foreground/60">
                <Button
                  isIconOnly
                  aria-label={isVisible ? "Hide password" : "Show password"}
                  size="sm"
                  variant="ghost"
                  className="hover:text-brand transition-colors duration-200"
                  onPress={() => setIsVisible(!isVisible)}
                >
                  {isVisible ? (
                    <Eye className="size-4" />
                  ) : (
                    <EyeSlash className="size-4" />
                  )}
                </Button>
              </InputGroup.Suffix>
            </InputGroup>
            <FieldError className="font-sans text-xs pt-1.5" />
          </TextField>

          {/* Main Submit Login Button */}
          <Button
            type="submit"
            className="w-full bg-brand hover:opacity-90 text-background font-heading text-xs font-bold uppercase tracking-widest px-6 py-4 rounded-xl transition-all duration-200 cursor-pointer shadow-md"
          >
            Login
          </Button>
        </Form>

        {/* Third-Party Authentication and Sign-up redirect */}
        <div className="mt-10 space-y-8 text-center">
          <div className="relative">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-border transition-colors duration-300" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-card px-3 text-xs font-heading font-bold uppercase tracking-widest text-foreground/50 transition-colors duration-300">
                Or
              </span>
            </div>
          </div>

          <Button className="w-full" variant="tertiary">
            <Icon icon="devicon:google" />
            Sign in with Google
          </Button>

          <p className="font-sans text-sm text-foreground/80 transition-colors duration-300">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-brand font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
