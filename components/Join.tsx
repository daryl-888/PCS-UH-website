"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import SectionLabel from "@/components/SectionLabel";
import TerminalCard from "@/components/TerminalCard";
import Reveal from "@/components/Reveal";
import { MEMBERSHIP_FORM_URL } from "@/data/nav";
import { cn } from "@/lib/utils";

const INTERESTS = [
  "CUDA",
  "GPU Architecture",
  "AI Infrastructure",
  "Distributed Systems",
  "Computer Architecture",
  "Research",
  "Projects",
  "Sponsorship",
] as const;

const BENEFITS = [
  "CUDA and C++ workshops",
  "GitHub organization access",
  "Project teams",
  "Resume pool access",
  "Sponsor events",
  "Computing facility tours",
  "Technical mentorship",
  "Community Discord",
];

export const joinSchema = z.object({
  fullName: z.string().min(2, "Enter your full name."),
  email: z
    .string()
    .email("Enter a valid email.")
    .refine((v) => v.toLowerCase().endsWith("uh.edu"), {
      message: "Use your UH email (ends in uh.edu).",
    }),
  major: z.string().min(2, "Enter your major."),
  gradYear: z
    .string()
    .regex(/^20\d{2}$/, "Enter a 4-digit graduation year (e.g. 2027)."),
  experience: z.enum(["Beginner", "Intermediate", "Advanced"], {
    errorMap: () => ({ message: "Select your experience level." }),
  }),
  interests: z.array(z.string()).min(1, "Pick at least one interest."),
});

type JoinForm = z.infer<typeof joinSchema>;

const inputClasses =
  "w-full rounded-md border border-line bg-obsidian/70 px-3.5 py-2.5 text-sm text-textPrimary placeholder:text-textMuted transition-colors focus:border-lineActive focus:outline-none focus:ring-1 focus:ring-gpu/40";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="mt-1.5 font-mono text-[10px] tracking-wide text-uhred">
      ERR: {message}
    </p>
  );
}

