import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const categories = [
  {
    name: "Electronic Components",
    slug: "electronic-components",
    description: "Resistors, capacitors, semiconductors, ICs, sensors and more.",
    icon: "Cpu",
    featured: true,
    sortOrder: 1,
  },
  {
    name: "Electrical Items",
    slug: "electrical-items",
    description: "Wiring, connectors, switches, circuit breakers and cables.",
    icon: "Zap",
    featured: true,
    sortOrder: 2,
  },
  {
    name: "IT & Computer Products",
    slug: "it-computer-products",
    description: "Servers, hardware, accessories, software licenses and networking.",
    icon: "Monitor",
    featured: true,
    sortOrder: 3,
  },
  {
    name: "Mechanical Items",
    slug: "mechanical-items",
    description: "Tools, bearings, gears, fasteners and welding products.",
    icon: "Cog",
    featured: true,
    sortOrder: 4,
  },
  {
    name: "MS Products",
    slug: "ms-products",
    description: "Mild steel sheets, plates, pipes, angles and channels.",
    icon: "Layers",
    featured: true,
    sortOrder: 5,
  },
  {
    name: "Wooden Items",
    slug: "wooden-items",
    description: "Furniture, fixtures and custom wooden products.",
    icon: "TreePine",
    featured: false,
    sortOrder: 6,
  },
  {
    name: "Paint Items",
    slug: "paint-items",
    description: "Auto paint, industrial paint and building pre-paint products.",
    icon: "Paintbrush",
    featured: false,
    sortOrder: 7,
  },
  {
    name: "Hardware Items",
    slug: "hardware-items",
    description: "Complete range of industrial and commercial hardware.",
    icon: "Wrench",
    featured: true,
    sortOrder: 8,
  },
  {
    name: "Caster Wheels",
    slug: "caster-wheels",
    description: "Heavy duty industrial caster wheels – all types and sizes.",
    icon: "CircleDot",
    featured: true,
    sortOrder: 9,
  },
  {
    name: "Safety & Lifting Equipment",
    slug: "safety-lifting-equipment",
    description: "Steel wire ropes, rigging hardware and safety gear.",
    icon: "Shield",
    featured: true,
    sortOrder: 10,
  },
  {
    name: "Automation & Control Systems",
    slug: "automation-control-systems",
    description: "PLC, relays, VFDs and robotics components.",
    icon: "Bot",
    featured: true,
    sortOrder: 11,
  },
  {
    name: "Renewable Energy Products",
    slug: "renewable-energy-products",
    description: "Solar panels, inverters, batteries and charge controllers.",
    icon: "Sun",
    featured: true,
    sortOrder: 12,
  },
  {
    name: "Power Backup Solutions",
    slug: "power-backup-solutions",
    description: "UPS, generators and voltage stabilizers.",
    icon: "BatteryCharging",
    featured: true,
    sortOrder: 13,
  },
  {
    name: "Tools & Measuring Instruments",
    slug: "tools-measuring-instruments",
    description: "Power tools, hand tools and precision instruments.",
    icon: "Ruler",
    featured: true,
    sortOrder: 14,
  },
];

type SeedProduct = {
  name: string;
  categorySlug: string;
  price: number;
  discountPrice?: number;
  stock: number;
  brand: string;
  featured?: boolean;
  bestSeller?: boolean;
  shortDesc: string;
  description: string;
  tags: string[];
  specifications: Record<string, string>;
};

