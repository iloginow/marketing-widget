'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Sidenav, Nav } from 'rsuite';
import DashboardIcon from '@rsuite/icons/Dashboard';
import InfoOutlineIcon from '@rsuite/icons/InfoOutline';

export default function DesktopNav() {
  const pathname = usePathname();

  return (
    <Sidenav expanded appearance="default">
      <Sidenav.Header className="sidebar-header">
        <span>MARKETING</span>
      </Sidenav.Header>
      <Sidenav.Body>
        <Nav>
          <Nav.Item
            as={Link}
            href="/"
            active={pathname === '/'}
            icon={<DashboardIcon />}
          >
            Data
          </Nav.Item>
          <Nav.Item
            as={Link}
            href="/info"
            active={pathname === '/info'}
            icon={<InfoOutlineIcon />}
          >
            Info
          </Nav.Item>
        </Nav>
      </Sidenav.Body>
    </Sidenav>
  );
}
