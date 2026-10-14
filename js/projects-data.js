/**
 * ARTIGENCE AI HUB — Projects Data
 * 
 * To add or update projects, edit the array below.
 * Images are served from assets/images/ and mirrored in public/images/.
 */

const ARTIGENCE_PROJECTS = [
  {
    id: "smart-ration",
    title: "AI Smart Ration Distribution System",
    subtitle: "Automated Public Distribution System",
    category: "ai-iot",
    categoryLabel: "AI • IoT • Automation",
    status: "Prototype",
    badge: "Prototype",
    tagline: "Automated staple grain dispensing with citizen verification & IoT telemetry.",
    description: "An automated public distribution solution integrating citizen verification, high-precision weighing, motorized grain dispensing, and cloud transaction tracking.",
    longDescription: "The AI Smart Ration Distribution System modernizes traditional fair-price shops into transparent, automated grain dispensing terminals. Designed to prevent distribution leakages and long wait times, the system combines secure authentication with electronic load-cell measurement and automated valve control to dispense exact ration quotas with digital receipt confirmation.",
    mainImage: "public/images/Screenshot 2026-09-17 200620.png",
    technicalImage: "public/images/Screenshot 2026-09-17 203306.png",
    bannerGradient: "linear-gradient(135deg, rgba(37, 99, 235, 0.85), rgba(124, 58, 237, 0.75))",
    icon: "chip",
    tags: ["AI Verification", "IoT Dispenser", "Automated Weighing", "RFID Authentication", "Cloud Telemetry"],
    features: [
      "Citizen authentication for secure and verified distribution",
      "Automatic & precise load-cell weighing for commodities like rice, wheat, and pulses",
      "Motorized dispensing mechanism for controlled grain output",
      "Digital transaction recording and QR-coded receipt logging",
      "IoT telemetry dashboard for real-time inventory and stock replenishment monitoring"
    ],
    techStack: [
      { name: "Embedded Controllers", role: "Sensor & Actuator Control" },
      { name: "Load Cells & HX711", role: "Precision Mass Measurement" },
      { name: "IoT Gateway", role: "Cloud Sync & Transaction Logging" },
      { name: "Python / C++", role: "Firmware & Automation Logic" }
    ],
    showcaseSections: [
      {
        title: "Main Prototype",
        desc: "Automated dispensing cabinet featuring multi-hopper grain storage, digital scale integration, and user interface terminal.",
        image: "public/images/Screenshot 2026-09-17 200620.png"
      },
      {
        title: "Technical & Features Overview",
        desc: "Core capabilities including precision dispensing, digital logging, and real-time inventory tracking.",
        image: "public/images/Screenshot 2026-09-17 203306.png"
      }
    ],
    impact: "Provides transparent, automated food grain distribution to reduce manual weighing discrepancies and ensure allocated subsidies reach legitimate citizens."
  },
  {
    id: "agarbatti-dryer",
    title: "Smart Agarbatti Drying Machine",
    subtitle: "Climate-Resilient Artisan Drying System",
    category: "ai-iot",
    categoryLabel: "IoT • Automation • Rural Innovation",
    status: "Working Prototype",
    badge: "Working Prototype",
    tagline: "Controlled-environment drying automation supporting rural incense artisans.",
    description: "A compact, automated drying system engineered to eliminate weather-dependent production downtime for home-based agarbatti manufacturers.",
    longDescription: "The Smart Agarbatti Drying Machine provides an automated micro-climate chamber that regulates temperature and airflow to dry incense sticks uniformly regardless of rainfall or high humidity. Built to support rural women artisans and small-scale self-help groups, it standardizes product quality, prevents moisture damage, and accelerates manufacturing cycles.",
    mainImage: "public/images/Screenshot 2026-09-17 203519.png",
    bannerGradient: "linear-gradient(135deg, rgba(16, 185, 129, 0.85), rgba(124, 58, 237, 0.65))",
    icon: "sun",
    tags: ["ESP32", "DHT11 Sensors", "Airflow Control", "Heating Element", "Rural Innovation", "Micro-climate"],
    features: [
      "Controlled drying chamber isolating incense sticks from external weather & moisture",
      "Temperature and relative humidity closed-loop feedback sensing",
      "Regulated heating elements paired with forced-convection circulation fans",
      "Uniform drying movement preventing stick warping and fragrance degradation",
      "Energy-conscious design tailored for decentralized rural workshops"
    ],
    techStack: [
      { name: "Microcontroller (ESP32)", role: "Closed-loop Process Automation" },
      { name: "DHT11 / Climate Sensors", role: "Chamber Environment Sensing" },
      { name: "Thermal & Fan Actuators", role: "Heater & Airflow Management" },
      { name: "Compact Enclosure", role: "Thermal Insulation & Air Circulation" }
    ],
    showcaseSections: [
      {
        title: "Working Process & System Architecture",
        desc: "Step-by-step workflow covering problem analysis, system architecture, component movement, and telemetry monitoring.",
        image: "public/images/Screenshot 2026-09-17 203519.png"
      }
    ],
    impact: "Protects home-based artisans from monsoon production halts, cutting drying time significantly while maintaining export-grade incense stick fragrance and integrity."
  },
  {
    id: "smart-bus-monitoring",
    title: "Smart Public Bus Monitoring System",
    subtitle: "Real-Time Transit Telemetry & Fleet Tracking",
    category: "smart-transit",
    categoryLabel: "IoT • GPS • Smart Transportation",
    status: "Prototype",
    badge: "Prototype",
    tagline: "Connected GPS tracking and predictive arrival estimation for public transit.",
    description: "An IoT and GPS-powered transportation platform designed for real-time fleet tracking, dynamic ETA calculation, and passenger commute planning.",
    longDescription: "The Smart Public Bus Monitoring System bridges public transit operators and daily commuters through IoT GPS telemetry. On-bus telemetry modules stream live geographic coordinates and route progress to a central platform, calculating predictive arrival estimates at each stop and reducing commuter waiting times.",
    mainImage: "public/images/Screenshot 2026-09-17 203306.png",
    bannerGradient: "linear-gradient(135deg, rgba(56, 189, 248, 0.85), rgba(147, 51, 234, 0.75))",
    icon: "bus",
    tags: ["IoT GPS", "Real-Time Tracking", "Transit Telemetry", "Fleet Management", "ETA Prediction"],
    features: [
      "Live GPS coordinate streaming and route progress tracking",
      "Dynamic Estimated Time of Arrival (ETA) calculation per bus stop",
      "Central fleet management dashboard for route schedule monitoring",
      "Commuter-facing web and mobile notification interfaces",
      "Modular hardware architecture supporting diverse vehicle types"
    ],
    techStack: [
      { name: "GPS / GSM Modules", role: "Vehicle Positioning & Telemetry" },
      { name: "Microcontrollers", role: "Onboard Data Collection" },
      { name: "Cloud Streaming", role: "Real-time Telemetry Processing" },
      { name: "Web / Mobile UI", role: "Commuter & Fleet Interfaces" }
    ],
    showcaseSections: [
      {
        title: "System Concept & Telemetry Architecture",
        desc: "Integrated GPS and IoT tracking pipeline feeding real-time transit data to passengers and depot supervisors.",
        image: "public/images/Screenshot 2026-09-17 203306.png"
      }
    ],
    impact: "Improves public transit predictability, minimizes passenger waiting time at bus shelters, and provides fleet managers with actionable route efficiency insights."
  },
  {
    id: "haventra",
    title: "Haventra",
    subtitle: "A Future Digital Product by Artigence AI Hub",
    category: "web-mobile",
    categoryLabel: "Wedding Technology Platform",
    status: "In Development",
    badge: "In Development",
    tagline: "A future digital platform for discovering and organizing wedding services.",
    description: "A future wedding planner app focused on discovering and organizing wedding-related services.",
    longDescription: "Haventra is a future wedding planner app currently under development by Artigence AI Hub. Envisioned as a unified digital ecosystem, Haventra aims to connect couples and event organizers with verified wedding venues, catering services, decorators, and event vendors through location-aware discovery and simplified coordination.",
    mainImage: "public/images/be81b255-2534-4bca-8dcf-e495b5bf333d.png",
    bannerGradient: "linear-gradient(135deg, rgba(236, 72, 153, 0.85), rgba(147, 51, 234, 0.75))",
    icon: "rings",
    tags: ["Wedding Tech", "Location-Based", "Platform Concept", "Vendor Discovery", "In Development"],
    features: [
      "Location-aware discovery for wedding halls and event venues",
      "Vendor service categories: Catering, Decor, Photography & Styling",
      "Bilingual user interface design for accessible local adoption",
      "Integrated inquiry, availability checking, and date coordination",
      "Dedicated vendor management portal for venue owners"
    ],
    techStack: [
      { name: "Flutter", role: "Cross-Platform Client Framework" },
      { name: "Cloud Backend", role: "Data Storage & Authentication" },
      { name: "Geolocation APIs", role: "Location Discovery & Mapping" }
    ],
    showcaseSections: [
      {
        title: "Platform Design & Concept",
        desc: "Conceptual architecture and user experience blueprints for the upcoming Haventra wedding technology platform.",
        image: "public/images/be81b255-2534-4bca-8dcf-e495b5bf333d.png"
      }
    ],
    impact: "Aims to streamline the complex event planning process into an intuitive digital experience for families and regional wedding service providers."
  }
];

if (typeof window !== "undefined") {
  window.ARTIGENCE_PROJECTS = ARTIGENCE_PROJECTS;
}
