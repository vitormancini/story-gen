import { redirect, useFetcher } from "react-router";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { z } from "zod";
import { parseWithZod } from "@conform-to/zod";
import type { Route } from "../+types/root";

export function meta() {
  return [
    { title: "Login - Story Gen" },
    { name: "description", content: "Login to your account" },
  ];
}

const schema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
})

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  
  const submission = parseWithZod(formData, { schema });

  if (submission.status !== "success") {
    return submission.reply();  
  }

  await new Promise(resolve => setTimeout(resolve, 3000));

  return redirect("/");
} 

export default function Login({ actionData }: Route.ComponentProps) {
    const fetcher = useFetcher();
    const busy = fetcher.state !== "idle";

    const [form, fields] = useForm({
        lastResult: actionData,
        onValidate({ formData }) {
            return parseWithZod(formData, { schema })
        }
    });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Welcome back! Please enter your credentials.
          </p>
        </div>
        
        <fetcher.Form {...getFormProps(form)} className="mt-8 space-y-6" method="POST">
          <div className="space-y-4">
            {/* Email Field */}
            <div>
              <label htmlFor={fields.email.id} className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  {...getInputProps(fields.email, { type: "email" })}
                  className={`appearance-none relative block w-full px-3 py-2 border ${
                    fields.email.errors?.length ? 'border-red-300' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                  placeholder="Enter your email"
                />

                {fields.email.errors?.length && (
                  <p className="mt-1 text-sm text-red-600">{fields.email.errors[0]}</p>
                )}

              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor={fields.password.id} className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  {...getInputProps(fields.password, { type: "password" })}
                  className={`appearance-none relative block w-full px-3 py-2 pr-10 border ${
                    fields.password.errors?.length ? 'border-red-300' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                  placeholder="Enter your password"
                />

                {fields.password.errors?.length && (
                  <p className="mt-1 text-sm text-red-600">{fields.password.errors[0]}</p>
                )}

              </div>
            </div>
          </div>

          <button 
            disabled={busy} 
            type="submit" 
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Sign in
          </button>
        </fetcher.Form>
      </div>
    </div>
  );
}
