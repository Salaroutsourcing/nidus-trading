/**
 * Nidus Trading — Extended B2B product catalog (40 high-demand SKUs)
 * ------------------------------------------------------------------
 * Full product-page content authored for government, defense, and
 * large-enterprise procurement in Pakistan. Inquiry/quote-driven:
 * no public prices ("Price on Request").
 *
 * Each entry carries richer marketing/SEO content than the DB schema
 * stores directly. `buildDescription()` in seed.ts folds `longDesc`,
 * `applications`, `features`, and the pricing note into the Product
 * `description` field (rendered with line breaks on the PDP), while
 * `specs` populates the specifications table. `metaTitle` / `metaDesc`
 * / `imagePrompt` are retained for SEO reference and future use.
 *
 * Category mapping (requested group -> existing category slug):
 *   Specialty Cables & Wires ............ electrical-items
 *   Electronic Components & Sensors ..... electronic-components
 *   Electrical (switchgear/breakers) .... electrical-items
 *   Safety & Lifting Equipment .......... safety-lifting-equipment
 *   Mechanical Items & Bearings ......... mechanical-items
 *   Hardware & Fasteners ................ hardware-items
 */

const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export type Spec = { name: string; value: string };

export type ExtendedProduct = {
  slug: string;
  title: string;
  categorySlug: string;
  brand: string;
  sku: string;
  stock: number;
  featured?: boolean;
  bestSeller?: boolean;
  shortDesc: string;
  longDesc: string;
  specs: Spec[];
  applications: string[];
  features: string[];
  tags: string[];
  metaTitle: string;
  metaDesc: string;
  imagePrompt: string;
  image: string;
};

