"use client";

import { useState } from "react";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { launchNetworkOptions } from "@/lib/secunda24-data";
import { cn } from "@/lib/utils";

const initialForm = {
  name: "",
  mobile: "",
  email: "",
  role: launchNetworkOptions[0]
};

export function WaitlistForm() {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);

  function updateField(field: keyof typeof initialForm, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);

    window.setTimeout(() => {
      toast.success("Launch interest captured", {
        description:
          "This demo stores the form locally and shows how residents and partners can join the pilot network."
      });
      setForm(initialForm);
      setSubmitting(false);
    }, 700);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          value={form.name}
          onChange={(event) => updateField("name", event.target.value)}
          placeholder="Full name"
          required
        />
        <Input
          value={form.mobile}
          onChange={(event) => updateField("mobile", event.target.value)}
          placeholder="Mobile number"
          required
        />
        <Input
          value={form.email}
          onChange={(event) => updateField("email", event.target.value)}
          type="email"
          placeholder="Email address"
          required
          className="sm:col-span-2"
        />
      </div>

      <div className="space-y-3">
        <p className="text-sm font-semibold text-slate-700">Tell us who you are</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {launchNetworkOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => updateField("role", option)}
              className={cn(
                "rounded-3xl border px-4 py-4 text-left text-sm font-medium transition",
                form.role === option
                  ? "border-sky-300 bg-sky-50 text-sky-800 shadow-sm"
                  : "border-slate-200 bg-white/70 text-slate-600 hover:border-slate-300"
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-slate-50/90 p-4 text-sm leading-6 text-slate-600">
        Secunda24 Emergency is currently a front-end prototype for demos. This form shows the early
        access flow for residents and launch partners.
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full bg-slate-950 shadow-slate-900/20 hover:bg-slate-900"
      >
        {submitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Joining waitlist
          </>
        ) : (
          <>
            Join Waitlist
            <Send className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
}
