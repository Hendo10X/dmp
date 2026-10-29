"use server"

// Emails the report download form to the DMP team through Resend
// (https://resend.com). Set in Vercel:
//   RESEND_API_KEY      API key from the Resend dashboard
//   REPORT_EMAIL_TO     inbox that receives the details (comma-separated ok)
//   REPORT_EMAIL_FROM   sender on a domain verified in Resend, e.g.
//                       "DMPartners <reports@dmpartners.com>". Until a domain
//                       is verified, Resend's onboarding@resend.dev can only
//                       deliver to the Resend account owner's own address.

const FIELDS = [
  ["title", "Title"],
  ["name", "Name"],
  ["email", "Email"],
  ["organisation", "Organisation"],
  ["role", "Role"],
  ["occupation", "Occupation"],
  ["sector", "Industry or sector"],
] as const

const escape = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ]!
  )

export async function sendReportRequest(
  report: string,
  formData: FormData
): Promise<{ ok: boolean }> {
  const key = process.env.RESEND_API_KEY
  const to = process.env.REPORT_EMAIL_TO
  if (!key || !to) {
    console.warn("Report form: RESEND_API_KEY or REPORT_EMAIL_TO not set")
    return { ok: false }
  }

  // Trim and cap every field; reject anything without a usable email.
  const details = FIELDS.map(
    ([name, label]) =>
      [
        label,
        String(formData.get(name) ?? "")
          .trim()
          .slice(0, 200),
      ] as const
  )
  const email = details.find(([label]) => label === "Email")![1]
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false }

  const rows = details
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#555">${label}</td><td style="padding:6px 0">${escape(value)}</td></tr>`
    )
    .join("")

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from:
        process.env.REPORT_EMAIL_FROM ??
        "DMPartners Website <onboarding@resend.dev>",
      to: to.split(",").map((address) => address.trim()),
      reply_to: email,
      subject: `Report download: ${report}`,
      text: details.map(([label, value]) => `${label}: ${value}`).join("\n"),
      html: `<p>Someone downloaded <strong>${escape(report)}</strong> from the website.</p><table>${rows}</table>`,
    }),
  })

  if (!response.ok) {
    console.error("Report form: Resend error", await response.text())
    return { ok: false }
  }
  return { ok: true }
}
