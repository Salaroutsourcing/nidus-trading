import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { extendedProducts, type ExtendedProduct } from "./catalog-extended";

const prisma = new PrismaClient();

/**
 * Compose the PDP `description` field from the rich extended-catalog entry.
 * The product detail page renders `description` with `whitespace-pre-line`,
 * so Applications and Features & Benefits appear as clean bulleted sections.
 */
function buildDescription(p: ExtendedProduct) {
  const apps = p.applications.map((a) => `• ${a}`).join("\n");
  const feats = p.features.map((f) => `• ${f}`).join("\n");
  return [
    p.longDesc,
    `Applications:\n${apps}`,
    `Features & Benefits:\n${feats}`,
    "Pricing: Price on Request — request a quote for the best price on project and bulk quantities.",
  ].join("\n\n");
}

/**
 * Catalog seed for Nidus Trading (inquiry/quote-driven).
 * Prices are kept in DB for admin/internal use but are NOT shown on the public site.
 *
 * Reset & re-seed (Neon / production):
 *   DATABASE_URL="..." npx prisma db seed
 * Or: npm run db:seed
 */

const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const categories = [
  {
    name: "Electronic Components",
    slug: "electronic-components",
    description:
      "Electronic components supplier range for Pakistan OEMs, repair shops, and R&D labs — resistors, capacitors, semiconductors, and labeled assortments. Request a quote for BOM fills and production packs.",
    icon: "Cpu",
    featured: true,
    sortOrder: 1,
    image: u("photo-1518770660439-4636190af475"),
  },
  {
    name: "Electrical Items",
    slug: "electrical-items",
    description:
      "Electrical items for industrial and commercial installations — copper wiring, breakers, connectors, and switchgear accessories. Ideal for contractors and plant maintenance teams seeking quote-based supply.",
    icon: "Zap",
    featured: true,
    sortOrder: 2,
    image: u("photo-1621905251189-08b45d6a269e"),
  },
  {
    name: "IT & Computer Products",
    slug: "it-computer-products",
    description:
      "Servers, software, hardware, and accessories for offices, data rooms, and industrial IT infrastructure.",
    icon: "Monitor",
    featured: true,
    sortOrder: 3,
    image: u("photo-1558494949-ef010cbdcc31"),
  },
  {
    name: "Mechanical Items",
    slug: "mechanical-items",
    description:
      "Tools, bearings, welding products, gears, fasteners, and other mechanical items for workshops and factories.",
    icon: "Cog",
    featured: true,
    sortOrder: 4,
    image: u("photo-1504917595217-d4dc5ebe6122"),
  },
  {
    name: "MS Products (Mild Steel)",
    slug: "ms-products",
    description:
      "Mild steel plates, sheets, and pipes for fabrication and construction across Pakistan. Confirm thickness, grade, and cut sizes — then request project pricing from Nidus Trading.",
    icon: "Layers",
    featured: true,
    sortOrder: 5,
    image: u("photo-1504328345606-18bbc8c9d7d1"),
  },
  {
    name: "Wooden Items",
    slug: "wooden-items",
    description:
      "Furniture, fixtures, and custom wooden products for commercial, industrial, and project fit-outs.",
    icon: "TreePine",
    featured: true,
    sortOrder: 6,
    image: u("photo-1616486338812-3dadae4b4ace"),
  },
  {
    name: "Paint Items",
    slug: "paint-items",
    description:
      "Auto paint, industrial paint, building paints, and pre-paint items for workshops, plants, and contractors.",
    icon: "Paintbrush",
    featured: true,
    sortOrder: 7,
    image: u("photo-1589939705384-5185137a7f0f"),
  },
  {
    name: "Hardware Items",
    slug: "hardware-items",
    description:
      "All types of hardware items for industrial maintenance, fabrication, and commercial projects in Pakistan.",
    icon: "Wrench",
    featured: true,
    sortOrder: 8,
    image: u("photo-1530124566582-a618bc2615dc"),
  },
  {
    name: "Caster Wheels",
    slug: "caster-wheels",
    description:
      "Heavy duty industrial caster wheels in multiple sizes and materials for carts, racks, and machinery bases. Compare load ratings via inquiry — we help match swivel, rigid, and locking options.",
    icon: "CircleDot",
    featured: true,
    sortOrder: 9,
    image: u("photo-1586528116311-ad8dd3c8310d"),
  },
  {
    name: "Safety & Lifting Equipment",
    slug: "safety-lifting-equipment",
    description:
      "Steel wire ropes, rigging hardware, and all types of safety items for lifting and industrial sites.",
    icon: "Shield",
    featured: true,
    sortOrder: 10,
    image: u("photo-1504307651254-35680f356dfd"),
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
  image: string;
};

const products: SeedProduct[] = [
  // Electronic Components
  {
    name: "Precision Metal Film Resistor Kit",
    categorySlug: "electronic-components",
    price: 1,
    stock: 200,
    brand: "ElectroLab",
    featured: true,
    bestSeller: true,
    shortDesc: "Assorted resistors for prototyping, repair, and production BOM fills.",
    description:
      "Complete metal film resistor assortment for electronics manufacturers, universities, and repair centers. Sourced as part of Nidus Trading’s electronic components supplier range for Pakistan OEMs and labs.\n\nEach kit is organized for quick picking on the bench or in stores. Share your preferred ohm ranges, tolerance, and pack size when requesting a quote — we support both prototype replenishment and production BOM fills. Related departments: Electrical Items and IT & Computer Products for complementary parts.",
    tags: ["electronic components supplier", "resistors Pakistan", "metal film resistor"],
    specifications: {
      Type: "Metal film",
      Tolerance: "1%",
      Range: "10Ω – 1MΩ",
      Pack: "Assorted kit",
    },
    image: u("photo-1555617981-dac3880eac6e"),
  },
  {
    name: "Electrolytic Capacitor Assortment",
    categorySlug: "electronic-components",
    price: 1,
    stock: 180,
    brand: "ElectroLab",
    featured: true,
    shortDesc: "Radial electrolytic capacitors for power supplies and control boards.",
    description:
      "Reliable electrolytic capacitor packs for SMPS, industrial controllers, and maintenance teams. Request a quote for bulk electronic components supply.",
    tags: ["capacitors", "electronic components", "power supply parts"],
    specifications: {
      Type: "Electrolytic",
      Voltage: "16V–50V mix",
      Mount: "Through-hole",
      Use: "Power & filtering",
    },
    image: u("photo-1597872200969-2b65d56bd16b"),
  },
  {
    name: "Semiconductor Diode & Transistor Pack",
    categorySlug: "electronic-components",
    price: 1,
    stock: 150,
    brand: "SemiCore",
    bestSeller: true,
    shortDesc: "Common diodes and transistors for industrial electronics repair.",
    description:
      "Semiconductor assortment covering rectifier diodes, switching transistors, and related parts for industrial electronics service and light manufacturing.",
    tags: ["semiconductors", "diodes", "transistors Pakistan"],
    specifications: {
      Includes: "1N400x, 2N2222 equivalents",
      Application: "Repair & OEM",
      Packaging: "Labeled bins",
    },
    image: u("photo-1518770660439-4636190af475", 1000),
  },
  // Electrical Items
  {
    name: "Industrial Copper Wiring Cable",
    categorySlug: "electrical-items",
    price: 1,
    stock: 90,
    brand: "PowerSafe",
    featured: true,
    bestSeller: true,
    shortDesc: "Multi-core copper wiring for panels, machines, and building distribution.",
    description:
      "Industrial-grade copper wiring cable for electrical contractors and plant maintenance. Part of Nidus Trading’s electrical items catalog serving Pakistan industry.",
    tags: ["electrical wiring Pakistan", "copper cable", "industrial electrical"],
    specifications: {
      Conductor: "Copper",
      Insulation: "PVC",
      Application: "Power & control",
      Supply: "Per meter / drum",
    },
    image: u("photo-1558618666-fcd25c85cd64"),
  },
  {
    name: "Industrial Connector Set",
    categorySlug: "electrical-items",
    price: 1,
    stock: 220,
    brand: "PowerSafe",
    shortDesc: "Heavy-duty connectors for control cabinets and machine wiring.",
    description:
      "Rugged electrical connectors for industrial panels, conveyors, and OEM machine builders. Quote-based supply for project quantities.",
    tags: ["electrical connectors", "panel connectors", "industrial plugs"],
    specifications: {
      Type: "Industrial multipole",
      Rating: "Project dependent",
      Mount: "Panel / inline",
    },
    image: u("photo-1473968512647-3e447244af8f"),
  },
  {
    name: "MCB Circuit Breaker 32A 2P",
    categorySlug: "electrical-items",
    price: 1,
    stock: 200,
    brand: "PowerSafe",
    featured: true,
    bestSeller: true,
    shortDesc: "DIN-rail miniature circuit breaker for distribution boards.",
    description:
      "Reliable 32A double-pole MCB for residential, commercial, and light industrial electrical panels with high breaking capacity. Switches and circuit breakers available on quote.",
    tags: ["circuit breakers Pakistan", "MCB", "electrical switches"],
    specifications: {
      Current: "32A",
      Poles: "2P",
      Curve: "C",
      Mount: "DIN rail",
    },
    image: u("photo-1621905252507-b35492cc74b4"),
  },
  // IT & Computer Products
  {
    name: "Rack Server Hardware Bundle",
    categorySlug: "it-computer-products",
    price: 1,
    stock: 15,
    brand: "NetLink",
    featured: true,
    bestSeller: true,
    shortDesc: "Server and rack accessories for data rooms and industrial IT.",
    description:
      "IT & computer products including server hardware and rack accessories for offices, clinics, and industrial control rooms. Request a quotation for your configuration.",
    tags: ["servers Pakistan", "IT hardware supplier", "rack server"],
    specifications: {
      Category: "Servers & hardware",
      Form: "Rack-mount ready",
      Support: "Quote-based config",
    },
    image: u("photo-1597872200969-2b65d56bd16b", 1100),
  },
  {
    name: "Enterprise Networking Switch",
    categorySlug: "it-computer-products",
    price: 1,
    stock: 40,
    brand: "NetLink",
    featured: true,
    shortDesc: "Managed switching hardware for structured office and plant networks.",
    description:
      "Network hardware for structured cabling projects — switches, accessories, and related IT products supplied to businesses across Pakistan.",
    tags: ["networking hardware", "network switch", "IT products Pakistan"],
    specifications: {
      Ports: "Gigabit class",
      Management: "Managed / smart",
      Use: "Office & industrial LAN",
    },
    image: u("photo-1544197150-b99a5804efb6"),
  },
  {
    name: "IT Accessories & Peripherals Pack",
    categorySlug: "it-computer-products",
    price: 1,
    stock: 80,
    brand: "NetLink",
    shortDesc: "Keyboards, cables, adapters and workstation accessories.",
    description:
      "Software licensing guidance plus hardware accessories for workstations and server rooms. Contact Nidus Trading for a tailored IT supply quote.",
    tags: ["computer accessories", "IT peripherals", "software hardware"],
    specifications: {
      Includes: "Cables, adapters, peripherals",
      Audience: "Offices & plants",
      Supply: "Mixed SKUs",
    },
    image: u("photo-1517694712202-14dd9538aa97"),
  },
  // Mechanical Items
  {
    name: "Deep Groove Ball Bearing 6205",
    categorySlug: "mechanical-items",
    price: 1,
    stock: 500,
    brand: "MechaRoll",
    featured: true,
    bestSeller: true,
    shortDesc: "Precision bearing for motors, conveyors, and machinery.",
    description:
      "Standard 6205 deep groove ball bearing for industrial motors, conveyors, and mechanical assemblies. Part of our mechanical items range including tools, bearings, and fasteners.",
    tags: ["industrial bearings Pakistan", "6205 bearing", "mechanical parts"],
    specifications: {
      Model: "6205",
      "Inner Dia": "25 mm",
      "Outer Dia": "52 mm",
      Width: "15 mm",
    },
    image: u("photo-1581092918056-0c4c3acd3789"),
  },
  {
    name: "Industrial Welding Consumables Kit",
    categorySlug: "mechanical-items",
    price: 1,
    stock: 70,
    brand: "WeldPro",
    featured: true,
    shortDesc: "Welding electrodes and accessories for fabrication shops.",
    description:
      "Welding products for mild steel fabrication and repair. Request quotes for project packs covering electrodes, tips, and related mechanical consumables.",
    tags: ["welding products Pakistan", "fabrication", "welding electrodes"],
    specifications: {
      Type: "SMAW consumables",
      Use: "MS fabrication",
      Supply: "Kit / bulk",
    },
    image: u("photo-1504328345606-18bbc8c9d7d1", 1000),
  },
  {
    name: "Industrial Gear & Fastener Assortment",
    categorySlug: "mechanical-items",
    price: 1,
    stock: 120,
    brand: "MechaRoll",
    bestSeller: true,
    shortDesc: "Gears, fasteners and workshop mechanical hardware.",
    description:
      "Gears, fasteners, and related mechanical items for maintenance teams and OEMs. Tools and measuring support available through Nidus Trading.",
    tags: ["gears", "fasteners", "mechanical tools Pakistan"],
    specifications: {
      Includes: "Gears & fasteners mix",
      Grade: "Industrial",
      Finish: "As specified",
    },
    image: u("photo-1530124566582-a618bc2615dc", 1000),
  },
  // MS Products
  {
    name: "Mild Steel Plate 6mm",
    categorySlug: "ms-products",
    price: 1,
    stock: 40,
    brand: "SteelForge",
    featured: true,
    bestSeller: true,
    shortDesc: "Structural mild steel plates for fabrication and construction.",
    description:
      "High-quality mild steel plates for fabrication shops, construction, and industrial frameworks across Pakistan. Request current availability and quote for thickness and cut size.",
    tags: ["mild steel plates Pakistan", "MS plate", "fabrication steel"],
    specifications: {
      Thickness: "6 mm",
      Grade: "A36 equivalent",
      Finish: "Hot rolled",
      Size: "4x8 ft typical",
    },
    image: u("photo-1565193566173-7a0ee3dbe261"),
  },
  {
    name: "Mild Steel Sheet Pack",
    categorySlug: "ms-products",
    price: 1,
    stock: 55,
    brand: "SteelForge",
    featured: true,
    shortDesc: "MS sheets for ducting, enclosures, and light fabrication.",
    description:
      "Mild steel sheets supplied for HVAC, enclosures, and light structural work. Quote-driven MS products supply with nationwide inquiry support.",
    tags: ["mild steel sheets", "MS sheet Pakistan", "steel supplier"],
    specifications: {
      Form: "Sheet",
      Finish: "Hot rolled / CR options",
      Supply: "By gauge & size",
    },
    image: u("photo-1581094794329-c8112a89af12"),
  },
  {
    name: "Mild Steel Pipe Bundle",
    categorySlug: "ms-products",
    price: 1,
    stock: 60,
    brand: "SteelForge",
    bestSeller: true,
    shortDesc: "MS pipes for structures, frames, and industrial piping jobs.",
    description:
      "Mild steel pipes and related MS products for structures, frames, and plant utilities. Contact Nidus Trading for diameters, lengths, and project quantities.",
    tags: ["mild steel pipes", "MS pipe Pakistan", "structural steel"],
    specifications: {
      Form: "Pipe / tube",
      Finish: "Black MS",
      Supply: "Bundle / length",
    },
    image: u("photo-1504917595217-d4dc5ebe6122", 1000),
  },
  // Wooden Items
  {
    name: "Commercial Wooden Furniture Set",
    categorySlug: "wooden-items",
    price: 1,
    stock: 20,
    brand: "WoodCraft NT",
    featured: true,
    shortDesc: "Furniture solutions for offices, showrooms, and project fit-outs.",
    description:
      "Wooden furniture for commercial and light industrial interiors. Request a quote for standard or custom configurations from Nidus Trading.",
    tags: ["wooden furniture Pakistan", "office furniture", "commercial wood"],
    specifications: {
      Material: "Hardwood / engineered",
      Finish: "Project specified",
      Supply: "Set / custom",
    },
    image: u("photo-1616486338812-3dadae4b4ace", 1000),
  },
  {
    name: "Custom Workshop Fixtures",
    categorySlug: "wooden-items",
    price: 1,
    stock: 25,
    brand: "WoodCraft NT",
    bestSeller: true,
    shortDesc: "Wooden fixtures and benches for workshops and assembly areas.",
    description:
      "Custom wooden fixtures including workbench tops and shop fittings for workshops, labs, and assembly stations. Built to inquiry specifications.",
    tags: ["wooden fixtures", "workbench", "custom wooden products"],
    specifications: {
      Material: "Hardwood laminate",
      Size: "Custom",
      Thickness: "Up to 40 mm",
      Finish: "Oil sealed options",
    },
    image: u("photo-1586023492125-27b2c045efd7"),
  },
  // Paint Items
  {
    name: "Industrial Epoxy Floor Paint 20L",
    categorySlug: "paint-items",
    price: 1,
    stock: 18,
    brand: "CoatMax",
    featured: true,
    bestSeller: true,
    shortDesc: "High-build epoxy coating for factory and warehouse floors.",
    description:
      "Chemical-resistant industrial paint for warehouses, workshops, and production areas. Part of our paint items range covering industrial, building, and pre-paint needs.",
    tags: ["industrial paint Pakistan", "epoxy floor paint", "factory coating"],
    specifications: {
      Pack: "20 liters",
      Type: "2K Epoxy",
      Finish: "Semi-gloss",
      Coverage: "~5 m²/L",
    },
    image: u("photo-1562259949-e8e7689d7828"),
  },
  {
    name: "Auto Refinish Paint System",
    categorySlug: "paint-items",
    price: 1,
    stock: 30,
    brand: "CoatMax",
    featured: true,
    shortDesc: "Auto paint and related pre-paint items for body shops.",
    description:
      "Auto paint systems and pre-paint items for workshops and fleets. Request a quote for colors, primers, and supporting materials.",
    tags: ["auto paint Pakistan", "refinish paint", "pre-paint items"],
    specifications: {
      Category: "Automotive refinish",
      Includes: "Base / clear options",
      Support: "Pre-paint materials",
    },
    image: u("photo-1589939705384-5185137a7f0f", 1000),
  },
  {
    name: "Building Exterior Paint Range",
    categorySlug: "paint-items",
    price: 1,
    stock: 45,
    brand: "CoatMax",
    shortDesc: "Building paints for commercial and industrial structures.",
    description:
      "Building paints for exterior and interior commercial projects. Quote-based supply for contractors and facility teams.",
    tags: ["building paints", "commercial paint", "industrial coatings"],
    specifications: {
      Use: "Building interiors/exteriors",
      Finish: "Matt / sheen options",
      Supply: "By project volume",
    },
    image: u("photo-1581858726788-75bc0f6a952d"),
  },
  // Hardware Items
  {
    name: "Hex Bolt Set M10 Assorted",
    categorySlug: "hardware-items",
    price: 1,
    stock: 150,
    brand: "FixAll",
    featured: true,
    bestSeller: true,
    shortDesc: "Assorted M10 hex bolts with nuts and washers.",
    description:
      "Workshop-ready hardware assortment for maintenance teams and fabricators. Nidus Trading supplies all types of hardware items for industrial and commercial use.",
    tags: ["hardware items Pakistan", "hex bolts", "industrial fasteners"],
    specifications: {
      Size: "M10",
      Material: "Grade 8.8",
      Finish: "Zinc plated",
      Pack: "Assorted lengths",
    },
    image: u("photo-1504148455328-c376907d081c"),
  },
  {
    name: "Industrial Hardware Essentials Kit",
    categorySlug: "hardware-items",
    price: 1,
    stock: 100,
    brand: "FixAll",
    featured: true,
    shortDesc: "Clamps, brackets, hinges and general hardware for projects.",
    description:
      "Broad hardware kit covering clamps, brackets, hinges, and related fittings for plant stores and project contractors.",
    tags: ["industrial hardware", "brackets", "project hardware"],
    specifications: {
      Includes: "Mixed hardware",
      Audience: "Maintenance & projects",
      Supply: "Kit / bulk",
    },
    image: u("photo-1530124566582-a618bc2615dc", 900),
  },
  // Caster Wheels
  {
    name: "Heavy Duty Industrial Caster Wheel 6 inch",
    categorySlug: "caster-wheels",
    price: 1,
    stock: 120,
    brand: "NidusPro",
    featured: true,
    bestSeller: true,
    shortDesc: "Swivel caster with brake for industrial carts and machinery.",
    description:
      "Premium heavy duty industrial caster wheels engineered for warehouses, factories, and logistics. Suitable for continuous load applications across Pakistan industries. Request a quote for diameter, load rating, and quantity.",
    tags: [
      "industrial caster wheels Pakistan",
      "heavy duty caster wheels",
      "warehouse wheels",
    ],
    specifications: {
      Diameter: "6 inch",
      "Load Capacity": "350 kg",
      Material: "Polyurethane on cast iron",
      Mount: "Top plate with brake",
    },
    image: u("photo-1586528116311-ad8dd3c8310d", 1000),
  },
  {
    name: "Rigid Industrial Caster Wheel 8 inch",
    categorySlug: "caster-wheels",
    price: 1,
    stock: 90,
    brand: "NidusPro",
    featured: true,
    bestSeller: true,
    shortDesc: "High-capacity rigid caster for heavy carts and racks.",
    description:
      "Heavy duty industrial caster wheels in rigid configuration for straight-line movement of heavy loads. All types and sizes available on inquiry.",
    tags: ["industrial caster wheels", "8 inch caster", "heavy duty wheels Pakistan"],
    specifications: {
      Diameter: "8 inch",
      Type: "Rigid",
      Material: "Polyurethane",
      Duty: "Heavy industrial",
    },
    image: u("photo-1578574577315-2f56bdb47c0f"),
  },
  {
    name: "Swivel Caster Wheel with Dual Lock",
    categorySlug: "caster-wheels",
    price: 1,
    stock: 110,
    brand: "NidusPro",
    shortDesc: "Swivel industrial caster with total-lock brake system.",
    description:
      "Swivel caster wheels with dual lock for carts, trolleys, and mobile equipment. Inquire for load ratings matching your floor and duty cycle.",
    tags: ["swivel caster wheels", "caster with brake", "industrial wheels"],
    specifications: {
      Type: "Swivel + dual lock",
      Mount: "Top plate",
      Duty: "Medium–heavy",
    },
    image: u("photo-1605745341112-85968b19335b"),
  },
  // Safety & Lifting
  {
    name: "Steel Wire Rope 12mm",
    categorySlug: "safety-lifting-equipment",
    price: 1,
    stock: 300,
    brand: "LiftSafe",
    featured: true,
    bestSeller: true,
    shortDesc: "Galvanized steel wire rope for cranes, winches, and lifting.",
    description:
      "Durable galvanized steel wire ropes for cranes, winches, and industrial lifting applications. Supplied with related rigging hardware on request.",
    tags: ["steel wire ropes Pakistan", "lifting equipment", "rigging"],
    specifications: {
      Diameter: "12 mm",
      Construction: "6x19",
      Finish: "Galvanized",
      Unit: "Per meter",
    },
    image: u("photo-1504307651254-35680f356dfd", 1000),
  },
  {
    name: "Rigging Hardware Set",
    categorySlug: "safety-lifting-equipment",
    price: 1,
    stock: 80,
    brand: "LiftSafe",
    featured: true,
    shortDesc: "Shackles, hooks and rigging fittings for lifting teams.",
    description:
      "Rigging hardware for industrial lifting and material handling. Pair with steel wire ropes and safety items from Nidus Trading’s catalog.",
    tags: ["rigging hardware", "shackles", "lifting accessories Pakistan"],
    specifications: {
      Includes: "Shackles / hooks mix",
      Finish: "Galvanized options",
      Use: "Lifting & securing",
    },
    image: u("photo-1581092160562-40aa08e78837"),
  },
  {
    name: "Industrial Safety PPE Bundle",
    categorySlug: "safety-lifting-equipment",
    price: 1,
    stock: 95,
    brand: "LiftSafe",
    bestSeller: true,
    shortDesc: "Safety gear assortment for plant and construction sites.",
    description:
      "All types of safety items for industrial sites — PPE bundles and related protective equipment. Request a quote for crew sizes and site requirements.",
    tags: ["safety equipment Pakistan", "industrial PPE", "site safety"],
    specifications: {
      Includes: "Helmets, gloves, vests options",
      Audience: "Plant & site crews",
      Supply: "Bundle / bulk",
    },
    image: u("photo-1504917595217-d4dc5ebe6122", 900),
  },
];

const blogPosts = [
  {
    title: "Industrial Caster Wheels in Pakistan: How to Choose the Right Load Rating",
    slug: "industrial-caster-wheels-pakistan-guide",
    excerpt:
      "A practical buying guide for warehouses and factories selecting heavy duty caster wheels.",
    content: `Selecting the right industrial caster wheels Pakistan operations depend on load rating, floor type and duty cycle.

## Key factors
- Dynamic vs static load
- Swivel vs rigid configuration
- Brake and lock requirements
- Polyurethane vs rubber tread

Nidus Trading supplies heavy duty industrial caster wheels in multiple diameters for carts, racks and machinery bases. Browse our [Caster Wheels](/products?category=caster-wheels) category and [request a quote](/inquiry) for your duty cycle.

## Next steps
Share load, diameter, and quantity requirements — our team responds with a tailored quotation for B2B and project orders.`,
    tags: ["industrial caster wheels Pakistan", "warehouse equipment"],
    metaTitle: "Industrial Caster Wheels Pakistan | Buying Guide | Nidus Trading",
    metaDesc:
      "Learn how to choose heavy duty industrial caster wheels in Pakistan. Load ratings, materials and supplier tips from Nidus Trading.",
    coverImage: u("photo-1586528116311-ad8dd3c8310d", 1400),
  },
  {
    title: "Electronic Components Supplier Checklist for Procurement Teams",
    slug: "electronic-components-supplier-checklist",
    excerpt:
      "What B2B buyers should verify before sourcing resistors, capacitors, semiconductors and more.",
    content: `Working with a reliable electronic components supplier reduces downtime and counterfeit risk.

## Checklist
1. Traceable SKUs and datasheets
2. Stock visibility
3. MOQ flexibility for prototypes and bulk
4. Fast quotation turnaround

Nidus Trading supports both prototype labs and production procurement. Explore [Electronic Components](/products?category=electronic-components) or [submit an inquiry](/inquiry) with your BOM.`,
    tags: ["electronic components supplier", "procurement"],
    metaTitle: "Electronic Components Supplier Checklist | Nidus Trading",
    metaDesc:
      "Procurement checklist for sourcing electronic components in Pakistan. Quality, stock and quotation tips from Nidus Trading.",
    coverImage: u("photo-1518770660439-4636190af475", 1400),
  },
  {
    title: "Mild Steel Plates in Pakistan: Specs Fabricators Should Confirm",
    slug: "mild-steel-plates-pakistan-buying-guide",
    excerpt:
      "Thickness, grade, finish and logistics — what to confirm before ordering MS plates.",
    content: `Mild steel plates are a core MS product for fabrication shops and construction teams across Pakistan.

## Specs to confirm
- Thickness and cut size
- Hot-rolled vs processed plates
- Delivery location
- Order volume

Browse [MS Products](/products?category=ms-products) including mild steel sheets, plates and pipes, then [request a quote](/inquiry) from Nidus Trading for current availability.`,
    tags: ["mild steel plates Pakistan", "MS products"],
    metaTitle: "Mild Steel Plates Pakistan | Buying Guide | Nidus Trading",
    metaDesc:
      "What to confirm when buying mild steel plates in Pakistan — thickness, grade, volume and logistics from Nidus Trading.",
    coverImage: u("photo-1565193566173-7a0ee3dbe261", 1400),
  },
  {
    title: "Industrial Caster Wheels Pakistan: Load Rating & Material Guide",
    slug: "industrial-caster-wheels-load-rating-material-guide",
    excerpt:
      "How to choose heavy duty caster wheels by load rating, wheel material, and swivel vs rigid configuration for carts and racks.",
    content: `Selecting the right industrial caster wheels prevents premature failure on warehouse carts, assembly trolleys, and machinery bases.

## What to confirm before you buy
1. Load rating per caster (and total cart load)
2. Wheel material — polyurethane, rubber, nylon, or cast iron
3. Swivel vs rigid vs locking brake
4. Mounting plate size and bolt pattern
5. Floor type (epoxy, concrete, outdoor)

Nidus Trading supplies heavy duty caster wheels across common sizes used in Pakistan factories and logistics sites. Browse [Caster Wheels](/products?category=caster-wheels), compare options via [inquiry](/inquiry), or add SKUs to your [quote list](/cart). For related hardware and safety gear, see [Hardware Items](/products?category=hardware-items) and [Safety & Lifting Equipment](/products?category=safety-lifting-equipment).`,
    tags: ["industrial caster wheels Pakistan", "heavy duty casters", "warehouse wheels"],
    metaTitle: "Industrial Caster Wheels Pakistan | Buying Guide | Nidus Trading",
    metaDesc:
      "Load rating, material, and mounting tips for industrial caster wheels in Pakistan. Request a quote from Nidus Trading.",
    coverImage: u("photo-1586528116311-ad8dd3c8310d", 1400),
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
  console.log("Seeding Nidus Trading database (inquiry catalog)...");

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
        images: JSON.stringify([p.image]),
        categoryId,
      },
    });
  }

  // Extended B2B catalog (40 detailed, quote-driven SKUs)
  for (const p of extendedProducts) {
    const categoryId = categoryMap.get(p.categorySlug);
    if (!categoryId) continue;
    const specifications = Object.fromEntries(
      p.specs.map((s) => [s.name, s.value])
    );
    await prisma.product.create({
      data: {
        name: p.title,
        slug: p.slug,
        description: buildDescription(p),
        shortDesc: p.shortDesc,
        sku: p.sku,
        price: 1, // internal placeholder; prices are never shown publicly
        stock: p.stock,
        brand: p.brand,
        featured: p.featured ?? false,
        bestSeller: p.bestSeller ?? false,
        tags: JSON.stringify(p.tags),
        specifications: JSON.stringify(specifications),
        images: JSON.stringify([p.image]),
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
    `Categories: ${categories.length}, Products: ${
      products.length + extendedProducts.length
    } (base ${products.length} + extended ${extendedProducts.length})`
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
