"use server"

// Emails website enquiries (the Contact form and the footer's "leave your
// email" box) to the DMP team through Resend (https://resend.com). Uses the
// same Resend account as the report form (lib/report-email.ts). Set in
// Vercel:
//   RESEND_API_KEY      API key from the Resend dashboard
//   CONTACT_EMAIL_TO    inbox for enquiries (comma-separated ok); falls
//                       back to REPORT_EMAIL_TO
//   REPORT_EMAIL_FROM   sender on a domain verified in Resend
// Returns { ok: false } when it cannot send, and the form then asks the
// visitor to email the team directly, so no enquiry is silently lost.

const TOPICS: Record<string, string> = {
  proposal: "Request for proposal",
  general: "General business enquiry",
  employment: "Employment",
  speakers: "DMP Speakers",
  callback: "Footer: asked to be contacted",
}

const escape = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ]!
  )

export async function sendEnquiry(formData: FormData): Promise<{ ok: boolean }> {
  const read = (name: string, max: number) =>
    String(formData.get(name) ?? "")
      .trim()
      .slice(0, max)

  // Hidden field real visitors never fill: bots that do are dropped, and
  // told it worked.
  if (read("website", 200)) return { ok: true }

  const email = read("email", 200)
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false }

  const key = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_EMAIL_TO || process.env.REPORT_EMAIL_TO
  if (!key || !to) {
    console.warn("Enquiry form: RESEND_API_KEY or CONTACT_EMAIL_TO not set")
    return { ok: false }
  }

  const topic = TOPICS[read("topic", 40)] ?? TOPICS.general
  const details = [
    ["Topic", topic],
    ["Name", read("name", 200)],
    ["Email", email],
    ["Organisation", read("organisation", 200)],
    ["Message", read("message", 5000)],
  ].filter(([, value]) => value)

  const rows = details
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#555;vertical-align:top">${label}</td><td style="padding:6px 0;white-space:pre-wrap">${escape(value)}</td></tr>`
    )
    .join("")

  try {
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
        subject: `Website enquiry: ${topic}`,
        text: details.map(([label, value]) => `${label}: ${value}`).join("\n"),
        html: `<p>New enquiry from the website.</p><table>${rows}</table>`,
      }),
    })
    if (!response.ok) {
      console.error("Enquiry form: Resend returned", response.status)
      return { ok: false }
    }
    return { ok: true }
  } catch (error) {
    console.error("Enquiry form: request to Resend failed", error)
    return { ok: false }
  }
}
