import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MobileLayout from './components/MobileLayout';
import Home from './pages/Home';
import Preliminary from './pages/Preliminary';
import Foundations from './pages/Foundations';
import Necks from './pages/Necks';
import Columns from './pages/Columns';
import Middat from './pages/Middat';
import Slab from './pages/Slab';
import Tank from './pages/Tank';
import Structural from './pages/Structural';
import Prices from './pages/Prices';
import Summary from './pages/Summary';
import Sections from './pages/Sections';
import Finishes from './pages/Finishes';
import QuickCalc from './pages/QuickCalc';
const App: React.FC = () => (
  <Router>
      <Routes>
            <Route path="/" element={<MobileLayout title="حاسبة الهيكل الخرساني" subtitle="المهندس محمد لطف السميعي" icon="🏗️"><Home /></MobileLayout>} />
                  <Route path="/preliminary" element={<MobileLayout title="الأعمال التمهيدية" subtitle="حفر وردم وتسوية" icon="⛏️"><Preliminary /></MobileLayout>} />
                        <Route path="/foundations" element={<MobileLayout title="الأساسات" subtitle="قواعد خرسانية" icon="🧱"><Foundations /></MobileLayout>} />
                              <Route path="/necks" element={<MobileLayout title="الرقاب" subtitle="أعمدة قصيرة" icon="📏"><Necks /></MobileLayout>} />
                                    <Route path="/columns" element={<MobileLayout title="الأعمدة" subtitle="حساب عدة نماذج للأعمدة" icon="🏛️"><Columns /></MobileLayout>} />
                                          <Route path="/middat" element={<MobileLayout title="الميدات" subtitle="كمرات أفقية" icon="〰️"><Middat /></MobileLayout>} />
                                                <Route path="/slab" element={<MobileLayout title="السقف الهوردي" subtitle="أعصاب وبلوك" icon="🟫"><Slab /></MobileLayout>} />
                                                      <Route path="/tank" element={<MobileLayout title="الخزان الأرضي" subtitle="السعة والخرسانة والتسليح" icon="💧"><Tank /></MobileLayout>} />
                                                            <Route path="/structural" element={<MobileLayout title="النافذة الإنشائية" subtitle="تحليل إنشائي تقريبي" icon="📐"><Structural /></MobileLayout>} />
                                                                  <Route path="/prices" element={<MobileLayout title="الأسعار" subtitle="المواد والأجور" icon="🏷️"><Prices /></MobileLayout>} />
                                                                        <Route path="/summary" element={<MobileLayout title="الملخص النهائي" subtitle="تقرير كامل" icon="📊"><Summary /></MobileLayout>} />
                                                                              <Route path="/sections" element={<MobileLayout title="القطاعات" subtitle="رسومات تفصيلية" icon="✏️"><Sections /></MobileLayout>} />
                                                                                    <Route path="/finishes" element={<MobileLayout title="التشطيبات" subtitle="حساب كميات التشطيبات" icon="🎨"><Finishes /></MobileLayout>} />
   <Route path="/quick" element={<MobileLayout title="الحساب السريع" subtitle="حساب تقريبي" icon="🚀"><QuickCalc /></MobileLayout>} />                                                                                     </Routes>
                                                                                          </Router>
                                                                                          );

                                                                                          export default App;