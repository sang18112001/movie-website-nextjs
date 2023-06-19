'use client';
import { Provider, useDispatch } from 'react-redux';
import Footer from './components/Footer';
import Header from './components/Header/Header';
import './globals.css';
import { store } from './redux/store';
import { usePathname } from 'next/navigation';
import UserAccount from './pages/userAccount/page';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const authen = ['userAccount'];
  const pathname = usePathname();
  return (
    <Provider store={store} >
      <html lang="en">
        <body suppressHydrationWarning={true} >
          {!authen.includes(pathname) ? (
            <>
              <Header />
              {children}
              <Footer />
            </>
          ) : (
            <UserAccount />
          )}
        </body>
      </html>
    </Provider>
  );
}
