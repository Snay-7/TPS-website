import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 10, fontFamily: "Helvetica", color: "#1a2332" },
  header: { backgroundColor: "#0a1f3a", color: "white", padding: 24, marginHorizontal: -40, marginTop: -40, marginBottom: 24 },
  brandRow: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  brand: { fontSize: 24, fontWeight: "bold", color: "white" },
  brandSub: { fontSize: 9, color: "#9ca3af", marginTop: 4 },
  title: { fontSize: 16, color: "#f5b800", marginTop: 16, fontWeight: "bold" },
  meta: { fontSize: 9, color: "#9ca3af", marginTop: 4 },
  section: { marginBottom: 18 },
  sectionTitle: { fontSize: 11, fontWeight: "bold", color: "#0a1f3a", marginBottom: 8, paddingBottom: 4, borderBottomWidth: 1, borderBottomColor: "#e5e7eb" },
  row: { flexDirection: "row", marginBottom: 4, paddingVertical: 2 },
  label: { width: 140, color: "#6b7785", fontSize: 9 },
  value: { flex: 1, color: "#1a2332", fontSize: 10 },
  valueBold: { flex: 1, color: "#0a1f3a", fontSize: 10, fontWeight: "bold" },
  feeBox: { backgroundColor: "#fafaf7", padding: 12, borderRadius: 4, marginTop: 8, borderLeftWidth: 3, borderLeftColor: "#f5b800" },
  feeRow: { flexDirection: "row", justifyContent: "space-between", marginVertical: 2 },
  comments: { backgroundColor: "#fafaf7", padding: 10, borderRadius: 4, fontSize: 9, color: "#4a5568", marginTop: 4 },
  legal: { fontSize: 8, color: "#6b7785", marginTop: 24, lineHeight: 1.5, padding: 12, backgroundColor: "#fafaf7", borderRadius: 4 },
  legalTitle: { fontWeight: "bold", marginBottom: 6, fontSize: 9, color: "#0a1f3a" },
  signatureRow: { flexDirection: "row", marginTop: 24, paddingTop: 16, borderTopWidth: 1, borderTopColor: "#e5e7eb" },
  signatureCol: { flex: 1 },
  signatureLabel: { fontSize: 8, color: "#6b7785", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 },
  signature: { fontSize: 14, fontStyle: "italic", color: "#0a1f3a" },
  footer: { position: "absolute", bottom: 30, left: 40, right: 40, paddingTop: 12, borderTopWidth: 1, borderTopColor: "#e5e7eb", fontSize: 8, color: "#9ca3af", flexDirection: "row", justifyContent: "space-between" },
});

type OfferData = {
  full_name: string;
  company_name?: string;
  email: string;
  mobile: string;
  property_address: string;
  viewing_date: string;
  property_type: string;
  bedrooms: number;
  rent_offered: number;
  lease_length: string;
  break_clause?: string;
  start_date: string;
  intended_use: string;
  bills_included: string;
  sourcing_fee?: number;
  comments?: string;
  signature: string;
};

export const OfferPDF = ({ data }: { data: OfferData }) => {
  const fee = Number(data.sourcing_fee || 0);
  const deposit = fee * 0.3;
  const completion = fee * 0.7;
  const submittedDate = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  const submittedTime = new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.brandRow}>
            <Text style={styles.brand}>TPS</Text>
          </View>
          <Text style={styles.brandSub}>The Property Source Group</Text>
          <Text style={styles.title}>R2R Offer Submission</Text>
          <Text style={styles.meta}>Submitted on {submittedDate} at {submittedTime}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>APPLICANT DETAILS</Text>
          <View style={styles.row}><Text style={styles.label}>Full Name</Text><Text style={styles.valueBold}>{data.full_name}</Text></View>
          {data.company_name ? <View style={styles.row}><Text style={styles.label}>Company</Text><Text style={styles.value}>{data.company_name}</Text></View> : null}
          <View style={styles.row}><Text style={styles.label}>Email</Text><Text style={styles.value}>{data.email}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Mobile</Text><Text style={styles.value}>{data.mobile}</Text></View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PROPERTY DETAILS</Text>
          <View style={styles.row}><Text style={styles.label}>Address</Text><Text style={styles.valueBold}>{data.property_address}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Type</Text><Text style={styles.value}>{data.property_type}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Bedrooms</Text><Text style={styles.value}>{data.bedrooms}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Viewing Date</Text><Text style={styles.value}>{data.viewing_date}</Text></View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>OFFER TERMS</Text>
          <View style={styles.row}><Text style={styles.label}>Monthly Rent</Text><Text style={styles.valueBold}>£{Number(data.rent_offered).toLocaleString()}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Lease Length</Text><Text style={styles.value}>{data.lease_length}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Break Clause</Text><Text style={styles.value}>{data.break_clause || "Not specified"}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Proposed Start</Text><Text style={styles.value}>{data.start_date}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Intended Use</Text><Text style={styles.value}>{data.intended_use}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Bills Included</Text><Text style={styles.value}>{data.bills_included}</Text></View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SOURCING FEE</Text>
          <View style={styles.row}><Text style={styles.label}>Total Fee Agreed</Text><Text style={styles.valueBold}>£{fee.toLocaleString()}</Text></View>
          <View style={styles.feeBox}>
            <Text style={{ fontSize: 9, fontWeight: "bold", color: "#0a1f3a", marginBottom: 6 }}>Payment Schedule</Text>
            <View style={styles.feeRow}>
              <Text style={{ color: "#6b7785", fontSize: 9 }}>30% on offer acceptance</Text>
              <Text style={{ fontWeight: "bold", color: "#0a1f3a", fontSize: 10 }}>£{deposit.toLocaleString(undefined, { maximumFractionDigits: 2 })}</Text>
            </View>
            <View style={styles.feeRow}>
              <Text style={{ color: "#6b7785", fontSize: 9 }}>70% on completion</Text>
              <Text style={{ fontWeight: "bold", color: "#0a1f3a", fontSize: 10 }}>£{completion.toLocaleString(undefined, { maximumFractionDigits: 2 })}</Text>
            </View>
          </View>
        </View>

        {data.comments ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>ADDITIONAL COMMENTS</Text>
            <Text style={styles.comments}>{data.comments}</Text>
          </View>
        ) : null}

        <View style={styles.signatureRow}>
          <View style={styles.signatureCol}>
            <Text style={styles.signatureLabel}>Signed By</Text>
            <Text style={styles.signature}>{data.signature}</Text>
          </View>
          <View style={styles.signatureCol}>
            <Text style={styles.signatureLabel}>Date</Text>
            <Text style={{ fontSize: 11, color: "#0a1f3a", marginTop: 4 }}>{submittedDate}</Text>
          </View>
        </View>

        <View style={styles.legal}>
          <Text style={styles.legalTitle}>DECLARATION</Text>
          <Text>
            By submitting this offer, the applicant confirms: (1) the information provided is accurate and complete; (2) this offer is subject to contract, references, and landlord approval; (3) the sourcing fee is paid 30% on offer acceptance and 70% on completion, with the 30% deposit non-refundable once the offer is accepted; (4) TPS reserves the right to accept, reject, or counter this offer; (5) this offer does not constitute a binding tenancy agreement until a formal contract is signed; (6) personal data is processed in accordance with TPS Privacy Policy and UK GDPR.
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
