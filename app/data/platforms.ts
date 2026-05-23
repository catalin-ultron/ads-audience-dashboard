export interface AudienceLayer {
  name: string;
  goal: string;
  sizeEstimate: string;
  matchCriteria: string[];
  demographics?: { age?: string; geo?: string; language?: string };
  exclusions: string[];
  savedNamePattern: string;
  notes?: string;
}

export interface PlatformData {
  id: string;
  name: string;
  color: string;
  icon: string;
  budgetRange: string;
  cplBenchmark: string;
  layers: AudienceLayer[];
  abmSpec?: {
    uploadType: string;
    minSize: string;
    columns: string[];
    fileFormat: string;
  };
  globalExclusions: string[];
  kpiTargets: { metric: string; target: string }[];
}

export const platforms: PlatformData[] = [
  {
    id: "meta",
    name: "Meta (Facebook + Instagram)",
    color: "#0081FB",
    icon: "Meta",
    budgetRange: "$2K–8K/mo",
    cplBenchmark: "$45–120",
    layers: [
      {
        name: "Cold / Prospecting",
        goal: "Lead Magnet Download / Content Signup",
        sizeEstimate: "200K–500K",
        demographics: { age: "25–50", geo: "US, UK, CA, AU", language: "English" },
        matchCriteria: [
          "Job Titles: Founder, Co-Founder, CEO, Head of Growth, VP Growth",
          "Interests: Entrepreneurship, Startups, SaaS, Venture Capital, Y Combinator, TechCrunch, Product Hunt, Stripe, Notion, HubSpot",
          "Behaviors: Small Business Owners, Technology Early Adopters",
          "Narrow: Require Job Title AND (Interest OR Behavior) overlap",
        ],
        exclusions: [
          "Students",
          "Job Seekers (behavior)",
          "Age < 25 or > 60",
          "Existing customers (CRM upload)",
          "Active leads in sequence (CRM upload)",
        ],
        savedNamePattern: "NXT-Cold-Prospecting-[Date]",
        notes: "Meta job-title data is self-reported and less precise than LinkedIn. Layer interests + behaviors to increase signal.",
      },
      {
        name: "Consideration / Retargeting",
        goal: "Demo Intent / Landing Page Visit",
        sizeEstimate: "10K–50K",
        matchCriteria: [
          "Video Viewers > 50% (last 30 days)",
          "Instagram / Facebook Post Engagers (last 30 days)",
          "Website Visitors via Meta Pixel (last 60 days)",
          "Ad Clickers who did not convert (last 30 days)",
        ],
        exclusions: [
          "High-intent page visitors (/pricing, /demo)",
          "Existing customers",
          "Converters (Pixel event)",
        ],
        savedNamePattern: "NXT-Consideration-Retarget-[Date]",
        notes: "Requires Meta Pixel installed on all pages. If pixel traffic is low (<5K), expand to 90-day lookback.",
      },
      {
        name: "Conversion / ABM",
        goal: "Demo Booked / Sales Call",
        sizeEstimate: "500–5K",
        matchCriteria: [
          "High-intent website visitors: /pricing, /demo, /book-a-call (last 14 days)",
          "Video Viewers > 75% (highly engaged, last 30 days)",
          "CRM Matched Audience: upload qualified lead emails (Marcus Williams, Elena Rodriguez, etc.)",
          "Lookalike 1% of best customers / qualified leads",
          "ABM: Upload target company email list (founders/CEOs at target accounts)",
        ],
        exclusions: [
          "All existing customers and converters",
          "Exclude Layer 1 + Layer 2 audiences to avoid overlap",
        ],
        savedNamePattern: "NXT-Conversion-ABM-[Date]",
        notes: "Lookalike needs minimum 100 seed contacts. If seed is small, use 1% broad LAL or skip LAL and focus on retargeting + CRM.",
      },
    ],
    abmSpec: {
      uploadType: "Custom Audience — Contact List",
      minSize: "100 matched contacts (best: 300+)",
      columns: ["email (required)", "phone (optional)", "first_name (optional)", "last_name (optional)"],
      fileFormat: "CSV (hashed automatically by Meta)",
    },
    globalExclusions: [
      "Existing customers — CRM list upload",
      "Active leads in sales sequence — CRM list upload",
      "Competitor interests (if known: Apollo.io, Lavender, Copy.ai)",
      "Age < 25, Age > 60",
      "Students, Job Seekers",
    ],
    kpiTargets: [
      { metric: "CTR (Cold)", target: "> 0.8%" },
      { metric: "CPL (Cold)", target: "$45–80" },
      { metric: "CPL (Conversion)", target: "$25–50" },
      { metric: "Frequency", target: "< 3.0 / 7 days" },
    ],
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    color: "#0A66C2",
    icon: "Linkedin",
    budgetRange: "$3K–12K/mo",
    cplBenchmark: "$85–200",
    layers: [
      {
        name: "Cold / Prospecting",
        goal: "Content Download / Video View / Newsletter Signup",
        sizeEstimate: "80K–200K",
        demographics: { age: "25–50", geo: "US, UK, CA, AU", language: "English" },
        matchCriteria: [
          "Job Titles: Founder, Co-Founder, CEO, Head of Growth, VP Growth, Chief Growth Officer",
          "Seniority: Director, VP, CXO, Owner, Partner (exclude Entry, Intern)",
          "Job Function: Entrepreneurship, Operations, Marketing, Business Development",
          "Industry: Computer Software, IT & Services, Internet",
          "Company Size: 1–10, 11–50 (primary). Expansion test: 51–200",
        ],
        exclusions: [
          "Existing customers",
          "Active leads in sequence (upload CRM list)",
          "Competitor employees (upload list)",
          "Students, Interns, Entry-level",
          "Irrelevant industries: Staffing, Restaurants, Construction, Retail",
        ],
        savedNamePattern: "NXT-Cold-Prospecting-[Date]",
        notes: "Expansion test: add Managing Director, Head of Marketing, CRO, Head of Revenue to find hidden buyers.",
      },
      {
        name: "Consideration / Retargeting",
        goal: "Demo Request / Lead Form Open",
        sizeEstimate: "5K–50K",
        matchCriteria: [
          "Video Viewers > 50% completion (if video ads used)",
          "Single-image / Document (carousel) ad engagers (last 30 days)",
          "LinkedIn Insight Tag: Website visitors (last 60 days)",
          "LinkedIn Profile visitors (last 30 days)",
          "Post clickers who did not convert (last 30 days)",
        ],
        exclusions: [
          "High-intent page visitors via Insight Tag (/pricing, /demo)",
          "Existing customers + converters",
          "Active qualified leads already in meeting stage",
        ],
        savedNamePattern: "NXT-Consideration-Retarget-[Date]",
        notes: "Requires LinkedIn Insight Tag on all pages. If tag traffic is low, supplement with Document ad engagement.",
      },
      {
        name: "Conversion / ABM",
        goal: "Demo Booked / Lead Form Submitted",
        sizeEstimate: "1K–10K",
        matchCriteria: [
          "Insight Tag: High-intent website visitors (/pricing, /demo, /book-a-call) — last 14–30 days",
          "Layer 2 engagers (warmest, last 30 days)",
          "Matched Audience: CRM upload of qualified leads (filter to Founder/CEO/Head of Growth only)",
          "ABM Company List: Upload target company names + overlay job title filter",
        ],
        exclusions: [
          "All existing customers",
          "Converters (lead form submitters + demo bookers)",
          "Layer 1 cold audience (they've already engaged, don't double-pay)",
          "Layer 2 consideration audience (funnel progression only)",
        ],
        savedNamePattern: "NXT-Conversion-ABM-[Date]",
        notes: "ABM list minimum 300 companies for reliable matching. Build from YC portfolio, Techstars, Seed/Series A SaaS lists.",
      },
    ],
    abmSpec: {
      uploadType: "Matched Audience — Company List + Contact List",
      minSize: "300 companies (Company List); 300 contacts (Contact List)",
      columns: ["company_name (required)", "company_domain (recommended)", "company_website (recommended)", "email (for contact list)"],
      fileFormat: "CSV",
    },
    globalExclusions: [
      "Existing customers — CRM list upload",
      "Active leads in sales sequence",
      "Competitor employees + known partners",
      "Students, Interns, Entry-level",
      "Opt-outs / unsubscribes",
      "Irrelevant industries: Staffing, Restaurants, Construction, Retail",
    ],
    kpiTargets: [
      { metric: "CTR (Cold)", target: "> 0.4%" },
      { metric: "CPL (Cold)", target: "$85–150" },
      { metric: "CPL (Conversion)", target: "$40–80" },
      { metric: "Frequency", target: "< 3.0 / 7 days" },
    ],
  },
  {
    id: "x",
    name: "X (Twitter)",
    color: "#000000",
    icon: "X",
    budgetRange: "$1K–5K/mo",
    cplBenchmark: "$35–90",
    layers: [
      {
        name: "Cold / Prospecting",
        goal: "Video View / Profile Visit / Engagement",
        sizeEstimate: "100K–500K",
        demographics: { age: "25–54", geo: "US, UK, CA, AU", language: "English" },
        matchCriteria: [
          "Follower Lookalikes: @naval, @patio11, @alexhormozi, @paulg, @jasonlk, @levelsio, @IndieHackers, @MicroAcquire, @YCombinator",
          "Keywords (bio/tweets): 'founder', 'CEO', 'SaaS', 'pre-seed', 'seed round', 'B2B SaaS', 'go-to-market', 'pipeline', 'founder-led sales'",
          "Interests: Entrepreneurship, Startups, Technology, Business News",
          "Narrow by: AND require Keywords + Follower Lookalike overlap",
        ],
        exclusions: [
          "Followers of known competitors (if handles known)",
          "Keywords: 'hiring', 'internship', 'job search'",
          "Age < 25",
          "Existing customers (upload email list)",
          "Active leads in sequence (upload email list)",
        ],
        savedNamePattern: "NXT-Cold-Prospecting-[Date]",
        notes: "Create ad groups per cluster: Operator Cluster (@naval, @alexhormozi), SaaS VC Cluster (@BessemerVP, @PointNineCap), Community Cluster (@IndieHackers, @MicroAcquire). Winner gets budget.",
      },
      {
        name: "Consideration / Retargeting",
        goal: "Landing Page Visit / Content Download",
        sizeEstimate: "5K–50K",
        matchCriteria: [
          "Video Viewers > 50% (or 95% for short video < 15s)",
          "Post Engagers (liked, replied, retweeted, clicked — last 30 days)",
          "Website visitors via X Pixel (last 30–60 days)",
          "Profile visitors (if X Premium analytics available)",
        ],
        exclusions: [
          "High-intent page visitors (/pricing, /demo)",
          "Converters",
          "Existing customers",
        ],
        savedNamePattern: "NXT-Consideration-Retarget-[Date]",
        notes: "X Pixel must fire on all pages. If pixel traffic is low, retarget engaged users (likes + replies) as warm signal.",
      },
      {
        name: "Conversion / ABM",
        goal: "Demo Booked / Lead Form Filled",
        sizeEstimate: "1K–10K",
        matchCriteria: [
          "Website visitors to high-intent pages (/pricing, /demo, /book-a-call) — last 14 days",
          "Multiple post engagers (engaged 2+ times — warmest signal)",
          "Uploaded CRM list of target accounts for retargeting",
          "Lookalike Audience from converted leads / customers (if 100+ seed)",
        ],
        exclusions: [
          "All existing customers and converters",
          "Layer 1 cold audience",
          "Layer 2 consideration audience",
        ],
        savedNamePattern: "NXT-Conversion-ABM-[Date]",
        notes: "ABM on X = email/handle upload. No native job-title filter. Layer keyword overlays if possible. Minimum 100 contacts for lookalike.",
      },
    ],
    abmSpec: {
      uploadType: "Tailored Audience — List Upload (emails or handles)",
      minSize: "100 matched contacts (best: 500+)",
      columns: ["email (recommended)", "handle / username (optional)", "phone (optional)"],
      fileFormat: "CSV",
    },
    globalExclusions: [
      "Existing customers — email list upload",
      "Active leads in sequence — email list upload",
      "Competitor handles (exclude followers of @competitor)",
      "Keywords: 'hiring', 'intern', 'job'",
      "Age < 25",
    ],
    kpiTargets: [
      { metric: "CTR (Cold)", target: "> 0.5%" },
      { metric: "CPL (Cold)", target: "$35–70" },
      { metric: "CPL (Conversion)", target: "$20–45" },
      { metric: "Engagement Rate", target: "> 2.5%" },
    ],
  },
  {
    id: "tiktok",
    name: "TikTok",
    color: "#FE2C55",
    icon: "TikTok",
    budgetRange: "$500–3K/mo",
    cplBenchmark: "$20–55",
    layers: [
      {
        name: "Cold / Prospecting",
        goal: "Profile Follow / Video Completion / Landing Page Click",
        sizeEstimate: "200K–1M",
        demographics: { age: "25–45", geo: "US, UK, CA, AU", language: "English" },
        matchCriteria: [
          "Interests: Business & Productivity, Entrepreneurship, Startups, Technology, Software, Finance & Investing",
          "Behaviors: Engaged with business/finance content (last 7–15 days)",
          "Hashtags followed / engaged: #saas #founder #startuptok #b2b #entrepreneur #techtok #indiehacker",
          "Custom Audience: Upload email list of known prospects for reach + frequency",
        ],
        exclusions: [
          "Age < 22 (B2B buyers on TikTok skew slightly younger but 22+ captures early founders)",
          "Gaming-only interests (exclude pure gaming accounts if B2B irrelevant)",
          "Existing customers (upload list)",
          "Active leads (upload list)",
        ],
        savedNamePattern: "NXT-Cold-Prospecting-[Date]",
        notes: "TikTok B2B is virgin territory. 52% of B2B buyers 25–45 are active weekly. Interest-graph algorithm reaches by professional interests, not demographics. Micro-explainers outperform polished ads.",
      },
      {
        name: "Consideration / Retargeting",
        goal: "Landing Page Visit / Lead Form Open",
        sizeEstimate: "5K–30K",
        matchCriteria: [
          "Video Completion > 50% (last 15 days)",
          "Profile visitors (last 15 days)",
          "Ad clickers (last 30 days)",
          "TikTok Pixel: Website visitors (last 30 days)",
        ],
        exclusions: [
          "Converters (Pixel event)",
          "High-intent page visitors (/pricing, /demo)",
          "Existing customers",
        ],
        savedNamePattern: "NXT-Consideration-Retarget-[Date]",
        notes: "TikTok Pixel required. If pixel volume low, use engagement retargeting (video completion + profile visit) as primary warm signal.",
      },
      {
        name: "Conversion / ABM",
        goal: "Demo Booked / Lead Captured",
        sizeEstimate: "500–5K",
        matchCriteria: [
          "TikTok Pixel: High-intent website visitors (/pricing, /demo, /book-a-call) — last 7–14 days",
          "Video Completion > 75% (highly engaged, last 15 days)",
          "Uploaded CRM email list for retargeting",
          "Lookalike from converters / qualified leads (if 100+ seed)",
        ],
        exclusions: [
          "All existing customers",
          "Converters",
          "Layer 1 cold",
          "Layer 2 consideration",
        ],
        savedNamePattern: "NXT-Conversion-ABM-[Date]",
        notes: "TikTok's lead-gen form (Instant Form) has lower friction than landing pages for B2B. Test native form vs. landing page.",
      },
    ],
    abmSpec: {
      uploadType: "Custom Audience — Customer File (email/phone)",
      minSize: "1,000 matched contacts (best: 5,000+)",
      columns: ["email (recommended)", "phone (optional)"],
      fileFormat: "CSV",
    },
    globalExclusions: [
      "Existing customers — email list upload",
      "Active leads in sequence — email list upload",
      "Age < 22",
      "Pure entertainment / gaming-only interests",
      "Converters",
    ],
    kpiTargets: [
      { metric: "Video Completion Rate", target: "> 15%" },
      { metric: "CTR (Cold)", target: "> 1.0%" },
      { metric: "CPL (Cold)", target: "$20–40" },
      { metric: "CPL (Conversion)", target: "$15–30" },
    ],
  },
];
