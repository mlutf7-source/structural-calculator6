import React, { useState } from 'react';
import { n, fmtNum, goNext } from '../utils/constants';

const G = (k: string) => { try { const s = localStorage.getItem(k); return s ? JSON.parse(s) : null; } catch (e) { return null; } };

const STORAGE_KEY = 'quickcalc_inputs';

const S = {
  card: { border: '1px solid #ddd', borderRadius: '12px', overflow: 'hidden', background: 'white', marginBottom: '8px' } as React.CSSProperties,
  head: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: '#f8fafc' } as React.CSSProperties,
  body: { padding: '10px 12px' } as React.CSSProperties,
  th: { padding: '8px 5px', border: '1px solid #003366', background: '#0f4c81', color: 'white', fontSize: '0.75rem', fontWeight: 700 } as React.CSSProperties,
  td: { padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' as const, fontSize: '0.7rem' } as React.CSSProperties,
  tdLabel: { padding: '6px 5px', border: '1px solid #ccc', fontWeight: 700, fontSize: '0.7rem' } as React.CSSProperties,
  total: { background: '#e8f5e9', color: '#1b5e20', fontWeight: 700 } as React.CSSProperties,
  btnPrimary: { flex: 1, padding: '10px', border: 'none', borderRadius: '10px', background: '#00509e', color: 'white', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', fontFamily: 'Cairo, sans-serif' } as React.CSSProperties,
  btnDanger: { flex: 1, padding: '10px', border: 'none', borderRadius: '10px', background: '#dc3545', color: 'white', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', fontFamily: 'Cairo, sans-serif' } as React.CSSProperties,
  btnPrint: { flex: 1, padding: '12px', border: 'none', borderRadius: '10px', background: '#00509e', color: 'white', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'Cairo, sans-serif' } as React.CSSProperties,
};

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <div style={{ position: 'relative', padding: '8px 12px', marginBottom: '12px', marginTop: '8px', background: 'linear-gradient(to left, transparent, #e8f0fe 30%)', borderRight: '4px solid #2563eb', borderRadius: '0 8px 8px 0', boxShadow: '0 0 8px rgba(37,99,235,0.1)' }}>
    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#003366' }}>{children}</span>
  </div>
);

const Num = ({ id, go, label, value, set, unit }: any) => (
  <div style={{ background: '#fdfdfd', border: '1px solid #ddd', borderRadius: '8px', padding: '8px 5px', textAlign: 'center' }}>
    <label style={{ fontSize: '0.6rem', color: '#003366', display: 'block', marginBottom: '2px', fontWeight: 700 }}>{label}</label>
    <input
      id={id} type="text" inputMode="decimal" autoComplete="off"
      enterKeyHint={go ? 'next' : 'done'}
      style={{ width: '100%', border: 'none', textAlign: 'center', fontSize: '0.85rem', padding: '2px 0', outline: 'none', background: 'transparent', fontWeight: 700, fontFamily: 'Cairo, sans-serif' }}
      value={value} onChange={e => set(e.target.value)}
      onFocus={e => e.target.select()}
      onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); goNext(go); } }}
    />
    {unit && <span style={{ fontSize: '0.55rem', color: '#888', display: 'block', marginTop: '2px' }}>{unit}</span>}
  </div>
);