export default function Join() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<JoinForm>({
    resolver: zodResolver(joinSchema),
    defaultValues: { interests: [] },
  });

  const onSubmit = async (data: JoinForm) => {
    // POSTs to the placeholder API route — swap in Resend/EmailJS there.
    await fetch("/api/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).catch(() => null);
    setSubmitted(true);
  };

  return (
    <section
      id="join"
      className="relative border-t border-line py-28 md:py-36"
      aria-label="Join UH PCS"
    >
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
        <Reveal>
          <SectionLabel
            code="SEC.07 // ACCESS_CONTROL"
            title="Initialize Membership"
            subtitle="Join UH PCS to access workshops, project teams, GitHub repositories, sponsor events, and a community of students learning the future of computing."
          />
          <a
            href={MEMBERSHIP_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-mint transition-colors hover:text-holo"
          >
            Prefer a quick form? Fill out our interest form →
          </a>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-[1fr,1.4fr]">
          {/* benefits */}
          <Reveal>
            <TerminalCard
              label="pcs://join/member_privileges"
              className="h-full"
              contentClassName="p-6 sm:p-8"
              corners
            >
              <p className="mb-5 font-mono text-[10px] tracking-[0.24em] text-textMuted">
                MEMBER_PRIVILEGES
              </p>
              <ul className="space-y-3.5">
                {BENEFITS.map((benefit, i) => (
                  <li key={benefit} className="flex items-center gap-3 text-sm text-textSecondary">
                    <span className="font-mono text-[10px] text-gpu">
                      {String(i).padStart(2, "0")}
                    </span>
                    <span className="h-px w-4 bg-line" aria-hidden />
                    {benefit}
                  </li>
                ))}
              </ul>
              <p className="mt-8 border-t border-line pt-5 font-mono text-[11px] leading-relaxed text-textMuted">
                Join the node. Scale the system.
              </p>
            </TerminalCard>
          </Reveal>

          {/* form / success */}
          <Reveal delay={0.1}>
            <TerminalCard
              label="pcs://join/request_access"
              className="relative overflow-hidden"
              contentClassName="p-6 sm:p-8"
              corners
              beam
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex min-h-[420px] flex-col items-center justify-center text-center"
                    role="status"
                  >
                    <span className="grid h-14 w-14 place-items-center rounded-full border border-lineActive bg-gpu/15 shadow-glow">
                      <CheckCircle2 className="h-7 w-7 text-gpu" aria-hidden />
                    </span>
                    <p className="mt-6 font-mono text-sm tracking-[0.18em] text-mint">
                      ACCESS REQUEST RECEIVED
                    </p>
                    <p className="mt-1 font-mono text-xs tracking-[0.18em] text-textMuted">
                      // NODE_PENDING_APPROVAL
                    </p>
                    <p className="mt-5 max-w-sm text-sm leading-relaxed text-textSecondary">
                      An officer will review your request and reach out with
                      Discord + GitHub access. Watch your UH inbox.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    exit={{ opacity: 0, y: -12 }}
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    className="space-y-5"
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="fullName"
                          className="mb-1.5 block font-mono text-[10px] tracking-[0.2em] text-textMuted"
                        >
                          FULL_NAME *
                        </label>
                        <input
                          id="fullName"
                          type="text"
                          placeholder="Ada Lovelace"
                          autoComplete="name"
                          className={inputClasses}
                          {...register("fullName")}
                        />
                        <FieldError message={errors.fullName?.message} />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="mb-1.5 block font-mono text-[10px] tracking-[0.2em] text-textMuted"
                        >
                          UH_EMAIL *
                        </label>
                        <input
                          id="email"
                          type="email"
                          placeholder="you@uh.edu"
                          autoComplete="email"
                          className={inputClasses}
                          {...register("email")}
                        />
                        <FieldError message={errors.email?.message} />
                      </div>
                      <div>
                        <label
                          htmlFor="major"
                          className="mb-1.5 block font-mono text-[10px] tracking-[0.2em] text-textMuted"
                        >
                          MAJOR *
                        </label>
                        <input
                          id="major"
                          type="text"
                          placeholder="Computer Science"
                          className={inputClasses}
                          {...register("major")}
                        />
                        <FieldError message={errors.major?.message} />
                      </div>
                      <div>
                        <label
                          htmlFor="gradYear"
                          className="mb-1.5 block font-mono text-[10px] tracking-[0.2em] text-textMuted"
                        >
                          GRADUATION_YEAR *
                        </label>
                        <input
                          id="gradYear"
                          type="text"
                          inputMode="numeric"
                          placeholder="2027"
                          className={inputClasses}
                          {...register("gradYear")}
                        />
                        <FieldError message={errors.gradYear?.message} />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="experience"
                        className="mb-1.5 block font-mono text-[10px] tracking-[0.2em] text-textMuted"
                      >
                        EXPERIENCE_LEVEL *
                      </label>
                      <select
                        id="experience"
                        className={cn(inputClasses, "appearance-none")}
                        defaultValue=""
                        {...register("experience")}
                      >
                        <option value="" disabled>
                          Select level…
                        </option>
                        <option value="Beginner">Beginner — new to parallel computing</option>
                        <option value="Intermediate">Intermediate — some C++/CUDA exposure</option>
                        <option value="Advanced">Advanced — shipped GPU code</option>
                      </select>
                      <FieldError message={errors.experience?.message} />
                    </div>

                    <fieldset>
                      <legend className="mb-2 font-mono text-[10px] tracking-[0.2em] text-textMuted">
                        INTERESTS * — SELECT ALL THAT APPLY
                      </legend>
                      <div className="flex flex-wrap gap-2">
                        {INTERESTS.map((interest) => (
                          <label
                            key={interest}
                            className="group/chip relative cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              value={interest}
                              className="peer sr-only"
                              {...register("interests")}
                            />
                            <span className="inline-block rounded-sm border border-line bg-obsidian/60 px-3 py-1.5 font-mono text-[11px] text-textSecondary transition-all peer-checked:border-lineActive peer-checked:bg-gpu/15 peer-checked:text-mint peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-mint">
                              {interest}
                            </span>
                          </label>
                        ))}
                      </div>
                      <FieldError message={errors.interests?.message} />
                    </fieldset>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex w-full items-center justify-center gap-2 rounded-md border border-lineActive bg-gpu px-5 py-3.5 font-mono text-xs font-medium uppercase tracking-[0.2em] text-obsidian transition-all hover:bg-mint hover:shadow-glowStrong disabled:cursor-wait disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                          Transmitting…
                        </>
                      ) : (
                        "Request Access"
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </TerminalCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
