import React from 'react';
const Sections: React.FC = () => {
  return (
      <div style={{
            display: 'flex',
                  flexDirection: 'column',
                        alignItems: 'center',
                              justifyContent: 'center',
                                    minHeight: '80vh',
                                          fontFamily: 'Cairo, sans-serif',
                                                background: '#f5f7fb',
                                                      padding: '20px',
                                                            textAlign: 'center'
                                                                }}>
                                                                      <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🏗️</div>
                                                                            <h2 style={{ color: '#003366', fontSize: '1.3rem', fontWeight: 800, marginBottom: '10px' }}>
                                                                                    صفحة القطاعات
                                                                                          </h2>
                                                                                                <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '20px', lineHeight: 1.6 }}>
                                                                                                        هذه الصفحة قيد التطوير حالياً
                                                                                                              </p>
                                                                                                                    <div style={{
                                                                                                                            background: '#e8f0fe',
                                                                                                                                    borderRadius: '12px',
                                                                                                                                            padding: '15px 20px',
                                                                                                                                                    border: '2px dashed #2563eb'
                                                                                                                                                          }}>
                                                                                                                                                                  <span style={{ color: '#2563eb', fontSize: '0.85rem', fontWeight: 700 }}>
                                                                                                                                                                            🚧 تحت التطوير - سيتم إطلاقها قريباً
                                                                                                                                                                                    </span>
                                                                                                                                                                                          </div>
                                                                                                                                                                                              </div>
                                                                                                                                                                                                );
                                                                                                                                                                                                };

                                                                                                                                                                                                export default Sections;