const products: SeedProduct[] = [
  {
    name: "Heavy Duty Industrial Caster Wheel 6 inch",
    categorySlug: "caster-wheels",
    price: 4500,
    discountPrice: 3990,
    stock: 120,
    brand: "NidusPro",
    featured: true,
    bestSeller: true,
    shortDesc: "Swivel caster with brake for industrial carts and machinery.",
    description:
      "Premium heavy duty industrial caster wheel engineered for warehouses, factories and logistics. Suitable for continuous load applications across Pakistan industries.",
    tags: ["industrial caster wheels Pakistan", "heavy duty caster", "warehouse wheels"],
    specifications: {
      Diameter: "6 inch",
      "Load Capacity": "350 kg",
      Material: "Polyurethane on cast iron",
      Mount: "Top plate with brake",
    },
  },
  {
    name: "Mild Steel Plate 6mm",
    categorySlug: "ms-products",
    price: 18500,
    stock: 40,
    brand: "SteelForge",
    featured: true,
    bestSeller: true,
    shortDesc: "Structural MS plate suitable for fabrication and construction.",
    description:
      "High-quality mild steel plates for fabrication shops, construction and industrial frameworks. Competitive mild steel plates price with reliable thickness tolerance.",
    tags: ["mild steel plates price", "MS plate", "fabrication steel"],
    specifications: {
      Thickness: "6 mm",
      Grade: "A36 equivalent",
      Finish: "Hot rolled",
      Size: "4x8 ft typical",
    },
  },
  {
    name: "Arduino Compatible Sensor Kit",
    categorySlug: "electronic-components",
    price: 6500,
    discountPrice: 5790,
    stock: 85,
    brand: "ElectroLab",
    featured: true,
    bestSeller: true,
    shortDesc: "37-in-1 sensor pack for prototyping and education.",
    description:
      "Complete electronic components sensor kit for makers, universities and R&D labs. Ideal starter pack from a trusted electronic components supplier.",
    tags: ["electronic components supplier", "sensor kit", "Arduino"],
    specifications: {
      Pieces: "37 modules",
      Compatibility: "Arduino / ESP",
      Includes: "Ultrasonic, DHT, IR, relay",
    },
  },
  {
    name: "MCB Circuit Breaker 32A 2P",
    categorySlug: "electrical-items",
    price: 1850,
    stock: 200,
    brand: "PowerSafe",
    featured: true,
    bestSeller: true,
    shortDesc: "DIN-rail miniature circuit breaker for distribution boards.",
    description:
      "Reliable 32A double-pole MCB for residential and commercial electrical panels with high breaking capacity.",
    tags: ["circuit breaker", "MCB", "electrical"],
    specifications: {
      Current: "32A",
      Poles: "2P",
      Curve: "C",
      Mount: "DIN rail",
    },
  },
  {
    name: "Cat6 Networking Cable 305m Box",
    categorySlug: "it-computer-products",
    price: 22000,
    discountPrice: 19900,
    stock: 30,
    brand: "NetLink",
    featured: true,
    shortDesc: "Pure copper Cat6 LAN cable for structured cabling.",
    description:
      "High-performance Cat6 networking cable for offices, data rooms and industrial networks.",
    tags: ["networking", "Cat6", "LAN cable"],
    specifications: {
      Length: "305 m",
      Category: "Cat6",
      Conductor: "Pure copper",
      Jacket: "PVC",
    },
  },
  {
    name: "Deep Groove Ball Bearing 6205",
    categorySlug: "mechanical-items",
    price: 950,
    stock: 500,
    brand: "MechaRoll",
    bestSeller: true,
    shortDesc: "Precision bearing for motors and machinery.",
    description:
      "Standard 6205 deep groove ball bearing for industrial motors, conveyors and mechanical assemblies.",
    tags: ["bearing", "mechanical", "6205"],
    specifications: {
      Model: "6205",
      "Inner Dia": "25 mm",
      "Outer Dia": "52 mm",
      Width: "15 mm",
    },
  },
  {
    name: "PLC Relay Module 8 Channel 24V",
    categorySlug: "automation-control-systems",
    price: 7800,
    stock: 60,
    brand: "AutoCtrl",
    featured: true,
    shortDesc: "Industrial relay board for PLC and control panels.",
    description:
      "8-channel 24V relay module designed for automation panels, PLC IO expansion and machine control.",
    tags: ["PLC", "relay", "automation"],
    specifications: {
      Channels: "8",
      Voltage: "24V DC",
      Isolation: "Optocoupler",
      Mount: "DIN / panel",
    },
  },
  {
    name: "Solar Panel 550W Mono Perc",
    categorySlug: "renewable-energy-products",
    price: 42000,
    discountPrice: 38900,
    stock: 25,
    brand: "SunPeak",
    featured: true,
    bestSeller: true,
    shortDesc: "High-efficiency monocrystalline solar module.",
    description:
      "550W mono PERC solar panel for residential and commercial renewable energy installations across Pakistan.",
    tags: ["solar panel", "renewable energy", "550W"],
    specifications: {
      Power: "550W",
      Type: "Mono PERC",
      Efficiency: "21%+",
      Warranty: "12 years product",
    },
  },
  {
    name: "Online UPS 3kVA",
    categorySlug: "power-backup-solutions",
    price: 125000,
    stock: 12,
    brand: "PowerKeep",
    featured: true,
    shortDesc: "True online UPS for servers and critical loads.",
    description:
      "3kVA online UPS with pure sine wave output for IT rooms, clinics and industrial control systems.",
    tags: ["UPS", "power backup", "3kVA"],
    specifications: {
      Capacity: "3kVA",
      Topology: "Online double conversion",
      Output: "Pure sine wave",
      Runtime: "Depends on battery bank",
    },
  },
  {
    name: "Digital Vernier Caliper 150mm",
    categorySlug: "tools-measuring-instruments",
    price: 4200,
    discountPrice: 3650,
    stock: 75,
    brand: "PrecisMeasure",
    bestSeller: true,
    shortDesc: "Stainless steel digital caliper with LCD display.",
    description:
      "Precision measuring instrument for workshops, QC labs and fabrication floors.",
    tags: ["vernier caliper", "measuring instruments", "precision tools"],
    specifications: {
      Range: "0-150 mm",
      Resolution: "0.01 mm",
      Material: "Stainless steel",
      Power: "Button cell",
    },
  },
  {
    name: "Steel Wire Rope 12mm",
    categorySlug: "safety-lifting-equipment",
    price: 980,
    stock: 300,
    brand: "LiftSafe",
    featured: true,
    shortDesc: "Galvanized lifting wire rope sold per meter.",
    description:
      "Durable galvanized steel wire rope for cranes, winches and industrial lifting applications.",
    tags: ["steel wire rope", "lifting", "rigging"],
    specifications: {
      Diameter: "12 mm",
      Construction: "6x19",
      Finish: "Galvanized",
      Unit: "Per meter",
    },
  },
  {
    name: "Industrial Epoxy Floor Paint 20L",
    categorySlug: "paint-items",
    price: 28500,
    stock: 18,
    brand: "CoatMax",
    shortDesc: "High-build epoxy coating for factory floors.",
    description:
      "Chemical-resistant industrial epoxy paint for warehouses, workshops and production areas.",
    tags: ["industrial paint", "epoxy", "floor coating"],
    specifications: {
      Pack: "20 liters",
      Type: "2K Epoxy",
      Finish: "Semi-gloss",
      Coverage: "~5 m²/L",
    },
  },
  {
    name: "Hex Bolt Set M10 Assorted",
    categorySlug: "hardware-items",
    price: 3200,
    stock: 150,
    brand: "FixAll",
    bestSeller: true,
    shortDesc: "Assorted M10 hex bolts with nuts and washers.",
    description:
      "Workshop-ready hardware assortment for maintenance teams and fabricators.",
    tags: ["hardware", "hex bolts", "fasteners"],
    specifications: {
      Size: "M10",
      Material: "Grade 8.8",
      Finish: "Zinc plated",
      Pack: "Assorted lengths",
    },
  },
  {
    name: "Custom Workshop Workbench Top",
    categorySlug: "wooden-items",
    price: 18500,
    stock: 10,
    brand: "WoodCraft NT",
    shortDesc: "Hardwood workbench top for industrial benches.",
    description:
      "Custom wooden workbench tops for workshops, labs and assembly stations. Built to order on request.",
    tags: ["wooden items", "workbench", "custom wood"],
    specifications: {
      Material: "Hardwood laminate",
      Size: "Custom",
      Thickness: "40 mm",
      Finish: "Oil sealed",
    },
  },
];

