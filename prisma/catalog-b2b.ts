/**
 * Nidus Trading — B2B high-margin catalog
 * ---------------------------------------
 * Specialized, often import-restricted IT & industrial hardware aimed at
 * government tender suppliers and enterprise procurement teams in Pakistan.
 *
 * Quote-driven: no public prices ("Price on Request"). Each SKU carries the
 * B2B metadata tender evaluators demand — MPN, HS Code, Country of Origin,
 * datasheet link, certifications, and OEM warranty.
 *
 * `seed.ts` folds `longDesc`, `applications`, `features`, and the pricing note
 * into the Product `description` field (rendered with line breaks on the PDP),
 * while `specs` populates the specifications table.
 */

const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export type Spec = { name: string; value: string };

export type B2BCategory = {
  name: string;
  slug: string;
  description: string;
  icon: string;
  featured: boolean;
  sortOrder: number;
  image: string;
  /** Sub-lines featured in navigation / mega-menu. */
  subcategories: string[];
};

export type B2BProduct = {
  slug: string;
  title: string;
  categorySlug: string;
  brand: string;
  mpn: string;
  sku: string;
  hsCode?: string;
  countryOfOrigin?: string;
  datasheetUrl?: string;
  certifications?: string[];
  warrantyPeriod?: string;
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
  image: string;
};

/**
 * Five high-margin, specialized departments. Low-margin commodity lines
 * (generic fasteners, V-belts, ball bearings, caster wheels, raw MS stock)
 * have been phased out.
 */
export const b2bCategories: B2BCategory[] = [
  {
    name: "Industrial Networking & Telecommunications",
    slug: "industrial-networking-telecom",
    description:
      "Managed industrial PoE switches, 10G/40G/100G optical transceivers, armored fiber, point-to-point wireless radios, and 4G/5G telemetry gateways for utilities, defense, and enterprise networks across Pakistan. Quote-driven, tender-ready supply with datasheets and origin documentation.",
    icon: "Network",
    featured: true,
    sortOrder: 1,
    image: u("photo-1544197150-b99a5804efb6"),
    subcategories: [
      "Industrial Managed PoE Switches (Moxa, Cisco IE)",
      "Optical Transceivers (10G/40G/100G SFP/SFP+) & Armored Fiber Jumpers",
      "Point-to-Point (PTP) Long-Range Wireless Radios",
      "4G/5G Industrial Telemetry Gateways & Routers",
    ],
  },
  {
    name: "Enterprise Server, Storage & Data Center Hardware",
    slug: "enterprise-server-storage",
    description:
      "Hot-swap redundant server PSUs, SAS/SATA RAID controllers and Fiber Channel HBAs, LTO-7/8/9 tape drives and cartridges, plus intelligent rack PDUs and IP-KVM switches for Dell PowerEdge and HPE ProLiant estates. Enterprise procurement and data-center refresh supply, on quote.",
    icon: "Server",
    featured: true,
    sortOrder: 2,
    image: u("photo-1597872200969-2b65d56bd16b"),
    subcategories: [
      "Hot-Swappable Redundant Server PSUs (Dell PowerEdge, HPE ProLiant)",
      "Enterprise SAS/SATA RAID Controllers & Fiber Channel HBAs",
      "LTO Tape Drives & Cartridges (LTO-7 / LTO-8 / LTO-9)",
      "Rack-mount Intelligent PDUs & IP-KVM Switches",
    ],
  },
  {
    name: "Precision Test, Measurement & Calibration",
    slug: "test-measurement-calibration",
    description:
      "OTDRs and fiber fusion-splicer consumables, FLIR/Fluke thermal imagers and power-quality analyzers, and portable/fixed multi-gas detectors and environmental monitors. Calibrated instrumentation for telecom, power, and HSE compliance teams — quoted with certificates and warranty.",
    icon: "Gauge",
    featured: true,
    sortOrder: 3,
    image: u("photo-1591808216268-ce0b82787efe"),
    subcategories: [
      "Optical Time-Domain Reflectometers (OTDRs) & Fusion Splicer Electrodes",
      "Thermal Imaging Cameras (FLIR, Fluke) & Power Quality Analyzers",
      "Portable/Fixed Multi-Gas Detectors & Environmental Monitors",
    ],
  },
  {
    name: "Industrial Automation, PLC & Process Control",
    slug: "automation-plc-process-control",
    description:
      "Siemens SIMATIC S7-1200/S7-1500 CPUs and I/O, Schneider Altivar and ABB ACS variable frequency drives, and HART-enabled pressure and ultrasonic flow transmitters. Automation and process instrumentation for OEMs, integrators, and plant upgrades — quote-based with genuine-product documentation.",
    icon: "Cpu",
    featured: true,
    sortOrder: 4,
    image: u("photo-1588616437819-7d30e6f76e66"),
    subcategories: [
      "Siemens S7-1200 / S7-1500 PLC CPUs & I/O Expansion",
      "Variable Frequency Drives (Schneider Altivar, ABB ACS)",
      "Pressure & Ultrasonic Flow Transmitters (HART Protocol)",
    ],
  },
  {
    name: "Power Quality & Backup Infrastructure",
    slug: "power-quality-backup",
    description:
      "3-phase online double-conversion UPS systems, 48V rack-mount LiFePO4 energy storage, and Class I+II DIN-rail surge protective devices from DEHN and Phoenix Contact. Resilient power and protection for data centers, telecom sites, and critical facilities — supplied on quote nationwide.",
    icon: "BatteryCharging",
    featured: true,
    sortOrder: 5,
    image: u("photo-1621905252507-b35492cc74b4"),
    subcategories: [
      "3-Phase Online Double-Conversion UPS Systems",
      "48V Rack-Mount LiFePO4 Energy Storage Systems (ESS)",
      "Class I + II DIN-rail Surge Protective Devices (DEHN, Phoenix Contact)",
    ],
  },
];

const PRICE_NOTE =
  "Pricing: Price on Request — request a quote for the best price on project, enterprise, and government-tender quantities.";

