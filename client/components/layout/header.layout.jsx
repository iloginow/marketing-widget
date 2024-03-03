'use client';

import { usePathname } from 'next/navigation';
import { Header } from 'rsuite';
import MobileNav from '../nav/mobile.nav';

export default function HeaderLayout() {
  const pathnameTitleMap = new Map([
    ['/', 'DATA'],
    ['/info', 'INFO'],
  ]);

  const pathname = usePathname();
  const title = () => pathnameTitleMap.get(pathname);

  return (
    <Header className="main-header">
      <h2 className="page-title">{ title() }</h2>
      <MobileNav />
    </Header>
  );
}
