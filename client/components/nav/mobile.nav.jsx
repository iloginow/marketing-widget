import { useState } from 'react';
import { Drawer, IconButton } from 'rsuite';
import MenuIcon from '@rsuite/icons/Menu';
import DesktopNav from './desktop.nav';

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton
        icon={<MenuIcon />}
        onClick={() => setOpen(true)}
        className="drawer-nav"
      />
      <Drawer
        size={150}
        placement="left"
        open={open}
        onClose={() => setOpen(false)}
        backdrop
        className="main-navbar"
      >
        <DesktopNav />
      </Drawer>
    </>
  );
}
