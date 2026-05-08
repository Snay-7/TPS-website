"use client";
import { useState, useMemo } from "react";
import Link from "next/link";

type Mode = "r2sa" | "r2hmo" | "single";

export default function CalculatorsPage() {
  const [mode, setMode] = useState<Mode>("r2sa");

  return (
    <div className="bg-cream pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-brand-blue text-xs font-bold tracking-widest uppercase mb-3">Free Tools</div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-navy mb-4 leading-tight">Property Investment Calculators</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">Run the numbers on any R2R deal in seconds. Compare R2SA, R2HMO, and Single Let strategies.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-2 max-w-2xl mx-auto mb-8">
          <div className="grid grid-cols-3 gap-2">
            {([
              { id: "r2sa" as Mode, label: "R2SA", sub: "Serviced Accommodation" },
              { id: "r2hmo" as Mode, label: "R2HMO", sub: "Multi-Occupancy" },
              { id: "single" as Mode, label: "Single Let", sub: "R2R Fixed Income" },
            ]).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setMode(tab.id)}
                className={`p-4 rounded-xl text-center transition-all ${mode === tab.id ? "bg-navy text-white shadow-lg" : "text-gray-700 hover:bg-gray-50"}`}
              >
                <div className="font-bold text-base">{tab.label}</div>
                <div className={`text-xs mt-1 ${mode === tab.id ? "text-white/70" : "text-gray-500"}`}>{tab.sub}</div>
              </button>
            ))}
          </div>
        </div>

        {mode === "r2sa" && <R2SACalculator />}
        {mode === "r2hmo" && <R2HMOCalculator />}
        {mode === "single" && <SingleLetCalculator />}

        <div className="bg-navy rounded-3xl p-12 text-white text-center mt-12 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Found a profitable strategy?</h2>
          <p className="text-white/70 mb-8">Register your investment criteria and we will match you to deals that fit your numbers.</p>
          <Link href="/register-criteria" className="inline-block bg-brand-yellow text-navy px-8 py-4 rounded-lg font-bold hover:bg-white transition-all">Register My Criteria</Link>
        </div>
      </div>
    </div>
  );
}

function R2SACalculator() {
  const [inputs, setInputs] = useState({
    landlordRent: 1500,
    nightlyRate: 95,
    occupancy: 75,
    cleaningFee: 35,
    avgStay: 3,
    setupCost: 6000,
    monthlyBills: 350,
    platformFee: 12,
  });

  const results = useMemo(() => {
    const nightsPerMonth = 30.4;
    const occupiedNights = (inputs.occupancy / 100) * nightsPerMonth;
    const grossRevenue = occupiedNights * inputs.nightlyRate;
    const bookingsPerMonth = occupiedNights / inputs.avgStay;
    const cleaningRevenue = bookingsPerMonth * inputs.cleaningFee;
    const totalRevenue = grossRevenue + cleaningRevenue;
    const platformFees = totalRevenue * (inputs.platformFee / 100);
    const cleaningCosts = bookingsPerMonth * 35;
    const totalCosts = inputs.landlordRent + inputs.monthlyBills + platformFees + cleaningCosts;
    const monthlyProfit = totalRevenue - totalCosts;
    const annualProfit = monthlyProfit * 12;
    const roi = inputs.setupCost > 0 ? (annualProfit / inputs.setupCost) * 100 : 0;
    const margin = totalRevenue > 0 ? (monthlyProfit / totalRevenue) * 100 : 0;
    const payback = monthlyProfit > 0 ? inputs.setupCost / monthlyProfit : 0;

    return { totalRevenue, monthlyProfit, annualProfit, roi, margin, payback, totalCosts };
  }, [inputs]);

  return (
    <CalcLayout
      title="R2SA Calculator"
      description="Calculate profit from operating a property as serviced accommodation."
      inputs={
        <>
          <NumberInput label="Monthly Rent to Landlord (£)" value={inputs.landlordRent} onChange={(v) => setInputs({ ...inputs, landlordRent: v })} />
          <NumberInput label="Average Nightly Rate (£)" value={inputs.nightlyRate} onChange={(v) => setInputs({ ...inputs, nightlyRate: v })} />
          <SliderInput label="Occupancy Rate (%)" value={inputs.occupancy} onChange={(v) => setInputs({ ...inputs, occupancy: v })} min={0} max={100} suffix="%" />
          <NumberInput label="Cleaning Fee per Booking (£)" value={inputs.cleaningFee} onChange={(v) => setInputs({ ...inputs, cleaningFee: v })} />
          <NumberInput label="Average Length of Stay (nights)" value={inputs.avgStay} onChange={(v) => setInputs({ ...inputs, avgStay: v })} step={0.5} />
          <NumberInput label="Setup/Furnishing Cost (£)" value={inputs.setupCost} onChange={(v) => setInputs({ ...inputs, setupCost: v })} />
          <NumberInput label="Monthly Bills (£)" value={inputs.monthlyBills} onChange={(v) => setInputs({ ...inputs, monthlyBills: v })} />
          <SliderInput label="Platform Fee (%)" value={inputs.platformFee} onChange={(v) => setInputs({ ...inputs, platformFee: v })} min={0} max={30} suffix="%" />
        </>
      }
      results={
        <>
          <BigResult label="Monthly Profit" value={`£${Math.round(results.monthlyProfit).toLocaleString()}`} highlight={results.monthlyProfit > 0} />
          <Result label="Annual Profit" value={`£${Math.round(results.annualProfit).toLocaleString()}`} />
          <Result label="Monthly Revenue" value={`£${Math.round(results.totalRevenue).toLocaleString()}`} />
          <Result label="Total Monthly Costs" value={`£${Math.round(results.totalCosts).toLocaleString()}`} />
          <Result label="Profit Margin" value={`${results.margin.toFixed(1)}%`} />
          <Result label="ROI on Setup" value={`${results.roi.toFixed(1)}%`} />
          <Result label="Setup Payback" value={`${results.payback.toFixed(1)} months`} />
        </>
      }
    />
  );
}

