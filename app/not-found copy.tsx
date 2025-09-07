import { useTranslations } from "next-intl";

export default function Loading() {
  const t = useTranslations('LoadingPage');
  return (
  <div>
      <h1>{t('title')}</h1>
    </div>
  )
}
