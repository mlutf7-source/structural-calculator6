import React, { useState, useEffect } from 'react';
import { n, fmtNum, goNext } from '../utils/constants';

const G = (k: string) => { try { const s = localStorage.getItem(k); return s ? JSON.parse(s) : null; } catch (e) { return null; } };

const STORAGE_KEY = 'quickcalc_inputs';

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

const QuickCalc: React.FC = () => {
  const saved = G(STORAGE_KEY) || {};
  const [length, setLength] = useState(saved.length || '15');
  const [width, setWidth] = useState(saved.width || '12');
  const [floorHeight, setFloorHeight] = useState(saved.floorHeight || '3');
  const [apartments, setApartments] = useState(saved.apartments || '2');
  const [designFloors, setDesignFloors] = useState(saved.designFloors || '4');
  const [buildFloors, setBuildFloors] = useState(saved.buildFloors || '2');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ length, width, floorHeight, apartments, designFloors, buildFloors }));
  }, [length, width, floorHeight, apartments, designFloors, buildFloors]);

  const L = n(length), W = n(width), FH = n(floorHeight);
  const APT = n(apartments);
  const DF = n(designFloors);
  const BF = n(buildFloors);

  const area = L * W;
  const perimeter = 2 * (L + W);
  const totalLoad = area * 1.5 * DF;
  const footingArea = totalLoad / 20;
  const footingCount = Math.ceil(area / 12);
  const footingConcrete = footingArea * 0.5;
  const levelingConcrete = footingArea * 0.1;
  const footingSteel = footingConcrete * 0.090;

  // الأعمدة - الأبعاد حسب تصميم الأساسات
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

  // الإجماليات
  const totalConcrete = footingConcrete + levelingConcrete + columnConcrete + neckConcrete + middConcrete + slabConcrete;
  const totalSteel = footingSteel + columnSteel + neckSteel + middSteel + slabSteel;// التشطيبات - افتراضات
const bathsPerApt = 2;
const kitchensPerApt = 1;
const windowsPerApt = 8;
const doorsPerApt = 8;
const windowAreaPer = 2;
const doorAreaPer = 2;
const bathLength = 2;
const bathWidth = 2;
const kitchenLength = 3;
const kitchenWidth = 3;

const totalBaths = APT * bathsPerApt * BF;
const totalKitchens = APT * kitchensPerApt * BF;
const totalWindows = APT * windowsPerApt * BF;
const totalDoors = APT * doorsPerApt * BF;
const winArea = totalWindows * windowAreaPer;
const doorArea = totalDoors * doorAreaPer;

// الجدران
const grossWallArea = perimeter * FH * BF;
const innerWallArea = (L * W / 2.5) * FH * BF;

// الأعمدة
const totalColumns = Math.ceil(area / 8);
const outerColumns = Math.ceil(perimeter / 3.5);
const innerColumns = totalColumns - outerColumns;
const columnAreaPerFloor = 0.7 * FH;
const outerColumnArea = outerColumns * columnAreaPerFloor * BF;
const innerColumnArea = innerColumns * columnAreaPerFloor * BF;

// صافي المساحات
const netOuterWall = grossWallArea - winArea - outerColumnArea;
const netInnerWall = innerWallArea - doorArea - innerColumnArea;

// البلوك
const outerBlocks = Math.ceil(netOuterWall / 0.08);
const innerBlocks = Math.ceil(netInnerWall / 0.08);
const totalBlocks = outerBlocks + innerBlocks;

// الأسمنت والرمل للبناء
const blockCement = Math.ceil((outerBlocks + innerBlocks) / 1000 * 20);
const blockSand = blockCement * 0.1;

// التلييس
const plasterOuter = netOuterWall;
const plasterInner = netInnerWall * 2;
const plasterCeiling = area * BF;
const plasterArea = plasterOuter + plasterInner + plasterCeiling;
const plasterCement = Math.ceil(plasterArea / 7);
const plasterSand = Math.ceil((plasterArea / 100) * 20) * 0.1;

// الطلاء
const paintArea = plasterArea;
const putty = paintArea * 0.5;
const primer = paintArea / 10;
const paint = paintArea / 20;

// البلاط
const tileFloor = area * BF - (grossWallArea / BF / FH + innerWallArea / BF / FH) * 0.2 - 6 * BF;
const bathPerimeter = 2 * (bathLength + bathWidth);
const kitchenPerimeter = 2 * (kitchenLength + kitchenWidth);
const tileBathWalls = (bathPerimeter * FH - 2) * totalBaths;
const tileKitchenWalls = (kitchenPerimeter * FH - 2) * totalKitchens;
const stairSteps = Math.ceil(FH / 0.17);
const stairLanding = 3;
const tileTotal = tileFloor + tileBathWalls + tileKitchenWalls + stairLanding * BF;

