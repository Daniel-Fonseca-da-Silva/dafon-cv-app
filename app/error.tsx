'use client';

import { useTranslations } from "next-intl";

export default function Error() {
  const t = useTranslations('ErrorPage');
  return (
  <div>
      <h1>Error - {t('title')}</h1>
    </div>
  )
}