const blogPosts = [
  {
    title: "Industrial Caster Wheels in Pakistan: How to Choose the Right Load Rating",
    slug: "industrial-caster-wheels-pakistan-guide",
    excerpt:
      "A practical buying guide for warehouses and factories selecting heavy duty caster wheels.",
    // SEO: target "industrial caster wheels Pakistan"
    content: `Selecting the right industrial caster wheels Pakistan operations depend on load rating, floor type and duty cycle.

## Key factors
- Dynamic vs static load
- Swivel vs rigid configuration
- Brake and lock requirements
- Polyurethane vs rubber tread

Nidus Trading supplies heavy duty industrial caster wheels in multiple diameters for carts, racks and machinery bases.

## Internal linking strategy
Link from this article to the Caster Wheels category page and best-seller product pages to strengthen topical authority.`,
    tags: ["industrial caster wheels Pakistan", "warehouse equipment"],
    metaTitle: "Industrial Caster Wheels Pakistan | Buying Guide | Nidus Trading",
    metaDesc:
      "Learn how to choose heavy duty industrial caster wheels in Pakistan. Load ratings, materials and supplier tips from Nidus Trading.",
    coverImage: "/images/blog-casters.svg",
  },
  {
    title: "Electronic Components Supplier Checklist for Procurement Teams",
    slug: "electronic-components-supplier-checklist",
    excerpt:
      "What B2B buyers should verify before sourcing resistors, ICs, sensors and more.",
    content: `Working with a reliable electronic components supplier reduces downtime and counterfeit risk.

## Checklist
1. Traceable SKUs and datasheets
2. Stock visibility
3. MOQ flexibility for prototypes and bulk
4. Fast quotation turnaround

Nidus Trading supports both prototype labs and production procurement with competitive pricing.`,
    tags: ["electronic components supplier", "procurement"],
    metaTitle: "Electronic Components Supplier Checklist | Nidus Trading",
    metaDesc:
      "Procurement checklist for sourcing electronic components in Pakistan. Quality, stock and quotation tips from Nidus Trading.",
    coverImage: "/images/blog-electronics.svg",
  },
  {
    title: "Mild Steel Plates Price Factors Every Fabricator Should Know",
    slug: "mild-steel-plates-price-factors",
    excerpt:
      "Understand what drives mild steel plates price and how to plan purchases smarter.",
    content: `Mild steel plates price fluctuates with grade, thickness, finish and market demand.

## Cost drivers
- Thickness and cut size
- Hot-rolled vs processed plates
- Delivery location
- Order volume

Request a quote from Nidus Trading for current MS plate availability and bulk pricing.`,
    tags: ["mild steel plates price", "MS products"],
    metaTitle: "Mild Steel Plates Price Guide | Nidus Trading",
    metaDesc:
      "What affects mild steel plates price in Pakistan? Thickness, grade, volume and logistics explained by Nidus Trading.",
    coverImage: "/images/blog-steel.svg",
  },
];