export const b2bProducts: B2BProduct[] = [
  // ============================================================
  // 1) INDUSTRIAL NETWORKING & TELECOMMUNICATIONS
  // ============================================================
  {
    slug: "moxa-eds-g516e-managed-poe-gigabit-switch",
    title: "Moxa EDS-G516E Managed Gigabit Industrial Ethernet Switch (16-Port)",
    categorySlug: "industrial-networking-telecom",
    brand: "Moxa",
    mpn: "EDS-G516E-4GSFP",
    sku: "NT-NET-EDSG516",
    hsCode: "8517.62.00",
    countryOfOrigin: "Taiwan",
    datasheetUrl: "https://www.moxa.com/getmedia/eds-g516e-series-datasheet.pdf",
    certifications: ["CE", "UL 61010-2-201", "FCC", "IEC 61850-3", "IEEE 1613"],
    warrantyPeriod: "5 Years Official Moxa Warranty",
    stock: 24,
    featured: true,
    bestSeller: true,
    shortDesc:
      "16-port managed industrial Gigabit switch with 4 combo SFP slots, -40 to 75°C operation, and IEC 61850-3 power-substation compliance.",
    longDesc:
      "The Moxa EDS-G516E is a fully managed Layer 2 industrial Ethernet switch built for mission-critical utility, transportation, and factory networks. Twelve Gigabit copper ports plus four Gigabit combo SFP slots deliver flexible fiber uplinks, while Turbo Ring and Turbo Chain redundancy recover the network in under 20 ms. Hardened for -40 to 75°C operation with dual 12/24/48 VDC power inputs and IEC 61850-3 / IEEE 1613 certification, it is a proven choice for power substations, SCADA, and defense communications. Nidus Trading supplies genuine Moxa switches with full documentation for QA and tender evaluation across Pakistan.",
    specs: [
      { name: "Manufacturer", value: "Moxa" },
      { name: "Model", value: "EDS-G516E-4GSFP" },
      { name: "Ports", value: "12x 10/100/1000T + 4x Gigabit combo SFP" },
      { name: "Management", value: "Managed L2 (Turbo Ring / Turbo Chain)" },
      { name: "Operating Temp", value: "-40°C to 75°C" },
      { name: "Power Input", value: "Dual 12/24/48 VDC" },
      { name: "Mounting", value: "DIN-rail" },
    ],
    applications: [
      "Power substation & SCADA networks (IEC 61850-3)",
      "Rail and intelligent transportation systems",
      "Oil, gas, and water utility telemetry backbones",
      "Defense and government communications",
    ],
    features: [
      "Sub-20 ms ring redundancy for zero-downtime networks",
      "Gigabit fiber uplinks via combo SFP slots",
      "Wide-temperature, fanless hardened design",
      "IEC 61850-3 / IEEE 1613 substation certification",
    ],
    tags: ["Moxa switch Pakistan", "managed industrial switch", "IEC 61850 switch", "SCADA networking"],
    metaTitle: "Moxa EDS-G516E Managed Industrial Switch | Supplier Pakistan | Nidus Trading",
    metaDesc:
      "Buy Moxa EDS-G516E 16-port managed industrial Gigabit switch in Pakistan. IEC 61850-3 substation-rated. Request a tender-ready quote.",
    image: u("photo-1544197150-b99a5804efb6"),
  },
  {
    slug: "cisco-sfp-10g-sr-optical-transceiver",
    title: "Cisco SFP-10G-SR 10GBASE-SR Multimode Optical Transceiver",
    categorySlug: "industrial-networking-telecom",
    brand: "Cisco",
    mpn: "SFP-10G-SR",
    sku: "NT-NET-SFP10GSR",
    hsCode: "8517.70.00",
    countryOfOrigin: "USA",
    datasheetUrl: "https://www.cisco.com/c/en/us/products/collateral/interfaces-modules/transceiver-modules/data_sheet_c78-455693.pdf",
    certifications: ["IEEE 802.3ae", "RoHS", "Class 1 Laser (IEC 60825)"],
    warrantyPeriod: "Lifetime Cisco Warranty (genuine module)",
    stock: 120,
    featured: true,
    bestSeller: true,
    shortDesc:
      "Genuine Cisco 10G multimode SFP+ transceiver, 850nm, LC duplex, up to 300m on OM3 for data-center and enterprise uplinks.",
    longDesc:
      "The Cisco SFP-10G-SR is a hot-swappable 10 Gigabit multimode transceiver for short-reach data-center and campus links. Operating at 850nm over duplex LC multimode fiber, it reaches 300m on OM3 and 400m on OM4, with Digital Optical Monitoring (DOM) for real-time diagnostics. Fully MSA-compliant and coded for Cisco Catalyst and Nexus platforms, it is the standard uplink module for enterprise cores and server aggregation. Nidus Trading supplies genuine, warranty-backed Cisco optics with serial verification for government and enterprise procurement in Pakistan.",
    specs: [
      { name: "Manufacturer", value: "Cisco" },
      { name: "Part Number", value: "SFP-10G-SR" },
      { name: "Data Rate", value: "10 Gbps (10GBASE-SR)" },
      { name: "Wavelength", value: "850 nm (VCSEL)" },
      { name: "Connector", value: "LC duplex, multimode" },
      { name: "Reach", value: "300m (OM3) / 400m (OM4)" },
      { name: "Diagnostics", value: "DOM / DDM support" },
    ],
    applications: [
      "Data-center server and switch aggregation",
      "Enterprise campus core uplinks",
      "10G structured backbone links",
      "Government and banking network cores",
    ],
    features: [
      "Genuine Cisco-coded, MSA-compliant module",
      "Digital Optical Monitoring for link diagnostics",
      "Hot-swappable SFP+ form factor",
      "Serial-verified authenticity for tenders",
    ],
    tags: ["Cisco SFP-10G-SR Pakistan", "10G transceiver", "SFP+ module supplier", "multimode optics"],
    metaTitle: "Cisco SFP-10G-SR 10G Transceiver | Genuine Optics Pakistan | Nidus Trading",
    metaDesc:
      "Genuine Cisco SFP-10G-SR 10GBASE-SR multimode SFP+ transceiver in Pakistan. LC duplex, 300m OM3. Request a verified-stock quote.",
    image: u("photo-1546124404-9e7e3cac2ec1"),
  },
  {
    slug: "cambium-ptp-550-long-range-wireless-radio",
    title: "Cambium PTP 550 Long-Range Point-to-Point Wireless Backhaul Radio",
    categorySlug: "industrial-networking-telecom",
    brand: "Cambium Networks",
    mpn: "C050055H014A",
    sku: "NT-NET-PTP550",
    hsCode: "8517.62.00",
    countryOfOrigin: "USA",
    datasheetUrl: "https://www.cambiumnetworks.com/wp-content/uploads/PTP-550-Specification-Sheet.pdf",
    certifications: ["CE", "FCC", "PTA Type Approved", "IP55"],
    warrantyPeriod: "12 Months Official Cambium Warranty",
    stock: 30,
    featured: true,
    shortDesc:
      "Dual-band 4.9–6.05 GHz PTP backhaul radio delivering up to 1.9 Gbps aggregate throughput over long-range links.",
    longDesc:
      "The Cambium PTP 550 is a high-capacity point-to-point backhaul radio that combines dual concurrent 5 GHz channels and MU-MIMO to deliver up to 1.9 Gbps of real user throughput over long distances. Operating across the 4.9–6.05 GHz range with intelligent interference mitigation, it is ideal for connecting remote sites, campuses, and CCTV/telemetry networks where fiber is impractical. The IP55 outdoor enclosure and integrated or connectorized antenna options suit harsh Pakistani field conditions. Nidus Trading supplies PTA type-approved Cambium radios with configuration guidance and link-budget support for ISP, utility, and government deployments.",
    specs: [
      { name: "Manufacturer", value: "Cambium Networks" },
      { name: "Model", value: "PTP 550 (Connectorized)" },
      { name: "Frequency", value: "4.9 – 6.05 GHz" },
      { name: "Throughput", value: "Up to 1.9 Gbps aggregate" },
      { name: "Technology", value: "Dual-channel MU-MIMO" },
      { name: "Enclosure", value: "IP55 outdoor" },
      { name: "Approvals", value: "PTA Type Approved" },
    ],
    applications: [
      "Long-range site-to-site backhaul where fiber is impractical",
      "CCTV and surveillance network transport",
      "ISP and WISP high-capacity links",
      "Utility and government remote-site connectivity",
    ],
    features: [
      "Up to 1.9 Gbps over dual concurrent 5 GHz channels",
      "MU-MIMO with intelligent interference mitigation",
      "IP55 outdoor-rated for harsh environments",
      "PTA type-approved for legal deployment in Pakistan",
    ],
    tags: ["Cambium PTP 550 Pakistan", "point to point wireless", "long range radio", "wireless backhaul"],
    metaTitle: "Cambium PTP 550 Wireless Backhaul Radio | Pakistan | Nidus Trading",
    metaDesc:
      "Cambium PTP 550 long-range point-to-point wireless radio in Pakistan — up to 1.9 Gbps, PTA approved. Request a link-budget quote.",
    image: u("photo-1518770660439-4636190af475"),
  },
  {
    slug: "teltonika-rut956-5g-industrial-cellular-router",
    title: "Teltonika RUT956 Industrial 4G LTE Cellular Router & Telemetry Gateway",
    categorySlug: "industrial-networking-telecom",
    brand: "Teltonika",
    mpn: "RUT956100000",
    sku: "NT-NET-RUT956",
    hsCode: "8517.62.00",
    countryOfOrigin: "Lithuania",
    datasheetUrl: "https://teltonika-networks.com/downloads/en/rut956/RUT956-Datasheet.pdf",
    certifications: ["CE", "RED", "RoHS", "PTA Approved"],
    warrantyPeriod: "24 Months Official Teltonika Warranty",
    stock: 45,
    featured: true,
    shortDesc:
      "Dual-SIM 4G LTE Cat 4 industrial router with dual Ethernet, RS232/RS485, and RutOS for remote M2M and SCADA telemetry.",
    longDesc:
      "The Teltonika RUT956 is a rugged dual-SIM industrial cellular router purpose-built for remote monitoring, SCADA telemetry, and machine-to-machine connectivity. Cat 4 LTE with automatic SIM failover keeps critical sites online, while RS232 and RS485 serial ports plus dual Ethernet enable direct integration with PLCs, meters, and RTUs. The RutOS firmware provides VPN, firewall, and remote management (RMS) for fleet-scale deployments. Housed in an aluminium DIN-rail enclosure with a wide 9–50 VDC input, the RUT956 is ideal for utilities, oil & gas, and transport telemetry across Pakistan. Supplied by Nidus Trading with PTA approval and configuration support.",
    specs: [
      { name: "Manufacturer", value: "Teltonika" },
      { name: "Model", value: "RUT956" },
      { name: "Cellular", value: "4G LTE Cat 4, dual-SIM failover" },
      { name: "Interfaces", value: "2x Ethernet, RS232, RS485, Digital I/O" },
      { name: "Firmware", value: "RutOS with RMS remote management" },
      { name: "Power Input", value: "9 – 50 VDC" },
      { name: "Mounting", value: "DIN-rail / aluminium housing" },
    ],
    applications: [
      "Remote SCADA and RTU telemetry backhaul",
      "Machine-to-machine (M2M) connectivity",
      "Utility metering and pipeline monitoring",
      "Unattended site failover connectivity",
    ],
    features: [
      "Dual-SIM automatic failover for uptime",
      "RS232/RS485 serial for direct PLC/meter integration",
      "RutOS with VPN, firewall, and cloud RMS",
      "Wide-input DIN-rail industrial design",
    ],
    tags: ["Teltonika RUT956 Pakistan", "industrial 4G router", "SCADA telemetry gateway", "M2M router"],
    metaTitle: "Teltonika RUT956 Industrial 4G Router | Pakistan | Nidus Trading",
    metaDesc:
      "Teltonika RUT956 dual-SIM 4G LTE industrial router & telemetry gateway in Pakistan. RS485, RutOS, PTA approved. Request a quote.",
    image: u("photo-1578016980868-197203ff4b02"),
  },

  // ============================================================
  // 2) ENTERPRISE SERVER, STORAGE & DATA CENTER HARDWARE
  // ============================================================
  {
    slug: "dell-poweredge-1100w-hot-swap-redundant-psu",
    title: "Dell PowerEdge 1100W Hot-Swap Redundant Power Supply (Platinum)",
    categorySlug: "enterprise-server-storage",
    brand: "Dell",
    mpn: "GRTNK",
    sku: "NT-SRV-PSU1100",
    hsCode: "8504.40.90",
    countryOfOrigin: "China",
    datasheetUrl: "https://www.dell.com/support/manuals/poweredge-power-supply-1100w.pdf",
    certifications: ["80 PLUS Platinum", "CE", "UL", "RoHS"],
    warrantyPeriod: "12 Months Replacement Warranty",
    stock: 40,
    featured: true,
    bestSeller: true,
    shortDesc:
      "1100W 80 PLUS Platinum hot-swap PSU for Dell PowerEdge R730/R740/R640 servers, enabling 1+1 redundancy.",
    longDesc:
      "This 1100W hot-swappable power supply provides redundant, high-efficiency power for Dell PowerEdge rack servers including the R730, R740, and R640. Rated 80 PLUS Platinum for maximum efficiency and reduced data-center cooling load, it installs without downtime into a 1+1 redundant configuration so a single PSU failure never interrupts service. Nidus Trading supplies genuine Dell-compatible PSUs with QA verification for enterprise refresh projects and government data-center tenders across Pakistan.",
    specs: [
      { name: "Manufacturer", value: "Dell" },
      { name: "Part Number", value: "GRTNK / equivalent" },
      { name: "Output", value: "1100W" },
      { name: "Efficiency", value: "80 PLUS Platinum" },
      { name: "Form Factor", value: "Hot-swap redundant" },
      { name: "Compatibility", value: "PowerEdge R730 / R740 / R640" },
      { name: "Input", value: "100–240 VAC auto-ranging" },
    ],
    applications: [
      "Dell PowerEdge server power redundancy (1+1)",
      "Enterprise data-center hardware refresh",
      "Government and banking server estates",
      "High-availability virtualization hosts",
    ],
    features: [
      "Hot-swap install with zero downtime",
      "80 PLUS Platinum high efficiency",
      "Genuine-compatible for PowerEdge platforms",
      "QA-verified for tender compliance",
    ],
    tags: ["Dell PowerEdge PSU Pakistan", "hot swap power supply", "server redundant PSU", "data center hardware"],
    metaTitle: "Dell PowerEdge 1100W Hot-Swap PSU | Supplier Pakistan | Nidus Trading",
    metaDesc:
      "Dell PowerEdge 1100W 80 PLUS Platinum hot-swap redundant power supply in Pakistan for R730/R740/R640. Request a quote.",
    image: u("photo-1597872200969-2b65d56bd16b"),
  },
  {
    slug: "broadcom-megaraid-9560-8i-sas-raid-controller",
    title: "Broadcom MegaRAID 9560-8i 12Gb/s SAS/SATA/NVMe RAID Controller",
    categorySlug: "enterprise-server-storage",
    brand: "Broadcom",
    mpn: "05-50077-00",
    sku: "NT-SRV-9560-8i",
    hsCode: "8471.80.00",
    countryOfOrigin: "USA",
    datasheetUrl: "https://docs.broadcom.com/doc/megaraid-9560-8i-product-brief.pdf",
    certifications: ["CE", "FCC", "RoHS", "PCIe 4.0"],
    warrantyPeriod: "36 Months Official Broadcom Warranty",
    stock: 22,
    featured: true,
    shortDesc:
      "8-port tri-mode PCIe 4.0 RAID controller with 4GB cache for SAS/SATA/NVMe storage arrays and enterprise servers.",
    longDesc:
      "The Broadcom MegaRAID 9560-8i is a tri-mode PCIe 4.0 storage controller supporting SAS, SATA, and NVMe drives on the same adapter. With eight internal ports, 4GB of DDR4 cache, and CacheVault flash-backup protection, it delivers high-IOPS RAID for database, virtualization, and analytics workloads. RAID levels 0/1/5/6/10/50/60 provide flexible redundancy, while the tri-mode design future-proofs storage tiers. Nidus Trading supplies genuine Broadcom/LSI controllers and Fiber Channel HBAs with documentation for enterprise and government storage tenders in Pakistan.",
    specs: [
      { name: "Manufacturer", value: "Broadcom (LSI)" },
      { name: "Model", value: "MegaRAID 9560-8i" },
      { name: "Interface", value: "PCIe 4.0 x8, Tri-Mode (SAS/SATA/NVMe)" },
      { name: "Ports", value: "8 internal (12 Gb/s SAS)" },
      { name: "Cache", value: "4GB DDR4 + CacheVault flash backup" },
      { name: "RAID Levels", value: "0, 1, 5, 6, 10, 50, 60" },
    ],
    applications: [
      "Enterprise database and virtualization storage",
      "High-IOPS NVMe/SAS RAID arrays",
      "Server storage refresh and expansion",
      "Government and defense data repositories",
    ],
    features: [
      "Tri-mode SAS/SATA/NVMe on one controller",
      "4GB cache with CacheVault power-loss protection",
      "PCIe 4.0 high-bandwidth interface",
      "Broad RAID level support for redundancy",
    ],
    tags: ["MegaRAID 9560-8i Pakistan", "SAS RAID controller", "NVMe RAID card", "enterprise storage"],
    metaTitle: "Broadcom MegaRAID 9560-8i RAID Controller | Pakistan | Nidus Trading",
    metaDesc:
      "Broadcom MegaRAID 9560-8i tri-mode PCIe 4.0 SAS/SATA/NVMe RAID controller in Pakistan. 4GB cache. Request a quote.",
    image: u("photo-1518770660439-4636190af475"),
  },
  {
    slug: "hpe-storeever-lto-8-ultrium-30750-tape-drive",
    title: "HPE StoreEver LTO-8 Ultrium 30750 SAS Internal Tape Drive",
    categorySlug: "enterprise-server-storage",
    brand: "HPE",
    mpn: "BC022A",
    sku: "NT-SRV-LTO8",
    hsCode: "8471.70.00",
    countryOfOrigin: "USA",
    datasheetUrl: "https://www.hpe.com/psnow/doc/a00008163enw.pdf",
    certifications: ["CE", "UL", "RoHS", "LTO Ultrium Consortium"],
    warrantyPeriod: "12 Months Official HPE Warranty",
    stock: 18,
    featured: true,
    bestSeller: true,
    shortDesc:
      "LTO-8 SAS tape drive storing up to 30TB compressed per cartridge for enterprise backup, archive, and air-gapped recovery.",
    longDesc:
      "The HPE StoreEver LTO-8 Ultrium 30750 delivers 12TB native (30TB compressed) capacity per cartridge with up to 300 MB/s native transfer, making it the backbone of enterprise backup and long-term archive strategies. As an offline, air-gapped medium, LTO tape is a proven defense against ransomware and a compliance requirement for many government and financial archives. Hardware AES-256 encryption protects data at rest. Nidus Trading supplies HPE LTO-8/9 drives and Ultrium cartridges with documentation for tender and enterprise procurement across Pakistan.",
    specs: [
      { name: "Manufacturer", value: "HPE" },
      { name: "Model", value: "StoreEver LTO-8 Ultrium 30750" },
      { name: "Capacity", value: "12TB native / 30TB compressed" },
      { name: "Transfer Rate", value: "Up to 300 MB/s native" },
      { name: "Interface", value: "6Gb/s SAS (internal)" },
      { name: "Encryption", value: "Hardware AES-256" },
    ],
    applications: [
      "Enterprise backup and long-term archive",
      "Air-gapped ransomware recovery copies",
      "Regulatory and government data retention",
      "Media and broadcast cold storage",
    ],
    features: [
      "12TB native capacity per cartridge",
      "Hardware AES-256 encryption",
      "Air-gapped offline data protection",
      "LTO-9 upgrade path and cartridge supply",
    ],
    tags: ["HPE LTO-8 Pakistan", "LTO tape drive", "enterprise backup", "Ultrium 30750"],
    metaTitle: "HPE StoreEver LTO-8 Ultrium 30750 Tape Drive | Pakistan | Nidus Trading",
    metaDesc:
      "HPE StoreEver LTO-8 Ultrium 30750 SAS tape drive in Pakistan — 12TB native, AES-256. Backup & archive. Request a quote.",
    image: u("photo-1517694712202-14dd9538aa97"),
  },
  {
    slug: "apc-ap8853-metered-rack-pdu-zero-u",
    title: "APC AP8853 Rack PDU 2G Metered Zero-U 32A 230V (21x C13, 3x C19)",
    categorySlug: "enterprise-server-storage",
    brand: "APC by Schneider Electric",
    mpn: "AP8853",
    sku: "NT-SRV-AP8853",
    hsCode: "8537.10.00",
    countryOfOrigin: "Philippines",
    datasheetUrl: "https://www.apc.com/shop/us/en/products/AP8853/spec-sheet.pdf",
    certifications: ["CE", "UL", "RoHS"],
    warrantyPeriod: "24 Months Official APC Warranty",
    stock: 35,
    featured: true,
    shortDesc:
      "Zero-U metered rack PDU with local current display and 24 IEC outlets for accurate per-rack power monitoring.",
    longDesc:
      "The APC AP8853 Rack PDU delivers 32A single-phase power across 24 IEC outlets (21x C13, 3x C19) in a space-saving zero-U vertical form factor. A local digital current meter and network management enable accurate per-rack load monitoring, helping data-center operators balance circuits and prevent overloads. Intelligent PDUs are essential for capacity planning in enterprise and colocation racks. Nidus Trading supplies APC metered and switched PDUs and IP-KVM switches with documentation for data-center build-outs and government tenders in Pakistan.",
    specs: [
      { name: "Manufacturer", value: "APC by Schneider Electric" },
      { name: "Model", value: "AP8853" },
      { name: "Input", value: "230V, 32A single-phase" },
      { name: "Outlets", value: "21x IEC C13 + 3x IEC C19" },
      { name: "Form Factor", value: "Zero-U vertical" },
      { name: "Metering", value: "Local digital + network management" },
    ],
    applications: [
      "Per-rack power monitoring and capacity planning",
      "Enterprise and colocation data centers",
      "Server and network rack power distribution",
      "Government IT infrastructure build-outs",
    ],
    features: [
      "Local current display prevents circuit overloads",
      "Space-saving zero-U vertical mounting",
      "24 IEC outlets for high-density racks",
      "Network-manageable for remote monitoring",
    ],
    tags: ["APC rack PDU Pakistan", "metered PDU", "AP8853", "data center power"],
    metaTitle: "APC AP8853 Metered Rack PDU | Data Center Pakistan | Nidus Trading",
    metaDesc:
      "APC AP8853 zero-U metered rack PDU (32A, 24 outlets) in Pakistan for per-rack power monitoring. Request a quote.",
    image: u("photo-1544197150-b99a5804efb6"),
  },

  // ============================================================
  // 3) PRECISION TEST, MEASUREMENT & CALIBRATION
  // ============================================================
  {
    slug: "viavi-smartotdr-100b-fiber-otdr",
    title: "VIAVI SmartOTDR 100B Handheld Fiber Optic OTDR",
    categorySlug: "test-measurement-calibration",
    brand: "VIAVI Solutions",
    mpn: "SOTDR-100B",
    sku: "NT-TME-SOTDR100B",
    hsCode: "9031.49.00",
    countryOfOrigin: "USA",
    datasheetUrl: "https://www.viavisolutions.com/literature/smartotdr-datasheet.pdf",
    certifications: ["CE", "RoHS", "ISO 9001 Manufacturer"],
    warrantyPeriod: "12 Months Official VIAVI Warranty + Calibration Certificate",
    stock: 12,
    featured: true,
    bestSeller: true,
    shortDesc:
      "Handheld single/multimode OTDR with SmartTest auto-analysis for FTTx, enterprise, and long-haul fiber certification.",
    longDesc:
      "The VIAVI SmartOTDR 100B is a rugged handheld optical time-domain reflectometer that automates fiber characterization for field technicians. SmartTest one-button analysis identifies and locates splices, connectors, bends, and breaks, producing clear pass/fail reports that even non-expert crews can trust. With a high dynamic range for both access (FTTx) and metro/long-haul links, integrated power meter and VFL options, and a bright touchscreen, it accelerates network commissioning and fault-finding. Nidus Trading supplies VIAVI OTDRs, fusion-splicer electrodes, and consumables with calibration certificates for telecom operators and government tenders in Pakistan.",
    specs: [
      { name: "Manufacturer", value: "VIAVI Solutions" },
      { name: "Model", value: "SmartOTDR 100B" },
      { name: "Fiber Types", value: "Singlemode & multimode" },
      { name: "Analysis", value: "SmartTest one-button auto pass/fail" },
      { name: "Built-in Tools", value: "OPM, VFL, connector inspection option" },
      { name: "Display", value: "Sunlight-readable touchscreen" },
    ],
    applications: [
      "FTTx and access-network fiber certification",
      "Metro and long-haul link testing",
      "Fiber fault location and troubleshooting",
      "Telecom acceptance testing for tenders",
    ],
    features: [
      "SmartTest automated pass/fail analysis",
      "High dynamic range across access to long-haul",
      "Integrated OPM/VFL test suite",
      "Supplied with calibration certificate",
    ],
    tags: ["VIAVI OTDR Pakistan", "fiber OTDR", "SmartOTDR 100B", "fiber test equipment"],
    metaTitle: "VIAVI SmartOTDR 100B Fiber OTDR | Supplier Pakistan | Nidus Trading",
    metaDesc:
      "VIAVI SmartOTDR 100B handheld fiber OTDR in Pakistan with SmartTest auto-analysis. Calibrated. Request a quote.",
    image: u("photo-1591808216268-ce0b82787efe"),
  },
  {
    slug: "flir-e8-xt-thermal-imaging-camera",
    title: "FLIR E8-XT Thermal Imaging Camera (320x240, -20 to 550°C)",
    categorySlug: "test-measurement-calibration",
    brand: "FLIR",
    mpn: "E8-XT",
    sku: "NT-TME-FLIRE8XT",
    hsCode: "9027.50.00",
    countryOfOrigin: "Estonia",
    datasheetUrl: "https://www.flir.com/globalassets/flir-e8-xt-datasheet.pdf",
    certifications: ["CE", "RoHS", "ISO 9001 Manufacturer"],
    warrantyPeriod: "24 Months (10-Year Detector) FLIR Warranty",
    stock: 20,
    featured: true,
    shortDesc:
      "320x240 thermal camera with MSX image enhancement and -20 to 550°C range for electrical, mechanical, and building inspection.",
    longDesc:
      "The FLIR E8-XT combines a 320x240 (76,800-pixel) thermal detector with patented MSX image enhancement, overlaying visual detail onto thermal images for instantly interpretable results. An extended -20 to 550°C measurement range covers electrical panels, motors, bearings, steam traps, and building envelopes. Wi-Fi connectivity streams images to the FLIR Tools app for fast reporting. Predictive-maintenance and energy-audit teams rely on the E8-XT to find hot spots before failures occur. Nidus Trading supplies FLIR and Fluke thermal imagers and power-quality analyzers with warranty and calibration for industrial and government clients in Pakistan.",
    specs: [
      { name: "Manufacturer", value: "FLIR" },
      { name: "Model", value: "E8-XT" },
      { name: "Resolution", value: "320 x 240 (76,800 pixels)" },
      { name: "Temp Range", value: "-20°C to 550°C" },
      { name: "Thermal Sensitivity", value: "< 0.05°C (50 mK)" },
      { name: "Enhancement", value: "MSX + Wi-Fi connectivity" },
    ],
    applications: [
      "Electrical panel and switchgear inspection",
      "Predictive maintenance of motors and bearings",
      "Building envelope and energy audits",
      "Mechanical and process hot-spot detection",
    ],
    features: [
      "320x240 detector with MSX clarity",
      "Wide -20 to 550°C measurement range",
      "Wi-Fi image transfer and reporting",
      "Supplied with calibration & warranty",
    ],
    tags: ["FLIR E8-XT Pakistan", "thermal imaging camera", "thermal camera supplier", "predictive maintenance"],
    metaTitle: "FLIR E8-XT Thermal Imaging Camera | Pakistan | Nidus Trading",
    metaDesc:
      "FLIR E8-XT 320x240 thermal imaging camera in Pakistan with MSX, -20 to 550°C. Inspection & maintenance. Request a quote.",
    image: u("photo-1560977501-7cb367eccebe"),
  },
  {
    slug: "fluke-1777-three-phase-power-quality-analyzer",
    title: "Fluke 1777 Three-Phase Power Quality Analyzer",
    categorySlug: "test-measurement-calibration",
    brand: "Fluke",
    mpn: "FLUKE-1777",
    sku: "NT-TME-FLK1777",
    hsCode: "9030.39.00",
    countryOfOrigin: "USA",
    datasheetUrl: "https://www.fluke.com/en-us/product/electrical-testing/power-quality/fluke-1777/datasheet.pdf",
    certifications: ["CE", "IEC 61000-4-30 Class A", "CAT IV 600V", "ISO 9001"],
    warrantyPeriod: "24 Months Official Fluke Warranty + Calibration Certificate",
    stock: 14,
    featured: true,
    shortDesc:
      "IEC 61000-4-30 Class A three-phase power quality analyzer capturing 500+ parameters for energy and reliability audits.",
    longDesc:
      "The Fluke 1777 is a three-phase power quality analyzer that measures and logs more than 500 electrical parameters simultaneously — voltage, current, harmonics, flicker, unbalance, and transients — to IEC 61000-4-30 Class A accuracy. Automatic connection verification and a guided setup reduce measurement errors, while onboard logging and Fluke Energy Analyze software support compliance reporting and root-cause analysis of power disturbances. It is the standard instrument for utility, industrial, and facility power audits. Nidus Trading supplies Fluke analyzers with calibration certificates for energy-efficiency and reliability projects and government tenders in Pakistan.",
    specs: [
      { name: "Manufacturer", value: "Fluke" },
      { name: "Model", value: "1777" },
      { name: "Standard", value: "IEC 61000-4-30 Class A" },
      { name: "Parameters", value: "500+ (V, A, harmonics, flicker, transients)" },
      { name: "Safety Rating", value: "CAT IV 600V / CAT III 1000V" },
      { name: "Software", value: "Fluke Energy Analyze +" },
    ],
    applications: [
      "Facility and industrial power-quality audits",
      "Harmonics and transient troubleshooting",
      "Energy-efficiency and load studies",
      "Utility compliance measurement for tenders",
    ],
    features: [
      "IEC 61000-4-30 Class A accuracy",
      "500+ parameters logged simultaneously",
      "Automatic connection verification",
      "Calibration certificate included",
    ],
    tags: ["Fluke 1777 Pakistan", "power quality analyzer", "energy audit", "harmonics analyzer"],
    metaTitle: "Fluke 1777 Power Quality Analyzer | Pakistan | Nidus Trading",
    metaDesc:
      "Fluke 1777 three-phase power quality analyzer in Pakistan — IEC 61000-4-30 Class A, 500+ parameters. Request a quote.",
    image: u("photo-1518770660439-4636190af475"),
  },
  {
    slug: "honeywell-bw-microclip-xl-multi-gas-detector",
    title: "Honeywell BW MicroClip XL Portable 4-Gas Detector (H2S, CO, O2, LEL)",
    categorySlug: "test-measurement-calibration",
    brand: "Honeywell",
    mpn: "MCXL-XWHM-Y-NA",
    sku: "NT-TME-MCXL4",
    hsCode: "9027.10.00",
    countryOfOrigin: "Mexico",
    datasheetUrl: "https://www.honeywellanalytics.com/~/media/microclip-xl-datasheet.pdf",
    certifications: ["ATEX", "IECEx", "CSA", "CE", "IP66/IP68"],
    warrantyPeriod: "36 Months Official Honeywell Warranty",
    stock: 60,
    featured: true,
    bestSeller: true,
    shortDesc:
      "Compact intrinsically-safe 4-gas detector monitoring H2S, CO, O2, and combustible LEL for confined-space and plant safety.",
    longDesc:
      "The Honeywell BW MicroClip XL is a rugged, compact four-gas detector that continuously monitors hydrogen sulfide (H2S), carbon monoxide (CO), oxygen (O2), and combustible gases (LEL) to protect workers in confined spaces and hazardous areas. A two-year run time, IP66/IP68 water and dust resistance, and simple one-button operation make it ideal for oil & gas, utilities, and industrial HSE programs. ATEX/IECEx intrinsic-safety certification allows use in explosive atmospheres. Nidus Trading supplies portable and fixed gas detection, environmental monitors, and calibration gas with documentation for safety-compliance and government tenders in Pakistan.",
    specs: [
      { name: "Manufacturer", value: "Honeywell (BW Technologies)" },
      { name: "Model", value: "BW MicroClip XL" },
      { name: "Gases", value: "H2S, CO, O2, Combustible (LEL)" },
      { name: "Protection", value: "IP66 / IP68" },
      { name: "Approvals", value: "ATEX / IECEx / CSA" },
      { name: "Run Time", value: "Up to 2 years (rechargeable)" },
    ],
    applications: [
      "Confined-space entry gas monitoring",
      "Oil, gas, and petrochemical HSE",
      "Utility and water-treatment safety",
      "Industrial plant hazardous-area monitoring",
    ],
    features: [
      "Simultaneous 4-gas monitoring",
      "IP66/IP68 rugged, water-resistant build",
      "ATEX/IECEx intrinsically safe",
      "Simple one-button field operation",
    ],
    tags: ["Honeywell gas detector Pakistan", "4 gas detector", "confined space monitor", "BW MicroClip XL"],
    metaTitle: "Honeywell BW MicroClip XL 4-Gas Detector | Pakistan | Nidus Trading",
    metaDesc:
      "Honeywell BW MicroClip XL portable 4-gas detector (H2S, CO, O2, LEL) in Pakistan, ATEX/IECEx. Request a quote.",
    image: u("photo-1555664424-778a1e5e1b48"),
  },

  // ============================================================
  // 4) INDUSTRIAL AUTOMATION, PLC & PROCESS CONTROL
  // ============================================================
  {
    slug: "siemens-simatic-s7-1500-cpu-1515-2-pn",
    title: "Siemens SIMATIC S7-1500 CPU 1515-2 PN Processor Module",
    categorySlug: "automation-plc-process-control",
    brand: "Siemens",
    mpn: "6ES7515-2AM03-0AB0",
    sku: "NT-AUT-S71515",
    hsCode: "8537.10.00",
    countryOfOrigin: "Germany",
    datasheetUrl: "https://support.industry.siemens.com/cs/document/6ES7515-2AM03-0AB0-datasheet.pdf",
    certifications: ["CE", "UL", "cULus", "ATEX", "RCM"],
    warrantyPeriod: "12 Months Official Siemens Warranty",
    stock: 16,
    featured: true,
    bestSeller: true,
    shortDesc:
      "High-performance S7-1500 CPU with dual PROFINET interfaces for demanding machine and process automation.",
    longDesc:
      "The Siemens SIMATIC S7-1500 CPU 1515-2 PN is a mid-to-high performance controller for complex machine and plant automation. Two PROFINET interfaces (with separate IP subnets and an integrated 2-port switch) enable segregation of the control and plant networks, while fast bit-processing times and large work memory handle demanding motion, safety, and process tasks. Engineered in the TIA Portal, it offers integrated diagnostics, security, and a display for on-CPU status. Nidus Trading supplies genuine Siemens S7-1200/S7-1500 CPUs and I/O modules with documentation for OEMs, integrators, and government automation tenders in Pakistan.",
    specs: [
      { name: "Manufacturer", value: "Siemens" },
      { name: "Order No.", value: "6ES7515-2AM03-0AB0" },
      { name: "Family", value: "SIMATIC S7-1500" },
      { name: "Interfaces", value: "2x PROFINET (2-port switch)" },
      { name: "Work Memory", value: "500 KB code / 3 MB data" },
      { name: "Engineering", value: "TIA Portal" },
    ],
    applications: [
      "Complex machine and line automation",
      "Process control and batch systems",
      "Motion and safety-integrated applications",
      "Government and utility automation projects",
    ],
    features: [
      "Dual PROFINET for network segregation",
      "High-speed processing with large memory",
      "Integrated diagnostics and security",
      "On-CPU display for local status",
    ],
    tags: ["Siemens S7-1500 Pakistan", "PLC CPU 1515-2 PN", "SIMATIC controller", "PLC supplier"],
    metaTitle: "Siemens S7-1500 CPU 1515-2 PN | PLC Supplier Pakistan | Nidus Trading",
    metaDesc:
      "Siemens SIMATIC S7-1500 CPU 1515-2 PN (6ES7515-2AM03-0AB0) in Pakistan for automation projects. Request a quote.",
    image: u("photo-1588616437819-7d30e6f76e66"),
  },
  {
    slug: "schneider-altivar-atv320-vfd-5-5kw",
    title: "Schneider Altivar Machine ATV320 Variable Frequency Drive 5.5kW 400V",
    categorySlug: "automation-plc-process-control",
    brand: "Schneider Electric",
    mpn: "ATV320U55N4C",
    sku: "NT-AUT-ATV320-55",
    hsCode: "8504.40.40",
    countryOfOrigin: "France",
    datasheetUrl: "https://www.se.com/ww/en/product/ATV320U55N4C/datasheet.pdf",
    certifications: ["CE", "UL", "cULus", "STO SIL3", "RCM"],
    warrantyPeriod: "18 Months Official Schneider Warranty",
    stock: 28,
    featured: true,
    shortDesc:
      "Compact 5.5kW three-phase VFD with integrated Safe Torque Off (STO SIL3) for machine and conveyor motor control.",
    longDesc:
      "The Schneider Altivar Machine ATV320 is a compact, high-performance variable frequency drive for controlling three-phase asynchronous and synchronous motors up to 5.5kW at 400V. Integrated Safe Torque Off (STO to SIL3/PLe) simplifies machine safety design, while advanced motor control, multiple fieldbus options, and a book or compact format suit tight panel layouts. Ideal for conveyors, pumps, fans, and packaging machinery, the ATV320 improves energy efficiency and process control. Nidus Trading supplies Schneider Altivar and ABB ACS drives with documentation and commissioning support for OEMs and plant upgrades in Pakistan.",
    specs: [
      { name: "Manufacturer", value: "Schneider Electric" },
      { name: "Reference", value: "ATV320U55N4C" },
      { name: "Power", value: "5.5 kW (7.5 HP)" },
      { name: "Supply", value: "380–500 VAC, 3-phase" },
      { name: "Safety", value: "Integrated STO (SIL3 / PLe)" },
      { name: "Format", value: "Compact / book" },
    ],
    applications: [
      "Conveyor, pump, and fan motor control",
      "Packaging and material-handling machinery",
      "Energy-efficient process automation",
      "OEM machine builds and retrofits",
    ],
    features: [
      "Integrated Safe Torque Off (SIL3)",
      "Compact format for dense panels",
      "Multiple fieldbus communication options",
      "Advanced motor control algorithms",
    ],
    tags: ["Schneider Altivar Pakistan", "ATV320 VFD", "variable frequency drive", "5.5kW VFD"],
    metaTitle: "Schneider Altivar ATV320 5.5kW VFD | Supplier Pakistan | Nidus Trading",
    metaDesc:
      "Schneider Altivar Machine ATV320 5.5kW 400V VFD with STO SIL3 in Pakistan. Conveyors & pumps. Request a quote.",
    image: u("photo-1613315622081-3b066dbe5d83"),
  },
  {
    slug: "rosemount-3051s-pressure-transmitter-hart",
    title: "Emerson Rosemount 3051S Coplanar Pressure Transmitter (HART)",
    categorySlug: "automation-plc-process-control",
    brand: "Emerson Rosemount",
    mpn: "3051S2CD2A2E12A1AB4",
    sku: "NT-AUT-3051S",
    hsCode: "9026.20.00",
    countryOfOrigin: "USA",
    datasheetUrl: "https://www.emerson.com/documents/automation/product-data-sheet-rosemount-3051s.pdf",
    certifications: ["ATEX", "IECEx", "SIL2/SIL3 (IEC 61508)", "CE"],
    warrantyPeriod: "24 Months Official Emerson Warranty",
    stock: 26,
    featured: true,
    bestSeller: true,
    shortDesc:
      "High-accuracy coplanar pressure/DP transmitter with HART, 0.025% reference accuracy, and SIL2/3 for critical process control.",
    longDesc:
      "The Emerson Rosemount 3051S is a premium coplanar pressure and differential-pressure transmitter delivering 0.025% reference accuracy and rock-solid long-term stability. With HART protocol for digital diagnostics and configuration, SuperModule sensor technology, and SIL2/SIL3 safety certification, it is the benchmark for flow, level, and pressure measurement in oil & gas, power, and water applications. Rugged construction and ATEX/IECEx approvals suit hazardous process environments. Nidus Trading supplies Rosemount and Siemens transmitters with calibration and documentation for instrumentation and government process-control tenders in Pakistan.",
    specs: [
      { name: "Manufacturer", value: "Emerson Rosemount" },
      { name: "Model", value: "3051S Coplanar" },
      { name: "Measurement", value: "Gauge / DP / Absolute pressure" },
      { name: "Accuracy", value: "0.025% of span (reference)" },
      { name: "Protocol", value: "HART (4–20 mA)" },
      { name: "Safety", value: "SIL2 / SIL3 certified" },
    ],
    applications: [
      "Flow, level, and pressure measurement",
      "Oil & gas and refinery process control",
      "Power-plant and water-utility instrumentation",
      "Safety-instrumented systems (SIS)",
    ],
    features: [
      "0.025% reference accuracy, high stability",
      "HART digital diagnostics & configuration",
      "SIL2/SIL3 for safety applications",
      "ATEX/IECEx hazardous-area approved",
    ],
    tags: ["Rosemount 3051S Pakistan", "HART pressure transmitter", "DP transmitter", "process instrumentation"],
    metaTitle: "Rosemount 3051S Pressure Transmitter HART | Pakistan | Nidus Trading",
    metaDesc:
      "Emerson Rosemount 3051S coplanar pressure transmitter with HART, 0.025% accuracy, SIL2/3 in Pakistan. Request a quote.",
    image: u("photo-1560977501-7cb367eccebe"),
  },
  {
    slug: "siemens-sitrans-fus1010-ultrasonic-flow-transmitter",
    title: "Siemens SITRANS FUS1010 Clamp-On Ultrasonic Flow Transmitter (HART)",
    categorySlug: "automation-plc-process-control",
    brand: "Siemens",
    mpn: "7ME3810-1AB10",
    sku: "NT-AUT-FUS1010",
    hsCode: "9026.10.00",
    countryOfOrigin: "USA",
    datasheetUrl: "https://support.industry.siemens.com/cs/document/sitrans-fus1010-datasheet.pdf",
    certifications: ["ATEX", "CE", "FM", "cFMus"],
    warrantyPeriod: "12 Months Official Siemens Warranty",
    stock: 15,
    featured: true,
    shortDesc:
      "Non-intrusive clamp-on ultrasonic flow transmitter with HART for liquids — no pipe cutting, no pressure drop.",
    longDesc:
      "The Siemens SITRANS FUS1010 is a clamp-on ultrasonic flowmeter that measures liquid flow from outside the pipe — eliminating process shutdown, pipe cutting, and pressure drop during installation. Transit-time technology delivers accurate, maintenance-free measurement across a wide range of pipe sizes and materials, with HART output for integration into control systems. It is ideal for water, wastewater, HVAC, and hydrocarbon flow where intrusive meters are impractical or costly. Nidus Trading supplies Siemens SITRANS and other HART-enabled flow/pressure transmitters with documentation for utility and process tenders in Pakistan.",
    specs: [
      { name: "Manufacturer", value: "Siemens" },
      { name: "Model", value: "SITRANS FUS1010" },
      { name: "Type", value: "Clamp-on ultrasonic (transit-time)" },
      { name: "Media", value: "Clean & aerated liquids" },
      { name: "Output", value: "4–20 mA + HART, pulse, relay" },
      { name: "Install", value: "Non-intrusive, no pipe cutting" },
    ],
    applications: [
      "Water and wastewater flow measurement",
      "HVAC and district-cooling metering",
      "Hydrocarbon and chemical liquid flow",
      "Retrofit metering without shutdown",
    ],
    features: [
      "Clamp-on install — no process downtime",
      "No pressure drop or moving parts",
      "HART output for control integration",
      "Wide pipe-size and material range",
    ],
    tags: ["SITRANS FUS1010 Pakistan", "ultrasonic flow meter", "clamp on flow transmitter", "HART flow"],
    metaTitle: "Siemens SITRANS FUS1010 Ultrasonic Flow Transmitter | Pakistan | Nidus Trading",
    metaDesc:
      "Siemens SITRANS FUS1010 clamp-on ultrasonic flow transmitter with HART in Pakistan. Non-intrusive. Request a quote.",
    image: u("photo-1614903756535-8a6863184e02"),
  },

  // ============================================================
  // 5) POWER QUALITY & BACKUP INFRASTRUCTURE
  // ============================================================
  {
    slug: "apc-galaxy-vs-20kva-3-phase-online-ups",
    title: "APC Galaxy VS 20kVA 3-Phase Online Double-Conversion UPS",
    categorySlug: "power-quality-backup",
    brand: "APC by Schneider Electric",
    mpn: "GVSUPS20KB2FS",
    sku: "NT-PWR-GVS20K",
    hsCode: "8504.40.90",
    countryOfOrigin: "India",
    datasheetUrl: "https://www.apc.com/shop/us/en/products/GVSUPS20KB2FS/spec-sheet.pdf",
    certifications: ["CE", "UL", "IEC 62040-3", "RoHS"],
    warrantyPeriod: "12 Months Official APC Warranty",
    stock: 10,
    featured: true,
    bestSeller: true,
    shortDesc:
      "20kVA 3-phase online double-conversion UPS with up to 99% ECO efficiency and scalable internal batteries for critical loads.",
    longDesc:
      "The APC Galaxy VS 20kVA is a compact 3-phase online double-conversion UPS engineered for edge, IT, and light-industrial critical power. It delivers class-leading efficiency — up to 97% in double-conversion and 99% in ECO mode — reducing operating cost and heat. Scalable internal battery modules, live-swap serviceability, and a colour touchscreen simplify deployment and maintenance. IEC 62040-3 compliance and full input power-factor correction protect sensitive loads from mains disturbances. Nidus Trading supplies APC, Vertiv, and Eaton 3-phase UPS systems with sizing and documentation for data-center, telecom, and government tenders in Pakistan.",
    specs: [
      { name: "Manufacturer", value: "APC by Schneider Electric" },
      { name: "Model", value: "Galaxy VS 20kVA" },
      { name: "Topology", value: "Online double-conversion (VFI)" },
      { name: "Phase", value: "3-phase in / 3-phase out" },
      { name: "Efficiency", value: "Up to 97% (99% ECO)" },
      { name: "Standard", value: "IEC 62040-3" },
    ],
    applications: [
      "Data-center and edge critical power",
      "Telecom and network operations centers",
      "Medical and laboratory backup",
      "Government and financial IT resilience",
    ],
    features: [
      "Up to 99% ECO-mode efficiency",
      "Scalable, live-swap battery modules",
      "Full input power-factor correction",
      "Colour touchscreen with easy service",
    ],
    tags: ["APC Galaxy VS Pakistan", "3 phase online UPS", "20kVA UPS", "data center UPS"],
    metaTitle: "APC Galaxy VS 20kVA 3-Phase Online UPS | Pakistan | Nidus Trading",
    metaDesc:
      "APC Galaxy VS 20kVA 3-phase online double-conversion UPS in Pakistan, up to 99% ECO. Request a sizing quote.",
    image: u("photo-1621905252507-b35492cc74b4"),
  },
  {
    slug: "pylontech-us5000-48v-lifepo4-rack-battery",
    title: "Pylontech US5000 48V 4.8kWh Rack-Mount LiFePO4 Battery Module",
    categorySlug: "power-quality-backup",
    brand: "Pylontech",
    mpn: "US5000",
    sku: "NT-PWR-US5000",
    hsCode: "8507.60.00",
    countryOfOrigin: "China",
    datasheetUrl: "https://en.pylontech.com.cn/upload/product/US5000-datasheet.pdf",
    certifications: ["CE", "UN38.3", "IEC 62619", "TÜV"],
    warrantyPeriod: "10 Years / Cycle-Life Warranty",
    stock: 50,
    featured: true,
    bestSeller: true,
    shortDesc:
      "48V 4.8kWh rack-mount LiFePO4 battery with integrated BMS, expandable for telecom, solar ESS, and DC backup.",
    longDesc:
      "The Pylontech US5000 is a 48V 4.8kWh (100Ah) rack-mount lithium-iron-phosphate (LiFePO4) battery module with an integrated battery management system (BMS) for safe, long-life energy storage. Up to 15+ modules can be paralleled to scale capacity, making it ideal for telecom power, solar self-consumption, and DC backup for critical infrastructure. LiFePO4 chemistry offers superior cycle life, thermal stability, and depth-of-discharge versus lead-acid, with a compact 19-inch rack form factor. Nidus Trading supplies Pylontech and other 48V rack ESS with compatibility guidance for inverters and government/telecom energy tenders in Pakistan.",
    specs: [
      { name: "Manufacturer", value: "Pylontech" },
      { name: "Model", value: "US5000" },
      { name: "Chemistry", value: "LiFePO4 (LFP)" },
      { name: "Nominal", value: "48V, 100Ah, 4.8 kWh" },
      { name: "Cycle Life", value: "6000+ cycles @ 80% DoD" },
      { name: "Scalability", value: "Up to 15+ modules in parallel" },
    ],
    applications: [
      "Telecom base-station DC backup",
      "Solar self-consumption and ESS",
      "Data-center and critical DC power",
      "Government and utility energy storage",
    ],
    features: [
      "Integrated BMS with cell balancing",
      "6000+ cycle LiFePO4 longevity",
      "19-inch rack-mount, stackable design",
      "Broad inverter compatibility",
    ],
    tags: ["Pylontech US5000 Pakistan", "48V LiFePO4 battery", "rack mount ESS", "lithium battery storage"],
    metaTitle: "Pylontech US5000 48V LiFePO4 Rack Battery | Pakistan | Nidus Trading",
    metaDesc:
      "Pylontech US5000 48V 4.8kWh rack-mount LiFePO4 battery with BMS in Pakistan for ESS & backup. Request a quote.",
    image: u("photo-1518181835702-6eef8b4b2113"),
  },
  {
    slug: "dehn-dehnventil-modular-type-1-2-spd",
    title: "DEHN DEHNventil Modular Type 1+2 Combined Surge Protective Device (3P+N)",
    categorySlug: "power-quality-backup",
    brand: "DEHN",
    mpn: "DV M TNC 255",
    sku: "NT-PWR-DEHNVM255",
    hsCode: "8535.40.00",
    countryOfOrigin: "Germany",
    datasheetUrl: "https://www.dehn-international.com/sites/default/files/dehnventil-modular-datasheet.pdf",
    certifications: ["CE", "IEC 61643-11 (Type 1+2)", "VDE"],
    warrantyPeriod: "24 Months Official DEHN Warranty",
    stock: 40,
    featured: true,
    shortDesc:
      "Coordinated Class I+II (Type 1+2) DIN-rail surge arrester protecting installations from direct and induced lightning surges.",
    longDesc:
      "The DEHN DEHNventil Modular is a combined lightning-current and surge arrester (Type 1+2 / Class I+II) that protects electrical installations against both direct lightning strikes and switching/induced overvoltages in a single DIN-rail device. Its spark-gap-based technology delivers a high lightning-impulse current rating with a low voltage-protection level, while pluggable modules simplify inspection and replacement. Coordinated protection like this is mandatory for many building, telecom, and government installations exposed to lightning risk. Nidus Trading supplies DEHN and Phoenix Contact SPDs with selection support and documentation for compliance-driven tenders in Pakistan.",
    specs: [
      { name: "Manufacturer", value: "DEHN" },
      { name: "Model", value: "DEHNventil Modular DV M TNC 255" },
      { name: "Type", value: "Class I+II (Type 1+2)" },
      { name: "System", value: "3P+N (TN-C), 255V" },
      { name: "Impulse Current", value: "High Iimp (10/350 µs)" },
      { name: "Standard", value: "IEC 61643-11" },
    ],
    applications: [
      "Main distribution board lightning protection",
      "Telecom and data-center power entry",
      "Industrial and utility installations",
      "Lightning-exposed government facilities",
    ],
    features: [
      "Combined Type 1+2 in one device",
      "High lightning-current with low protection level",
      "Pluggable modules for easy service",
      "IEC 61643-11 / VDE compliant",
    ],
    tags: ["DEHN SPD Pakistan", "Type 1+2 surge protection", "lightning arrester", "DEHNventil"],
    metaTitle: "DEHN DEHNventil Type 1+2 Surge Protective Device | Pakistan | Nidus Trading",
    metaDesc:
      "DEHN DEHNventil Modular Type 1+2 combined SPD (3P+N) in Pakistan for lightning & surge protection. Request a quote.",
    image: u("photo-1566417110104-cd4f94af0fb3"),
  },
  {
    slug: "phoenix-contact-val-ms-320-type-2-spd",
    title: "Phoenix Contact VAL-MS 320 Type 2 Surge Protective Device Module",
    categorySlug: "power-quality-backup",
    brand: "Phoenix Contact",
    mpn: "2839128",
    sku: "NT-PWR-VALMS320",
    hsCode: "8535.40.00",
    countryOfOrigin: "Germany",
    datasheetUrl: "https://www.phoenixcontact.com/en-pc/products/2839128/datasheet.pdf",
    certifications: ["CE", "IEC 61643-11 (Type 2)", "UL 1449"],
    warrantyPeriod: "24 Months Official Phoenix Contact Warranty",
    stock: 65,
    featured: true,
    shortDesc:
      "Pluggable Type 2 DIN-rail surge arrester with thermal disconnect and status indication for downstream equipment protection.",
    longDesc:
      "The Phoenix Contact VAL-MS 320 is a Type 2 (Class II) surge protective device that safeguards sub-distribution boards and sensitive downstream equipment from transient overvoltages caused by switching and remote lightning. A pluggable protection module with a mechanical status indicator and thermal disconnect allows fast, tool-free maintenance without rewiring. Compact DIN-rail mounting and a wide nominal-discharge-current rating make it a versatile choice for panels, machinery, and building electrical systems. Nidus Trading supplies Phoenix Contact and DEHN SPDs with coordinated selection support for industrial and government installations across Pakistan.",
    specs: [
      { name: "Manufacturer", value: "Phoenix Contact" },
      { name: "Model", value: "VAL-MS 320 (2839128)" },
      { name: "Type", value: "Class II (Type 2)" },
      { name: "Max Voltage", value: "320V (Uc)" },
      { name: "Discharge Current", value: "In 20kA / Imax 40kA (8/20 µs)" },
      { name: "Features", value: "Pluggable, thermal disconnect, status flag" },
    ],
    applications: [
      "Sub-distribution board protection",
      "Machinery and control-panel surge protection",
      "Downstream sensitive-equipment defense",
      "Coordinated SPD stages with Type 1 arresters",
    ],
    features: [
      "Pluggable module — tool-free service",
      "Mechanical status indication",
      "Thermal disconnect for safe failure",
      "IEC 61643-11 / UL 1449 rated",
    ],
    tags: ["Phoenix Contact SPD Pakistan", "Type 2 surge protector", "VAL-MS 320", "DIN rail surge arrester"],
    metaTitle: "Phoenix Contact VAL-MS 320 Type 2 SPD | Pakistan | Nidus Trading",
    metaDesc:
      "Phoenix Contact VAL-MS 320 Type 2 pluggable surge protective device in Pakistan. DIN-rail, thermal disconnect. Request a quote.",
    image: u("photo-1544724569-5f546fd6f2b5"),
  },
];

/**
 * Compose the PDP `description` field from a rich catalog entry so that
 * Applications and Features & Benefits render as clean bulleted sections
 * (the product page renders `description` with `whitespace-pre-line`).
 */
export function buildB2BDescription(p: B2BProduct): string {
  const apps = p.applications.map((a) => `• ${a}`).join("\n");
  const feats = p.features.map((f) => `• ${f}`).join("\n");
  return [
    p.longDesc,
    `Applications:\n${apps}`,
    `Features & Benefits:\n${feats}`,
    PRICE_NOTE,
  ].join("\n\n");
}
