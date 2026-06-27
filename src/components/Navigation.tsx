import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Shovel, Building, Layers, Columns, Grid, Slice, Droplets, Calculator, DollarSign, FileText, Ruler } from 'lucide-react';

const items = [
  { path: '/', label: 'الرئيسية', icon: Home },
    { path: '/preliminary', label: 'التمهيدية', icon: Shovel },
      { path: '/foundations', label: 'الأساسات', icon: Building },
        { path: '/necks', label: 'الرقاب', icon: Layers },
          { path: '/columns', label: 'الأعمدة', icon: Columns },
            { path: '/middat', label: 'الميدات', icon: Grid },
              { path: '/slab', label: 'السقف', icon: Slice },
                { path: '/tank', label: 'الخزان', icon: Droplets },
                  { path: '/structural', label: 'النافذة', icon: Calculator },
                    { path: '/prices', label: 'الأسعار', icon: DollarSign },{ path: '/finishes', label: 'التشطيبات', icon: DollarSign },
                      { path: '/summary', label: 'الملخص', icon: FileText },{ path: '/sections', label: 'القطاعات', icon: Ruler },
                      ];

                      const Navigation: React.FC = () => (
                        <nav className="nav">
                            <div className="nav-inner">
                                  <ul className="nav-list">
                                          {items.map(i => (
                                                    <li key={i.path}>
                                                                <NavLink to={i.path} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                                                                              <i.icon size={16} />
                                                                                            <span>{i.label}</span>
                                                                                                        </NavLink>
                                                                                                                  </li>
                                                                                                                          ))}
                                                                                                                                </ul>
                                                                                                                                    </div>
                                                                                                                                      </nav>
                                                                                                                                      );

                                                                                                                                      export default Navigation;