function skuFromName(name: string, index: number) {
  const base = name
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "")
    .slice(0, 10);
  return `NT-${base}-${String(index + 1).padStart(3, "0")}`;
}

function slugFromName(name: string) {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function main() {
  console.log("Seeding Nidus Trading database...");

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
  for (const cat of categories) {
    const created = await prisma.category.create({ data: cat });
    categoryMap.set(cat.slug, created.id);
  }

  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    const categoryId = categoryMap.get(p.categorySlug);
    if (!categoryId) continue;
    await prisma.product.create({
      data: {
        name: p.name,
        slug: slugFromName(p.name),
        description: p.description,
        shortDesc: p.shortDesc,
        sku: skuFromName(p.name, i),
        price: p.price,
        discountPrice: p.discountPrice,
        stock: p.stock,
        brand: p.brand,
        featured: p.featured ?? false,
        bestSeller: p.bestSeller ?? false,
        tags: JSON.stringify(p.tags),
        specifications: JSON.stringify(p.specifications),
        images: JSON.stringify([`/images/products/product-${(i % 6) + 1}.svg`]),
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
        subtotal: 10000,
        discount: 500,
        tax: 0,
        shipping: 300,
        total: 9800,
        notes: "Please call before delivery",
        items: {
          create: sampleProducts.map((sp, idx) => ({
            productId: sp.id,
            name: sp.name,
            sku: sp.sku,
            price: sp.discountPrice ?? sp.price,
            quantity: idx + 1,
            total: (sp.discountPrice ?? sp.price) * (idx + 1),
          })),
        },
      },
    });
  }

  console.log("Seed complete.");
  console.log("Admin: admin@nidustrading.com / Admin@Nidus2026");
  console.log("Customer: customer@example.com / Customer@123");
  console.log("Track demo order: NT-DEMO-1001");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
