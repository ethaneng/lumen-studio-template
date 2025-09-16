"use client";

import { useState } from "react";
import { useForm, Controller, Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button, Input, Textarea, Label } from "@/app/shared/components";

const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .refine((email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }, "Invalid email address"),
  phone: z.string().optional(),
  message: z.string().min(5, "Message must be at least 5 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface FormFieldProps {
  name: keyof ContactFormData;
  label: string;
  type?: "text" | "email" | "tel";
  component?: "input" | "textarea";
  rows?: number;
  control: Control<ContactFormData>;
  error?: string;
  labelBackground?: string;
}

const FormField = ({
  name,
  label,
  type = "text",
  component = "input",
  rows,
  control,
  error,
  labelBackground = "bg-background",
}: FormFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  return (
    <div className="space-y-2">
      <div className="relative">
        <Controller
          name={name}
          control={control}
          render={({ field }) => {
            const isActive = isFocused || hasValue || field.value;

            return (
              <>
                {component === "textarea" ? (
                  <Textarea
                    {...field}
                    id={name}
                    rows={rows}
                    className="border-secondary rounded focus:border-primary focus:ring-0 focus:ring-transparent border-2 focus:border resize-none p-4  h-auto min-h-[120px]"
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onChange={(e) => {
                      field.onChange(e);
                      setHasValue(e.target.value.length > 0);
                    }}
                  />
                ) : (
                  <Input
                    {...field}
                    id={name}
                    type={type}
                    className="border-secondary rounded focus:border-primary focus:ring-0 focus:ring-transparent border-2 focus:border px-4 py-4 h-14"
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onChange={(e) => {
                      field.onChange(e);
                      setHasValue(e.target.value.length > 0);
                    }}
                  />
                )}

                <Label
                  htmlFor={name}
                  className={`absolute left-4 transition-all duration-300 ease-out pointer-events-none select-none ${
                    isActive
                      ? `top-0 text-xs text-primary ${labelBackground} px-1 -translate-y-1/2 font-medium`
                      : component === "textarea"
                        ? "top-4 text-base text-secondary"
                        : "top-1/2 -translate-y-1/2 text-base text-secondary"
                  }`}
                >
                  {label}
                </Label>
              </>
            );
          }}
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default function ContactForm() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Convert form values into email service payload
      const emailPayload = {
        to: "studio@lumenphotography.com",
        from: data.email,
        subject: `New Contact Form Submission from ${data.firstName} ${data.lastName}`,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        message: data.message,
        timestamp: new Date().toISOString()
      };

      console.log("Calling email service with payload:", emailPayload);

      // Simulate email service call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Reset form after successful submission
      reset();

      alert("Thank you! Your message has been sent successfully.");
    } catch (error) {
      console.error("Form submission error:", error);
      alert("There was an error sending your message. Please try again.");
    }
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal information fields */}
          <FormField
            name="firstName"
            label="First Name"
            control={control}
            error={errors.firstName?.message}
            labelBackground="bg-muted"
          />
          <FormField
            name="lastName"
            label="Last Name"
            control={control}
            error={errors.lastName?.message}
            labelBackground="bg-muted"
          />

          {/* Contact information fields */}
          <FormField
            name="email"
            label="Email"
            type="email"
            control={control}
            error={errors.email?.message}
            labelBackground="bg-muted"
          />
          <FormField
            name="phone"
            label="Phone"
            type="tel"
            control={control}
            error={errors.phone?.message}
            labelBackground="bg-muted"
          />

          {/* Message field spans full width */}
          <div className="md:col-span-2">
            <FormField
              name="message"
              label="Message"
              component="textarea"
              rows={4}
              control={control}
              error={errors.message?.message}
              labelBackground="bg-muted"
            />
          </div>

          {/* Form submission */}
          <div className="md:col-span-2 flex justify-end pt-4">
            <Button
              type="submit"
              size="xl"
              variant="secondary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
