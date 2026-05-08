import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 10, fontFamily: "Helvetica", color: "#1a2332" },
  header: { backgroundColor: "#0a1f3a", color: "white", padding: 24, marginHorizontal: -40, marginTop: -40, marginBottom: 24 },
  brand: { fontSize: 24, fontWeight: "bold", color: "white" },
  brandSub: { fontSize: 9, color: "#9ca3af", marginTop: 4 },
  title: { fontSize: 16, color: "#f5b800", marginTop: 16, fontWeight: "bold" },
  meta: { fontSize: 9, color: "#9ca3af", marginTop: 4 },
  section: { marginBottom: 18 },
  sectionTitle: { fontSize: 11, fontWeight: "bold", color: "#0a1f3a", marginBottom: 8, paddingBottom: 4, borderBottomWidth: 1, borderBottomColor: "#e5e7eb" },
  row: { flexDirection: "row", marginBottom: 4, paddingVertical: 2 },
  label: { width: 200, color: "#6b7785", fontSize: 9 },
  value: { flex: 1, color: "#1a2332", fontSize: 10 },
  valueBold: { flex: 1, color: "#0a1f3a", fontSize: 10, fontWeight: "bold" },
  resultBox: { backgroundColor: "#0a1f3a", padding: 16, borderRadius: 6, marginTop: 8 },
  resultBoxLabel: { fontSize: 9, color: "#9ca3af", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 },
  resultBoxValue: { fontSize: 22, color: "#1ec77f", fontWeight: "bold" },
  resultBoxValueNeg: { fontSize: 22, color: "#f87171", fontWeight: "bold" },
  legal: { fontSize: 8, color: "#6b7785", marginTop: 24, lineHeight: 1.5, padding: 12, backgroundColor: "#fafaf7", borderRadius: 4 },
  legalTitle: { fontWeight: "bold", marginBottom: 6, fontSize: 9, color: "#0a1f3a" },
  footer: { position: "absolute", bottom: 30, left: 40, right: 40, paddingTop: 12, borderTopWidth: 1, borderTopColor: "#e5e7eb", fontSize: 8, color: "#9ca3af", flexDirection: "row", justifyContent: "space-between" },
});

type CalcData = {
  email: string;
  full_name?: string | null;
  calculator_type: string;
  inputs: Record<string, unknown>;
  results: Record<string, unknown>;
};

const CALC_LABELS: Record<string, string> = {
  r2sa: "R2SA - Serviced Accommodation",
  r2hmo: "R2HMO - Multi-Occupancy",
  single: "R2R Single Let",
};

const INPUT_LABELS: Record<string, string> = {
  landlordRent: "Monthly Rent to Landlord",
  nightlyRate: "Average Nightly Rate",
  occupancy: "Occupancy Rate",
  cleaningFee: "Cleaning Fee per Booking",
  avgStay: "Average Length of Stay",
  setupCost: "Setup / Furnishing Cost",
  monthlyBills: "Monthly Bills",
  platformFee: "Platform Fee",
  rooms: "Number of Rooms",
  rentPerRoom: "Rent per Room",
  voidWeeks: "Annual Void (weeks)",
  maintenancePercent: "Maintenance Budget",
  tenantRent: "Monthly Rent from Tenant",
  insurance: "Insurance and Compliance",
};

const RESULT_LABELS: Record<string, string> = {
  monthlyProfit: "Monthly Profit",
  annualProfit: "Annual Profit",
  totalRevenue: "Monthly Revenue",
  totalCosts: "Total Monthly Costs",
  margin: "Profit Margin",
  roi: "ROI on Setup",
  payback: "Setup Payback",
  grossMonthly: "Gross Monthly Income",
  profitPerRoom: "Profit per Room (annual)",
  monthlyMargin: "Gross Monthly Margin",
};

function formatInput(key: string, value: unknown): string {
  const v = Number(value);
  if (isNaN(v)) return String(value || "-");
  if (key === "occupancy" || key === "platformFee" || key === "maintenancePercent") return v + "%";
  if (key === "voidWeeks") return v + " weeks";
  if (key === "avgStay") return v + " nights";
  if (key === "rooms") return String(v);
  return "GBP " + v.toLocaleString();
}

