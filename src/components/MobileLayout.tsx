import { useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
interface Props {
  children: React.ReactNode;
    title: string;
      subtitle: string;
        icon: string;
        }

        const tabs = [
          { label: 'الرئيسية', path: '/' },
            { label: 'التمهيدية', path: '/preliminary' },
              { label: 'الأساسات', path: '/foundations' },
                { label: 'الرقاب', path: '/necks' },
                  { label: 'الأعمدة', path: '/columns' },
                    { label: 'الميدات', path: '/middat' },
                      { label: 'السقف', path: '/slab' },
                        { label: 'الخزان', path: '/tank' },
                                                                                        { label: 'التشطيبات', path: '/finishes' },

                            { label: 'الأسعار', path: '/prices' },
                              { label: 'الملخص', path: '/summary' },
                                                        { label: 'النافذة', path: '/structural' },
                                                        
                                { label: 'القطاعات', path: '/sections' },
                                { label: 'الحساب السريع', path: '/quick' },
                                  ];

                                  const MobileLayout: React.FC<Props> = ({ children, title, subtitle, icon }) => {
                                    const navigate = useNavigate();
                                      const location = useLocation();
const [isDark, setIsDark] = useState(() => localStorage.getItem('darkMode') === 'true');

useEffect(() => {
  localStorage.setItem('darkMode', String(isDark));
  }, [isDark]);

                                        return (
                                            <div className={isDark ? 'dark-mode' : ''} style={{
                                                maxWidth: '450px', width: '100%', margin: '0 auto',
                                            
                                                        background: '#f0f4fa', display: 'flex', flexDirection: 'column',
                                                              height: '100vh', fontFamily: 'Cairo, sans-serif',
                                                                  }}>
                                                                        <style>{`
                                                                                @media print {
                                                                                          body { background: white !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
                                                                                                    .no-print { display: none !important; }
                                                                                                              .print-area { display: block !important; overflow: visible !important; max-height: none !important; height: auto !important; }
                                                                                                                        table { border-collapse: collapse !important; width: 100% !important; }
                                                                                                                                  th { background-color: #003366 !important; color: white !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
                                                                                                                                            .total-row td { background-color: #003366 !important; color: #FFD700 !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
                                                                                                                                                      .result-tile { border: 1px solid #28a745 !important; background: #fafffe !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
                                                                                                                                                                .result-tile strong { color: #28a745 !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
                                                                                                                                                                        }
                                                                                                                                                                              `}</style>

                                                                                                                                                                                    <div className="no-print" style={{
                                                                                                                                                                                            background: '#0b2b6b', padding: '15px 15px 25px 15px',
                                                                                                                                                                                                    borderBottomLeftRadius: '30px', borderBottomRightRadius: '30px',
                                                                                                                                                                                                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                                                                                                                                                                                                    flexShrink: 0,
                                                                                                                                                                                                                          }}>
                                                                                                                                                                                                                                  <span onClick={() => navigate('/')} style={{ color: 'white', fontSize: '1.3rem', cursor: 'pointer' }}>←</span>
                                                                                 <button onClick={() => setIsDark(!isDark)} style={{ 
                                                                                     background: 'rgba(255,255,255,0.15)', 
                                                                                       border: '2px solid rgba(255,255,255,0.3)', 
                                                                                         borderRadius: '50%', 
                                                                                           width: '36px', 
                                                                                             height: '36px', 
                                                                                               display: 'flex', 
                                                                                                 alignItems: 'center', 
                                                                                                   justifyContent: 'center', 
                                                                                                     color: 'white', 
                                                                                                       fontSize: '1.1rem', 
                                                                                                         cursor: 'pointer', 
                                                                                                           padding: 0,
                                                                                                             position: 'absolute',
                                                                                                               right: '15px',
                                                                                                                 top: '15px'
                                                                                                                 }}>
                                                                                                                   {isDark ? '☀️' : '🌙'}
                                                                                                                   </button>
                                                                                                                                                                                                                                      <div style={{ textAlign: 'center', flexGrow: 1 }}>
                                                                                                                                                                                                                                                    <h2 style={{ color: 'white', fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>{title}</h2>
                                                                                                                                                                                                                                                              <p style={{ color: 'white', fontSize: '0.75rem', opacity: 0.85, margin: '2px 0 0 0' }}>{subtitle}</p>
                                                                                                                                                                                                                                                                      </div>
<button onClick={() => setIsDark(!isDark)} style={{ background: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.3)', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.1rem', cursor: 'pointer', padding: 0, position: 'absolute', right: '15px', top: '15px' }}>
    {isDark ? '☀️' : '🌙'}
    </button>
                                                                                                                                                                                                                                                                           <span style={{ color: 'white', fontSize: '1.3rem' }}>{icon}</span>
                                                                                                                                                                                                                                                                                    </div>

                                                                                                                                                                                                                                                                                          <div className="no-print" style={{
                                                                                                                                                                                                                                                                                                  display: 'flex', gap: '8px', padding: '0 10px',
                                                                                                                                                                                                                                                                                                          marginTop: '-18px', marginBottom: '15px',
                                                                                                                                                                                                                                                                                                                  overflowX: 'auto', whiteSpace: 'nowrap', flexShrink: 0,
                                                                                                                                                                                                                                                                                                                        }}>
                                                                                                                                                                                                                                                                                                                                {tabs.map((item, idx) => {
                                                                                                                                                                                                                                                                                                                                          const isActive = location.pathname === item.path;
                                                                                                                                                                                                                                                                                                                                                    return (
                                                                                                                                                                                                                                                                                                                                                                <div
                                                                                                                                                                                                                                                                                                                                                                              key={idx}
                                                                                                                                                                                                                                                                                                                                                                                            onClick={() => navigate(item.path)}
                                                                                                                                                                                                                                                                                                                                                                                                          style={{
                                                                                                                                                                                                                                                                                                                                                                                                                          background: 'white', borderRadius: '20px', padding: '6px 12px',
                                                                                                                                                                                                                                                                                                                                                                                                                                          boxShadow: '0 2px 8px rgba(0,0,0,0.06)', fontSize: '0.7rem',
                                                                                                                                                                                                                                                                                                                                                                                                                                                          fontWeight: 700, color: isActive ? '#0b2b6b' : '#64748b',
                                                                                                                                                                                                                                                                                                                                                                                                                                                                          cursor: 'pointer', whiteSpace: 'nowrap',
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          border: isActive ? '2px solid #0b2b6b' : '2px solid transparent',
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        }}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    >
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  {item.label}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        );
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                })}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      </div>

<div className="print-area" style={{ padding: '0 15px', overflowY: 'auto', flex: 1, WebkitOverflowScrolling: 'touch' }}>      {children}
      </div>
  
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      );
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      };

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      export default MobileLayout;