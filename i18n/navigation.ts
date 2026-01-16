import {createNavigation} from 'next-intl/navigation';
import {routing} from './routing';
 
// Wrapper around the Next.js navigation APIs
// APIs that consider the routing configuration
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);
  