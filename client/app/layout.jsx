import {
  CustomProvider, Container, Content, Sidebar,
} from 'rsuite';
import HeaderLayout from '../components/layout/header.layout';
import DesktopNav from '../components/nav/desktop.nav';

import 'rsuite/dist/rsuite.min.css';
import '../css/app.css';

export const metadata = {
  title: 'MERN Marketing Widget',
  description: 'MERN marketing widget example',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CustomProvider theme="dark">
          <Container>
            <Sidebar className="main-navbar" width={150}>
              <DesktopNav />
            </Sidebar>
            <Container>
              <HeaderLayout />
              <Content className="main-content">{children}</Content>
            </Container>
          </Container>
        </CustomProvider>
      </body>
    </html>
  );
}