function R2HMOCalculator() {
  const [inputs, setInputs] = useState({
    landlordRent: 1200,
    rooms: 5,
    rentPerRoom: 600,
    setupCost: 8000,
    monthlyBills: 600,
    voidWeeks: 2,
    maintenancePercent: 8,
  });

  const results = useMemo(() => {
    const grossMonthly = inputs.rooms * inputs.rentPerRoom;
    const annualGross = grossMonthly * 12;
    const voidLoss = (annualGross / 52) * inputs.voidWeeks;
    const maintenance = annualGross * (inputs.maintenancePercent / 100);
    const annualLandlordRent = inputs.landlordRent * 12;
    const annualBills = inputs.monthlyBills * 12;
    const annualProfit = annualGross - voidLoss - maintenance - annualLandlordRent - annualBills;
    const monthlyProfit = annualProfit / 12;
    const profitPerRoom = annualProfit / inputs.rooms;
    const roi = inputs.setupCost > 0 ? (annualProfit / inputs.setupCost) * 100 : 0;
    const payback = monthlyProfit > 0 ? inputs.setupCost / monthlyProfit : 0;

    return { grossMonthly, monthlyProfit, annualProfit, profitPerRoom, roi, payback };
  }, [inputs]);

  return (
    <CalcLayout
      title="R2HMO Calculator"
      description="Calculate profit from operating a property as a House in Multiple Occupation (HMO)."
      inputs={
        <>
          <NumberInput label="Monthly Rent to Landlord (£)" value={inputs.landlordRent} onChange={(v) => setInputs({ ...inputs, landlordRent: v })} />
          <NumberInput label="Number of Rooms" value={inputs.rooms} onChange={(v) => setInputs({ ...inputs, rooms: v })} />
          <NumberInput label="Rent per Room (£/month)" value={inputs.rentPerRoom} onChange={(v) => setInputs({ ...inputs, rentPerRoom: v })} />
          <NumberInput label="Setup/Refurb Cost (£)" value={inputs.setupCost} onChange={(v) => setInputs({ ...inputs, setupCost: v })} />
          <NumberInput label="Monthly Bills (£)" value={inputs.monthlyBills} onChange={(v) => setInputs({ ...inputs, monthlyBills: v })} />
          <SliderInput label="Annual Void Period (weeks)" value={inputs.voidWeeks} onChange={(v) => setInputs({ ...inputs, voidWeeks: v })} min={0} max={12} suffix=" weeks" />
          <SliderInput label="Maintenance Budget (% of rent)" value={inputs.maintenancePercent} onChange={(v) => setInputs({ ...inputs, maintenancePercent: v })} min={0} max={20} suffix="%" />
        </>
      }
      results={
        <>
          <BigResult label="Monthly Profit" value={`£${Math.round(results.monthlyProfit).toLocaleString()}`} highlight={results.monthlyProfit > 0} />
          <Result label="Annual Profit" value={`£${Math.round(results.annualProfit).toLocaleString()}`} />
          <Result label="Gross Monthly Income" value={`£${Math.round(results.grossMonthly).toLocaleString()}`} />
          <Result label="Profit per Room (annual)" value={`£${Math.round(results.profitPerRoom).toLocaleString()}`} />
          <Result label="ROI on Setup" value={`${results.roi.toFixed(1)}%`} />
          <Result label="Setup Payback" value={`${results.payback.toFixed(1)} months`} />
        </>
      }
    />
  );
}