// المونة
const tileMortar = (tileTotal * 0.04);
const mortarCement = Math.ceil(tileMortar * 6);
const mortarSand = tileMortar * 0.5;

// الإجماليات
const totalCement = blockCement + plasterCement + mortarCement;
const totalSand = blockSand + plasterSand + mortarSand;// قراءة الأسعار
const prices = G('prices') || {};
const cur = prices.currency === 'YER' ? 'ر.ي' : prices.currency === 'SAR' ? 'ر.س' : '$';

const getPrice = (arr: any[], index: number) => n(arr?.[index]?.price || '0');

// أسعار المواد
const fm = prices.finishesMaterials || [];
const fl = prices.finishesLabor || [];
const fe = prices.finishesExtra || [];
const lab = prices.labor || [];

// أسعار الوحدة (مادة + عمالة)
const concreteUnitPrice = getPrice(prices.concrete || [], 1) + getPrice(lab, 0);
const steelUnitPrice = getPrice(prices.steel || [], 0) + getPrice(lab, 2);
const blockUnitPrice = getPrice(fm, 0) + getPrice(fl, 0);
const cementUnitPrice = getPrice(fm, 2);
const sandUnitPrice = getPrice(fm, 3);
const plasterLaborPrice = getPrice(fl, 2);
const paintLaborPrice = getPrice(fl, 3);
const tileUnitPrice = getPrice(fm, 8) + getPrice(fl, 4);
const puttyUnitPrice = getPrice(fm, 5);
const primerUnitPrice = getPrice(fm, 6);
const paintUnitPrice = getPrice(fm, 7);
const stairTilePrice = getPrice(fm, 9);
const windowPrice = getPrice(fe, 4);
const doorPrice = getPrice(fe, 5);
const bathPrice = getPrice(fe, 0);
const kitchenPrice = getPrice(fe, 1);

// التكاليف
const concreteCost = totalConcrete * concreteUnitPrice;
const steelCost = totalSteel * steelUnitPrice;
const blockCost = totalBlocks * blockUnitPrice;
const cementCost = totalCement * cementUnitPrice;
const sandCost = totalSand * sandUnitPrice;
const plasterLaborCost = plasterArea * plasterLaborPrice;
const paintLaborCost = paintArea * paintLaborPrice;
const tileCost = tileTotal * tileUnitPrice;
const puttyCost = putty * puttyUnitPrice;
const primerCost = primer * primerUnitPrice;
const paintCost = paint * paintUnitPrice;
const stairCost = stairSteps * BF * stairTilePrice;
const windowCost = totalWindows * windowPrice;
const doorCost = totalDoors * doorPrice;
const bathCost = totalBaths * bathPrice;
const kitchenCost = totalKitchens * kitchenPrice;

const grandTotal = concreteCost + steelCost + blockCost + cementCost + sandCost + plasterLaborCost + paintLaborCost + tileCost + puttyCost + primerCost + paintCost + stairCost + windowCost + doorCost + bathCost + kitchenCost;const calculate = () => {};
const reset = () => { setLength(''); setWidth(''); setFloorHeight(''); setApartments(''); setDesignFloors(''); setBuildFloors(''); };

