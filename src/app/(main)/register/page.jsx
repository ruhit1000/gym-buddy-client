"use client";

import React, { useState } from "react";
import Link from "next/link";
import { User, Mail, Lock, Eye, Camera } from "lucide-react";
import {
  Button,
  Form,
  Input,
  Label,
  TextField,
  FieldError,
  InputGroup,
} from "@heroui/react";
import Image from "next/image";
import { EyeSlash } from "@gravity-ui/icons";

const RegisterPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {};

    formData.forEach((value, key) => {
      // Don't append raw file object to string data dict
      if (key !== "profilePhoto") {
        data[key] = value.toString();
      }
    });

    console.log(`Registration attempt with: ${JSON.stringify(data, null, 2)}`);
  };

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center bg-background px-6 py-12 transition-colors duration-300">
      {/* Background Layer mimicking reference layout */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-y-0 right-0 w-1/12 bg-[url('/dotted-pattern.png')] bg-repeat-y opacity-20 dark:opacity-30" />
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/90 to-background/50 transition-colors duration-300" />
      </div>

      {/* Main Register Card Container */}
      <div className="relative z-10 w-full max-w-lg bg-card text-foreground border border-border p-10 md:p-14 rounded-3xl transition-all duration-300 shadow-2xl">
        {/* Header Area */}
        <div className="text-center mb-8">
          <h1 className="font-heading font-black text-4xl uppercase tracking-wider text-brand mb-3 transition-colors duration-300">
            GYM BUDDY
          </h1>
          <h2 className="font-heading font-bold text-3xl text-foreground mb-2 transition-colors duration-300">
            Create Account
          </h2>
          <p className="font-sans text-sm text-foreground/70 transition-colors duration-300">
            Join the elite performance network
          </p>
        </div>

        {/* Hero UI Form Implementation */}
        <Form className="flex flex-col gap-6" onSubmit={onSubmit}>
          {/* Profile Photo Upload Field */}
          <div className="flex flex-col items-center justify-center text-center group mb-2">
            <Label className="font-heading text-xs font-bold uppercase tracking-widest text-foreground/50 mb-3 block self-start">
              Profile Photo
            </Label>

            <label className="relative w-28 h-28 rounded-full border-2 border-dashed border-border group-hover:border-brand flex flex-col items-center justify-center cursor-pointer transition-colors duration-300 overflow-hidden bg-background/50">
              <input
                type="file"
                name="profilePhoto"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="Avatar Preview"
                  width={112}
                  height={112}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-foreground/40 group-hover:text-brand transition-colors duration-300">
                  <Camera className="size-6 mb-1" />
                </div>
              )}
            </label>
            <span className="text-[10px] text-foreground/40 mt-2 font-sans tracking-wide">
              Recommended: Square 500×500px
            </span>
          </div>

          {/* Full Name Input Field */}
          <TextField isRequired name="fullName" type="text" className="w-full">
            <div className="flex items-center space-x-2 mb-2 text-foreground/60 transition-colors duration-300">
              <User className="size-4 shrink-0 text-brand" />
              <Label className="font-sans text-sm font-medium tracking-wide">
                Full Name
              </Label>
            </div>
            <InputGroup>
              <Input
                placeholder="Enter your full name"
                className="font-sans w-full text-base transition-colors duration-300"
              />
            </InputGroup>
            <FieldError className="font-sans text-xs pt-1.5" />
          </TextField>

          {/* Email Field */}
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
                placeholder="name@example.com"
                className="font-sans w-full text-base transition-colors duration-300"
              />
            </InputGroup>
            <FieldError className="font-sans text-xs pt-1.5" />
          </TextField>

          {/* Password Field with Validation and Toggle */}
          <TextField
            isRequired
            minLength={8}
            name="password"
            className="w-full"
            validate={(value) => {
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
            <span className="text-[11px] text-foreground/50 font-sans tracking-wide mt-1.5 block">
              Password must be at least 8 characters long.
            </span>
            <FieldError className="font-sans text-xs pt-1.5" />
          </TextField>

          {/* Register Submit Button */}
          <Button
            type="submit"
            className="w-full bg-brand hover:opacity-90 text-background font-heading text-xs font-bold uppercase tracking-widest px-6 py-4 rounded-xl transition-all duration-200 cursor-pointer shadow-md mt-4"
          >
            Register Now
          </Button>
        </Form>

        {/* Existing Account Navigation Link */}
        <div className="mt-8 text-center">
          <p className="font-sans text-sm text-foreground/80 transition-colors duration-300">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-brand font-semibold hover:underline"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