function SingleLetCalculator() {
  const [inputs, setInputs] = useState({
    landlordRent: 1000,
    tenantRent: 1300,
    setupCost: 1500,
    monthlyBills: 0,
    maintenancePercent: 7,
    voidWeeks: 1,
    insurance: 50,
  });

  const results = useMemo(() => {
    const annualGross = inputs.tenantRent * 12;
    const voidLoss = (annualGross / 52) * inputs.voidWeeks;
    const maintenance = annualGross * (inputs.maintenancePercent / 100);
    const annualLandlordRent = inputs.landlordRent * 12;
    const annualBills = inputs.monthlyBills * 12;
    const annualInsurance = inputs.insurance * 12;
    const annualProfit = annualGross - voidLoss - maintenance - annualLandlordRent - annualBills - annualInsurance;
    const monthlyProfit = annualProfit / 12;
    const monthlyMargin = inputs.tenantRent - inputs.landlordRent;
    const roi = inputs.setupCost > 0 ? (annualProfit / inputs.setupCost) * 100 : 0;
    const payback = monthlyProfit > 0 ? inputs.setupCost / monthlyProfit : 0;

    return { monthlyProfit, annualProfit, monthlyMargin, roi, payback };
  }, [inputs]);

  return (
    <CalcLayout
      title="R2R Single Let Calculator"
      description="Calculate fixed income from operating a single-tenant rent-to-rent."
      inputs={
        <>
          <NumberInput label="Monthly Rent to Landlord (£)" value={inputs.landlordRent} onChange={(v) => setInputs({ ...inputs, landlordRent: v })} />
          <NumberInput label="Monthly Rent from Tenant (£)" value={inputs.tenantRent} onChange={(v) => setInputs({ ...inputs, tenantRent: v })} />
          <NumberInput label="Setup Cost (£)" value={inputs.setupCost} onChange={(v) => setInputs({ ...inputs, setupCost: v })} />
          <NumberInput label="Monthly Bills You Cover (£)" value={inputs.monthlyBills} onChange={(v) => setInputs({ ...inputs, monthlyBills: v })} />
          <NumberInput label="Insurance & Compliance (£/month)" value={inputs.insurance} onChange={(v) => setInputs({ ...inputs, insurance: v })} />
          <SliderInput label="Annual Void (weeks)" value={inputs.voidWeeks} onChange={(v) => setInputs({ ...inputs, voidWeeks: v })} min={0} max={8} suffix=" weeks" />
          <SliderInput label="Maintenance Budget (%)" value={inputs.maintenancePercent} onChange={(v) => setInputs({ ...inputs, maintenancePercent: v })} min={0} max={15} suffix="%" />
        </>
      }
      results={
        <>
          <BigResult label="Monthly Profit" value={`£${Math.round(results.monthlyProfit).toLocaleString()}`} highlight={results.monthlyProfit > 0} />
          <Result label="Annual Profit" value={`£${Math.round(results.annualProfit).toLocaleString()}`} />
          <Result label="Gross Monthly Margin" value={`£${results.monthlyMargin.toLocaleString()}`} />
          <Result label="ROI on Setup" value={`${results.roi.toFixed(1)}%`} />
          <Result label="Setup Payback" value={`${results.payback.toFixed(1)} months`} />
        </>
      }
    />
  );
}

function CalcLayout({ title, description, inputs, results }: { title: string; description: string; inputs: React.ReactNode; results: React.ReactNode }) {
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-navy mb-2">{title}</h2>
        <p className="text-gray-600 text-sm mb-6">{description}</p>
        <div className="space-y-5">{inputs}</div>
      </div>
      <div className="bg-navy text-white rounded-3xl shadow-xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-yellow/15 rounded-full blur-3xl" />
        <div className="relative">
          <h2 className="text-2xl font-bold mb-2">Your Results</h2>
          <p className="text-white/60 text-sm mb-6">Updated as you type. All figures are estimates.</p>
          <div className="space-y-3">{results}</div>
          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-xs text-white/50">Disclaimer: Results are estimates based on inputs provided. Always conduct full due diligence before any investment.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function NumberInput({ label, value, onChange, step = 1 }: { label: string; value: number; onChange: (v: number) => void; step?: number }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-navy mb-2">{label}</label>
      <input type="number" value={value} step={step} onChange={(e) => onChange(Number(e.target.value) || 0)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-colors" />
    </div>
  );
}

function SliderInput({ label, value, onChange, min, max, suffix }: { label: string; value: number; onChange: (v: number) => void; min: number; max: number; suffix: string }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-semibold text-navy">{label}</label>
        <span className="text-sm font-bold text-brand-blue">{value}{suffix}</span>
      </div>
      <input type="range" min={min} max={max} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full accent-brand-blue cursor-pointer" />
    </div>
  );
}

function BigResult({ label, value, highlight }: { label: string; value: string; highlight: boolean }) {
  return (
    <div className={`p-5 rounded-2xl border ${highlight ? "bg-brand-green/10 border-brand-green/30" : "bg-red-500/10 border-red-500/30"}`}>
      <div className="text-xs uppercase tracking-wider text-white/60 mb-1 font-semibold">{label}</div>
      <div className={`text-3xl md:text-4xl font-bold ${highlight ? "text-brand-green" : "text-red-300"}`}>{value}</div>
    </div>
  );
}

function Result({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-3 border-b border-white/10 last:border-0">
      <span className="text-white/70 text-sm">{label}</span>
      <span className="font-bold text-lg">{value}</span>
    </div>
  );
}
