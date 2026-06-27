import React from 'react';
import Navigation from './Navigation';
import { APP_NAME, ENGINEER_NAME } from '../utils/constants';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
      <header className="header">
            <div className="header-inner">
                    <div className="header-logo">
                              <span className="header-icon">🏗️</span>
                                        <div className="header-text">
                                                    <h1>{APP_NAME}</h1>
                                                                <p>{ENGINEER_NAME}</p>
                                                                          </div>
                                                                                  </div>
                                                                                          <div className="header-badge">🖩 حاسبة إنشائية</div>
                                                                                                </div>
                                                                                                    </header>
                                                                                                        <Navigation />
                                                                                                            <main className="app-main">{children}</main>
                                                                                                              </>
                                                                                                              );

                                                                                                              export default Layout;