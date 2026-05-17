'use client';

import { Mail, Linkedin, Github, MessageSquare, Send, CheckCircle2, AlertCircle, Loader2, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendEmail } from '@/app/actions/sendEmail';

export default function Contact() {
  const [isPending, setIsPending] = useState(false);
  const [status, setStatus] = useState<{ success?: boolean; error?: string } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (status?.success) {
      const timer = setTimeout(() => {
        setStatus(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: 'Email',
      value: 'ajajithm1781@gmail.com',
      href: 'mailto:ajajithm1781@gmail.com'
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: 'LinkedIn',
      value: 'linkedin.com/in/ajith-k-v',
      href: 'https://www.linkedin.com/in/ajith-k-v-7786442a8/'
    },
    {
      icon: <Github className="w-5 h-5" />,
      label: 'GitHub',
      value: 'github.com/AJAjith0503',
      href: 'https://github.com/AJAjith0503'
    }
  ];

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    setStatus(null);

    const result = await sendEmail(formData);

    if (result.success) {
      setStatus({ success: true });
      formRef.current?.reset();
    } else {
      setStatus({ error: result.error });
    }
    setIsPending(false);
  }

  return (
    <section id="contact" className="relative w-full z-20">
      <div className="max-w-[500px] flex flex-col gap-10">

        {/* Header */}
        <div className="text-left">
          <span className="text-neutral-500 font-medium tracking-widest uppercase text-xs mb-3 block">Get in touch</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-4 leading-tight">
            Let's build<br />something <span className="text-neutral-500 italic">together.</span>
          </h2>
          <p className="text-neutral-400 text-sm leading-relaxed max-w-sm">
            Currently looking for new opportunities and collaborations. Whether you have a question or just want to say hi, my inbox is always open.
          </p>
        </div>

        {/* Form */}
        <div className="w-full">
          <form
            ref={formRef}
            action={handleSubmit}
            className="flex flex-col gap-4 bg-neutral-900/40 p-6 md:p-8 rounded-[2rem] border border-neutral-800/50 backdrop-blur-sm relative"
          >
            <div className="grid grid-cols-1 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  disabled={isPending}
                  className="w-full bg-neutral-950/50 border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white hover:border-neutral-700 focus:border-white focus:outline-none transition-colors disabled:opacity-50"
                  placeholder="Your name"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  disabled={isPending}
                  className="w-full bg-neutral-950/50 border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white hover:border-neutral-700 focus:border-white focus:outline-none transition-colors disabled:opacity-50"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Message</label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                disabled={isPending}
                className="w-full bg-neutral-950/50 border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white hover:border-neutral-700 focus:border-white focus:outline-none transition-colors resize-none disabled:opacity-50"
                placeholder="How can I help you?"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className={`mt-2 w-full font-bold rounded-lg py-3.5 flex items-center justify-center gap-2 transition-all group text-sm ${status?.success
                ? 'bg-green-500/20 text-green-400 border border-green-500/50 hover:bg-green-500/30'
                : 'bg-white text-black hover:bg-neutral-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50'
                }`}
            >
              {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : status?.success ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              )}
              {isPending ? 'Sending...' : status?.success ? 'Message Sent!' : 'Send Message'}
            </button>

            {status?.error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-red-400 text-[10px] font-bold uppercase tracking-widest justify-center"
              >
                <AlertCircle className="w-3 h-3" />
                {status.error}
              </motion.div>
            )}

            {/* Quick Note */}
            <div className="flex items-center justify-center gap-2 mt-1 text-neutral-500 text-[9px] uppercase tracking-widest font-bold">
              <MessageSquare className="w-3 h-3" />
              Typically responds within 24 hours
            </div>
          </form>
        </div>

        {/* Pop Message (Toast) */}
        <AnimatePresence>
          {status?.success && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-4 bg-[#121212] border border-green-500/50 p-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl min-w-[320px]"
            >
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-400">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-sm tracking-tight">Email Sent!</span>
                <span className="text-neutral-500 text-xs tracking-wide">Thanks for reaching out, I'll be in touch soon.</span>
              </div>
              <button
                onClick={() => setStatus(null)}
                className="ml-auto p-2 text-neutral-600 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
