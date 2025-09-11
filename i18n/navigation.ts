import {createNavigation} from 'next-intl/navigation';
import {routing} from './routing';
 
// Wrapper leves em torno das APIs de navegação do Next.js
// APIs que consideram a configuração de roteamento
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);
  