export const extendedProducts: ExtendedProduct[] = [
  // ============================================================
  // 1) SPECIALTY CABLES & WIRES  (10) -> electrical-items
  // ============================================================
  {
    slug: "belden-9540-multi-conductor-shielded-cable-24awg-10c",
    title: "Belden 9540 Multi-Conductor Shielded Cable 24AWG 10-Conductor",
    categorySlug: "electrical-items",
    brand: "Belden",
    sku: "NT-CBL-9540",
    stock: 60,
    featured: true,
    bestSeller: true,
    shortDesc:
      "Overall-shielded 24AWG 10-conductor cable for low-level signal and control runs in noisy industrial environments.",
    longDesc:
      "The Belden 9540 is a premium multi-conductor computer/instrumentation cable engineered for reliable low-voltage signal transmission where electrical noise is a concern. Ten 24AWG tinned-copper conductors are wrapped in a Beldfoil aluminium-polyester shield with a stranded tinned-copper drain wire, delivering 100% coverage against EMI/RFI interference. The chrome PVC jacket resists abrasion, oil, and general plant chemicals, making it a dependable choice for control panels, RS-232/data links, and process instrumentation. Widely specified on government, defense, and large industrial projects for its consistent impedance and long service life, the 9540 is a go-to cable for integrators building rugged, interference-free control systems. Nidus Trading supplies Belden 9540 in cut lengths and full spools with documentation to support QA and tender requirements across Pakistan. Share your required length, conductor count, and delivery city to receive a competitive project quotation with stock confirmation.",
    specs: [
      { name: "Manufacturer", value: "Belden" },
      { name: "Part Number", value: "9540" },
      { name: "Conductors", value: "10 x 24AWG (7x32) tinned copper" },
      { name: "Shield", value: "Beldfoil (100%) + tinned drain wire" },
      { name: "Jacket", value: "Chrome PVC" },
      { name: "Voltage Rating", value: "300V" },
      { name: "Temperature", value: "-30°C to +80°C" },
    ],
    applications: [
      "Control panel and PLC signal wiring",
      "Process instrumentation and data links",
      "RS-232 / low-level analog signal runs",
      "Government and defense control systems",
    ],
    features: [
      "100% foil shield eliminates EMI/RFI pickup",
      "Tinned-copper conductors for solderability and corrosion resistance",
      "Oil- and abrasion-resistant PVC jacket",
      "Available in cut lengths or full spools",
    ],
    tags: ["belden cable Pakistan", "shielded instrumentation cable", "multi-conductor control cable"],
    metaTitle: "Belden 9540 Shielded 24AWG 10C Cable | Supplier Pakistan | Nidus Trading",
    metaDesc:
      "Buy Belden 9540 multi-conductor shielded cable (24AWG, 10C) in Pakistan. EMI-shielded control & instrumentation cable. Request a quote for best price.",
    imagePrompt:
      "Professional product photo of a shielded multi-conductor cable spool on a clean industrial background, studio lighting, high resolution",
    image: u("photo-1558618666-fcd25c85cd64"),
  },
  {
    slug: "lapp-olflex-classic-110-control-cable-4g1-5",
    title: "LAPP ÖLFLEX Classic 110 Flexible Control Cable 4G1.5mm²",
    categorySlug: "electrical-items",
    brand: "LAPP",
    sku: "NT-CBL-OLF110",
    stock: 80,
    featured: true,
    shortDesc:
      "Oil-resistant flexible control cable for machine tools, drives, and automation panels with fine-stranded copper cores.",
    longDesc:
      "ÖLFLEX Classic 110 is LAPP's benchmark flexible control cable, trusted across machine building and plant automation for its balance of durability, flexibility, and value. The 4G1.5mm² construction features fine-stranded bare copper conductors with colour-coded PVC insulation (including green-yellow earth) and a robust grey outer sheath that withstands oils, coolants, and mechanical stress. Its wide temperature range and CE/UL recognition make it suitable for both fixed installation and occasional flexing in cable trays, machine frames, and control cabinets. As a quality European control cable, it is regularly specified on OEM machinery, conveyor systems, and industrial retrofits requiring reliable multi-core wiring. Nidus Trading stocks ÖLFLEX Classic 110 in common cross-sections and core counts for fast fulfilment to contractors, panel builders, and maintenance teams nationwide. Provide your cross-section, number of cores, and drum length for a tailored quotation with genuine-product documentation.",
    specs: [
      { name: "Manufacturer", value: "LAPP" },
      { name: "Series", value: "ÖLFLEX Classic 110" },
      { name: "Configuration", value: "4G1.5mm² (incl. earth)" },
      { name: "Conductor", value: "Fine-stranded bare copper" },
      { name: "Insulation / Sheath", value: "PVC / PVC (grey)" },
      { name: "Voltage Rating", value: "300/500V" },
      { name: "Temperature", value: "-5°C to +70°C (flexing)" },
    ],
    applications: [
      "Machine tool and automation wiring",
      "Drives, motors, and control cabinets",
      "Conveyor and assembly line control",
      "Cable-tray and panel installations",
    ],
    features: [
      "Oil- and coolant-resistant PVC sheath",
      "Fine-stranded copper for flexibility",
      "Colour-coded cores for fast termination",
      "CE marked, quality European build",
    ],
    tags: ["olflex cable Pakistan", "flexible control cable", "lapp cable supplier"],
    metaTitle: "LAPP ÖLFLEX Classic 110 4G1.5 Control Cable | Nidus Trading Pakistan",
    metaDesc:
      "LAPP ÖLFLEX Classic 110 flexible control cable 4G1.5mm² for machines & panels. Oil-resistant, CE marked. Request a quote for best price in Pakistan.",
    imagePrompt:
      "Grey flexible control cable coil with visible copper cores, industrial studio product shot, high detail",
    image: u("photo-1473968512647-3e447244af8f"),
  },
  {
    slug: "frls-fire-resistant-copper-cable-3-core-2-5",
    title: "Fire-Resistant FRLS Copper Cable 3-Core 2.5mm²",
    categorySlug: "electrical-items",
    brand: "Newage / Equivalent",
    sku: "NT-CBL-FRLS25",
    stock: 120,
    bestSeller: true,
    shortDesc:
      "Flame-retardant, low-smoke fire-survival cable for life-safety circuits in buildings and industrial plants.",
    longDesc:
      "This 3-core 2.5mm² FRLS (Flame Retardant Low Smoke) copper cable is designed to maintain circuit integrity during fire, making it essential for emergency and life-safety systems. Mica-glass tape over the copper conductors provides fire-survival performance, while the low-smoke, halogen-reduced PVC compound minimises toxic fumes and smoke density during a fire event — a critical requirement for occupied buildings, tunnels, and industrial facilities. It is widely specified for fire alarm circuits, emergency lighting, fire pumps, and smoke-extraction systems on projects governed by strict fire and safety codes. As government, hospital, and commercial tenders increasingly mandate FRLS cabling, this product supports compliance while ensuring dependable power delivery. Nidus Trading supplies FRLS cable in multiple cross-sections and core counts with test certificates to satisfy consultant and authority approvals. Send your circuit requirements, cross-section, and quantity for a compliant, competitively priced quotation.",
    specs: [
      { name: "Type", value: "FRLS fire-resistant" },
      { name: "Cores", value: "3 core" },
      { name: "Cross-Section", value: "2.5mm²" },
      { name: "Conductor", value: "Annealed copper" },
      { name: "Fire Barrier", value: "Mica-glass tape" },
      { name: "Voltage Rating", value: "300/500V" },
      { name: "Standard", value: "IEC 60331 / IEC 60332 class" },
    ],
    applications: [
      "Fire alarm and detection circuits",
      "Emergency lighting and exit systems",
      "Fire pumps and smoke extraction",
      "Hospitals, malls, and public buildings",
    ],
    features: [
      "Maintains circuit integrity during fire",
      "Low smoke and reduced halogen emission",
      "Flame-retardant per IEC test classes",
      "Certified for code-compliant projects",
    ],
    tags: ["FRLS cable Pakistan", "fire resistant cable", "low smoke cable supplier"],
    metaTitle: "FRLS Fire-Resistant Cable 3C 2.5mm² | Life-Safety Wiring | Nidus Trading",
    metaDesc:
      "Fire-resistant FRLS copper cable 3-core 2.5mm² for fire alarms, emergency lighting & pumps. IEC-class, low smoke. Request a quote in Pakistan.",
    imagePrompt:
      "Fire-resistant electrical cable with red-tinted jacket coiled on white studio background, high resolution product photo",
    image: u("photo-1621905251189-08b45d6a269e"),
  },
  {
    slug: "instrumentation-cable-shielded-1pair-18awg",
    title: "Instrumentation Cable Individually & Overall Shielded 1-Pair 18AWG",
    categorySlug: "electrical-items",
    brand: "Nidus Select",
    sku: "NT-CBL-INST1P",
    stock: 100,
    featured: true,
    shortDesc:
      "Twisted-pair instrumentation cable with individual and overall shields for accurate 4-20mA signal transmission.",
    longDesc:
      "Individually and Overall Shielded (IOS) instrumentation cable is purpose-built for transmitting sensitive process signals — such as 4-20mA loops and thermocouple extensions — over long distances without corruption. Each twisted pair carries its own aluminium-polyester shield plus drain wire, and the assembly is wrapped in an overall shield, giving best-in-class rejection of cross-talk and external interference. The tinned-copper conductors and PVC insulation are colour-coded to IEC/BS standards for straightforward termination in marshalling cabinets and junction boxes. This cable is a staple of oil & gas, power generation, and process automation projects where measurement accuracy directly affects safety and yield. Nidus Trading offers instrumentation cable in single-pair and multi-pair/triad configurations, armoured or unarmoured, with mill certificates for tender compliance. Specify pair/triad count, conductor size, armour requirement, and length to receive a precise project quotation and stock availability across Pakistan.",
    specs: [
      { name: "Configuration", value: "1 pair, IOS shielded" },
      { name: "Conductor", value: "18AWG tinned copper" },
      { name: "Shield", value: "Individual + overall Al/PET + drain" },
      { name: "Insulation", value: "PVC, colour-coded" },
      { name: "Voltage Rating", value: "300V" },
      { name: "Standard", value: "BS 5308 / IEC equivalent" },
      { name: "Options", value: "Armoured / multi-pair / triad" },
    ],
    applications: [
      "4-20mA process signal loops",
      "Thermocouple and RTD extension",
      "SCADA and DCS field wiring",
      "Oil & gas and power plant instrumentation",
    ],
    features: [
      "Dual shielding rejects noise and cross-talk",
      "Individual pair drains for clean grounding",
      "Colour-coded to recognised standards",
      "Armoured options for buried/harsh runs",
    ],
    tags: ["instrumentation cable Pakistan", "4-20ma signal cable", "BS 5308 cable"],
    metaTitle: "Instrumentation Cable 1-Pair 18AWG IOS Shielded | Nidus Trading Pakistan",
    metaDesc:
      "Individually & overall shielded instrumentation cable, 1-pair 18AWG for 4-20mA & thermocouple signals. BS 5308 class. Request a quote in Pakistan.",
    imagePrompt:
      "Twisted-pair instrumentation cable cross-section showing shields and drain wire, macro industrial product photo",
    image: u("photo-1544197150-b99a5804efb6"),
  },
  {
    slug: "xlpe-armoured-power-cable-4-core-16mm2",
    title: "XLPE Insulated SWA Armoured Power Cable 4-Core 16mm²",
    categorySlug: "electrical-items",
    brand: "Nidus Select",
    sku: "NT-CBL-XLPE16",
    stock: 45,
    featured: true,
    bestSeller: true,
    shortDesc:
      "Steel-wire-armoured XLPE power cable for buried and outdoor distribution feeders in industrial plants.",
    longDesc:
      "This 4-core 16mm² XLPE/SWA/PVC power cable is built for rugged power distribution where mechanical protection and thermal performance matter. Cross-linked polyethylene (XLPE) insulation allows higher continuous conductor temperatures and better overload capacity than PVC, while the galvanised steel wire armour (SWA) provides robust protection for direct burial, cable trenches, and outdoor routing. The stranded copper conductors and extruded bedding ensure reliable current carrying capacity for sub-mains, motor feeders, and distribution boards. It is a standard specification on industrial estates, government infrastructure, and large commercial developments requiring durable, code-compliant feeders. Nidus Trading supplies XLPE armoured cable in a full range of cross-sections and core counts, copper or aluminium, with test certificates for consultant approval. Provide your cross-section, cores, conductor material, and drum length to receive a competitive quotation with confirmed lead time and delivery anywhere in Pakistan.",
    specs: [
      { name: "Insulation", value: "XLPE" },
      { name: "Armour", value: "Galvanised steel wire (SWA)" },
      { name: "Cores / Size", value: "4 core x 16mm²" },
      { name: "Conductor", value: "Stranded copper (Cu)" },
      { name: "Voltage Rating", value: "600/1000V" },
      { name: "Sheath", value: "PVC (black)" },
      { name: "Standard", value: "IEC 60502-1 / BS 5467" },
    ],
    applications: [
      "Underground distribution feeders",
      "Motor and sub-main power circuits",
      "Outdoor and industrial estate wiring",
      "Government infrastructure projects",
    ],
    features: [
      "XLPE insulation for higher ampacity",
      "Steel wire armour for mechanical protection",
      "Suitable for direct burial",
      "600/1000V rated to IEC/BS standards",
    ],
    tags: ["XLPE armoured cable Pakistan", "SWA power cable", "16mm cable price"],
    metaTitle: "XLPE SWA Armoured Cable 4C 16mm² | Power Feeder | Nidus Trading Pakistan",
    metaDesc:
      "4-core 16mm² XLPE steel-wire-armoured power cable (600/1000V) for buried & industrial feeders. IEC/BS. Request a quote for best price in Pakistan.",
    imagePrompt:
      "Heavy armoured power cable coil with visible steel wire armour and copper cores, industrial product photography",
    image: u("photo-1621905252507-b35492cc74b4"),
  },
  {
    slug: "rg6-coaxial-cable-quad-shield-75ohm",
    title: "RG-6 Quad-Shield Coaxial Cable 75Ω (Communications)",
    categorySlug: "electrical-items",
    brand: "Nidus Select",
    sku: "NT-CBL-RG6QS",
    stock: 140,
    shortDesc:
      "Quad-shielded RG-6 coax for CCTV, RF, and communication backbones with superior signal integrity.",
    longDesc:
      "RG-6 quad-shield coaxial cable delivers dependable 75Ω transmission for CCTV, satellite, RF, and broadband communication systems. Its four-layer shielding — dual foil plus dual braid — provides excellent protection against ingress and egress interference, preserving picture and signal quality over long runs. The copper-clad steel centre conductor and gas-injected foam dielectric maintain consistent impedance and low attenuation, while the UV-stabilised jacket supports indoor and outdoor installation. Security, surveillance, and communication projects for government sites, campuses, and industrial facilities rely on quad-shield RG-6 for interference-free performance in electrically noisy environments. Nidus Trading supplies RG-6 in boxed pull-lengths and reels, with connector and accessory options to complete the installation. Tell us your required length, jacket type (indoor/outdoor/messenger), and quantity for a competitive quotation with fast dispatch across Pakistan.",
    specs: [
      { name: "Type", value: "RG-6 quad shield" },
      { name: "Impedance", value: "75Ω" },
      { name: "Center Conductor", value: "Copper-clad steel" },
      { name: "Dielectric", value: "Gas-injected foam PE" },
      { name: "Shield", value: "Dual foil + dual braid" },
      { name: "Jacket", value: "UV-stabilised PVC/PE" },
      { name: "Supply", value: "Box / reel" },
    ],
    applications: [
      "CCTV and surveillance backbones",
      "Satellite and broadband RF",
      "Campus and building communications",
      "Outdoor and messenger runs",
    ],
    features: [
      "Quad shielding for maximum interference rejection",
      "Low attenuation foam dielectric",
      "UV-stabilised jacket for outdoor use",
      "Consistent 75Ω impedance",
    ],
    tags: ["RG6 coaxial cable Pakistan", "quad shield coax", "CCTV cable supplier"],
    metaTitle: "RG-6 Quad-Shield Coaxial Cable 75Ω | CCTV & RF | Nidus Trading Pakistan",
    metaDesc:
      "RG-6 quad-shield coax cable 75Ω for CCTV, satellite & RF. Dual foil + dual braid, UV jacket. Request a quote for best price in Pakistan.",
    imagePrompt:
      "RG-6 coaxial cable coil with cutaway showing quad shielding layers, clean studio product shot",
    image: u("photo-1558494949-ef010cbdcc31"),
  },
  {
    slug: "cat6-uutp-lszh-networking-cable-305m",
    title: "Cat6 U/UTP LSZH Networking Cable 305m Box",
    categorySlug: "electrical-items",
    brand: "Nidus Select",
    sku: "NT-CBL-CAT6LS",
    stock: 90,
    featured: true,
    shortDesc:
      "23AWG solid-copper Cat6 cable in low-smoke zero-halogen jacket for reliable Gigabit structured cabling.",
    longDesc:
      "This Cat6 U/UTP cable provides high-performance Gigabit and 10G-ready structured cabling for offices, data rooms, and industrial IT networks. Solid 23AWG bare-copper conductors with a central cross-filler (spline) maintain pair geometry and minimise cross-talk, delivering headroom beyond Cat6 channel requirements. The Low-Smoke Zero-Halogen (LSZH) jacket is specified for enclosed spaces and public buildings where fire safety and low toxic emissions are mandatory, making it ideal for government, healthcare, and education projects. Supplied in convenient 305m reel-in-box packaging with sequential length markings for efficient installation. As network reliability underpins modern operations, contractors choose full copper (not copper-clad) Cat6 to pass certification and Power-over-Ethernet loads. Nidus Trading offers Cat6 in UTP/FTP and PVC/LSZH variants with keystone and patch accessories. Share your quantity, jacket type, and colour to receive a competitive quotation and stock confirmation across Pakistan.",
    specs: [
      { name: "Category", value: "Cat6 U/UTP" },
      { name: "Conductor", value: "23AWG solid bare copper" },
      { name: "Jacket", value: "LSZH (low smoke zero halogen)" },
      { name: "Bandwidth", value: "250MHz+" },
      { name: "Packaging", value: "305m reel-in-box" },
      { name: "PoE", value: "PoE / PoE+ capable" },
      { name: "Standard", value: "ANSI/TIA-568 Cat6" },
    ],
    applications: [
      "Gigabit office and data-room networks",
      "IP CCTV and PoE devices",
      "Government, healthcare, education fit-outs",
      "Industrial LAN backbones",
    ],
    features: [
      "Full solid-copper for certified performance",
      "Spline maintains pair geometry",
      "LSZH jacket for fire-safe indoor use",
      "Length-marked 305m box for easy pulls",
    ],
    tags: ["cat6 cable Pakistan", "LSZH network cable", "structured cabling supplier"],
    metaTitle: "Cat6 U/UTP LSZH Cable 305m | Structured Cabling | Nidus Trading Pakistan",
    metaDesc:
      "Cat6 U/UTP LSZH networking cable, 23AWG solid copper, 305m box, PoE capable. TIA-568 compliant. Request a quote for best price in Pakistan.",
    imagePrompt:
      "Blue Cat6 network cable pull-box with cable feeding out, clean modern studio product photo",
    image: u("photo-1544197150-b99a5804efb6", 1100),
  },
  {
    slug: "silicone-rubber-high-temperature-cable-2-5mm2",
    title: "Silicone Rubber High-Temperature Cable 2.5mm² (180°C)",
    categorySlug: "electrical-items",
    brand: "Nidus Select",
    sku: "NT-CBL-SIL25",
    stock: 70,
    shortDesc:
      "Heat-resistant silicone-insulated single core for furnaces, ovens, and high-temperature equipment wiring.",
    longDesc:
      "Silicone rubber high-temperature cable is engineered for installations where standard PVC would degrade. Rated for continuous operation up to 180°C (with short-term peaks higher), the silicone insulation remains flexible and dielectrically stable under extreme heat, and it forms a protective non-conductive ash if exposed to flame. The tinned, fine-stranded copper conductor resists oxidation and maintains flexibility for tight terminations inside hot enclosures. This cable is essential for furnace and oven wiring, boiler rooms, heating elements, kilns, and industrial lighting fixtures near heat sources. Steel plants, ceramics, food processing, and power generation facilities specify silicone cable to prevent insulation failure and downtime. Nidus Trading stocks single-core silicone cable in multiple cross-sections and colours, with glass-braided variants for added abrasion resistance. Provide your cross-section, temperature class, colour, and length for a precise quotation and prompt supply across Pakistan.",
    specs: [
      { name: "Insulation", value: "Silicone rubber" },
      { name: "Cross-Section", value: "2.5mm²" },
      { name: "Conductor", value: "Tinned fine-stranded copper" },
      { name: "Temperature", value: "-60°C to +180°C" },
      { name: "Voltage Rating", value: "300/500V" },
      { name: "Options", value: "Glass-braid / colours" },
      { name: "Flame Behaviour", value: "Forms protective ash" },
    ],
    applications: [
      "Furnace, oven, and kiln wiring",
      "Boiler rooms and heating elements",
      "Industrial luminaires near heat",
      "Steel, ceramics, and food processing",
    ],
    features: [
      "Continuous 180°C temperature rating",
      "Remains flexible in extreme heat",
      "Tinned copper resists oxidation",
      "Glass-braid options for abrasion",
    ],
    tags: ["silicone cable Pakistan", "high temperature cable", "heat resistant wire"],
    metaTitle: "Silicone High-Temperature Cable 2.5mm² 180°C | Nidus Trading Pakistan",
    metaDesc:
      "Heat-resistant silicone rubber cable 2.5mm² rated 180°C for furnaces, ovens & heaters. Tinned copper. Request a quote for best price in Pakistan.",
    imagePrompt:
      "Red silicone high-temperature single-core cable coil near a subtle heat/furnace backdrop, industrial studio photo",
    image: u("photo-1473968512647-3e447244af8f", 1100),
  },
  {
    slug: "welding-cable-70mm2-double-insulated",
    title: "Welding Cable 70mm² Double-Insulated (H01N2-D)",
    categorySlug: "electrical-items",
    brand: "Nidus Select",
    sku: "NT-CBL-WELD70",
    stock: 65,
    bestSeller: true,
    shortDesc:
      "Highly flexible rubber-sheathed welding cable for heavy-duty welding sets and secondary power leads.",
    longDesc:
      "This 70mm² H01N2-D welding cable is designed for the demanding duty cycles of industrial welding and secondary power distribution. Thousands of fine, annealed copper strands deliver exceptional flexibility so operators can manoeuvre torch and earth leads easily, even in cold conditions. The tough EPR/rubber sheath resists heat, sparks, oil, abrasion, and mechanical stress on the shop floor and construction sites. Rated for high current-carrying capacity, it supports arc, MIG, and TIG welding machines as well as temporary power leads. Fabrication yards, shipbuilding, structural steel, and defense workshops rely on genuine copper welding cable to avoid overheating and voltage drop that compromise weld quality. Nidus Trading supplies welding cable across common sizes (16-120mm²) with lug and connector options for ready-to-use assemblies. Tell us your cross-section, length, and connector requirement for a competitive quotation and quick dispatch anywhere in Pakistan.",
    specs: [
      { name: "Standard", value: "H01N2-D welding cable" },
      { name: "Cross-Section", value: "70mm²" },
      { name: "Conductor", value: "Class 6 fine-stranded copper" },
      { name: "Sheath", value: "EPR / rubber" },
      { name: "Voltage Rating", value: "100/100V (welding)" },
      { name: "Temperature", value: "-25°C to +85°C" },
      { name: "Options", value: "16-120mm² with lugs" },
    ],
    applications: [
      "Arc, MIG, and TIG welding leads",
      "Secondary power and battery leads",
      "Fabrication yards and shipbuilding",
      "Defense and structural workshops",
    ],
    features: [
      "Extremely flexible fine-strand copper",
      "Heat-, spark-, and oil-resistant rubber sheath",
      "High current capacity, low voltage drop",
      "Ready-made lengths with lugs available",
    ],
    tags: ["welding cable Pakistan", "70mm welding cable", "rubber welding lead"],
    metaTitle: "Welding Cable 70mm² Double-Insulated H01N2-D | Nidus Trading Pakistan",
    metaDesc:
      "Flexible 70mm² rubber welding cable (H01N2-D) for heavy-duty welding leads. Fine-strand copper, heat resistant. Request a quote in Pakistan.",
    imagePrompt:
      "Black rubber welding cable coil with copper lug ends, gritty industrial workshop backdrop, product photo",
    image: u("photo-1558618666-fcd25c85cd64", 1100),
  },
  {
    slug: "vfd-drive-cable-emc-shielded-3core-4mm2",
    title: "VFD / Drive Cable EMC-Shielded 3-Core + 3 4mm²",
    categorySlug: "electrical-items",
    brand: "Nidus Select",
    sku: "NT-CBL-VFD4",
    stock: 55,
    featured: true,
    shortDesc:
      "Symmetrical EMC-shielded motor cable for variable frequency drives to control interference and bearing currents.",
    longDesc:
      "Variable Frequency Drive (VFD) motor cable is specifically constructed to handle the fast switching and high-frequency noise generated by modern drives. This symmetrical 3-core + 3 (3x4mm² power plus 3 symmetrical earth conductors) design with a copper-braid/foil EMC shield provides a low-impedance return path, dramatically reducing radiated interference, common-mode currents, and harmful motor bearing currents. XLPE insulation withstands the voltage stresses of PWM drive output, extending cable and motor life. Correct VFD cabling is essential for reliable operation of pumps, fans, conveyors, and process machinery, and for passing EMC compliance on automation projects. Nidus Trading supplies EMC drive cable in a range of cross-sections with matched EMC glands for proper 360° shield termination. Specify your motor rating/cross-section, length, and gland requirement to receive a tailored quotation that keeps your drive system quiet, compliant, and dependable across Pakistan.",
    specs: [
      { name: "Type", value: "Symmetrical EMC VFD cable" },
      { name: "Configuration", value: "3x4mm² + 3 sym. earth" },
      { name: "Shield", value: "Copper braid + foil" },
      { name: "Insulation", value: "XLPE" },
      { name: "Voltage Rating", value: "0.6/1kV" },
      { name: "Accessory", value: "EMC glands available" },
      { name: "Use", value: "Drive-to-motor connection" },
    ],
    applications: [
      "VFD-to-motor power connections",
      "Pumps, fans, and conveyors",
      "Process and packaging machinery",
      "EMC-compliant automation projects",
    ],
    features: [
      "Symmetrical design cuts bearing currents",
      "Braid + foil shield for low EMI",
      "XLPE withstands PWM voltage stress",
      "Matched EMC glands for 360° termination",
    ],
    tags: ["VFD cable Pakistan", "EMC motor cable", "drive cable shielded"],
    metaTitle: "VFD Drive Cable EMC-Shielded 3x4mm² | Motor Cable | Nidus Trading Pakistan",
    metaDesc:
      "Symmetrical EMC-shielded VFD/drive cable 3x4mm² reduces interference & bearing currents. XLPE, 0.6/1kV. Request a quote for best price in Pakistan.",
    imagePrompt:
      "Symmetrical EMC drive cable cutaway showing braided shield and copper cores, technical studio product photo",
    image: u("photo-1621905251189-08b45d6a269e", 1100),
  },

  // ============================================================
  // 2) ELECTRONIC COMPONENTS & SENSORS  (8) -> electronic-components
  // ============================================================
  {
    slug: "omron-e3z-d82-photoelectric-sensor-diffuse",
    title: "Omron E3Z-D82 Photoelectric Sensor (Diffuse Reflective, PNP)",
    categorySlug: "electronic-components",
    brand: "Omron",
    sku: "NT-SEN-E3ZD82",
    stock: 130,
    featured: true,
    bestSeller: true,
    shortDesc:
      "Compact diffuse-reflective photoelectric sensor with 1m sensing range and reliable object detection for automation.",
    longDesc:
      "The Omron E3Z-D82 is a workhorse diffuse-reflective photoelectric sensor trusted across packaging, material handling, and assembly automation. It detects objects up to 1 metre away without a separate reflector, using a bright, easy-to-align red LED beam and a stable detection circuit that resists ambient light and mutual interference. The rugged IP67 housing withstands dust and washdown, while the PNP transistor output and clear operation indicators simplify PLC integration and on-site troubleshooting. As a globally standard sensor, the E3Z family is specified for conveyor presence detection, part counting, and machine safety interlocks where dependable switching is critical to uptime. Nidus Trading supplies genuine Omron E3Z sensors along with mounting brackets and connectors for fast commissioning. Confirm your sensing mode (diffuse/through-beam/retro), output type, and quantity to receive a competitive quotation with authentic-product assurance and support across Pakistan.",
    specs: [
      { name: "Manufacturer", value: "Omron" },
      { name: "Model", value: "E3Z-D82" },
      { name: "Sensing Method", value: "Diffuse reflective" },
      { name: "Sensing Distance", value: "Up to 1 m" },
      { name: "Output", value: "PNP, Light-ON/Dark-ON" },
      { name: "Supply Voltage", value: "12-24 VDC" },
      { name: "Protection", value: "IP67" },
    ],
    applications: [
      "Conveyor object/presence detection",
      "Part counting and positioning",
      "Packaging and assembly machines",
      "Machine interlocks and automation",
    ],
    features: [
      "1m diffuse range, no reflector needed",
      "IP67 for dust and washdown",
      "Stable against ambient/mutual interference",
      "Easy PLC integration with PNP output",
    ],
    tags: ["omron sensor Pakistan", "photoelectric sensor", "E3Z-D82 supplier"],
    metaTitle: "Omron E3Z-D82 Photoelectric Sensor | Automation | Nidus Trading Pakistan",
    metaDesc:
      "Omron E3Z-D82 diffuse-reflective photoelectric sensor, 1m range, PNP, IP67. Genuine automation sensor. Request a quote for best price in Pakistan.",
    imagePrompt:
      "Compact rectangular Omron photoelectric sensor on a conveyor bracket, clean industrial macro product photo",
    image: u("photo-1518770660439-4636190af475"),
  },
  {
    slug: "autonics-pr18-8dn-inductive-proximity-sensor",
    title: "Autonics PR18-8DN Inductive Proximity Sensor 18mm PNP",
    categorySlug: "electronic-components",
    brand: "Autonics",
    sku: "NT-SEN-PR18",
    stock: 160,
    featured: true,
    shortDesc:
      "18mm shielded inductive proximity switch with 8mm sensing for non-contact metal detection.",
    longDesc:
      "The Autonics PR18-8DN is a reliable 18mm inductive proximity sensor for non-contact detection of ferrous and non-ferrous metals in industrial machinery. With an 8mm sensing distance (shielded, flush-mountable), a fast switching frequency, and a rugged IP67 nickel-brass body, it delivers consistent performance in dusty, oily, and vibration-prone environments. The NPN/PNP options and LED status indicator make wiring and diagnostics straightforward on PLC-based systems. Proximity sensors are fundamental to automation — used for position feedback, end-of-travel limits, rotation/speed monitoring, and part presence — replacing mechanical limit switches that wear out. CNC machines, conveyors, packaging lines, and material handling systems across manufacturing rely on them for durability and precision. Nidus Trading stocks the Autonics PR series in multiple diameters and output types, with connectors and brackets available. Share your body size, sensing distance, output type, and quantity for a competitive quotation and prompt supply throughout Pakistan.",
    specs: [
      { name: "Manufacturer", value: "Autonics" },
      { name: "Model", value: "PR18-8DN" },
      { name: "Body Size", value: "M18 shielded" },
      { name: "Sensing Distance", value: "8 mm" },
      { name: "Output", value: "PNP (NPN options)" },
      { name: "Supply Voltage", value: "12-24 VDC" },
      { name: "Protection", value: "IP67" },
    ],
    applications: [
      "Position and end-of-travel detection",
      "CNC, conveyors, and packaging",
      "Speed / rotation monitoring",
      "Part presence and counting",
    ],
    features: [
      "Non-contact, wear-free switching",
      "8mm shielded, flush-mountable",
      "IP67 rugged nickel-brass body",
      "Simple PLC wiring with status LED",
    ],
    tags: ["autonics proximity sensor Pakistan", "inductive sensor", "PR18-8DN"],
    metaTitle: "Autonics PR18-8DN Inductive Proximity Sensor 18mm | Nidus Trading Pakistan",
    metaDesc:
      "Autonics PR18-8DN inductive proximity sensor, M18, 8mm sensing, PNP, IP67. Non-contact metal detection. Request a quote in Pakistan.",
    imagePrompt:
      "Cylindrical M18 inductive proximity sensor with cable, macro shot on brushed metal surface, industrial product photo",
    image: u("photo-1555617981-dac3880eac6e"),
  },
  {
    slug: "pt100-rtd-temperature-sensor-3-wire-class-a",
    title: "PT100 RTD Temperature Sensor 3-Wire Class A",
    categorySlug: "electronic-components",
    brand: "Nidus Select",
    sku: "NT-SEN-PT100",
    stock: 110,
    bestSeller: true,
    shortDesc:
      "Precision platinum RTD probe for accurate industrial temperature measurement from -50°C to +400°C.",
    longDesc:
      "PT100 RTD sensors are the industry standard for accurate, stable temperature measurement in process and plant applications. This 3-wire Class A probe uses a platinum element (100Ω at 0°C) housed in a stainless-steel sheath, offering excellent linearity, long-term stability, and repeatability far superior to thermocouples in the moderate temperature range. The 3-wire configuration compensates for lead resistance, ensuring precise readings even over long cable runs to transmitters or PLCs. PT100 probes are used throughout HVAC, food & beverage, pharmaceuticals, power, and chemical processing for tank, pipe, and bearing temperature monitoring. Available with thermowells, terminal heads, and transmitters for complete measurement loops. Nidus Trading supplies PT100 sensors in various insertion lengths, sheath diameters, and connection styles to match your process. Provide your temperature range, probe length, process connection, and quantity for a precise quotation and dependable supply across Pakistan.",
    specs: [
      { name: "Element", value: "Platinum PT100 (100Ω @ 0°C)" },
      { name: "Accuracy Class", value: "Class A" },
      { name: "Wiring", value: "3-wire" },
      { name: "Range", value: "-50°C to +400°C" },
      { name: "Sheath", value: "Stainless steel 316" },
      { name: "Standard", value: "IEC 60751" },
      { name: "Options", value: "Thermowell / head / transmitter" },
    ],
    applications: [
      "Tank, pipe, and bearing temperature",
      "HVAC and building services",
      "Food, pharma, and chemical process",
      "Power generation monitoring",
    ],
    features: [
      "High accuracy and long-term stability",
      "3-wire lead-resistance compensation",
      "Stainless-steel sheath for durability",
      "Configurable length and connections",
    ],
    tags: ["PT100 sensor Pakistan", "RTD temperature probe", "process temperature sensor"],
    metaTitle: "PT100 RTD Temperature Sensor 3-Wire Class A | Nidus Trading Pakistan",
    metaDesc:
      "Precision PT100 RTD probe, 3-wire Class A, -50 to +400°C, SS316 sheath, IEC 60751. Request a quote for best price in Pakistan.",
    imagePrompt:
      "Stainless-steel PT100 temperature probe with terminal head and thermowell, technical studio product photo",
    image: u("photo-1597872200969-2b65d56bd16b"),
  },
  {
    slug: "k-type-thermocouple-probe-m8-connector",
    title: "K-Type Thermocouple Probe with M8 Connector",
    categorySlug: "electronic-components",
    brand: "Nidus Select",
    sku: "NT-SEN-TCK",
    stock: 120,
    shortDesc:
      "Rugged K-type thermocouple for high-temperature measurement up to 1100°C in furnaces and exhaust systems.",
    longDesc:
      "K-type thermocouples are the most widely used temperature sensors for high-heat industrial processes, valued for their broad range, fast response, and low cost. This probe pairs a Nickel-Chromium/Nickel-Alumel junction with a stainless-steel or Inconel sheath, measuring temperatures up to 1100°C (short-term higher with Inconel), and terminates in a convenient M8 connector for quick replacement. Fast thermal response makes K-type ideal for furnaces, kilns, boilers, exhaust and flue gas, plastics, and heat-treatment lines where rapid, reliable readings drive process control. The mineral-insulated (MI) construction resists vibration and mechanical stress in harsh environments. Nidus Trading supplies K-type thermocouples with various sheath materials, diameters, insertion lengths, and connection heads, plus matching compensating cable and transmitters. Specify your maximum temperature, sheath material, probe length, and quantity to receive a tailored quotation and prompt delivery for maintenance or project needs across Pakistan.",
    specs: [
      { name: "Type", value: "K-type (NiCr-NiAl)" },
      { name: "Max Temperature", value: "Up to 1100°C" },
      { name: "Sheath", value: "SS316 / Inconel options" },
      { name: "Connection", value: "M8 connector" },
      { name: "Construction", value: "Mineral insulated (MI)" },
      { name: "Standard", value: "IEC 60584" },
      { name: "Options", value: "Compensating cable / head" },
    ],
    applications: [
      "Furnaces, kilns, and boilers",
      "Exhaust and flue-gas measurement",
      "Plastics and heat treatment",
      "High-temperature process control",
    ],
    features: [
      "Wide range up to 1100°C",
      "Fast thermal response",
      "Vibration-resistant MI construction",
      "Quick-change M8 connector",
    ],
    tags: ["thermocouple Pakistan", "K-type sensor", "high temperature probe"],
    metaTitle: "K-Type Thermocouple Probe M8 | High-Temperature Sensor | Nidus Trading",
    metaDesc:
      "K-type thermocouple probe up to 1100°C with M8 connector, SS/Inconel sheath, IEC 60584. Request a quote for best price in Pakistan.",
    imagePrompt:
      "K-type thermocouple probe with M8 connector against a subtle furnace-glow background, industrial product photo",
    image: u("photo-1518770660439-4636190af475", 1000),
  },
  {
    slug: "honeywell-hall-effect-current-sensor-sps",
    title: "Honeywell Hall-Effect Current Sensor (Open-Loop)",
    categorySlug: "electronic-components",
    brand: "Honeywell",
    sku: "NT-SEN-HALLCS",
    stock: 75,
    featured: true,
    shortDesc:
      "Open-loop Hall-effect current sensor for isolated AC/DC current measurement in drives and power electronics.",
    longDesc:
      "Hall-effect current sensors provide galvanically isolated measurement of AC, DC, and pulsed currents without breaking the circuit or introducing significant losses. This open-loop sensor outputs a proportional analog voltage for straightforward interfacing with controllers, meters, and data-acquisition systems. Isolation between the primary conductor and the measurement electronics protects downstream equipment and personnel, a key requirement in inverters, VFDs, UPS systems, battery management, and solar power electronics. Fast response and good linearity make these sensors suitable for overcurrent protection and closed-loop control of motors and converters. As electrification and renewable projects expand, reliable current sensing is central to safe, efficient power conversion. Nidus Trading supplies Hall-effect current sensors across current ranges and package styles for board-mount and busbar applications. Provide your nominal/peak current, supply voltage, output type, and quantity to receive a competitive quotation with genuine-component assurance and support across Pakistan.",
    specs: [
      { name: "Manufacturer", value: "Honeywell (SPS class)" },
      { name: "Technology", value: "Open-loop Hall effect" },
      { name: "Measures", value: "AC / DC / pulsed current" },
      { name: "Isolation", value: "Galvanic (primary to output)" },
      { name: "Output", value: "Ratiometric analog voltage" },
      { name: "Supply", value: "5V / ±12-15V options" },
      { name: "Mount", value: "PCB / busbar" },
    ],
    applications: [
      "VFD, inverter, and UPS current sensing",
      "Battery management systems",
      "Solar and power electronics",
      "Motor overcurrent protection",
    ],
    features: [
      "Isolated, non-intrusive measurement",
      "Fast response and good linearity",
      "Analog output for easy integration",
      "Board-mount and busbar options",
    ],
    tags: ["current sensor Pakistan", "hall effect sensor", "honeywell sensor supplier"],
    metaTitle: "Honeywell Hall-Effect Current Sensor | Power Electronics | Nidus Trading",
    metaDesc:
      "Open-loop Hall-effect current sensor for isolated AC/DC measurement in drives, UPS & solar. Analog output. Request a quote in Pakistan.",
    imagePrompt:
      "Small PCB-mount Hall-effect current sensor module macro shot on a green circuit board, studio product photo",
    image: u("photo-1555617981-dac3880eac6e", 1000),
  },
  {
    slug: "schneider-zelio-sr2-smart-relay",
    title: "Schneider Zelio Logic SR2 Compact Smart Relay",
    categorySlug: "electronic-components",
    brand: "Schneider Electric",
    sku: "NT-CTL-SR2",
    stock: 50,
    featured: true,
    bestSeller: true,
    shortDesc:
      "Compact programmable smart relay for small automation tasks — a cost-effective alternative to a micro-PLC.",
    longDesc:
      "The Schneider Zelio Logic SR2 is a compact programmable smart relay that brings flexible automation to small machines and installations without the cost or complexity of a full PLC. With built-in digital (and analog on select models) I/O, it handles timing, counting, sequencing, and logic functions programmed in easy ladder (LD) or function block (FBD) languages. An on-board display and keypad allow quick configuration and monitoring, while the DIN-rail form factor fits neatly into control panels. Ideal for lighting control, pumping, HVAC, gates/barriers, conveyors, and building management, the Zelio SR2 is a favourite of panel builders and OEMs for rapid deployment and reliable operation. Nidus Trading supplies Zelio Logic controllers, expansion modules, and programming accessories for machine builders and maintenance teams. Share your I/O count, supply voltage (AC/DC), and analog requirement to receive a competitive quotation with genuine Schneider product and support across Pakistan.",
    specs: [
      { name: "Manufacturer", value: "Schneider Electric" },
      { name: "Series", value: "Zelio Logic SR2" },
      { name: "Programming", value: "Ladder (LD) / FBD" },
      { name: "I/O", value: "Digital (+ analog on models)" },
      { name: "Display", value: "On-board LCD + keypad" },
      { name: "Supply", value: "24VDC / 100-240VAC" },
      { name: "Mount", value: "DIN rail" },
    ],
    applications: [
      "Small machine automation",
      "Lighting, HVAC, and pumping control",
      "Gates, barriers, and conveyors",
      "Building management tasks",
    ],
    features: [
      "Micro-PLC functions at low cost",
      "Easy ladder/FBD programming",
      "On-board display for setup and monitoring",
      "Compact DIN-rail mounting",
    ],
    tags: ["zelio smart relay Pakistan", "schneider logic controller", "mini plc"],
    metaTitle: "Schneider Zelio Logic SR2 Smart Relay | Mini-PLC | Nidus Trading Pakistan",
    metaDesc:
      "Schneider Zelio Logic SR2 compact programmable smart relay for small automation. Ladder/FBD, DIN-rail. Request a quote for best price in Pakistan.",
    imagePrompt:
      "Schneider Zelio smart relay on DIN rail with LCD display and wiring terminals, clean control-panel product photo",
    image: u("photo-1544197150-b99a5804efb6", 1000),
  },
  {
    slug: "panasonic-electrolytic-capacitor-450v-470uf",
    title: "Panasonic Aluminium Electrolytic Capacitor 450V 470µF",
    categorySlug: "electronic-components",
    brand: "Panasonic",
    sku: "NT-CAP-450470",
    stock: 300,
    shortDesc:
      "High-voltage snap-in electrolytic capacitor for SMPS, inverters, and DC-bus energy storage.",
    longDesc:
      "This Panasonic 450V 470µF aluminium electrolytic capacitor is designed for high-voltage bulk energy storage and filtering in power electronics. Snap-in terminals and a long-life, high-ripple-current design make it well-suited to switch-mode power supplies (SMPS), motor drives, inverters, welding equipment, and DC-bus applications where reliability under thermal and electrical stress is essential. Genuine branded capacitors deliver stable capacitance, low ESR, and rated endurance at elevated temperatures — critical for avoiding premature failure that causes costly downtime. Repair centres and OEMs specify quality electrolytics to maintain equipment lifespan and safety margins. Nidus Trading supplies electrolytic capacitors across voltage and capacitance ranges from leading manufacturers, in both snap-in and radial styles, for production and maintenance. Provide your voltage, capacitance, ripple/endurance requirement, and quantity to receive a competitive quotation with authentic components and traceable supply across Pakistan.",
    specs: [
      { name: "Manufacturer", value: "Panasonic" },
      { name: "Type", value: "Aluminium electrolytic (snap-in)" },
      { name: "Capacitance", value: "470µF" },
      { name: "Voltage", value: "450V" },
      { name: "Endurance", value: "Long-life, high ripple" },
      { name: "Temperature", value: "Up to 105°C" },
      { name: "Terminals", value: "Snap-in" },
    ],
    applications: [
      "SMPS and DC-bus filtering",
      "Motor drives and inverters",
      "Welding and power equipment",
      "Board-level repair and OEM",
    ],
    features: [
      "High-voltage bulk energy storage",
      "Low ESR, high ripple-current rating",
      "105°C endurance for long life",
      "Genuine branded reliability",
    ],
    tags: ["electrolytic capacitor Pakistan", "panasonic capacitor", "450v capacitor supplier"],
    metaTitle: "Panasonic Electrolytic Capacitor 450V 470µF | Nidus Trading Pakistan",
    metaDesc:
      "Panasonic aluminium electrolytic capacitor 450V 470µF snap-in for SMPS, drives & inverters. 105°C long life. Request a quote in Pakistan.",
    imagePrompt:
      "Large snap-in aluminium electrolytic capacitor standing on a circuit board, macro studio product photo",
    image: u("photo-1597872200969-2b65d56bd16b", 1000),
  },
  {
    slug: "stm32f103-arm-cortex-m3-microcontroller",
    title: "STMicroelectronics STM32F103 ARM Cortex-M3 Microcontroller",
    categorySlug: "electronic-components",
    brand: "STMicroelectronics",
    sku: "NT-IC-STM32F103",
    stock: 400,
    featured: true,
    shortDesc:
      "Popular 32-bit ARM Cortex-M3 MCU for embedded control, IoT, and industrial product development.",
    longDesc:
      "The STMicroelectronics STM32F103 is one of the most widely adopted 32-bit microcontrollers for embedded and industrial applications, offering an excellent balance of performance, peripherals, and cost. Built on the ARM Cortex-M3 core running up to 72MHz, it integrates Flash and SRAM, multiple timers, ADCs, and rich communication interfaces (USART, SPI, I²C, USB, CAN) that make it ideal for motor control, sensor hubs, data loggers, HMI, and IoT gateways. Its large ecosystem, mature toolchains, and abundant reference designs accelerate product development for local OEMs, R&D labs, and universities. As electronics manufacturing grows in Pakistan, reliable access to genuine MCUs is essential for production continuity. Nidus Trading supplies STM32 microcontrollers and companion components (crystals, regulators, programmers) for prototyping and volume builds. Specify the exact part variant (Flash/package), quantity, and any BOM support needed to receive a competitive quotation with authentic components and dependable lead times across Pakistan.",
    specs: [
      { name: "Manufacturer", value: "STMicroelectronics" },
      { name: "Series", value: "STM32F103 (Cortex-M3)" },
      { name: "Max Clock", value: "72 MHz" },
      { name: "Interfaces", value: "USART, SPI, I²C, USB, CAN" },
      { name: "Peripherals", value: "Timers, ADC, DMA" },
      { name: "Packages", value: "LQFP / others (variant)" },
      { name: "Supply", value: "2.0-3.6V" },
    ],
    applications: [
      "Embedded and motor control",
      "IoT gateways and data loggers",
      "HMI and sensor hubs",
      "R&D, education, and OEM builds",
    ],
    features: [
      "Cortex-M3 performance up to 72MHz",
      "Rich communication peripherals",
      "Large ecosystem and toolchains",
      "Genuine components, traceable supply",
    ],
    tags: ["STM32 Pakistan", "microcontroller supplier", "ARM Cortex-M3 MCU"],
    metaTitle: "STM32F103 ARM Cortex-M3 Microcontroller | Nidus Trading Pakistan",
    metaDesc:
      "STMicroelectronics STM32F103 32-bit ARM Cortex-M3 MCU, 72MHz, USB/CAN/SPI/I²C for embedded & IoT. Request a quote for best price in Pakistan.",
    imagePrompt:
      "STM32 microcontroller chip on a development board, macro shot with bokeh circuitry, studio product photo",
    image: u("photo-1518770660439-4636190af475", 900),
  },

  // ============================================================
  // 3) ELECTRICAL — SWITCHGEAR / CONTACTORS / BREAKERS (8) -> electrical-items
  // ============================================================
  {
    slug: "schneider-acti9-ic60n-mcb-3p-63a-c",
    title: "Schneider Acti9 iC60N MCB 3P 63A C-Curve",
    categorySlug: "electrical-items",
    brand: "Schneider Electric",
    sku: "NT-BRK-IC60N",
    stock: 200,
    featured: true,
    bestSeller: true,
    shortDesc:
      "Premium DIN-rail miniature circuit breaker, 3-pole 63A, C-curve, for distribution board protection.",
    longDesc:
      "The Schneider Acti9 iC60N is a benchmark miniature circuit breaker (MCB) offering reliable overload and short-circuit protection for commercial and industrial distribution boards. This 3-pole, 63A, C-curve device provides a 6kA breaking capacity suited to typical building and plant circuits, with fast, dependable tripping that protects cables and equipment. The Acti9 platform is renowned for its VisiSafe indicator, positive contact indication, and premium build quality that meets stringent IEC standards and consultant specifications. It is a standard choice for offices, factories, hospitals, and government facilities where safety and compliance are paramount. Compatible with a full range of Acti9 accessories (auxiliaries, RCD add-ons, busbars) for scalable panel design. Nidus Trading supplies genuine Schneider Acti9 MCBs across pole configurations, ratings, and trip curves. Provide your poles, current rating, curve (B/C/D), and quantity to receive a competitive quotation with authentic product and documentation for tenders across Pakistan.",
    specs: [
      { name: "Manufacturer", value: "Schneider Electric" },
      { name: "Series", value: "Acti9 iC60N" },
      { name: "Poles", value: "3P" },
      { name: "Rated Current", value: "63A" },
      { name: "Trip Curve", value: "C" },
      { name: "Breaking Capacity", value: "6kA (IEC 60898)" },
      { name: "Mount", value: "DIN rail" },
    ],
    applications: [
      "Distribution board circuit protection",
      "Commercial and industrial panels",
      "Hospitals and government facilities",
      "Motor and sub-circuit protection",
    ],
    features: [
      "Reliable overload and short-circuit trip",
      "VisiSafe positive contact indication",
      "Full Acti9 accessory ecosystem",
      "IEC 60898 compliant, tender-ready",
    ],
    tags: ["schneider MCB Pakistan", "acti9 iC60N", "circuit breaker supplier"],
    metaTitle: "Schneider Acti9 iC60N MCB 3P 63A C | Circuit Breaker | Nidus Trading",
    metaDesc:
      "Schneider Acti9 iC60N MCB 3P 63A C-curve, 6kA for distribution boards. Genuine Schneider. Request a quote for best price in Pakistan.",
    imagePrompt:
      "Schneider Acti9 three-pole MCB mounted on DIN rail in a clean distribution board, product photo",
    image: u("photo-1621905252507-b35492cc74b4"),
  },
  {
    slug: "abb-tmax-xt-mccb-3p-250a-36ka",
    title: "ABB Tmax XT MCCB 3P 250A 36kA",
    categorySlug: "electrical-items",
    brand: "ABB",
    sku: "NT-BRK-TMAXXT",
    stock: 40,
    featured: true,
    shortDesc:
      "Moulded case circuit breaker, 3-pole 250A with 36kA breaking capacity, for main and feeder protection.",
    longDesc:
      "The ABB Tmax XT is a high-performance moulded case circuit breaker (MCCB) engineered for protection of main incomers, feeders, and large motor circuits in industrial and commercial installations. This 3-pole 250A unit delivers a robust 36kA (Icu) breaking capacity, with adjustable thermal-magnetic (or electronic) trip units for precise coordination and selectivity across the distribution system. Compact dimensions, high connectivity, and a broad accessory range (motor operators, auxiliary contacts, shunt trips) make Tmax XT flexible for switchboard builders and consultants. Reliable MCCB protection is essential for safeguarding transformers, distribution panels, and heavy loads on projects where downtime and fault energy carry serious cost. Nidus Trading supplies genuine ABB Tmax XT breakers across frame sizes, current ratings, and trip technologies with documentation for tender approval. Share your rated current, breaking capacity, poles, and trip type to receive a competitive quotation and dependable supply across Pakistan.",
    specs: [
      { name: "Manufacturer", value: "ABB" },
      { name: "Series", value: "Tmax XT (MCCB)" },
      { name: "Poles", value: "3P" },
      { name: "Rated Current", value: "250A" },
      { name: "Breaking Capacity", value: "36kA (Icu)" },
      { name: "Trip Unit", value: "Thermal-magnetic / electronic" },
      { name: "Standard", value: "IEC 60947-2" },
    ],
    applications: [
      "Main incomer and feeder protection",
      "Distribution switchboards",
      "Large motor and transformer circuits",
      "Industrial and commercial power",
    ],
    features: [
      "High 36kA breaking capacity",
      "Adjustable trip for selectivity",
      "Compact, high-connectivity design",
      "Wide accessory range",
    ],
    tags: ["ABB MCCB Pakistan", "tmax xt 250a", "moulded case breaker supplier"],
    metaTitle: "ABB Tmax XT MCCB 3P 250A 36kA | Feeder Protection | Nidus Trading Pakistan",
    metaDesc:
      "ABB Tmax XT MCCB 3-pole 250A, 36kA Icu for mains & feeders. Adjustable trip, IEC 60947-2. Request a quote for best price in Pakistan.",
    imagePrompt:
      "ABB moulded case circuit breaker (MCCB) black body with dial, mounted in switchboard, industrial product photo",
    image: u("photo-1621905251189-08b45d6a269e", 1000),
  },
  {
    slug: "schneider-tesys-d-lc1d80-contactor-80a-3p",
    title: "Schneider TeSys D LC1D80 Contactor 80A 3P",
    categorySlug: "electrical-items",
    brand: "Schneider Electric",
    sku: "NT-CTR-LC1D80",
    stock: 70,
    featured: true,
    bestSeller: true,
    shortDesc:
      "Heavy-duty 3-pole power contactor, 80A / up to 37kW, for motor and load switching in control panels.",
    longDesc:
      "The Schneider TeSys D LC1D80 is a rugged 3-pole power contactor built for reliable switching of motors and loads in industrial control systems. Rated for 80A (AC-3) and motors up to approximately 37kW at 400V, it delivers long electrical and mechanical endurance for demanding duty cycles on pumps, fans, compressors, and machinery. The versatile coil options (AC/DC, wide voltage range) and integrated auxiliary contacts simplify control-circuit design, while the compact DIN-rail/screw-mount body fits standard panels. TeSys D is a global standard for motor control centres (MCCs), automatic transfer schemes, and star-delta starters, and it integrates with TeSys overload relays for complete motor protection. Nidus Trading supplies genuine TeSys D contactors and overload relays across current ratings and coil voltages. Provide your motor rating/current (AC-3), coil voltage, and auxiliary requirements to receive a competitive quotation with authentic Schneider product and support across Pakistan.",
    specs: [
      { name: "Manufacturer", value: "Schneider Electric" },
      { name: "Series", value: "TeSys D LC1D80" },
      { name: "Poles", value: "3P" },
      { name: "Rated Current (AC-3)", value: "80A" },
      { name: "Motor Power", value: "Up to ~37kW @ 400V" },
      { name: "Coil", value: "AC/DC, multiple voltages" },
      { name: "Aux Contacts", value: "1NO + 1NC integrated" },
    ],
    applications: [
      "Motor switching in control panels",
      "Motor control centres (MCC)",
      "Star-delta and DOL starters",
      "Pumps, fans, and compressors",
    ],
    features: [
      "High endurance for heavy duty cycles",
      "Wide coil voltage options",
      "Integrated auxiliary contacts",
      "Pairs with TeSys overload relays",
    ],
    tags: ["schneider contactor Pakistan", "tesys LC1D80", "80a contactor supplier"],
    metaTitle: "Schneider TeSys D LC1D80 Contactor 80A 3P | Motor Control | Nidus Trading",
    metaDesc:
      "Schneider TeSys D LC1D80 power contactor 80A 3P, up to 37kW motor switching. Genuine Schneider. Request a quote in Pakistan.",
    imagePrompt:
      "Schneider TeSys D black power contactor on DIN rail with control wiring, industrial panel product photo",
    image: u("photo-1544197150-b99a5804efb6", 900),
  },
  {
    slug: "siemens-sirius-3rv2-motor-protection-breaker",
    title: "Siemens SIRIUS 3RV2 Motor Protection Circuit Breaker",
    categorySlug: "electrical-items",
    brand: "Siemens",
    sku: "NT-BRK-3RV2",
    stock: 85,
    featured: true,
    shortDesc:
      "Adjustable motor protection circuit breaker (MPCB) with thermal and magnetic trip for reliable motor starting.",
    longDesc:
      "The Siemens SIRIUS 3RV2 is a compact motor protection circuit breaker (MPCB) that combines short-circuit, overload, and phase-loss protection in a single DIN-rail device — the backbone of safe, code-compliant motor feeders. Its adjustable thermal overload setting matches the exact motor full-load current, while the fixed magnetic trip provides instantaneous short-circuit protection, safeguarding both the motor and the cabling. Class 10 tripping and reliable phase-failure sensitivity help prevent single-phasing damage that commonly destroys three-phase motors. The 3RV2 integrates seamlessly with SIRIUS contactors to form space-saving, coordinated load feeders and starters in motor control centres. Manufacturing, water/wastewater, HVAC, and process plants specify SIRIUS for its durability and Siemens quality. Nidus Trading supplies genuine SIRIUS 3RV2 MPCBs across current ranges with link modules and accessories. Provide your motor FLC, setting range, and quantity to receive a competitive quotation with authentic Siemens product and support across Pakistan.",
    specs: [
      { name: "Manufacturer", value: "Siemens" },
      { name: "Series", value: "SIRIUS 3RV2 (MPCB)" },
      { name: "Protection", value: "Overload + short-circuit + phase-loss" },
      { name: "Trip Class", value: "Class 10" },
      { name: "Adjustment", value: "Adjustable thermal setting" },
      { name: "Mount", value: "DIN rail" },
      { name: "Standard", value: "IEC 60947" },
    ],
    applications: [
      "Motor feeder protection",
      "Motor control centres and starters",
      "Pumps, HVAC, and process motors",
      "Water/wastewater plants",
    ],
    features: [
      "All-in-one motor protection",
      "Adjustable to exact motor current",
      "Phase-loss sensitivity prevents damage",
      "Integrates with SIRIUS contactors",
    ],
    tags: ["siemens MPCB Pakistan", "sirius 3RV2", "motor protection breaker"],
    metaTitle: "Siemens SIRIUS 3RV2 Motor Protection Breaker | Nidus Trading Pakistan",
    metaDesc:
      "Siemens SIRIUS 3RV2 MPCB with adjustable overload, short-circuit & phase-loss protection. Class 10. Request a quote in Pakistan.",
    imagePrompt:
      "Siemens SIRIUS motor protection circuit breaker with rotary current dial on DIN rail, industrial product photo",
    image: u("photo-1621905252507-b35492cc74b4", 1000),
  },
  {
    slug: "abb-ot160e3-changeover-switch-160a-3p",
    title: "ABB OT160E3 Changeover Switch 160A 3P",
    categorySlug: "electrical-items",
    brand: "ABB",
    sku: "NT-SW-OT160",
    stock: 50,
    shortDesc:
      "Manual changeover (I-0-II) switch, 160A 3-pole, for safe source selection between mains and generator.",
    longDesc:
      "The ABB OT160E3 is a robust manual changeover switch (I-0-II) used to safely transfer loads between two power sources — most commonly mains and standby generator supply. Rated at 160A across 3 poles, it provides a clear, positive switching action with a defined OFF position that prevents back-feeding and ensures safe isolation. The compact modular design supports panel or DIN mounting and accepts extended handles and auxiliary contacts for status indication and remote signalling. Reliable source-changeover is essential for hospitals, data centres, industrial plants, and commercial buildings that depend on continuous power. As load-shedding and backup generation remain common in Pakistan, quality changeover switches are a frequent requirement on new and retrofit projects. Nidus Trading supplies ABB OT-series switches across current ratings and pole counts, with handles and enclosures available. Provide your current rating, poles, and mounting/handle requirement to receive a competitive quotation and dependable supply nationwide.",
    specs: [
      { name: "Manufacturer", value: "ABB" },
      { name: "Model", value: "OT160E3" },
      { name: "Type", value: "Manual changeover (I-0-II)" },
      { name: "Rated Current", value: "160A" },
      { name: "Poles", value: "3P" },
      { name: "Accessories", value: "Handles, aux contacts" },
      { name: "Standard", value: "IEC 60947-3" },
    ],
    applications: [
      "Mains / generator source selection",
      "Manual transfer in LV panels",
      "Hospitals, data centres, industry",
      "Backup power installations",
    ],
    features: [
      "Positive I-0-II switching action",
      "Defined OFF prevents back-feed",
      "Compact panel/DIN mounting",
      "Handles and aux contacts available",
    ],
    tags: ["ABB changeover switch Pakistan", "OT160E3", "generator transfer switch"],
    metaTitle: "ABB OT160E3 Changeover Switch 160A 3P | Nidus Trading Pakistan",
    metaDesc:
      "ABB OT160E3 manual changeover switch 160A 3P (I-0-II) for mains/generator transfer. IEC 60947-3. Request a quote in Pakistan.",
    imagePrompt:
      "ABB manual changeover switch with rotary handle and I-0-II markings, mounted in an electrical panel, product photo",
    image: u("photo-1558494949-ef010cbdcc31", 1000),
  },
  {
    slug: "schneider-easy9-rccb-4p-63a-30ma",
    title: "Schneider Easy9 RCCB 4P 63A 30mA",
    categorySlug: "electrical-items",
    brand: "Schneider Electric",
    sku: "NT-RCD-EASY9",
    stock: 95,
    bestSeller: true,
    shortDesc:
      "Residual current circuit breaker, 4-pole 63A 30mA, for earth-leakage and shock protection.",
    longDesc:
      "The Schneider Easy9 RCCB is a residual current circuit breaker providing essential earth-leakage protection against electric shock and fire risk from insulation faults. This 4-pole, 63A device with 30mA sensitivity disconnects the supply rapidly when it detects dangerous leakage current, protecting people and property in three-phase circuits. Reliable RCD protection is mandated by modern wiring regulations for socket circuits, wet areas, and general safety across residential, commercial, and industrial installations. The Easy9 range offers dependable performance and straightforward DIN-rail installation at excellent value, making it a popular choice for contractors and facility teams. Type AC sensing suits general loads, with Type A options available for circuits containing electronics. Nidus Trading supplies Schneider Easy9 and Acti9 RCCBs/RCBOs across pole counts, ratings, and sensitivities. Provide your poles, current rating, sensitivity (30/100/300mA), and type to receive a competitive quotation with genuine Schneider product and documentation across Pakistan.",
    specs: [
      { name: "Manufacturer", value: "Schneider Electric" },
      { name: "Series", value: "Easy9 RCCB" },
      { name: "Poles", value: "4P" },
      { name: "Rated Current", value: "63A" },
      { name: "Sensitivity", value: "30mA" },
      { name: "Type", value: "AC (Type A optional)" },
      { name: "Mount", value: "DIN rail" },
    ],
    applications: [
      "Earth-leakage / shock protection",
      "Three-phase distribution boards",
      "Socket and wet-area circuits",
      "Residential, commercial, industrial",
    ],
    features: [
      "30mA sensitivity for personnel safety",
      "Fast disconnection on leakage fault",
      "Easy DIN-rail installation",
      "Genuine Schneider reliability",
    ],
    tags: ["RCCB Pakistan", "schneider easy9", "earth leakage breaker"],
    metaTitle: "Schneider Easy9 RCCB 4P 63A 30mA | Earth Leakage | Nidus Trading Pakistan",
    metaDesc:
      "Schneider Easy9 RCCB 4-pole 63A 30mA for earth-leakage & shock protection. DIN-rail, genuine Schneider. Request a quote in Pakistan.",
    imagePrompt:
      "Schneider four-pole RCCB residual current device on DIN rail with test button, clean product photo",
    image: u("photo-1621905251189-08b45d6a269e", 900),
  },
  {
    slug: "chint-nxr-25-thermal-overload-relay",
    title: "Chint NXR-25 Thermal Overload Relay",
    categorySlug: "electrical-items",
    brand: "Chint",
    sku: "NT-OLR-NXR25",
    stock: 120,
    shortDesc:
      "Adjustable thermal overload relay for motor protection, pairing directly with compatible contactors.",
    longDesc:
      "The Chint NXR-25 thermal overload relay protects motors from damage due to sustained overload, stalled rotors, and phase imbalance. Its adjustable bimetallic mechanism is set to the motor full-load current and trips within a defined time-current characteristic, disconnecting the control circuit before winding temperatures reach damaging levels. Phase-loss sensitivity guards against single-phasing, a leading cause of three-phase motor burnout. Designed to mount directly onto compatible contactors, the NXR-25 forms a compact, economical motor starter for pumps, fans, conveyors, and general machinery. Selectable manual/automatic reset and integrated NO/NC auxiliary contacts simplify control wiring and status indication. Cost-conscious projects and OEMs value Chint for dependable protection at competitive prices. Nidus Trading supplies Chint overload relays and contactors across current ranges to build complete starters. Provide your motor FLC, contactor model, and quantity to receive a competitive quotation and prompt supply across Pakistan.",
    specs: [
      { name: "Manufacturer", value: "Chint" },
      { name: "Model", value: "NXR-25" },
      { name: "Type", value: "Thermal overload relay" },
      { name: "Adjustment", value: "Adjustable FLC setting" },
      { name: "Protection", value: "Overload + phase loss" },
      { name: "Reset", value: "Manual / auto selectable" },
      { name: "Aux Contacts", value: "1NO + 1NC" },
    ],
    applications: [
      "Motor overload protection",
      "DOL and star-delta starters",
      "Pumps, fans, and conveyors",
      "OEM motor control assemblies",
    ],
    features: [
      "Adjustable to exact motor current",
      "Phase-loss protection",
      "Direct contactor mounting",
      "Manual/auto reset with aux contacts",
    ],
    tags: ["chint overload relay Pakistan", "thermal overload NXR-25", "motor protection relay"],
    metaTitle: "Chint NXR-25 Thermal Overload Relay | Motor Protection | Nidus Trading",
    metaDesc:
      "Chint NXR-25 adjustable thermal overload relay with phase-loss protection for motor starters. Request a quote for best price in Pakistan.",
    imagePrompt:
      "Thermal overload relay mounted beneath a contactor with current adjustment dial, industrial product photo",
    image: u("photo-1544197150-b99a5804efb6", 950),
  },
  {
    slug: "socomec-sirco-load-break-switch-400a-4p",
    title: "Socomec Sirco Load Break Switch 400A 4P",
    categorySlug: "electrical-items",
    brand: "Socomec",
    sku: "NT-SW-SIRCO400",
    stock: 30,
    featured: true,
    shortDesc:
      "On-load isolating switch-disconnector, 400A 4-pole, for safe switching and isolation of main circuits.",
    longDesc:
      "The Socomec Sirco is a high-quality load break switch (switch-disconnector) that enables safe on-load switching and secure isolation of electrical circuits for maintenance. This 400A, 4-pole unit makes and breaks rated load current with a strong, positive quick make/quick break mechanism, and provides visible, reliable isolation that protects maintenance personnel. Switch-disconnectors are essential at main incomers, sub-distribution, and equipment isolation points in industrial and commercial installations, and are frequently mandated by safety procedures for lock-out/tag-out. The Sirco range offers front and side operation, extended handles, and door-interlock options for panel integration. Facilities, utilities, and infrastructure projects specify Socomec for its French-engineered reliability and full IEC compliance. Nidus Trading supplies Sirco switches across current ratings and pole counts with handles and accessories. Provide your rated current, poles, and operation/handle requirement to receive a competitive quotation with genuine product and documentation for tenders across Pakistan.",
    specs: [
      { name: "Manufacturer", value: "Socomec" },
      { name: "Series", value: "Sirco (switch-disconnector)" },
      { name: "Rated Current", value: "400A" },
      { name: "Poles", value: "4P" },
      { name: "Action", value: "Quick make / quick break" },
      { name: "Accessories", value: "Handles, door interlock" },
      { name: "Standard", value: "IEC 60947-3" },
    ],
    applications: [
      "Main and sub-distribution isolation",
      "Equipment lock-out/tag-out",
      "Industrial and commercial panels",
      "Utilities and infrastructure",
    ],
    features: [
      "Safe on-load switching",
      "Visible, positive isolation",
      "Quick make/break mechanism",
      "Handle and interlock options",
    ],
    tags: ["socomec sirco Pakistan", "load break switch 400a", "switch disconnector"],
    metaTitle: "Socomec Sirco Load Break Switch 400A 4P | Isolation | Nidus Trading Pakistan",
    metaDesc:
      "Socomec Sirco switch-disconnector 400A 4P for safe on-load switching & isolation. IEC 60947-3. Request a quote for best price in Pakistan.",
    imagePrompt:
      "Socomec load break switch with red/yellow rotary handle in an electrical enclosure, industrial product photo",
    image: u("photo-1558494949-ef010cbdcc31", 950),
  },

  // ============================================================
  // 4) SAFETY & LIFTING EQUIPMENT  (6) -> safety-lifting-equipment
  // ============================================================
  {
    slug: "galvanized-steel-wire-rope-6x36-iwrc-16mm",
    title: "Galvanized Steel Wire Rope 6x36 IWRC 16mm",
    categorySlug: "safety-lifting-equipment",
    brand: "Nidus Select",
    sku: "NT-WR-6X36-16",
    stock: 250,
    featured: true,
    bestSeller: true,
    shortDesc:
      "High-strength 6x36 IWRC galvanized wire rope for cranes, winches, and heavy lifting applications.",
    longDesc:
      "This 16mm 6x36 IWRC galvanized steel wire rope is engineered for demanding lifting and hoisting duties where strength, flexibility, and fatigue resistance are critical. The 6x36 construction provides an excellent balance of flexibility and abrasion resistance, while the Independent Wire Rope Core (IWRC) adds crush resistance and higher breaking load compared with fibre-core ropes. Hot-dip galvanizing protects against corrosion for outdoor cranes, marine, and harsh environments. Correctly specified wire rope is a life-safety component — used on mobile and tower cranes, winches, elevators, and rigging where failure is catastrophic. Nidus Trading supplies wire rope across diameters and constructions, cut to length, with swaged fittings, thimbles, and test certificates for compliance on regulated projects. Provide your diameter, construction, length, and end-fitting requirement to receive a competitive quotation with mill/test documentation and dependable supply for industrial and infrastructure projects across Pakistan.",
    specs: [
      { name: "Construction", value: "6x36 IWRC" },
      { name: "Diameter", value: "16 mm" },
      { name: "Finish", value: "Hot-dip galvanized" },
      { name: "Core", value: "Independent Wire Rope Core" },
      { name: "Grade", value: "1770 / 1960 N/mm² options" },
      { name: "Supply", value: "Per meter / drum, cut to length" },
      { name: "Docs", value: "Test certificate available" },
    ],
    applications: [
      "Mobile and tower crane hoisting",
      "Winches and material handling",
      "Rigging and slinging",
      "Marine and outdoor lifting",
    ],
    features: [
      "High breaking load with IWRC",
      "Good flexibility and fatigue life",
      "Galvanized corrosion protection",
      "Cut-to-length with fittings & certs",
    ],
    tags: ["steel wire rope Pakistan", "6x36 IWRC rope", "crane wire rope supplier"],
    metaTitle: "Galvanized Steel Wire Rope 6x36 IWRC 16mm | Lifting | Nidus Trading Pakistan",
    metaDesc:
      "6x36 IWRC galvanized steel wire rope 16mm for cranes, winches & rigging. Cut-to-length with certs. Request a quote in Pakistan.",
    imagePrompt:
      "Coil of thick galvanized steel wire rope with visible strand construction, industrial studio product photo",
    image: u("photo-1504307651254-35680f356dfd"),
  },
  {
    slug: "crosby-g209-screw-pin-anchor-shackle-3-25t",
    title: "Crosby G-209 Screw Pin Anchor Shackle 3.25T",
    categorySlug: "safety-lifting-equipment",
    brand: "Crosby",
    sku: "NT-SHK-G209",
    stock: 180,
    featured: true,
    shortDesc:
      "Forged screw-pin anchor shackle, 3.25T WLL, with traceability for certified rigging and lifting.",
    longDesc:
      "The Crosby G-209 is the global benchmark screw-pin anchor (bow) shackle, trusted by riggers for safe, certified lifting connections. Quenched and tempered forged steel with a generous 5:1 design factor delivers dependable strength, while the wide bow accommodates multiple sling legs and slings at angles. Each shackle carries a Working Load Limit (WLL) — 3.25 tonnes for this size — permanently forged into the body, along with traceability markings that satisfy audit and inspection requirements. Genuine Crosby hardware is specified where safety and compliance are non-negotiable: cranes, offshore, construction, and defense lifting operations. Using counterfeit or unrated shackles risks catastrophic failure and legal liability, so quality-assured, traceable products are essential. Nidus Trading supplies genuine Crosby shackles and rigging hardware across sizes with certificates. Provide your WLL/size, pin type (screw/bolt), and quantity to receive a competitive quotation with authentic product and documentation for regulated projects across Pakistan.",
    specs: [
      { name: "Manufacturer", value: "Crosby" },
      { name: "Model", value: "G-209 (bow shackle)" },
      { name: "Working Load Limit", value: "3.25 T" },
      { name: "Pin Type", value: "Screw pin" },
      { name: "Material", value: "Forged, quenched & tempered" },
      { name: "Design Factor", value: "5:1" },
      { name: "Traceability", value: "Forged WLL + markings" },
    ],
    applications: [
      "Sling and load connections",
      "Crane and hoist rigging",
      "Construction and offshore",
      "Defense and heavy lifting",
    ],
    features: [
      "Genuine Crosby, 5:1 design factor",
      "Forged WLL and traceability marks",
      "Wide bow for multi-leg slings",
      "Certified for regulated projects",
    ],
    tags: ["crosby shackle Pakistan", "G-209 shackle", "rigging hardware supplier"],
    metaTitle: "Crosby G-209 Screw Pin Anchor Shackle 3.25T | Rigging | Nidus Trading",
    metaDesc:
      "Genuine Crosby G-209 screw-pin bow shackle, 3.25T WLL, 5:1 design factor with traceability. Request a quote for best price in Pakistan.",
    imagePrompt:
      "Galvanized Crosby bow shackle with screw pin close-up showing stamped WLL, studio product photo",
    image: u("photo-1581092160562-40aa08e78837"),
  },
  {
    slug: "polyester-round-sling-5t-3m-endless",
    title: "Polyester Round Sling 5T WLL 3m (Endless)",
    categorySlug: "safety-lifting-equipment",
    brand: "Nidus Select",
    sku: "NT-SLG-RS5T",
    stock: 140,
    bestSeller: true,
    shortDesc:
      "Endless polyester round sling, 5T WLL, colour-coded for safe, load-friendly lifting of delicate goods.",
    longDesc:
      "Polyester round slings offer a lightweight, flexible, and load-friendly alternative to chain and wire rope for a wide range of lifting tasks. This endless sling has a 5-tonne Working Load Limit (colour-coded red per EN 1492-2) and consists of a continuous polyester core yarn protected by a tough double-wall cover, giving a high strength-to-weight ratio and gentle handling that won't mar finished or delicate loads. Round slings conform to irregular shapes, are easy to store, and provide a built-in wear indicator through the protective cover. They are widely used in fabrication, logistics, machinery installation, and general industry where safe, versatile lifting is required. Nidus Trading supplies polyester round slings and webbing slings across WLL ratings, lengths, and configurations, with test certificates for compliance. Provide your WLL, length, and quantity to receive a competitive quotation with quality-assured slings and documentation for safe lifting operations across Pakistan.",
    specs: [
      { name: "Type", value: "Endless round sling" },
      { name: "Working Load Limit", value: "5 T (straight pull)" },
      { name: "Colour Code", value: "Red (EN 1492-2)" },
      { name: "Material", value: "100% polyester" },
      { name: "Length", value: "3 m (custom available)" },
      { name: "Safety Factor", value: "7:1" },
      { name: "Docs", value: "Test certificate available" },
    ],
    applications: [
      "Machinery and equipment lifting",
      "Delicate/finished load handling",
      "Fabrication and logistics",
      "General industrial rigging",
    ],
    features: [
      "High strength-to-weight ratio",
      "Colour-coded WLL per standard",
      "Load-friendly, conforms to shapes",
      "Protective cover with wear indication",
    ],
    tags: ["round sling Pakistan", "polyester lifting sling", "5 ton sling supplier"],
    metaTitle: "Polyester Round Sling 5T 3m Endless | Lifting Slings | Nidus Trading Pakistan",
    metaDesc:
      "Endless polyester round sling 5T WLL, colour-coded (EN 1492-2), 7:1 SF. Load-friendly lifting. Request a quote in Pakistan.",
    imagePrompt:
      "Red endless polyester round sling coiled, showing double-wall cover, clean studio product photo",
    image: u("photo-1504307651254-35680f356dfd", 1000),
  },
  {
    slug: "lever-hoist-come-along-3t-1-5m",
    title: "Lever Hoist (Come-Along) 3T x 1.5m",
    categorySlug: "safety-lifting-equipment",
    brand: "Nidus Select",
    sku: "NT-HST-LH3T",
    stock: 90,
    featured: true,
    shortDesc:
      "Portable ratchet lever hoist, 3-tonne capacity, for pulling, lifting, and tensioning in any orientation.",
    longDesc:
      "A lever hoist (come-along) is an indispensable manual lifting and pulling tool for maintenance, construction, and rigging crews. This 3-tonne unit uses a compact ratchet lever mechanism to lift, pull, and tension loads in vertical, horizontal, or angled positions — where a chain block cannot easily be used. Hardened load chain (Grade 80/100), a robust forged hook with safety latch, and a double-pawl braking system provide controlled, secure load holding for confident operation. Come-alongs are ideal for tensioning cables, positioning machinery, recovering vehicles, and short-lift tasks on sites without power. Durable construction and a free-chaining function speed up hook-up and reduce operator fatigue. Nidus Trading supplies lever hoists and chain blocks across capacities and lift heights, with test certificates for regulated use. Provide your capacity, standard lift/chain length, and quantity to receive a competitive quotation with quality-assured equipment and documentation across Pakistan.",
    specs: [
      { name: "Type", value: "Ratchet lever hoist" },
      { name: "Capacity", value: "3 T" },
      { name: "Standard Lift", value: "1.5 m" },
      { name: "Load Chain", value: "Grade 80/100" },
      { name: "Hooks", value: "Forged with safety latch" },
      { name: "Brake", value: "Double-pawl mechanism" },
      { name: "Docs", value: "Test certificate available" },
    ],
    applications: [
      "Pulling, lifting, and tensioning",
      "Machinery positioning",
      "Cable and pipe tensioning",
      "Site work without power",
    ],
    features: [
      "Works in any orientation",
      "Hardened Grade 80/100 load chain",
      "Double-pawl braking for safe holding",
      "Free-chaining for fast hook-up",
    ],
    tags: ["lever hoist Pakistan", "come along 3 ton", "ratchet puller supplier"],
    metaTitle: "Lever Hoist Come-Along 3T x 1.5m | Manual Lifting | Nidus Trading Pakistan",
    metaDesc:
      "3T ratchet lever hoist (come-along), 1.5m lift, Grade 80/100 chain, safety hooks. Request a quote for best price in Pakistan.",
    imagePrompt:
      "Yellow/black ratchet lever hoist with load chain and hooks, rugged industrial studio product photo",
    image: u("photo-1581092918056-0c4c3acd3789"),
  },
  {
    slug: "3m-dbi-sala-full-body-safety-harness",
    title: "3M DBI-SALA Full Body Safety Harness (Fall Arrest)",
    categorySlug: "safety-lifting-equipment",
    brand: "3M DBI-SALA",
    sku: "NT-PPE-HARNESS",
    stock: 110,
    featured: true,
    bestSeller: true,
    shortDesc:
      "Certified full-body fall-arrest harness with dorsal D-ring for safe work at height.",
    longDesc:
      "The 3M DBI-SALA full body harness is a premium fall-arrest solution that protects workers at height across construction, telecom, oil & gas, and industrial maintenance. Engineered to distribute arrest forces across the thighs, pelvis, chest, and shoulders, it features a dorsal (back) D-ring for lanyard attachment and adjustable, quick-connect buckles for a secure, comfortable fit. Durable webbing, corrosion-resistant hardware, and clear labelling support compliance with international fall-protection standards (ANSI/EN), which are increasingly enforced on safety-conscious projects and multinational sites. Correctly rated, certified harnesses — used with shock-absorbing lanyards and anchor points — are essential for preventing fatal falls, the leading cause of construction deaths. Nidus Trading supplies 3M and other certified harnesses, lanyards, and fall-protection kits with documentation for HSE compliance. Provide your harness class, size, and quantity to receive a competitive quotation with genuine, certified safety equipment for teams and projects across Pakistan.",
    specs: [
      { name: "Manufacturer", value: "3M DBI-SALA" },
      { name: "Type", value: "Full body fall-arrest harness" },
      { name: "Attachment", value: "Dorsal D-ring" },
      { name: "Buckles", value: "Quick-connect, adjustable" },
      { name: "Standard", value: "ANSI / EN 361 class" },
      { name: "Hardware", value: "Corrosion-resistant" },
      { name: "Use", value: "Work at height" },
    ],
    applications: [
      "Construction and steel erection",
      "Telecom towers and rooftops",
      "Oil & gas and industrial maintenance",
      "Any certified work-at-height task",
    ],
    features: [
      "Distributes fall-arrest forces safely",
      "Dorsal D-ring for lanyard connection",
      "Adjustable quick-connect fit",
      "Certified to ANSI/EN standards",
    ],
    tags: ["safety harness Pakistan", "3M fall arrest harness", "PPE supplier"],
    metaTitle: "3M DBI-SALA Full Body Safety Harness | Fall Arrest | Nidus Trading Pakistan",
    metaDesc:
      "3M DBI-SALA full-body fall-arrest harness with dorsal D-ring, ANSI/EN certified. Work-at-height safety. Request a quote in Pakistan.",
    imagePrompt:
      "Full body safety harness with dorsal D-ring displayed on a mannequin torso, clean safety-equipment product photo",
    image: u("photo-1504307651254-35680f356dfd", 900),
  },
  {
    slug: "electric-chain-hoist-2t-380v-3phase",
    title: "Electric Chain Hoist 2T 380V 3-Phase",
    categorySlug: "safety-lifting-equipment",
    brand: "Nidus Select",
    sku: "NT-HST-EC2T",
    stock: 35,
    shortDesc:
      "Industrial 2-tonne electric chain hoist with pendant control for repetitive overhead lifting.",
    longDesc:
      "This 2-tonne electric chain hoist delivers fast, reliable overhead lifting for workshops, warehouses, and production lines. Powered by a 380V 3-phase motor, it raises and lowers loads smoothly via a hardened Grade 80 load chain, controlled from a low-voltage pendant for operator safety. An electromagnetic brake holds the load securely on power loss, while a friction clutch/limit switches protect against over-travel and overload. Rugged construction, a durable motor, and easy maintenance make electric hoists far more productive than manual lifting for repetitive tasks, improving both throughput and workplace safety. Suited to mounting on runway beams, jib cranes, or gantry systems, they are core equipment for manufacturing and material handling. Nidus Trading supplies electric chain and wire-rope hoists across capacities, lift heights, and control options (fixed or trolley-mounted). Provide your capacity, lift height, supply voltage, and mounting/trolley requirement to receive a competitive quotation with quality equipment and support across Pakistan.",
    specs: [
      { name: "Type", value: "Electric chain hoist" },
      { name: "Capacity", value: "2 T" },
      { name: "Supply", value: "380V 3-phase" },
      { name: "Load Chain", value: "Grade 80" },
      { name: "Control", value: "Low-voltage pendant" },
      { name: "Brake", value: "Electromagnetic" },
      { name: "Options", value: "Fixed / trolley, lift height" },
    ],
    applications: [
      "Overhead lifting in workshops",
      "Production and assembly lines",
      "Warehouse material handling",
      "Jib, gantry, and runway systems",
    ],
    features: [
      "Fast, repetitive overhead lifting",
      "Electromagnetic load-holding brake",
      "Overload and limit protection",
      "Fixed or trolley-mounted options",
    ],
    tags: ["electric chain hoist Pakistan", "2 ton hoist", "overhead lifting supplier"],
    metaTitle: "Electric Chain Hoist 2T 380V 3-Phase | Overhead Lifting | Nidus Trading",
    metaDesc:
      "2T electric chain hoist, 380V 3-phase, Grade 80 chain, pendant control, e-brake. Request a quote for best price in Pakistan.",
    imagePrompt:
      "Industrial electric chain hoist hanging from a beam with pendant control and load chain, product photo",
    image: u("photo-1581092918056-0c4c3acd3789", 1000),
  },

  // ============================================================
  // 5) MECHANICAL ITEMS & BEARINGS  (5) -> mechanical-items
  // ============================================================
  {
    slug: "skf-6205-2rs1-deep-groove-ball-bearing",
    title: "SKF 6205-2RS1 Deep Groove Ball Bearing",
    categorySlug: "mechanical-items",
    brand: "SKF",
    sku: "NT-BRG-6205",
    stock: 500,
    featured: true,
    bestSeller: true,
    shortDesc:
      "Sealed deep groove ball bearing (25x52x15mm) for electric motors, pumps, and general machinery.",
    longDesc:
      "The SKF 6205-2RS1 is a sealed deep groove ball bearing and one of the most commonly used bearings in industry, found in electric motors, pumps, fans, gearboxes, and countless machines. With a 25mm bore, 52mm outside diameter, and 15mm width, it handles both radial and moderate axial loads at high speeds with low friction. The contact seals on both sides (2RS1) retain grease and exclude dust and moisture, delivering long, maintenance-free service life even in contaminated environments. Genuine SKF bearings provide superior material quality, precise tolerances, and consistent performance that reduce vibration, noise, and unplanned downtime — critical for production reliability. Counterfeit bearings are a widespread problem, so authentic, traceable supply matters. Nidus Trading supplies genuine SKF and other premium bearings across the full range for maintenance and OEM needs. Provide your bearing number, seal/clearance type, and quantity to receive a competitive quotation with authentic product and dependable supply across Pakistan.",
    specs: [
      { name: "Manufacturer", value: "SKF" },
      { name: "Designation", value: "6205-2RS1" },
      { name: "Bore (d)", value: "25 mm" },
      { name: "Outside Dia (D)", value: "52 mm" },
      { name: "Width (B)", value: "15 mm" },
      { name: "Seals", value: "Contact seals both sides (2RS1)" },
      { name: "Lubrication", value: "Pre-greased" },
    ],
    applications: [
      "Electric motors and pumps",
      "Fans, blowers, and gearboxes",
      "Conveyors and machinery",
      "General industrial maintenance",
    ],
    features: [
      "Handles radial and axial loads",
      "Sealed for maintenance-free life",
      "Genuine SKF precision and quality",
      "Low friction, low noise operation",
    ],
    tags: ["SKF bearing Pakistan", "6205 2RS bearing", "ball bearing supplier"],
    metaTitle: "SKF 6205-2RS1 Deep Groove Ball Bearing | Nidus Trading Pakistan",
    metaDesc:
      "Genuine SKF 6205-2RS1 sealed deep groove ball bearing 25x52x15mm for motors & pumps. Request a quote for best price in Pakistan.",
    imagePrompt:
      "Single sealed SKF deep groove ball bearing close-up on brushed steel surface, macro studio product photo",
    image: u("photo-1581092918056-0c4c3acd3789", 900),
  },
  {
    slug: "skf-snl-517-plummer-block-housing",
    title: "SKF SNL 517 Plummer Block Housing",
    categorySlug: "mechanical-items",
    brand: "SKF",
    sku: "NT-BRG-SNL517",
    stock: 60,
    featured: true,
    shortDesc:
      "Split plummer (pillow) block housing for easy mounting and maintenance of shaft bearings.",
    longDesc:
      "The SKF SNL 517 is a split plummer block (pillow block) housing designed for straightforward mounting, inspection, and maintenance of bearings on shafts. Its two-part split design allows bearings and seals to be fitted, inspected, and replaced without dismantling adjacent equipment — a major advantage for pumps, fans, conveyors, and heavy rotating machinery. Cast from high-quality material for strength and vibration damping, the SNL range accepts self-aligning ball or spherical roller bearings with adapter sleeves, and supports a wide selection of seals for dusty, wet, or high-temperature conditions. Reliable bearing housings are essential for shaft alignment, load support, and long service life in industrial drivetrains. Nidus Trading supplies SKF SNL and SNL-series housings along with matching bearings, adapter sleeves, and seals to complete the assembly. Provide your housing/bearing designation, shaft diameter, and seal requirement to receive a competitive quotation with genuine components and technical support across Pakistan.",
    specs: [
      { name: "Manufacturer", value: "SKF" },
      { name: "Designation", value: "SNL 517" },
      { name: "Type", value: "Split plummer (pillow) block" },
      { name: "Bearing", value: "Self-aligning / spherical roller" },
      { name: "Mounting", value: "Adapter sleeve" },
      { name: "Sealing", value: "Multiple seal options" },
      { name: "Material", value: "Cast iron" },
    ],
    applications: [
      "Shaft bearing support",
      "Pumps, fans, and conveyors",
      "Heavy rotating machinery",
      "Industrial drivetrains",
    ],
    features: [
      "Split design for easy maintenance",
      "Accepts bearings + adapter sleeves",
      "Wide seal selection for harsh sites",
      "Genuine SKF strength and quality",
    ],
    tags: ["SKF plummer block Pakistan", "SNL 517 housing", "pillow block supplier"],
    metaTitle: "SKF SNL 517 Plummer Block Housing | Bearing Housing | Nidus Trading",
    metaDesc:
      "SKF SNL 517 split plummer (pillow) block housing for easy shaft bearing maintenance. Genuine SKF. Request a quote in Pakistan.",
    imagePrompt:
      "Split cast-iron plummer block bearing housing on a shaft, industrial studio product photo",
    image: u("photo-1504917595217-d4dc5ebe6122"),
  },
  {
    slug: "gates-hi-power-ii-b-section-v-belt",
    title: "Gates Hi-Power II B-Section V-Belt",
    categorySlug: "mechanical-items",
    brand: "Gates",
    sku: "NT-BLT-HPB",
    stock: 220,
    bestSeller: true,
    shortDesc:
      "Industrial wrapped V-belt for reliable power transmission on motors, fans, pumps, and compressors.",
    longDesc:
      "Gates Hi-Power II V-belts are a global standard for dependable industrial power transmission, transferring drive from motor to driven equipment with efficiency and long service life. This B-section wrapped belt features a durable fabric cover, high-strength tensile cords, and an engineered rubber compound that resists heat, oil, and flex fatigue, delivering stable performance and reduced slippage under load. Correctly tensioned quality V-belts minimise vibration and energy loss, extending the life of bearings and the driven machine. They are used everywhere — HVAC fans, pumps, compressors, agricultural machinery, and general drives — making them a high-turnover maintenance item. Genuine Gates belts maintain accurate length and profile for smooth multi-belt (matched set) drives. Nidus Trading supplies Gates V-belts across sections (A, B, C, SPZ, SPA, SPB) and lengths, plus timing/wedge belts and pulleys. Provide your belt section, length/number, and quantity to receive a competitive quotation with genuine product and fast supply across Pakistan.",
    specs: [
      { name: "Manufacturer", value: "Gates" },
      { name: "Series", value: "Hi-Power II" },
      { name: "Section", value: "B-section (wrapped)" },
      { name: "Construction", value: "Fabric cover + tensile cords" },
      { name: "Resistance", value: "Heat, oil, flex fatigue" },
      { name: "Use", value: "Industrial power transmission" },
      { name: "Options", value: "A/B/C/SPZ/SPA/SPB, matched sets" },
    ],
    applications: [
      "HVAC fans and blowers",
      "Pumps and compressors",
      "Agricultural and general machinery",
      "Motor-to-driven equipment drives",
    ],
    features: [
      "Durable, low-slip power transfer",
      "Heat- and oil-resistant compound",
      "Accurate length for matched sets",
      "Genuine Gates reliability",
    ],
    tags: ["gates v-belt Pakistan", "B section belt", "industrial belt supplier"],
    metaTitle: "Gates Hi-Power II B-Section V-Belt | Power Transmission | Nidus Trading",
    metaDesc:
      "Genuine Gates Hi-Power II B-section wrapped V-belt for motors, fans, pumps & compressors. Request a quote for best price in Pakistan.",
    imagePrompt:
      "Black industrial V-belt loop with visible section profile on workshop bench, studio product photo",
    image: u("photo-1530124566582-a618bc2615dc"),
  },
  {
    slug: "martin-ansi-40-roller-chain-10ft",
    title: "Martin ANSI 40 Roller Chain 10ft (1/2\" Pitch)",
    categorySlug: "mechanical-items",
    brand: "Martin",
    sku: "NT-CHN-ANSI40",
    stock: 150,
    shortDesc:
      "Heat-treated ANSI 40 roller chain for conveyors, drives, and machinery power transmission.",
    longDesc:
      "Martin ANSI 40 roller chain is a precision power-transmission component for conveyors, machine drives, and material handling systems. With a 1/2-inch pitch and heat-treated components, it delivers high tensile strength, wear resistance, and reliable engagement with sprockets under continuous load. Solid rollers and shot-peened, quenched-and-tempered pins and plates resist elongation ('chain stretch') that causes skipping and premature failure, keeping drives accurate and efficient. Roller chain is a workhorse across packaging, food processing, agriculture, and general manufacturing, valued for high load capacity and easy field maintenance with connecting and offset links. Genuine quality chain ensures consistent pitch for smooth running and long life. Nidus Trading supplies roller chain across ANSI/BS sizes (35, 40, 50, 60, 80 and more) in single and multi-strand, plus matching sprockets and connecting links. Provide your chain size, length/strands, and sprocket needs to receive a competitive quotation with quality product and prompt supply across Pakistan.",
    specs: [
      { name: "Manufacturer", value: "Martin" },
      { name: "Size", value: "ANSI 40" },
      { name: "Pitch", value: '1/2" (12.7 mm)' },
      { name: "Length", value: "10 ft" },
      { name: "Construction", value: "Heat-treated, solid roller" },
      { name: "Options", value: "Single / multi-strand, sprockets" },
      { name: "Standard", value: "ANSI B29.1" },
    ],
    applications: [
      "Conveyors and material handling",
      "Machine drives and power transmission",
      "Packaging and food processing",
      "Agricultural machinery",
    ],
    features: [
      "High tensile strength, wear resistant",
      "Resists chain stretch/elongation",
      "Easy field maintenance with links",
      "Matched sprockets available",
    ],
    tags: ["roller chain Pakistan", "ANSI 40 chain", "martin chain supplier"],
    metaTitle: "Martin ANSI 40 Roller Chain 10ft | Power Transmission | Nidus Trading",
    metaDesc:
      "Martin ANSI 40 roller chain, 1/2-inch pitch, heat-treated, 10ft for conveyors & drives. Request a quote for best price in Pakistan.",
    imagePrompt:
      "Coiled ANSI 40 industrial roller chain on a workshop surface, detailed macro product photo",
    image: u("photo-1530124566582-a618bc2615dc", 1000),
  },
  {
    slug: "lovejoy-l-090-jaw-coupling-with-spider",
    title: "Lovejoy L-090 Jaw Coupling with Spider",
    categorySlug: "mechanical-items",
    brand: "Lovejoy",
    sku: "NT-CPL-L090",
    stock: 130,
    featured: true,
    shortDesc:
      "Flexible jaw coupling with elastomer spider to transmit torque and dampen shock between shafts.",
    longDesc:
      "The Lovejoy L-090 jaw coupling is a reliable, maintenance-free flexible coupling used to connect motor and driven shafts while accommodating misalignment and damping shock loads. It consists of two hubs and an elastomer 'spider' insert that transmits torque through compression, cushioning vibration and protecting connected equipment from shock and torsional impact. The fail-safe design keeps the drive connected even if the spider wears, allowing safe operation until scheduled maintenance. Available with various bore sizes and spider hardness options (rubber, Hytrel, bronze) to suit different torque and temperature conditions, L-jaw couplings are used on pumps, compressors, gearboxes, and general machinery worldwide. Easy installation and no lubrication make them a favourite for maintenance teams. Nidus Trading supplies Lovejoy and compatible jaw couplings across sizes with bored-to-size hubs and spare spiders. Provide your coupling size, shaft bores/keyways, and spider type to receive a competitive quotation with quality components and support across Pakistan.",
    specs: [
      { name: "Manufacturer", value: "Lovejoy" },
      { name: "Model", value: "L-090 jaw coupling" },
      { name: "Components", value: "2 hubs + elastomer spider" },
      { name: "Torque Transfer", value: "Through spider compression" },
      { name: "Spider Options", value: "Rubber (NBR) / Hytrel / bronze" },
      { name: "Bore", value: "Bored-to-size with keyway" },
      { name: "Maintenance", value: "Lubrication-free" },
    ],
    applications: [
      "Motor-to-pump/gearbox connections",
      "Compressors and general machinery",
      "Shock and vibration damping drives",
      "Misalignment-tolerant couplings",
    ],
    features: [
      "Dampens shock and vibration",
      "Fail-safe torque transmission",
      "No lubrication required",
      "Multiple spider hardness options",
    ],
    tags: ["jaw coupling Pakistan", "lovejoy L-090", "flexible coupling supplier"],
    metaTitle: "Lovejoy L-090 Jaw Coupling with Spider | Nidus Trading Pakistan",
    metaDesc:
      "Lovejoy L-090 flexible jaw coupling with elastomer spider for torque transfer & shock damping. Request a quote in Pakistan.",
    imagePrompt:
      "Two-hub jaw coupling with yellow elastomer spider insert exploded view, clean studio product photo",
    image: u("photo-1504917595217-d4dc5ebe6122", 1000),
  },

  // ============================================================
  // 6) HARDWARE & FASTENERS  (3) -> hardware-items
  // ============================================================
  {
    slug: "grade-8-8-hex-bolt-set-zinc-m16x60",
    title: "Grade 8.8 Hex Bolt Set Zinc-Plated M16x60 (Assorted)",
    categorySlug: "hardware-items",
    brand: "Nidus Select",
    sku: "NT-FAS-HB1660",
    stock: 400,
    featured: true,
    bestSeller: true,
    shortDesc:
      "High-tensile Grade 8.8 zinc-plated hex bolts with nuts and washers for structural and machinery fastening.",
    longDesc:
      "This Grade 8.8 hex bolt set provides high-tensile fastening for structural steel, machinery, and heavy assembly work. Manufactured to DIN 933/931 with a minimum tensile strength around 800 MPa, Grade 8.8 bolts deliver the clamp load and shear capacity required for load-bearing connections where standard mild-steel fasteners are inadequate. Zinc electroplating gives corrosion protection for indoor and sheltered outdoor use, and each set includes matched hex nuts and washers for complete, correctly torqued joints. Assorted lengths support fabrication shops, maintenance stores, and site crews that need dependable fasteners on hand. Using correctly graded, marked fasteners is critical for safety and code compliance on structural and mechanical projects. Nidus Trading supplies hex bolts, nuts, washers, and threaded fasteners across grades (4.6, 8.8, 10.9, 12.9), sizes, and finishes (zinc, HDG, plain, stainless). Provide your size, grade, length, finish, and quantity to receive a competitive quotation with quality fasteners and prompt bulk supply across Pakistan.",
    specs: [
      { name: "Grade", value: "8.8 (high tensile)" },
      { name: "Size", value: "M16 x 60mm" },
      { name: "Standard", value: "DIN 933 / 931" },
      { name: "Tensile Strength", value: "~800 MPa" },
      { name: "Finish", value: "Zinc electroplated" },
      { name: "Includes", value: "Bolts + nuts + washers" },
      { name: "Options", value: "Grades 4.6/10.9/12.9, HDG/SS" },
    ],
    applications: [
      "Structural steel connections",
      "Machinery and equipment assembly",
      "Fabrication and maintenance",
      "General heavy-duty fastening",
    ],
    features: [
      "High-tensile Grade 8.8 strength",
      "Zinc plating for corrosion resistance",
      "Matched nuts and washers included",
      "Bulk supply across sizes and grades",
    ],
    tags: ["hex bolts Pakistan", "grade 8.8 bolts", "industrial fasteners supplier"],
    metaTitle: "Grade 8.8 Hex Bolt Set Zinc M16x60 | Fasteners | Nidus Trading Pakistan",
    metaDesc:
      "High-tensile Grade 8.8 zinc-plated hex bolts M16x60 with nuts & washers (DIN 933/931). Request a quote for best price in Pakistan.",
    imagePrompt:
      "Assorted zinc-plated hex bolts, nuts and washers arranged on a workshop surface, clean product photo",
    image: u("photo-1504148455328-c376907d081c"),
  },
  {
    slug: "stainless-steel-316-hex-nut-washer-m12",
    title: "Stainless Steel 316 Hex Nut & Washer Assortment M12",
    categorySlug: "hardware-items",
    brand: "Nidus Select",
    sku: "NT-FAS-SS316M12",
    stock: 350,
    featured: true,
    shortDesc:
      "Marine-grade A4/316 stainless nuts and washers for maximum corrosion resistance in harsh environments.",
    longDesc:
      "This A4 / 316 stainless steel hex nut and washer assortment (M12) is designed for applications demanding superior corrosion resistance. Grade 316 (A4) stainless contains molybdenum, giving markedly better resistance to chlorides, salt spray, and aggressive chemicals than standard 304/A2 stainless — making it the go-to choice for marine, coastal, water treatment, food processing, and chemical environments. Non-magnetic and hygienic, 316 fasteners maintain strength and appearance over long service life without plating that can chip or corrode. This assortment pairs full hex nuts with flat and spring washers for secure, corrosion-matched joints that won't create galvanic issues with stainless bolts. Specifying the correct stainless grade prevents premature failure and costly rework on exposed installations. Nidus Trading supplies 316 and 304 stainless fasteners — bolts, nuts, washers, screws, and threaded rod — across sizes and DIN standards. Provide your size, grade (A2/A4), item type, and quantity to receive a competitive quotation with quality stainless hardware and reliable supply across Pakistan.",
    specs: [
      { name: "Grade", value: "A4 / 316 stainless steel" },
      { name: "Size", value: "M12" },
      { name: "Includes", value: "Hex nuts + flat & spring washers" },
      { name: "Corrosion", value: "High (chloride/salt resistant)" },
      { name: "Magnetic", value: "Non-magnetic" },
      { name: "Standard", value: "DIN 934 / DIN 125" },
      { name: "Options", value: "A2/304, bolts, rod, screws" },
    ],
    applications: [
      "Marine and coastal installations",
      "Water and wastewater treatment",
      "Food and chemical processing",
      "Outdoor and corrosive environments",
    ],
    features: [
      "316 (A4) marine-grade corrosion resistance",
      "Molybdenum-alloyed for chloride resistance",
      "Corrosion-matched nut/washer sets",
      "Non-magnetic and hygienic",
    ],
    tags: ["stainless fasteners Pakistan", "316 stainless nuts", "A4 hardware supplier"],
    metaTitle: "Stainless Steel 316 Hex Nut & Washer M12 | A4 Fasteners | Nidus Trading",
    metaDesc:
      "Marine-grade 316 (A4) stainless hex nuts & washers M12 for corrosive/marine use. DIN 934/125. Request a quote in Pakistan.",
    imagePrompt:
      "Shiny stainless steel hex nuts and washers in a neat pile, bright macro studio product photo",
    image: u("photo-1530124566582-a618bc2615dc", 950),
  },
  {
    slug: "hilti-hst3-expansion-anchor-m12x100",
    title: "Hilti HST3 Expansion Anchor M12x100 (Heavy-Duty)",
    categorySlug: "hardware-items",
    brand: "Hilti",
    sku: "NT-FAS-HST3M12",
    stock: 200,
    bestSeller: true,
    shortDesc:
      "Approved heavy-duty mechanical expansion anchor for high-load fixings into cracked and uncracked concrete.",
    longDesc:
      "The Hilti HST3 is a premium heavy-duty expansion anchor engineered for safety-critical, high-load fixings into concrete. Its torque-controlled expansion sleeve grips reliably in both cracked and uncracked concrete, and the anchor carries international approvals (ETA/ICC) for seismic and structural applications — essential documentation for engineered and government projects. The M12x100 size suits fixing of steel sections, machinery bases, handrails, brackets, and facade elements where failure is not an option. A clear embedment mark and setting indicator help installers achieve correct, verifiable installation, while the corrosion-protective coating supports durability. Specifying approved anchors (rather than generic wedge bolts) is critical where structural load, vibration, or life-safety is involved. Nidus Trading supplies Hilti and other approved anchors — mechanical and chemical/resin — across sizes and base materials, with technical data for design and approval. Provide your anchor size, load/base material, and quantity to receive a competitive quotation with genuine, approved product and support across Pakistan.",
    specs: [
      { name: "Manufacturer", value: "Hilti" },
      { name: "Model", value: "HST3 expansion anchor" },
      { name: "Size", value: "M12 x 100mm" },
      { name: "Base Material", value: "Cracked & uncracked concrete" },
      { name: "Approvals", value: "ETA / ICC (seismic)" },
      { name: "Type", value: "Torque-controlled expansion" },
      { name: "Options", value: "Sizes + chemical anchors" },
    ],
    applications: [
      "Machinery base and equipment fixing",
      "Steel section and bracket anchoring",
      "Handrails, facades, and structures",
      "Seismic / engineered fixings",
    ],
    features: [
      "High load in cracked/uncracked concrete",
      "ETA/ICC approved for structural use",
      "Setting indicator for correct install",
      "Corrosion-protective coating",
    ],
    tags: ["hilti anchor Pakistan", "HST3 expansion anchor", "concrete anchor supplier"],
    metaTitle: "Hilti HST3 Expansion Anchor M12x100 | Concrete Fixing | Nidus Trading",
    metaDesc:
      "Genuine Hilti HST3 heavy-duty expansion anchor M12x100, ETA/ICC approved for cracked concrete. Request a quote in Pakistan.",
    imagePrompt:
      "Heavy-duty steel expansion anchor bolt set against concrete background, detailed industrial product photo",
    image: u("photo-1504148455328-c376907d081c", 1000),
  },
];
