import React from 'react';
import { Button, Navbar as BootstrapNavbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/index.js';

const Navbar = () => {
  const { logOut, loggedIn } = useAuth();
  const { t } = useTranslation();

  return (
    <BootstrapNavbar bg="white" expand="lg" className="shadow-sm">
      <div className="container">
        <BootstrapNavbar.Brand as={Link} to="/">
          {t('hexletChat')}
        </BootstrapNavbar.Brand>
        {!!loggedIn && <Button onClick={logOut}>{t('logOut')}</Button>}
      </div>
    </BootstrapNavbar>
  );
};

export default Navbar;
