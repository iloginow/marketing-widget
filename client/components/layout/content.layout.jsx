'use client';

import { CustomScroll } from 'react-custom-scroll';

export default function ContentLayout({ children }) {
  return (
    <CustomScroll>
      <div className="custom-scrollbar-wrapper">
        {children}
      </div>
    </CustomScroll>
  );
}
