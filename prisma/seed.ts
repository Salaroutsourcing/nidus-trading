import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { b2bCategories, b2bProducts, buildB2BDescription } from "./catalog-b2b";
import { resolveGallery } from "./image-map";

const prisma = new PrismaClient();

/**
 * Catalog seed for Nidus Trading (inquiry/quote-driven).
 *
 * Focus: high-margin, specialized, often import-restricted IT & industrial
 * hardware for government tender suppliers and enterprise procurement in
 * Pakistan. Low-margin commodity lines (generic fasteners, V-belts, ball
 * bearings, caster wheels, raw MS stock) have been phased out.
 *
 * Prices are kept in DB for admin/internal use but are NOT shown on the
 * public site.
 *
 * Reset & re-seed (Neon / production):
 *   DATABASE_URL="..." npx prisma db seed
 * Or: npm run db:seed
 */

const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

/** SKUs pushed as homepage best sellers. */
const bestSellerSlugs = new Set(
  b2bProducts.filter((p) => p.bestSeller).map((p) => p.slug)
);
/** SKUs featured across the site. */
const featuredSlugs = new Set(
  b2bProducts.filter((p) => p.featured).map((p) => p.slug)
);

const blogPosts = [
  {
    title:
      "Specifying Industrial Managed Switches for Government & Utility Networks in Pakistan",
    slug: "industrial-managed-switch-buying-guide-pakistan",
    excerpt:
      "IEC 61850, ring redundancy, PoE budget and temperature rating — what to confirm before tendering managed industrial switches.",
    content: `Industrial networks fail differently than office LANs — temperature, vibration, and power disturbances all matter. For substations, transport, and utility SCADA, the switch specification decides whether a network survives.

## Confirm before you tender
1. Redundancy protocol and recovery time (Turbo Ring, RSTP, PRP/HSR)
2. Certifications — IEC 61850-3 / IEEE 1613 for power substations
3. PoE budget and number of powered devices
4. Operating temperature range and power input (12/24/48 VDC)
5. Fiber uplinks — SFP/SFP+ count and reach

Nidus Trading supplies Moxa and Cisco IE managed switches, optical transceivers, and armored fiber with datasheets and origin documentation. Browse [Industrial Networking & Telecommunications](/products?category=industrial-networking-telecom) or [request a quote](/inquiry).`,
    tags: ["managed industrial switch Pakistan", "IEC 61850", "Moxa switch"],
    metaTitle: "Industrial Managed Switch Buying Guide | Pakistan | Nidus Trading",
    metaDesc:
      "How to specify industrial managed switches for utility and government networks in Pakistan — redundancy, IEC 61850, PoE. Nidus Trading.",
    coverImage: u("photo-1544197150-b99a5804efb6", 1400),
  },
  {
    title: "LTO-8 vs LTO-9 Tape: Building an Air-Gapped Backup Strategy",
    slug: "lto-8-lto-9-tape-backup-strategy",
    excerpt:
      "Why enterprises and government archives still rely on LTO tape for ransomware-resistant, long-term retention.",
    content: `Ransomware and compliance mandates have renewed demand for offline, air-gapped storage. LTO tape remains the most cost-effective medium for long-term retention.

## Key considerations
- Capacity: LTO-8 (12TB native) vs LTO-9 (18TB native)
- Air-gap: offline cartridges resist ransomware
- Encryption: hardware AES-256 at rest
- Interface: SAS vs FC library integration
- Cartridge lifecycle and retention policy

Nidus Trading supplies HPE and IBM LTO-8/9 drives, cartridges, RAID controllers, and redundant server PSUs for enterprise and government data centers. Browse [Enterprise Server, Storage & Data Center Hardware](/products?category=enterprise-server-storage) or [request a quote](/inquiry).`,
    tags: ["LTO-8 Pakistan", "LTO-9 tape", "enterprise backup"],
    metaTitle: "LTO-8 vs LTO-9 Tape Backup Strategy | Nidus Trading Pakistan",
    metaDesc:
      "LTO-8 vs LTO-9 comparison for air-gapped enterprise backup in Pakistan. Capacity, encryption, and retention. Nidus Trading.",
    coverImage: u("photo-1597872200969-2b65d56bd16b", 1400),
  },
  {
    title: "OTDR Testing for Fiber Acceptance: What Tender Evaluators Expect",
    slug: "otdr-fiber-acceptance-testing-guide",
    excerpt:
      "Dynamic range, event analysis, and bi-directional testing — how to certify fiber links for government and telecom projects.",
    content: `Fiber acceptance testing determines whether a link passes handover. An OTDR trace is the evidence tender evaluators rely on.

## Best practices
- Match OTDR dynamic range to link length
- Use launch/receive fibers for end-connector visibility
- Perform bi-directional testing on backbone links
- Keep pulse-width appropriate to resolution vs range
- Archive traces and pass/fail reports for QA

Nidus Trading supplies VIAVI and EXFO OTDRs, fusion-splicer consumables, thermal imagers, and power-quality analyzers with calibration certificates. Browse [Precision Test, Measurement & Calibration](/products?category=test-measurement-calibration) or [request a quote](/inquiry).`,
    tags: ["OTDR Pakistan", "fiber acceptance testing", "VIAVI OTDR"],
    metaTitle: "OTDR Fiber Acceptance Testing Guide | Pakistan | Nidus Trading",
    metaDesc:
      "OTDR testing best practices for fiber acceptance on government and telecom projects in Pakistan. Nidus Trading.",
    coverImage: u("photo-1591808216268-ce0b82787efe", 1400),
  },
  {
    title:
      "Sizing a 3-Phase Online UPS and 48V LiFePO4 Backup for Critical Sites",
    slug: "3-phase-ups-lifepo4-sizing-guide",
    excerpt:
      "Load profiling, runtime, and battery chemistry — how to specify resilient power for data centers and telecom sites.",
    content: `Downtime at a data center or telecom site is expensive. Correct UPS and battery sizing is the foundation of resilient power.

## Confirm before you buy
1. Critical load (kW/kVA) and power factor
2. Required autonomy (runtime) at full load
3. Topology — online double-conversion (VFI) for sensitive loads
4. Battery chemistry — LiFePO4 vs VRLA (cycle life, footprint)
5. Surge protection coordination (Type 1+2 SPDs)

Nidus Trading supplies APC, Vertiv, and Eaton 3-phase UPS, Pylontech 48V LiFePO4 ESS, and DEHN/Phoenix Contact SPDs. Browse [Power Quality & Backup Infrastructure](/products?category=power-quality-backup) or [request a quote](/inquiry).`,
    tags: ["3 phase UPS Pakistan", "LiFePO4 ESS", "surge protection"],
    metaTitle: "3-Phase UPS & LiFePO4 Backup Sizing Guide | Pakistan | Nidus Trading",
    metaDesc:
      "How to size a 3-phase online UPS and 48V LiFePO4 backup for critical sites in Pakistan. Nidus Trading.",
    coverImage: u("photo-1621905252507-b35492cc74b4", 1400),
  },
];

