import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { FaBeer } from "react-icons/fa";

export default function Home() {
  const t = useTranslations('HomePage');
  return (
  <div>
      <Button>Click me</Button>
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">{t('title')}</h1>;
      <p><FaBeer />?</p>
    </div>
  )
}
