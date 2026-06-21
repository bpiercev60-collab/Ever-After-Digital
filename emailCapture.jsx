# Pinterest Business Setup Guide — Ever After Digital

> **Author:** Growth Lead  
> **Purpose:** Step-by-step Pinterest account setup for driving bridal traffic  
> **Prerequisites:** Storefront is live at a public URL (or localhost for testing)

---

## 1. Create Pinterest Business Account

### Step 1: Sign Up
1. Go to [pinterest.com/business/create](https://pinterest.com/business/create/)
2. Enter **Email**, **Password**, **Business name**: `Ever After Digital`
3. Click **Create**
4. Select **Business account** type

### Step 2: Complete Profile
| Field | Value |
|---|---|
| **Business Name** | Ever After Digital |
| **Display Name** | Ever After Digital — Wedding Templates |
| **Profile Photo** | Use the brand logo (gold heart icon on navy) — generate from branding.json assets |
| **Website** | `https://everafterdigital.com/` (or developer's preview URL) |
| **About** | "Elegant digital wedding templates for your forever. Customize colors, fonts, and text — then download print-ready PDFs instantly. DIY wedding stationery designed by professionals." |
| **Location** | Your business address or remote |

### Step 3: Business Details
- **Industry:** Weddings & Events
- **Business size:** 1 employee (solo founder / small team)
- **Main focus:** Digital products

---

## 2. Claim & Verify Website

### Why Claim Your Website
- Enables Pinterest Analytics for your content
- Rich Pins (metadata from your site appears on pins)
- Verified checkmark on profile

### Steps
1. From your Pinterest business profile, go to **Settings → Claimed accounts**
2. Click **Claim website**
3. Choose **Add meta tag** method
4. Copy the provided `<meta>` tag (looks like `<meta name="p:domain_verify" content="..."/>`)
5. Add it to the storefront's `index.html` `<head>` section
6. Deploy the updated storefront
7. Back on Pinterest, click **Submit** to verify

**Already done:** The meta tag placeholder is in `/home/team/shared/storefront/index.html` at line ~70:
```html
<meta name="p:domain_verify" content="REPLACE_WITH_PINTEREST_TAG" />
```
Replace `REPLACE_WITH_PINTEREST_TAG` with the actual verification code from Pinterest.

### Enable Rich Pins
1. After domain verification, go to [Rich Pins Validator](https://developers.pinterest.com/tools/url-debugger/)
2. Enter a product page URL from the storefront
3. Pinterest validates the Open Graph / Schema.org metadata
4. Once validated, all pins from your domain will display Rich Pin info automatically

**Note:** Structured data is already implemented in `index.html` (Product schema, OG tags).

---

## 3. Set Up Board Strategy

Create the following **5 boards** (start with these — expand per the full marketing strategy):

| # | Board Name | Description | Keywords | Initial Pins |
|---|---|---|---|---|
| 1 | **Classic Gold & Navy Wedding Invitations** | Timeless formal wedding stationery with gold foil, champagne tones, and navy accents | Gold wedding invitations, classic wedding stationery, navy wedding | Save the Date Classic, Invitation Classic, RSVP Classic, Thank You Classic |
| 2 | **Modern Minimalist Wedding Ideas** | Clean, contemporary black and white wedding invitations and stationery | Minimalist wedding, black and white invitations, modern wedding | Save the Date Minimalist, Invitation Minimalist |
| 3 | **Boho Wildflower Wedding Stationery** | Earthy, organic wedding invitations with wildflower and nature-inspired designs | Boho wedding invitations, wildflower wedding, rustic wedding | Save the Date Boho, Invitation Boho |
| 4 | **Black Tie & Noir Wedding Inspiration** | Dramatic black and white wedding stationery for formal black-tie affairs | Black tie wedding, noir wedding, dramatic invitations | Save the Date Noir, Invitation Noir, RSVP Noir |
| 5 | **DIY Wedding Invitations & Templates** | Editable, printable wedding templates you can design yourself | DIY wedding invitations, printable invitations, wedding templates | All templates, how-to content |

### Board Settings
- **Secret board:** No (all public)
- **Collaborators:** Invite team members as needed
- **Cover image:** Use the best-performing pin for each board

---

## 4. Pin Scheduling — First Week Assets

### Available Assets
All template preview images are in `/home/team/shared/templates/`:

| File | Description |
|---|---|
| `save_the_date_classic.png` | Classic Gold Save the Date |
| `invitation_classic.png` | Classic Gold Invitation |
| `rsvp_classic.png` | Classic Gold RSVP |
| `thank_you_classic.png` | Classic Gold Thank You |
| `save_the_date_minimalist.png` | Modern Minimalist Save the Date |
| `invitation_minimalist.png` | Modern Minimalist Invitation |
| `rsvp_minimalist.png` | Modern Minimalist RSVP |
| `thank_you_minimalist.png` | Modern Minimalist Thank You |
| `save_the_date_boho.png` | Wildflower Boho Save the Date |
| `invitation_boho.png` | Wildflower Boho Invitation |
| `rsvp_boho.png` | Wildflower Boho RSVP |
| `thank_you_boho.png` | Wildflower Boho Thank You |
| `save_the_date_noir.png` | Classic Noir Save the Date |
| `invitation_noir.png` | Classic Noir Invitation |
| `rsvp_noir.png` | Classic Noir RSVP |
| `thank_you_noir.png` | Classic Noir Thank You |

Marketing-specific pin assets in `/home/team/shared/marketing/assets/`:
- `pin_classic_1.png`
- `pin_classic_2.png`
- `pin_classic_3.png`

### First Week Pin Schedule (7 days × 2-3 pins/day)

#### Day 1 — Brand Launch
| Pin | Board | Image Source |
|---|---|---|
| Classic Elegance Save the Date | Classic Gold & Navy Wedding Invitations | `save_the_date_classic.png` |
| "Meet Ever After Digital" brand pin | DIY Wedding Invitations | `pin_classic_1.png` |

#### Day 2 — Style Showcase
| Pin | Board | Image Source |
|---|---|---|
| Modern Minimalist Save the Date | Modern Minimalist Wedding Ideas | `save_the_date_minimalist.png` |
| Modern Minimalist Invitation | Modern Minimalist Wedding Ideas | `invitation_minimalist.png` |

#### Day 3 — Boho Collection
| Pin | Board | Image Source |
|---|---|---|
| Wildflower Boho Save the Date | Boho Wildflower Wedding Stationery | `save_the_date_boho.png` |
| Wildflower Boho Invitation | Boho Wildflower Wedding Stationery | `invitation_boho.png` |

#### Day 4 — Noir Collection
| Pin | Board | Image Source |
|---|---|---|
| Classic Noir Save the Date | Black Tie & Noir Wedding Inspiration | `save_the_date_noir.png` |
| Classic Noir Invitation | Black Tie & Noir Wedding Inspiration | `invitation_noir.png` |
| Classic Noir RSVP | Black Tie & Noir Wedding Inspiration | `rsvp_noir.png` |

#### Day 5 — Classic Collection Deep Dive
| Pin | Board | Image Source |
|---|---|---|
| Classic Elegance Invitation | Classic Gold & Navy Wedding Invitations | `invitation_classic.png` |
| Classic Elegance RSVP | Classic Gold & Navy Wedding Invitations | `rsvp_classic.png` |
| Classic Elegance Thank You | Classic Gold & Navy Wedding Invitations | `thank_you_classic.png` |

#### Day 6 — About / Brand Pin
| Pin | Board | Image Source |
|---|---|---|
| Classic Elegance full suite collage | DIY Wedding Invitations | `pin_classic_2.png` (or create collage) |
| Boho RSVP Card | Boho Wildflower Wedding Stationery | `rsvp_boho.png` |

#### Day 7 — Bundle Highlight
| Pin | Board | Image Source |
|---|---|---|
| "Full Wedding Suite from $24" | DIY Wedding Invitations | `pin_classic_3.png` |
| Minimalist RSVP + Thank You pair | Modern Minimalist Wedding Ideas | `rsvp_minimalist.png`, `thank_you_minimalist.png` |

### Pin Title & Description Template
Use this formula for EVERY pin:

```
Title: [Style Name] [Template Type] — Customizable Wedding Template | Ever After Digital
Description: Design your dream [style] wedding [template type] in minutes! ✨ Customize 
colors, fonts & text online. Download print-ready PDF instantly. 
Perfect for [occasion] weddings.

👉 Click to design yours: [link to customization engine or storefront]

#WeddingInvitations #[Style]Wedding #DIYWedding #WeddingTemplates
```

**Example:**
```
Title: Classic Elegance Save the Date — Customizable Gold Wedding Template | Ever After Digital
Description: Design your dream classic wedding save the date in minutes! ✨ Customize 
colors, fonts & text online. Download print-ready PDF instantly. 
Perfect for formal weddings with gold and navy.

👉 Click to design yours: www.everafterdigital.com

#WeddingInvitations #ClassicWedding #GoldWedding #DIYWedding #WeddingTemplates
```

---

## 5. Pin Image Optimization

### Recommended Format
- **Dimensions:** 1000 × 1500px (2:3 aspect ratio — Pinterest's preferred)
- **Format:** PNG (high quality)
- **Max file size:** 20MB

### If Existing PNGs Need Resizing
Use a tool like Canva or Photoshop to:
1. Resize template PNGs to 1000 × 1500px
2. Add subtle branding overlay (Ever After Digital logo watermark in corner)
3. Add a thin border or shadow to make the card "pop" off the pin background

### Text Overlay Best Practices
- Keep text limited to 20% of image area
- Use Playfair Display (serif) for elegance or Montserrat (sans-serif) for modern
- Gold (#D4AF37) on light backgrounds or white on dark backgrounds
- Include one clear call-to-action: "Customize Yours →"

---

## 6. Scheduling Tools

### Free Option: Native Pinterest Scheduler
- Max 10 pins scheduled at a time per board
- Schedule directly from the pin creation modal
- No additional cost

### Recommended: Tailwind
- Free 14-day trial
- SmartSchedule: auto-selects best posting times
- Pin preview, bulk upload, and analytics
- After trial: $9.99/month (worth it for daily pinning)

### Setup in Tailwind
1. Connect Pinterest account
2. Upload images in batches
3. Write titles/descriptions (use the template above)
4. Assign to boards
5. Set schedule: 3 pins/day, spaced 3-4 hours apart

---

## 7. Pinterest Ads (Optional — First Week)

If you have budget ($50-$100), run a small test:

| Ad Type | Target | Budget | Duration |
|---|---|---|---|
| **Promoted Pin** | Best-performing organic pin from Day 1 | $10/day | 5 days |
| **Targeting** | Women 25-35, Engaged, Interest: Wedding Planning | — | — |
| **Goal** | Link clicks → Storefront visits | — | — |

After the test, review:
- Click-through rate (target: >1.5%)
- Cost per click (target: <$0.50)
- Conversion rate to email signup (target: >3%)

---

## 8. Weekly Maintenance Checklist

- [ ] Pin 3-5 new pins daily (fresh content = better reach)
- [ ] Respond to comments on your pins
- [ ] Repin 2-3 relevant pins from others (curation builds community)
- [ ] Check Pinterest Analytics for top-performing pins
- [ ] Review search term reports — optimize pin titles for what's trending
- [ ] Add 1 new board every 2 weeks as content grows

---

## 9. Measuring Success (First 30 Days)

| Metric | Target |
|---|---|
| Total Impressions | 50,000+ |
| Total Saves (pins saved) | 500+ |
| Link Clicks | 200+ |
| Outbound Click Rate | >1% |
| Followers | 200+ |
| Website Sessions from Pinterest | 150+ |

Track these via **Pinterest Analytics** → Overview dashboard.

---

*This guide corresponds to the Pinterest strategy outlined in `/home/team/shared/growth/marketing_strategy.md` (Section 4).*