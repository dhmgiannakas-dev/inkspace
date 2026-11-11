"use server";

import { hash } from "bcryptjs";
import { Prisma } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import { registerSchema } from "@/lib/validations/auth";

export type RegisterState = {
  success: boolean;
  message: string;
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
};

/** Validates registration and creates a user in the database. */
export async function registerAction(
  previousState: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  const result = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!result.success) {
    return {
      success: false,
      message: "Please correct the errors below.",
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = result.data;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return {
        success: false,
        message: "An account with this email already exists.",
        errors: {
          email: ["This email is already registered."],
        },
      };
    }

    const passwordHash = await hash(password, 12);

    await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
      },
    });

    return {
      success: true,
      message: "Your account has been created successfully!",
    };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        success: false,
        message: "An account with this email already exists.",
        errors: {
          email: ["This email is already registered."],
        },
      };
    }

    console.error("Registration error:", error);

    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}