return (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

    {/* المدخلات */}
    <div className="model-card" style={{ border: '1px solid #ddd', borderRadius: '12px', overflow: 'hidden', background: 'white' }}>
      <div className="model-body" style={{ padding: '10px 12px' }}>
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
          <button onClick={reset} style={{ flex: 1, padding: '10px', border: 'none', borderRadius: '10px', background: '#dc3545', color: 'white', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', fontFamily: 'Cairo, sans-serif' }}>تفريغ</button>
          <button onClick={calculate} style={{ flex: 1, padding: '10px', border: 'none', borderRadius: '10px', background: '#00509e', color: 'white', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', fontFamily: 'Cairo, sans-serif' }}>🧮 احسب بسرعة</button>
        </div>
      </div>
    </div>{/* النتائج */}
<div style={{ pageBreakBefore: 'always' }}>
  <SectionTitle>📊 ملخص الهيكل الخرساني</SectionTitle>

  <div className="model-card" style={{ border: '1px solid #ddd', borderRadius: '12px', overflow: 'hidden', background: 'white', marginBottom: '8px' }}>
    <div className="model-body" style={{ padding: '10px 12px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.7rem' }}>
        <thead>
          <tr style={{ background: '#003366', color: 'white' }}>
            <th style={{ padding: '8px 5px', border: '1px solid #003366' }}>البند</th>
            <th style={{ padding: '8px 5px', border: '1px solid #003366' }}>خرسانة (م³)</th>
            <th style={{ padding: '8px 5px', border: '1px solid #003366' }}>حديد (طن)</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={{ padding: '6px 5px', border: '1px solid #ccc', fontWeight: 700 }}>🧱 القواعد</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{fmtNum(footingConcrete + levelingConcrete)}</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{fmtNum(footingSteel)}</td></tr>
          <tr><td style={{ padding: '6px 5px', border: '1px solid #ccc', fontWeight: 700 }}>📏 الرقاب</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{fmtNum(neckConcrete)}</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{fmtNum(neckSteel)}</td></tr>
          <tr><td style={{ padding: '6px 5px', border: '1px solid #ccc', fontWeight: 700 }}>🏛️ الأعمدة</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{fmtNum(columnConcrete)}</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{fmtNum(columnSteel)}</td></tr>
          <tr><td style={{ padding: '6px 5px', border: '1px solid #ccc', fontWeight: 700 }}>〰️ الميدات</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{fmtNum(middConcrete)}</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{fmtNum(middSteel)}</td></tr>
          <tr><td style={{ padding: '6px 5px', border: '1px solid #ccc', fontWeight: 700 }}>🟫 الأسقف</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{fmtNum(slabConcrete)}</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{fmtNum(slabSteel)}</td></tr>
          <tr style={{ background: '#003366', color: '#FFD700', fontWeight: 700 }}>
            <td style={{ padding: '8px 5px', border: '1px solid #003366', textAlign: 'center' }}>الإجمالي</td>
            <td style={{ padding: '8px 5px', border: '1px solid #003366', textAlign: 'center' }}>{fmtNum(totalConcrete)}</td>
            <td style={{ padding: '8px 5px', border: '1px solid #003366', textAlign: 'center' }}>{fmtNum(totalSteel)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div><div className="model-card" style={{ border: '1px solid #ddd', borderRadius: '12px', overflow: 'hidden', background: 'white', marginBottom: '8px' }}>
  <div className="model-body" style={{ padding: '10px 12px' }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.7rem' }}>
      <thead>
        <tr style={{ background: '#003366', color: 'white' }}>
          <th style={{ padding: '8px 5px', border: '1px solid #003366' }}>بند التشطيبات</th>
          <th style={{ padding: '8px 5px', border: '1px solid #003366' }}>الكمية</th>
          <th style={{ padding: '8px 5px', border: '1px solid #003366' }}>الوحدة</th>
        </tr>
      </thead>
      <tbody>
        <tr><td style={{ padding: '6px 5px', border: '1px solid #ccc', fontWeight: 700 }} colSpan={3}>🧱 البناء</td></tr>
        <tr><td style={{ padding: '6px 5px', border: '1px solid #ccc' }}>بلك الجدران الخارجية</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{outerBlocks}</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>بلوكة</td></tr>
        <tr><td style={{ padding: '6px 5px', border: '1px solid #ccc' }}>بلك الجدران الداخلية</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{innerBlocks}</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>بلوكة</td></tr>
        <tr><td style={{ padding: '6px 5px', border: '1px solid #ccc' }}>إجمالي البلك</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{totalBlocks}</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>بلوكة</td></tr>
        <tr><td style={{ padding: '6px 5px', border: '1px solid #ccc' }}>أسمنت البناء</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{blockCement}</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>كيس</td></tr>
        <tr><td style={{ padding: '6px 5px', border: '1px solid #ccc' }}>رمل البناء</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{fmtNum(blockSand)}</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>م³</td></tr>

        <tr><td style={{ padding: '6px 5px', border: '1px solid #ccc', fontWeight: 700 }} colSpan={3}>🏗️ التلييس</td></tr>
        <tr><td style={{ padding: '6px 5px', border: '1px solid #ccc' }}>مساحة التلييس</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{fmtNum(plasterArea)}</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>م²</td></tr>
        <tr><td style={{ padding: '6px 5px', border: '1px solid #ccc' }}>أسمنت التلييس</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{plasterCement}</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>كيس</td></tr>
        <tr><td style={{ padding: '6px 5px', border: '1px solid #ccc' }}>رمل التلييس</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{fmtNum(plasterSand)}</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>م³</td></tr>

        <tr><td style={{ padding: '6px 5px', border: '1px solid #ccc', fontWeight: 700 }} colSpan={3}>🎨 الطلاء</td></tr>
        <tr><td style={{ padding: '6px 5px', border: '1px solid #ccc' }}>مساحة الطلاء</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{fmtNum(paintArea)}</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>م²</td></tr>
        <tr><td style={{ padding: '6px 5px', border: '1px solid #ccc' }}>المعجون</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{fmtNum(putty)}</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>كجم</td></tr>
        <tr><td style={{ padding: '6px 5px', border: '1px solid #ccc' }}>البرايمر</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{fmtNum(primer)}</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>لتر</td></tr>
        <tr><td style={{ padding: '6px 5px', border: '1px solid #ccc' }}>الطلاء</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{fmtNum(paint)}</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>جالون</td></tr>          <tr><td style={{ padding: '6px 5px', border: '1px solid #ccc', fontWeight: 700 }} colSpan={3}>🟫 البلاط</td></tr>
          <tr><td style={{ padding: '6px 5px', border: '1px solid #ccc' }}>بلاط الأرضيات</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{fmtNum(tileFloor)}</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>م²</td></tr>
          <tr><td style={{ padding: '6px 5px', border: '1px solid #ccc' }}>بلاط جدران الحمامات</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{fmtNum(tileBathWalls)}</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>م²</td></tr>
          <tr><td style={{ padding: '6px 5px', border: '1px solid #ccc' }}>بلاط جدران المطابخ</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{fmtNum(tileKitchenWalls)}</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>م²</td></tr>
          <tr><td style={{ padding: '6px 5px', border: '1px solid #ccc' }}>بلاط السلم (درج)</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{stairSteps * BF}</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>درجة</td></tr>
          <tr><td style={{ padding: '6px 5px', border: '1px solid #ccc' }}>بلاط السلم (بسطة)</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{stairLanding * BF}</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>م²</td></tr>
          <tr><td style={{ padding: '6px 5px', border: '1px solid #ccc' }}>أسمنت المونة</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{mortarCement}</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>كيس</td></tr>
          <tr><td style={{ padding: '6px 5px', border: '1px solid #ccc' }}>رمل المونة</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{fmtNum(mortarSand)}</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>م³</td></tr>

          <tr><td style={{ padding: '6px 5px', border: '1px solid #ccc', fontWeight: 700 }} colSpan={3}>🔧 الإضافات</td></tr>
          <tr><td style={{ padding: '6px 5px', border: '1px solid #ccc' }}>الحمامات</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{totalBaths}</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>حمام</td></tr>
          <tr><td style={{ padding: '6px 5px', border: '1px solid #ccc' }}>المطابخ</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{totalKitchens}</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>مطبخ</td></tr>
          <tr><td style={{ padding: '6px 5px', border: '1px solid #ccc' }}>النوافذ</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{totalWindows}</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>نافذة</td></tr>
          <tr><td style={{ padding: '6px 5px', border: '1px solid #ccc' }}>الأبواب</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{totalDoors}</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>باب</td></tr>
        </tbody>
      </table>
    </div>
  </div>

  {/* جدول إجمالي الكميات والتكلفة */}
  <div className="model-card" style={{ border: '1px solid #ddd', borderRadius: '12px', overflow: 'hidden', background: 'white', marginBottom: '8px' }}>
    <div className="model-body" style={{ padding: '10px 12px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.7rem' }}>
        <thead>
          <tr style={{ background: '#003366', color: 'white' }}>
            <th style={{ padding: '8px 5px', border: '1px solid #003366' }}>البند</th>
            <th style={{ padding: '8px 5px', border: '1px solid #003366' }}>الكمية</th>
            <th style={{ padding: '8px 5px', border: '1px solid #003366' }}>سعر الوحدة</th>
            <th style={{ padding: '8px 5px', border: '1px solid #003366' }}>الإجمالي</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={{ padding: '6px 5px', border: '1px solid #ccc', fontWeight: 700 }}>الخرسانة</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{fmtNum(totalConcrete)} م³</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{fmtNum(concreteUnitPrice)} {cur}</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{fmtNum(concreteCost)} {cur}</td></tr>
          <tr><td style={{ padding: '6px 5px', border: '1px solid #ccc', fontWeight: 700 }}>الحديد</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{fmtNum(totalSteel)} طن</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{fmtNum(steelUnitPrice)} {cur}</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{fmtNum(steelCost)} {cur}</td></tr>
          <tr><td style={{ padding: '6px 5px', border: '1px solid #ccc', fontWeight: 700 }}>البلوك</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{totalBlocks} بلوكة</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{fmtNum(blockUnitPrice)} {cur}</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{fmtNum(blockCost)} {cur}</td></tr>
          <tr><td style={{ padding: '6px 5px', border: '1px solid #ccc', fontWeight: 700 }}>الأسمنت</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{totalCement} كيس</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{fmtNum(cementUnitPrice)} {cur}</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{fmtNum(cementCost)} {cur}</td></tr>
          <tr><td style={{ padding: '6px 5px', border: '1px solid #ccc', fontWeight: 700 }}>الرمل</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{fmtNum(totalSand)} م³</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{fmtNum(sandUnitPrice)} {cur}</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{fmtNum(sandCost)} {cur}</td></tr>
          <tr><td style={{ padding: '6px 5px', border: '1px solid #ccc', fontWeight: 700 }}>أجور التلييس</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{fmtNum(plasterArea)} م²</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{fmtNum(plasterLaborPrice)} {cur}</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{fmtNum(plasterLaborCost)} {cur}</td></tr>
          <tr><td style={{ padding: '6px 5px', border: '1px solid #ccc', fontWeight: 700 }}>أجور الطلاء</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{fmtNum(paintArea)} م²</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{fmtNum(paintLaborPrice)} {cur}</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{fmtNum(paintLaborCost)} {cur}</td></tr>
          <tr><td style={{ padding: '6px 5px', border: '1px solid #ccc', fontWeight: 700 }}>البلاط</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{fmtNum(tileTotal)} م²</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{fmtNum(tileUnitPrice)} {cur}</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{fmtNum(tileCost)} {cur}</td></tr>
          <tr><td style={{ padding: '6px 5px', border: '1px solid #ccc', fontWeight: 700 }}>المعجون</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{fmtNum(putty)} كجم</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{fmtNum(puttyUnitPrice)} {cur}</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{fmtNum(puttyCost)} {cur}</td></tr>
          <tr><td style={{ padding: '6px 5px', border: '1px solid #ccc', fontWeight: 700 }}>البرايمر</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{fmtNum(primer)} لتر</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{fmtNum(primerUnitPrice)} {cur}</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{fmtNum(primerCost)} {cur}</td></tr>
          <tr><td style={{ padding: '6px 5px', border: '1px solid #ccc', fontWeight: 700 }}>الطلاء</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{fmtNum(paint)} جالون</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{fmtNum(paintUnitPrice)} {cur}</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{fmtNum(paintCost)} {cur}</td></tr>
          <tr><td style={{ padding: '6px 5px', border: '1px solid #ccc', fontWeight: 700 }}>بلاط السلم</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{stairSteps * BF} درجة</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{fmtNum(stairTilePrice)} {cur}</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{fmtNum(stairCost)} {cur}</td></tr>
          <tr><td style={{ padding: '6px 5px', border: '1px solid #ccc', fontWeight: 700 }}>النوافذ</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{totalWindows} نافذة</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{fmtNum(windowPrice)} {cur}</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{fmtNum(windowCost)} {cur}</td></tr>
          <tr><td style={{ padding: '6px 5px', border: '1px solid #ccc', fontWeight: 700 }}>الأبواب</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{totalDoors} باب</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{fmtNum(doorPrice)} {cur}</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{fmtNum(doorCost)} {cur}</td></tr>
          <tr><td style={{ padding: '6px 5px', border: '1px solid #ccc', fontWeight: 700 }}>سباكة الحمامات</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{totalBaths} حمام</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{fmtNum(bathPrice)} {cur}</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{fmtNum(bathCost)} {cur}</td></tr>
          <tr><td style={{ padding: '6px 5px', border: '1px solid #ccc', fontWeight: 700 }}>سباكة المطابخ</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{totalKitchens} مطبخ</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{fmtNum(kitchenPrice)} {cur}</td><td style={{ padding: '6px 5px', border: '1px solid #ccc', textAlign: 'center' }}>{fmtNum(kitchenCost)} {cur}</td></tr>
          <tr style={{ background: '#003366', color: '#FFD700', fontWeight: 700 }}>
            <td style={{ padding: '8px 5px', border: '1px solid #003366', textAlign: 'center' }} colSpan={3}>الإجمالي الكلي</td>
            <td style={{ padding: '8px 5px', border: '1px solid #003366', textAlign: 'center' }}>{fmtNum(grandTotal)} {cur}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>      {/* أزرار */}
      <div className="no-print" style={{ display: 'flex', gap: '8px', padding: '12px 0' }}>
        <button onClick={() => window.print()} style={{ flex: 1, padding: '12px', border: 'none', borderRadius: '10px', background: '#00509e', color: 'white', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'Cairo, sans-serif' }}>🖨️ طباعة PDF</button>
      </div>
    </div>
  );
};

export default QuickCalc;
