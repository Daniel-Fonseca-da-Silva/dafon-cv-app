'use client';

import { useActionState } from 'react';
import { useTranslations } from 'next-intl';
import { submitContactForm } from '@/app/api/contact/contact';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FiMail, FiClock, FiSend } from 'react-icons/fi';
import { cn } from '@/lib/utils';

const initialState = {
  success: false,
  message: '',
  errors: {} as Record<string, string[]>,
};

export function ContactForm() {
  const t = useTranslations('Contact');
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);

  return (
    <section 
      id="contact" 
      className="relative w-full py-16 px-4 md:py-24 lg:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Left Column - Contact Info */}
        <div className="flex flex-col space-y-8 text-white">
          <header className="space-y-4">
            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
              {t('title')}
            </h2>
            <p className="text-xl text-white/80 max-w-lg">
              {t('subtitle')}
            </p>
          </header>

          <div className="grid gap-6 w-full max-w-md">
            {/* Email Card */}
            <div className="group flex items-center gap-4 p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-300 shadow-lg">
              <div className="flex-shrink-0 p-4 rounded-full bg-purple-500/20 text-purple-300 group-hover:scale-110 transition-transform">
                <FiMail className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-white/60">{t('email')}</span>
                <a href="mailto:dafondeveloper@gmail.com" className="text-lg font-semibold hover:text-purple-300 transition-colors">
                  dafondeveloper@gmail.com
                </a>
              </div>
            </div>

            {/* Response Time Card */}
            <div className="group flex items-center gap-4 p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-300 shadow-lg">
              <div className="flex-shrink-0 p-4 rounded-full bg-blue-500/20 text-blue-300 group-hover:scale-110 transition-transform">
                <FiClock className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-white/60">{t('responseTime')}</span>
                <span className="text-lg font-semibold">{t('responseTimeValue')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="w-full">
          <div className="p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6">{t('formTitle')}</h3>
            
            <form action={formAction} className="space-y-6">
              <div className="space-y-4">
                {/* Name Input */}
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-white/80 ml-1">
                    {t('name')} <span className="text-red-400">*</span>
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder={t('namePlaceholder')}
                    className="bg-black/20 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-purple-500/50 focus-visible:border-purple-500"
                    aria-describedby="name-error"
                  />
                  {state.errors?.name && (
                    <p id="name-error" className="text-sm text-red-400 pl-1">
                      {state.errors.name[0]}
                    </p>
                  )}
                </div>

                {/* Email Input */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-white/80 ml-1">
                    {t('emailLabel')} <span className="text-red-400">*</span>
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={t('emailPlaceholder')}
                    className="bg-black/20 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-purple-500/50 focus-visible:border-purple-500"
                    aria-describedby="email-error"
                  />
                  {state.errors?.email && (
                    <p id="email-error" className="text-sm text-red-400 pl-1">
                      {state.errors.email[0]}
                    </p>
                  )}
                </div>

                {/* Subject Select */}
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-white/80 ml-1">
                    {t('subject')}
                  </label>
                  <Select name="subject">
                    <SelectTrigger className="bg-black/20 border-white/10 text-white focus:ring-purple-500/50 focus:border-purple-500">
                      <SelectValue placeholder={t('subjectPlaceholder')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">{t('subjects.general')}</SelectItem>
                      <SelectItem value="support">{t('subjects.support')}</SelectItem>
                      <SelectItem value="billing">{t('subjects.billing')}</SelectItem>
                      <SelectItem value="feature">{t('subjects.feature')}</SelectItem>
                      <SelectItem value="bug">{t('subjects.bug')}</SelectItem>
                    </SelectContent>
                  </Select>
                  {state.errors?.subject && (
                    <p className="text-sm text-red-400 pl-1">
                      {state.errors.subject[0]}
                    </p>
                  )}
                </div>

                {/* Message Textarea */}
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-white/80 ml-1">
                    {t('message')}
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder={t('messagePlaceholder')}
                    className="min-h-[120px] bg-black/20 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-purple-500/50 focus-visible:border-purple-500 resize-y"
                  />
                  {state.errors?.message && (
                    <p className="text-sm text-red-400 pl-1">
                      {state.errors.message[0]}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                disabled={isPending}
                className={cn(
                  "w-full h-11 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-0 transition-all",
                  isPending && "opacity-70 cursor-not-allowed"
                )}
              >
                {isPending ? (
                  t('sending')
                ) : (
                  <>
                    {t('sendButton')} <FiSend className="ml-2" />
                  </>
                )}
              </Button>

              {/* Feedback Messages */}
              {state.message && (
                <div className={cn(
                  "p-4 rounded-lg text-sm font-medium text-center",
                  state.success ? "bg-green-500/20 text-green-200 border border-green-500/30" : "bg-red-500/20 text-red-200 border border-red-500/30"
                )}>
                  {state.message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