const SummaryTable = ({ title, headers, rows }: { title: string; headers: string[]; rows: any[][] }) => (
  <div style={S.card}>
    <div style={S.head}><span style={{ fontWeight: 700, color: '#003366', fontSize: '0.9rem' }}>{title}</span></div>
    <div style={S.body}>
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.7rem' }}>
          <thead><tr>{headers.map((h, i) => <th key={i} style={S.th}>{h}</th>)}</tr></thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell: any, j: number) => {
                  if (cell === '__TOTAL__') return <td key={j} style={{ ...S.td, ...S.total }} colSpan={cell.colSpan || 1}>{cell.label}</td>;
                  return <td key={j} style={j === 0 ? S.tdLabel : S.td}>{cell}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const QuickCalc: React.FC = () => {
  const saved = G(STORAGE_KEY) || {};
  const [length, setLength] = useState(saved.length || '15');
  const [width, setWidth] = useState(saved.width || '12');
  const [floorHeight, setFloorHeight] = useState(saved.floorHeight || '3');
  const [apartments, setApartments] = useState(saved.apartments || '2');
  const [designFloors, setDesignFloors] = useState(saved.designFloors || '4');
  const [buildFloors, setBuildFloors] = useState(saved.buildFloors || '2');

  const L = n(length), W = n(width), FH = n(floorHeight);
  const APT = n(apartments), DF = n(designFloors), BF = n(buildFloors);
  const area = L * W, perimeter = 2 * (L + W);

  // الأسعار
  const prices = G('prices') || {};
  const cur = prices.currency === 'YER' ? 'ر.ي' : prices.currency === 'SAR' ? 'ر.س' : '$';
  const gp = (arr: any[], i: number) => n(arr?.[i]?.price || '0');
  const fm = prices.finishesMaterials || [], fl = prices.finishesLabor || [], fe = prices.finishesExtra || [], lab = prices.labor || [];

  // القواعد
  const totalLoad = area * 1.5 * DF;
  const footingArea = totalLoad / 20;
  const footingCount = Math.ceil(area / 12);
  const footingConcrete = footingArea * 0.5;
  const levelingConcrete = footingArea * 0.1;
  const footingSteel = footingConcrete * 0.090;

  // الأعمدة - أبعاد حسب DF، كميات حسب BF
  const colW = DF <= 2 ? 0.25 : DF <= 4 ? 0.30 : 0.35;
  const colL = DF <= 2 ? 0.60 : DF <= 4 ? 0.70 : 0.80;
  const columnCount = Math.ceil(area / 9);
  const columnConcrete = columnCount * colW * colL * FH * BF;
  const columnSteel = columnConcrete * 0.150;

  // الرقاب - مرة واحدة
  const neckConcrete = columnCount * colW * colL * 1.5;
  const neckSteel = neckConcrete * 0.150;

  // الميدات - مرة واحدة
  const middLength = perimeter * 2;
  const middConcrete = middLength * 0.25 * 0.40;
  const middSteel = middConcrete * 0.150;

  // السقف
  const slabSteel = (area / 30) * BF;
  const slabConcrete = area * 0.22 * BF;

  // الإجماليات هيكل
  const totalConcrete = footingConcrete + levelingConcrete + columnConcrete + neckConcrete + middConcrete + slabConcrete;
  const totalSteel = footingSteel + columnSteel + neckSteel + middSteel + slabSteel;

  // التشطيبات
  const bathsPerApt = 2, kitchensPerApt = 1, windowsPerApt = 8, doorsPerApt = 8;
  const bathLength = 2, bathWidth = 2, kitchenLength = 3, kitchenWidth = 3;
  const totalBaths = APT * bathsPerApt * BF;
  const totalKitchens = APT * kitchensPerApt * BF;
  const totalWindows = APT * windowsPerApt * BF;
  const totalDoors = APT * doorsPerApt * BF;
  const winArea = totalWindows * 2;
  const doorArea = totalDoors * 2;

  const grossWallArea = perimeter * FH * BF;
  const innerWallArea = (L * W / 2.5) * FH * BF;
  const totalCols = Math.ceil(area / 8);
  const outerCols = Math.ceil(perimeter / 3.5);
  const innerCols = totalCols - outerCols;
  const colAreaPerFloor = 0.7 * FH;
  const outerColArea = outerCols * colAreaPerFloor * BF;
  const innerColArea = innerCols * colAreaPerFloor * BF;
  const netOuterWall = grossWallArea - winArea - outerColArea;
  const netInnerWall = innerWallArea - doorArea - innerColArea;

  const outerBlocks = Math.ceil(netOuterWall / 0.08);
  const innerBlocks = Math.ceil(netInnerWall / 0.08);
  const totalBlocks = outerBlocks + innerBlocks;
  const blockCement = Math.ceil(totalBlocks / 1000 * 20);
  const blockSand = blockCement * 0.1;

  const plasterOuter = netOuterWall;
  const plasterInner = netInnerWall * 2;
  const plasterCeiling = area * BF;
  const plasterArea = plasterOuter + plasterInner + plasterCeiling;
  const plasterCement = Math.ceil(plasterArea / 7);
  const plasterSand = Math.ceil((plasterArea / 100) * 20) * 0.1;

  const paintArea = plasterArea;
  const putty = paintArea * 0.5;
  const primer = paintArea / 10;
  const paint = paintArea / 20;

  const tileFloor = area * BF - (grossWallArea / BF / FH + innerWallArea / BF / FH) * 0.2 - 6 * BF;
  const bathPerimeter = 2 * (bathLength + bathWidth);
  const kitchenPerimeter = 2 * (kitchenLength + kitchenWidth);
  const tileBathWalls = (bathPerimeter * FH - 2) * totalBaths;
  const tileKitchenWalls = (kitchenPerimeter * FH - 2) * totalKitchens;
  const stairSteps = Math.ceil(FH / 0.17);
  const stairLanding = 3;
  const tileTotal = tileFloor + tileBathWalls + tileKitchenWalls + stairLanding * BF;

  const tileMortar = tileTotal * 0.04;
  const mortarCement = Math.ceil(tileMortar * 6);
  const mortarSand = tileMortar * 0.5;

  const totalCement = blockCement + plasterCement + mortarCement;
  const totalSand = blockSand + plasterSand + mortarSand;

  // أسعار الوحدة
  const concUnit = gp(prices.concrete || [], 1) + gp(lab, 0);
  const steelUnit = gp(prices.steel || [], 0) + gp(lab, 2);
  const blockUnit = gp(fm, 0) + gp(fl, 0);
  const cementUnit = gp(fm, 2);
  const sandUnit = gp(fm, 3);
  const plasterLaborUnit = gp(fl, 2);
  const paintLaborUnit = gp(fl, 3);
  const tileUnit = gp(fm, 8) + gp(fl, 4);
  const puttyUnit = gp(fm, 5);
  const primerUnit = gp(fm, 6);
  const paintUnit = gp(fm, 7);
  const stairUnit = gp(fm, 9);
  const windowUnit = gp(fe, 4);
  const doorUnit = gp(fe, 5);
  const bathUnit = gp(fe, 0);
  const kitchenUnit = gp(fe, 1);

  // التكاليف
  const concCost = totalConcrete * concUnit;
  const steelCost = totalSteel * steelUnit;
  const blockCost = totalBlocks * blockUnit;
  const cementCost = totalCement * cementUnit;
  const sandCost = totalSand * sandUnit;
  const plasterLaborCost = plasterArea * plasterLaborUnit;
  const paintLaborCost = paintArea * paintLaborUnit;
  const tileCost = tileTotal * tileUnit;
  const puttyCost = putty * puttyUnit;
  const primerCost = primer * primerUnit;
  const paintCost = paint * paintUnit;
  const stairCost = stairSteps * BF * stairUnit;
  const windowCost = totalWindows * windowUnit;
  const doorCost = totalDoors * doorUnit;
  const bathCost = totalBaths * bathUnit;
  const kitchenCost = totalKitchens * kitchenUnit;
  const grandTotal = concCost + steelCost + blockCost + cementCost + sandCost + plasterLaborCost + paintLaborCost + tileCost + puttyCost + primerCost + paintCost + stairCost + windowCost + doorCost + bathCost + kitchenCost;

  const reset = () => { setLength(''); setWidth(''); setFloorHeight(''); setApartments(''); setDesignFloors(''); setBuildFloors(''); };  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

      {/* المدخلات */}
      <div className="model-card" style={S.card}>
        <div className="model-body" style={S.body}>
          <SectionTitle>أبعاد المبنى</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
            <Num id="qc-length" go="qc-width" label="الطول" value={length} set={setLength} unit="م" />
            <Num id="qc-width" go="qc-height" label="العرض" value={width} set={setWidth} unit="م" />
            <Num id="qc-height" go="qc-apt" label="ارتفاع الدور" value={floorHeight} set={setFloorHeight} unit="م" />
            <Num id="qc-apt" go="qc-design" label="عدد الشقق/دور" value={apartments} set={setApartments} unit="شقة" />
            <Num id="qc-design" go="qc-build" label="أدوار تصميم الأساسات" value={designFloors} set={setDesignFloors} unit="دور" />
            <Num id="qc-build" label="أدوار المراد بناؤها" value={buildFloors} set={setBuildFloors} unit="دور" />
          </div>
          <div className="no-print" style={{ display: 'flex', gap: '8px' }}>
            <button onClick={reset} style={S.btnDanger}>تفريغ</button>
            <button style={S.btnPrimary}>🧮 احسب بسرعة</button>
          </div>
        </div>
      </div>

      {/* الهيكل الخرساني */}
      <SummaryTable title="📊 ملخص الهيكل الخرساني" headers={['البند', 'خرسانة (م³)', 'حديد (طن)']} rows={[
        ['🧱 القواعد', fmtNum(footingConcrete + levelingConcrete), fmtNum(footingSteel)],
        ['📏 الرقاب', fmtNum(neckConcrete), fmtNum(neckSteel)],
        ['🏛️ الأعمدة', fmtNum(columnConcrete), fmtNum(columnSteel)],
        ['〰️ الميدات', fmtNum(middConcrete), fmtNum(middSteel)],
        ['🟫 الأسقف', fmtNum(slabConcrete), fmtNum(slabSteel)],
        [{ label: 'الإجمالي', colSpan: 1 }, fmtNum(totalConcrete), fmtNum(totalSteel)],
      ]} />

      {/* التشطيبات */}
      <SummaryTable title="🧱 التشطيبات" headers={['البند', 'الكمية', 'الوحدة']} rows={[
        [{ label: '🧱 البناء', colSpan: 3 }],
        ['بلك الجدران الخارجية', outerBlocks, 'بلوكة'],
        ['بلك الجدران الداخلية', innerBlocks, 'بلوكة'],
        ['إجمالي البلك', totalBlocks, 'بلوكة'],
        ['أسمنت البناء', blockCement, 'كيس'],
        ['رمل البناء', fmtNum(blockSand), 'م³'],
        [{ label: '🏗️ التلييس', colSpan: 3 }],
        ['مساحة التلييس', fmtNum(plasterArea), 'م²'],
        ['أسمنت التلييس', plasterCement, 'كيس'],
        ['رمل التلييس', fmtNum(plasterSand), 'م³'],
        [{ label: '🎨 الطلاء', colSpan: 3 }],
        ['مساحة الطلاء', fmtNum(paintArea), 'م²'],
        ['المعجون', fmtNum(putty), 'كجم'],
        ['البرايمر', fmtNum(primer), 'لتر'],
        ['الطلاء', fmtNum(paint), 'جالون'],
        [{ label: '🟫 البلاط', colSpan: 3 }],
        ['بلاط الأرضيات', fmtNum(tileFloor), 'م²'],
        ['بلاط جدران الحمامات', fmtNum(tileBathWalls), 'م²'],
        ['بلاط جدران المطابخ', fmtNum(tileKitchenWalls), 'م²'],
        ['بلاط السلم (درج)', stairSteps * BF, 'درجة'],
        ['بلاط السلم (بسطة)', stairLanding * BF, 'م²'],
        ['أسمنت المونة', mortarCement, 'كيس'],
        ['رمل المونة', fmtNum(mortarSand), 'م³'],
        [{ label: '🔧 الإضافات', colSpan: 3 }],
        ['الحمامات', totalBaths, 'حمام'],
        ['المطابخ', totalKitchens, 'مطبخ'],
        ['النوافذ', totalWindows, 'نافذة'],
        ['الأبواب', totalDoors, 'باب'],
      ]} />

      {/* إجمالي الكميات والتكلفة */}
      <SummaryTable title={`💰 إجمالي الكميات والتكلفة (${cur})`} headers={['البند', 'الكمية', 'سعر الوحدة', 'الإجمالي']} rows={[
        ['الخرسانة', `${fmtNum(totalConcrete)} م³`, `${fmtNum(concUnit)} ${cur}`, `${fmtNum(concCost)} ${cur}`],
        ['الحديد', `${fmtNum(totalSteel)} طن`, `${fmtNum(steelUnit)} ${cur}`, `${fmtNum(steelCost)} ${cur}`],
        ['البلوك', `${totalBlocks} بلوكة`, `${fmtNum(blockUnit)} ${cur}`, `${fmtNum(blockCost)} ${cur}`],
        ['الأسمنت', `${totalCement} كيس`, `${fmtNum(cementUnit)} ${cur}`, `${fmtNum(cementCost)} ${cur}`],
        ['الرمل', `${fmtNum(totalSand)} م³`, `${fmtNum(sandUnit)} ${cur}`, `${fmtNum(sandCost)} ${cur}`],
        ['أجور التلييس', `${fmtNum(plasterArea)} م²`, `${fmtNum(plasterLaborUnit)} ${cur}`, `${fmtNum(plasterLaborCost)} ${cur}`],
        ['أجور الطلاء', `${fmtNum(paintArea)} م²`, `${fmtNum(paintLaborUnit)} ${cur}`, `${fmtNum(paintLaborCost)} ${cur}`],
        ['البلاط', `${fmtNum(tileTotal)} م²`, `${fmtNum(tileUnit)} ${cur}`, `${fmtNum(tileCost)} ${cur}`],
        ['المعجون', `${fmtNum(putty)} كجم`, `${fmtNum(puttyUnit)} ${cur}`, `${fmtNum(puttyCost)} ${cur}`],
        ['البرايمر', `${fmtNum(primer)} لتر`, `${fmtNum(primerUnit)} ${cur}`, `${fmtNum(primerCost)} ${cur}`],
        ['الطلاء', `${fmtNum(paint)} جالون`, `${fmtNum(paintUnit)} ${cur}`, `${fmtNum(paintCost)} ${cur}`],
        ['بلاط السلم', `${stairSteps * BF} درجة`, `${fmtNum(stairUnit)} ${cur}`, `${fmtNum(stairCost)} ${cur}`],
        ['النوافذ', `${totalWindows} نافذة`, `${fmtNum(windowUnit)} ${cur}`, `${fmtNum(windowCost)} ${cur}`],
        ['الأبواب', `${totalDoors} باب`, `${fmtNum(doorUnit)} ${cur}`, `${fmtNum(doorCost)} ${cur}`],
        ['سباكة الحمامات', `${totalBaths} حمام`, `${fmtNum(bathUnit)} ${cur}`, `${fmtNum(bathCost)} ${cur}`],
        ['سباكة المطابخ', `${totalKitchens} مطبخ`, `${fmtNum(kitchenUnit)} ${cur}`, `${fmtNum(kitchenCost)} ${cur}`],
        [{ label: `الإجمالي الكلي`, colSpan: 3 }, `${fmtNum(grandTotal)} ${cur}`],
      ]} />

      {/* أزرار */}
      <div className="no-print" style={{ display: 'flex', gap: '8px', padding: '12px 0' }}>
        <button onClick={() => window.print()} style={S.btnPrint}>🖨️ طباعة PDF</button>
      </div>
    </div>
  );
};

export default QuickCalc;