async function main() {
  console.log("Seeding Nidus Trading database (B2B high-margin catalog)...");

  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.inquiry.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  const adminPassword = await bcrypt.hash(
    process.env.ADMIN_PASSWORD || "Admin@Nidus2026",
    10
  );
  const customerPassword = await bcrypt.hash("Customer@123", 10);

  await prisma.user.create({
    data: {
      name: "Nidus Admin",
      email: (process.env.ADMIN_EMAIL || "admin@nidustrading.com").toLowerCase(),
      password: adminPassword,
      role: "ADMIN",
      phone: "0349-0307920",
      company: "Nidus Trading",
    },
  });

  await prisma.user.create({
    data: {
      name: "Demo Customer",
      email: "customer@example.com",
      password: customerPassword,
      role: "CUSTOMER",
      phone: "0300-0000000",
      company: "Demo Industries",
    },
  });

  const categoryMap = new Map<string, string>();
  for (const cat of b2bCategories) {
    const { subcategories: _subcategories, ...categoryData } = cat;
    void _subcategories;
    const created = await prisma.category.create({ data: categoryData });
    categoryMap.set(cat.slug, created.id);
  }

  for (const p of b2bProducts) {
    const categoryId = categoryMap.get(p.categorySlug);
    if (!categoryId) continue;
    const specifications = Object.fromEntries(
      p.specs.map((s) => [s.name, s.value])
    );
    const images = resolveGallery(p.slug, p.categorySlug);
    await prisma.product.create({
      data: {
        name: p.title,
        slug: p.slug,
        description: buildB2BDescription(p),
        shortDesc: p.shortDesc,
        sku: p.sku,
        price: 1, // internal placeholder; prices are never shown publicly
        stock: p.stock,
        brand: p.brand,
        featured: featuredSlugs.has(p.slug),
        bestSeller: bestSellerSlugs.has(p.slug),
        tags: JSON.stringify(p.tags),
        specifications: JSON.stringify(specifications),
        images: JSON.stringify(images),
        mpn: p.mpn,
        hsCode: p.hsCode,
        countryOfOrigin: p.countryOfOrigin,
        datasheetUrl: p.datasheetUrl,
        certifications: JSON.stringify(p.certifications ?? []),
        warrantyPeriod: p.warrantyPeriod,
        categoryId,
      },
    });
  }

  for (const post of blogPosts) {
    await prisma.blogPost.create({
      data: {
        ...post,
        tags: JSON.stringify(post.tags),
        published: true,
        publishedAt: new Date(),
        author: "Nidus Trading",
      },
    });
  }

  const sampleProducts = await prisma.product.findMany({ take: 2 });
  if (sampleProducts.length) {
    await prisma.order.create({
      data: {
        orderNumber: "NT-DEMO-1001",
        customerName: "Demo Customer",
        customerEmail: "customer@example.com",
        customerPhone: "0300-0000000",
        company: "Demo Industries",
        shippingAddress: "Industrial Area, Plot 12",
        city: "Lahore",
        status: "PROCESSING",
        subtotal: 0,
        discount: 0,
        tax: 0,
        shipping: 0,
        total: 0,
        notes: "Quote request sample — please call before delivery",
        items: {
          create: sampleProducts.map((sp, idx) => ({
            productId: sp.id,
            name: sp.name,
            sku: sp.sku,
            price: 0,
            quantity: idx + 1,
            total: 0,
          })),
        },
      },
    });
  }

  console.log("Seed complete.");
  console.log(
    `Categories: ${b2bCategories.length}, Products: ${b2bProducts.length} (B2B high-margin focus)`
  );
  console.log("Admin: admin@nidustrading.com / Admin@Nidus2026");
  console.log("Customer: customer@example.com / Customer@123");
  console.log("Track demo quote: NT-DEMO-1001");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