function formatResult(key: string, value: unknown): string {
  const v = Number(value);
  if (isNaN(v)) return String(value || "-");
  if (key === "margin" || key === "roi") return v.toFixed(1) + "%";
  if (key === "payback") return v.toFixed(1) + " months";
  return "GBP " + Math.round(v).toLocaleString();
}

export const CalculatorPDF = ({ data }: { data: CalcData }) => {
  const submittedDate = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  const submittedTime = new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  const calcLabel = CALC_LABELS[data.calculator_type] || data.calculator_type;
  const monthlyProfit = Number(data.results?.monthlyProfit || 0);
  const annualProfit = Number(data.results?.annualProfit || 0);

  const inputs = data.inputs || {};
  const results = data.results || {};
  const companyName = String(inputs.company_name || "");
  const propertyTitle = String(inputs.property_title || "");
  const propertyAddress = String(inputs.property_address || "");

  const inputEntries = Object.entries(inputs).filter(
    ([k]) => !["company_name", "property_title", "property_address"].includes(k) && k in INPUT_LABELS
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.brand}>TPS</Text>
          <Text style={styles.brandSub}>The Property Source Group</Text>
          <Text style={styles.title}>Investment Calculation</Text>
          <Text style={styles.meta}>{calcLabel}</Text>
          <Text style={styles.meta}>Generated on {submittedDate} at {submittedTime}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SAVED FOR</Text>
          {data.full_name ? <View style={styles.row}><Text style={styles.label}>Name</Text><Text style={styles.valueBold}>{data.full_name}</Text></View> : null}
          <View style={styles.row}><Text style={styles.label}>Email</Text><Text style={styles.value}>{data.email}</Text></View>
          {companyName ? <View style={styles.row}><Text style={styles.label}>Company</Text><Text style={styles.value}>{companyName}</Text></View> : null}
        </View>

        {(propertyTitle || propertyAddress) ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>PROPERTY</Text>
            {propertyTitle ? <View style={styles.row}><Text style={styles.label}>Property Title</Text><Text style={styles.valueBold}>{propertyTitle}</Text></View> : null}
            {propertyAddress ? <View style={styles.row}><Text style={styles.label}>Address</Text><Text style={styles.value}>{propertyAddress}</Text></View> : null}
          </View>
        ) : null}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>HEADLINE RESULTS</Text>
          <View style={styles.resultBox}>
            <Text style={styles.resultBoxLabel}>Monthly Profit</Text>
            <Text style={monthlyProfit >= 0 ? styles.resultBoxValue : styles.resultBoxValueNeg}>GBP {Math.round(monthlyProfit).toLocaleString()}</Text>
          </View>
          <View style={[styles.resultBox, { marginTop: 8 }]}>
            <Text style={styles.resultBoxLabel}>Annual Profit</Text>
            <Text style={annualProfit >= 0 ? styles.resultBoxValue : styles.resultBoxValueNeg}>GBP {Math.round(annualProfit).toLocaleString()}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>YOUR INPUTS</Text>
          {inputEntries.map(([key, value]) => (
            <View key={key} style={styles.row}>
              <Text style={styles.label}>{INPUT_LABELS[key] || key}</Text>
              <Text style={styles.value}>{formatInput(key, value)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>FULL RESULTS</Text>
          {Object.entries(results).filter(([k]) => k in RESULT_LABELS).map(([key, value]) => (
            <View key={key} style={styles.row}>
              <Text style={styles.label}>{RESULT_LABELS[key] || key}</Text>
              <Text style={styles.valueBold}>{formatResult(key, value)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.legal}>
          <Text style={styles.legalTitle}>DISCLAIMER</Text>
          <Text>
            All figures shown are estimates based on the inputs provided. Actual results vary considerably depending on local market conditions, operational efficiency, occupancy fluctuations, regulatory changes and unforeseen costs. This document does not constitute financial, legal, or investment advice. Always conduct full due diligence and consult qualified professionals before making any investment decision.
          </Text>
        </View>

        <View style={styles.footer} fixed>
          <Text>TPS - The Property Source Group</Text>
          <Text>contact@thepropertysourcegroup.com</Text>
          <Text>thepropertysourcegroup.com</Text>
        </View>
      </Page>
    </Document>
  );
};
