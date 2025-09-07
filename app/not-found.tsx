import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations('NotFoundPage');
  return (
  <div>
      <h1>404 - {t('title')}</h1>
    </div>
  )
}
