import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  Home,
  User,
  Settings,
  Trash2,
  Wallet,
  Calendar as CalendarIcon,
  CheckSquare,
  NotebookText,
  Code2,
  ChevronRight,
  Plus,
  Undo2,
  Palette,
  SlidersHorizontal,
  Bell,
  Search as SearchIcon,
  MoreVertical,
  X,
  Star,
  StarOff,
  Copy,
  ArrowUp,
  ArrowDownWideNarrow,
  ArrowUpWideNarrow,
  Download,
  Upload,
  Image as ImageIcon,
  GripVertical,
  Check,
  Clock3,
  Globe,
  MapPin,
  Mail,
} from "lucide-react";
import { FALLBACK_TENOR_GIFS } from "./assets/tenorFallback";

// -------------------------------------------------
// Thèmes (appliqués à TOUTE la page : fond, sidebar, cartes)
// Objectif: contraste élevé mais confortable (dark), séparation nette page/sidebar/cartes
// -------------------------------------------------
const THEMES = {
  graphite: {
    name: "Graphite (neutre)",
    pageFrom: "from-slate-950",
    pageVia: "via-slate-950",
    pageTo: "to-slate-900",
    sidebarFrom: "from-slate-900/70",
    sidebarVia: "via-slate-950/70",
    sidebarTo: "to-slate-950/80",
    cardFrom: "from-slate-900/60",
    cardVia: "via-slate-950/70",
    cardTo: "to-slate-950/90",
    logoGradient: "from-gray-600/20 via-gray-500/20 to-gray-400/10",
    glowRing: "ring-white/10",
    accentFrom: "from-gray-400/40",
    accentTo: "to-gray-300/30",
    focusRing: "focus-visible:ring-white/20",
  },
  cyano: {
    name: "Cyano/Indigo",
    pageFrom: "from-slate-950",
    pageVia: "via-cyan-950/70",
    pageTo: "to-indigo-950",
    sidebarFrom: "from-slate-950/70",
    sidebarVia: "via-cyan-950/60",
    sidebarTo: "to-indigo-950/80",
    cardFrom: "from-slate-900/60",
    cardVia: "via-cyan-900/40",
    cardTo: "to-indigo-950/90",
    logoGradient: "from-cyan-500/30 via-blue-500/30 to-indigo-500/30",
    glowRing: "ring-cyan-400/30",
    accentFrom: "from-cyan-400/60",
    accentTo: "to-indigo-400/60",
    focusRing: "focus-visible:ring-cyan-500/70",
  },
  violet: {
    name: "Violet/Rose",
    pageFrom: "from-slate-950",
    pageVia: "via-fuchsia-950/70",
    pageTo: "to-purple-950",
    sidebarFrom: "from-slate-950/70",
    sidebarVia: "via-fuchsia-950/60",
    sidebarTo: "to-purple-950/80",
    cardFrom: "from-slate-900/60",
    cardVia: "via-fuchsia-900/40",
    cardTo: "to-purple-950/90",
    logoGradient: "from-fuchsia-500/30 via-purple-500/30 to-pink-500/30",
    glowRing: "ring-fuchsia-400/30",
    accentFrom: "from-fuchsia-400/60",
    accentTo: "to-pink-400/60",
    focusRing: "focus-visible:ring-fuchsia-500/70",
  },
  emerald: {
    name: "Émeraude/Teal",
    pageFrom: "from-slate-950",
    pageVia: "via-emerald-950/70",
    pageTo: "to-teal-950",
    sidebarFrom: "from-slate-950/70",
    sidebarVia: "via-emerald-950/60",
    sidebarTo: "to-teal-950/80",
    cardFrom: "from-slate-900/60",
    cardVia: "via-emerald-900/40",
    cardTo: "to-teal-950/90",
    logoGradient: "from-emerald-500/30 via-teal-500/30 to-cyan-500/30",
    glowRing: "ring-emerald-400/30",
    accentFrom: "from-emerald-400/60",
    accentTo: "to-teal-400/60",
    focusRing: "focus-visible:ring-emerald-500/70",
  },
  amber: {
    name: "Ambre/Orange",
    pageFrom: "from-slate-950",
    pageVia: "via-amber-950/70",
    pageTo: "to-rose-950",
    sidebarFrom: "from-slate-950/70",
    sidebarVia: "via-amber-950/60",
    sidebarTo: "to-rose-950/80",
    cardFrom: "from-slate-900/60",
    cardVia: "via-amber-900/40",
    cardTo: "to-rose-950/90",
    logoGradient: "from-amber-500/30 via-orange-500/30 to-rose-500/30",
    glowRing: "ring-amber-400/30",
    accentFrom: "from-amber-400/60",
    accentTo: "to-rose-400/60",
    focusRing: "focus-visible:ring-amber-500/70",
  },
  sky: {
    name: "Sky/Bleu",
    pageFrom: "from-slate-950",
    pageVia: "via-sky-950/70",
    pageTo: "to-blue-950",
    sidebarFrom: "from-slate-950/70",
    sidebarVia: "via-sky-950/60",
    sidebarTo: "to-blue-950/80",
    cardFrom: "from-slate-900/60",
    cardVia: "via-sky-900/40",
    cardTo: "to-blue-950/90",
    logoGradient: "from-sky-500/30 via-blue-500/30 to-indigo-500/30",
    glowRing: "ring-sky-400/30",
    accentFrom: "from-sky-400/60",
    accentTo: "to-blue-400/60",
    focusRing: "focus-visible:ring-sky-500/70",
  },
} as const;

type ThemeKey = keyof typeof THEMES;

const POINTER_GLOW_COLORS: Record<ThemeKey, string> = {
  graphite: "rgba(148, 163, 184, 0.38)",
  cyano: "rgba(56, 189, 248, 0.42)",
  violet: "rgba(232, 121, 249, 0.42)",
  emerald: "rgba(52, 211, 153, 0.42)",
  amber: "rgba(251, 191, 36, 0.45)",
  sky: "rgba(96, 165, 250, 0.42)",
};

const THEME_ACCENT_HEX: Record<ThemeKey, string> = {
  graphite: "#94a3b8",
  cyano: "#38bdf8",
  violet: "#e879f9",
  emerald: "#34d399",
  amber: "#fbbf24",
  sky: "#60a5fa",
};

const LANGUAGE_OPTIONS = [
  { value: "fr-FR", label: "Français (France)" },
  { value: "en-US", label: "English (US)" },
  { value: "es-ES", label: "Español (España)" },
  { value: "de-DE", label: "Deutsch (Deutschland)" },
] as const;

const TIMEZONE_OPTIONS = [
  { value: "Europe/Paris", label: "Europe/Paris (UTC+1/+2)" },
  { value: "Europe/London", label: "Europe/Londres (UTC+0/+1)" },
  { value: "America/New_York", label: "America/New_York (UTC-5/-4)" },
  { value: "Asia/Tokyo", label: "Asia/Tokyo (UTC+9)" },
] as const;

const DROPZONE_END = "__dropzone-end__";

const TRANSPARENT_PIXEL =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
let cachedTransparentImage: HTMLImageElement | null = null;
function getTransparentDragImage() {
  if (typeof Image === "undefined") return null;
  if (cachedTransparentImage) return cachedTransparentImage;
  cachedTransparentImage = new Image();
  cachedTransparentImage.src = TRANSPARENT_PIXEL;
  return cachedTransparentImage;
}

type TenorGif = {
  id: string;
  url: string;
  preview: string;
  width: number;
  height: number;
};

function getFallbackTenorResults(query?: string, offset = 0, limit = 18): TenorGif[] {
  const normalized = query?.trim().toLowerCase();
  const pool = FALLBACK_TENOR_GIFS;
  const filtered = !normalized
    ? pool
    : pool.filter((gif) =>
        gif.tags.some((tag) => tag.toLowerCase().includes(normalized)) ||
        gif.id.toLowerCase().includes(normalized)
      );
  return filtered
    .slice(offset, offset + limit)
    .map(({ tags: _tags, ...gif }) => ({ ...gif }));
}

type SortMode = "manual" | "name-asc" | "name-desc" | "last-viewed";

const SORT_OPTIONS: {
  value: SortMode;
  label: string;
  description: string;
  Icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}[] = [
  {
    value: "manual",
    label: "Tri manuel",
    description: "Organise librement avec le glisser-déposer.",
    Icon: GripVertical,
    badge: "Libre",
  },
  {
    value: "name-asc",
    label: "Nom croissant",
    description: "Classe de A à Z pour retrouver rapidement.",
    Icon: ArrowUpWideNarrow,
  },
  {
    value: "name-desc",
    label: "Nom décroissant",
    description: "Classe de Z à A pour parcourir à rebours.",
    Icon: ArrowDownWideNarrow,
  },
  {
    value: "last-viewed",
    label: "Dernier consulté",
    description: "Les pages récentes restent toujours en tête.",
    Icon: Clock3,
  },
];

type DataFormat = "csv" | "markdown";

type CardTable = {
  id: string;
  title: string;
  columns: string[];
  rows: string[][];
};

const DEFAULT_BANNERS = [
  "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1524666041070-9d87656c25bb?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1523289333742-be1143f6b766?auto=format&fit=crop&w=1800&q=80",
];

function defaultBannerFor(index: number) {
  return DEFAULT_BANNERS[index % DEFAULT_BANNERS.length];
}

function defaultMarkdownFor(title: string) {
  return [
    `## Objectifs`,
    `- Définir les priorités de la rubrique **${title}**`,
    "- Lister les ressources essentielles (documents, liens, notes)",
    "- Mettre à jour les informations clés chaque semaine",
    "",
    "## Notes rapides",
    "- Ajoute ici tes idées principales.",
    "- Utilise les tableaux pour le suivi détaillé.",
  ].join("\n");
}

// Safelist (Tailwind JIT) – classes dynamiques utilisées
const _SAFE = (
  <div className="hidden \
  from-slate-950 via-slate-950 to-slate-900 \
  from-slate-900/60 via-slate-950/70 to-slate-950/90 \
  from-slate-900/70 via-slate-950/70 to-slate-950/80 \
  from-cyan-950 via-cyan-950/70 to-indigo-950 \
  from-slate-950/70 via-cyan-950/60 to-indigo-950/80 \
  from-slate-900/60 via-cyan-900/40 to-indigo-950/90 \
  from-fuchsia-950 via-fuchsia-950/70 to-purple-950 \
  from-slate-950/70 via-fuchsia-950/60 to-purple-950/80 \
  from-slate-900/60 via-fuchsia-900/40 to-purple-950/90 \
  from-emerald-950 via-emerald-950/70 to-teal-950 \
  from-slate-950/70 via-emerald-950/60 to-teal-950/80 \
  from-slate-900/60 via-emerald-900/40 to-teal-950/90 \
  from-amber-950 via-amber-950/70 to-rose-950 \
  from-slate-950/70 via-amber-950/60 to-rose-950/80 \
  from-slate-900/60 via-amber-900/40 to-rose-950/90 \
  from-sky-950 via-sky-950/70 to-blue-950 \
  from-slate-950/70 via-sky-950/60 to-blue-950/80 \
  from-slate-900/60 via-sky-900/40 to-blue-950/90 \
  from-gray-400/40 to-gray-300/30 ring-white/10 focus-visible:ring-white/20 \
  from-cyan-400/60 to-indigo-400/60 ring-cyan-400/30 focus-visible:ring-cyan-500/70 \
  from-fuchsia-400/60 to-pink-400/60 ring-fuchsia-400/30 focus-visible:ring-fuchsia-500/70 \
  from-emerald-400/60 to-teal-400/60 ring-emerald-400/30 focus-visible:ring-emerald-500/70 \
  from-amber-400/60 to-rose-400/60 ring-amber-400/30 focus-visible:ring-amber-500/70 \
  from-sky-400/60 to-blue-400/60 ring-sky-400/30 focus-visible:ring-sky-500/70" />
);

void _SAFE;

// -------------------------------------------------
// Icônes disponibles pour les cartes
// -------------------------------------------------
const ICONS = {
  wallet: Wallet,
  code: Code2,
  notes: NotebookText,
  calendar: CalendarIcon,
  tasks: CheckSquare,
} as const;

type IconName = keyof typeof ICONS;

// -------------------------------------------------
// Types
// -------------------------------------------------
interface CardData {
  id: string;
  key: string; // slug unique
  title: string;
  desc: string;
  iconName: IconName;
  createdAt: number;
  lastViewedAt?: number;
  favorite: boolean;
  bannerUrl?: string;
  markdown: string;
  tables: CardTable[];
}

type DragPreviewState = {
  id: string;
  title: string;
  desc: string;
  iconName: IconName;
  favorite: boolean;
  x: number;
  y: number;
};

interface TrashItem extends CardData {
  deletedAt: number; // timestamp ms
}

type StoredCard = Omit<CardData, "favorite"> & {
  favorite?: boolean;
  markdown?: string;
  tables?: CardTable[];
};

function cardToMarkdown(card: CardData): string {
  const header = [`# ${card.title}`, "", card.desc ? `> ${card.desc}` : ""].filter(Boolean).join("\n");
  const metadata = [
    "",
    "---",
    `- Créée le : ${new Date(card.createdAt).toLocaleDateString("fr-FR")}`,
    `- Dernière consultation : ${card.lastViewedAt ? new Date(card.lastViewedAt).toLocaleString("fr-FR") : "Jamais"}`,
    "---",
  ].join("\n");
  const tablesMarkdown = card.tables
    .map((table) => tableToMarkdown(table))
    .filter(Boolean)
    .join("\n\n");
  return [header, metadata, card.markdown, tablesMarkdown].filter(Boolean).join("\n\n");
}

function cardToCsv(card: CardData): string {
  if (card.tables.length > 0) {
    const table = card.tables[0];
    const rows = [table.columns, ...table.rows.map((row) => table.columns.map((_, idx) => row[idx] ?? ""))];
    return stringifyCsv(rows);
  }
  return stringifyCsv([
    ["Titre", "Description", "Favori"],
    [card.title, card.desc, card.favorite ? "Oui" : "Non"],
  ]);
}

function tableFromCsv(content: string, fallbackTitle: string): CardTable | null {
  const rows = parseCsv(content);
  if (!rows.length) return null;
  const [columns, ...dataRows] = rows;
  if (!columns.length) return null;
  return {
    id: `table-${now()}-${Math.random().toString(36).slice(2, 6)}`,
    title: fallbackTitle,
    columns,
    rows: dataRows.map((row) => columns.map((_, idx) => row[idx] ?? "")),
  };
}

type NavSection = "Accueil" | "Paramètres" | "Corbeille";

// -------------------------------------------------
// Utils
// -------------------------------------------------
type AccountProfile = {
  firstName: string;
  lastName: string;
  displayName: string;
  birthDate: string;
  location: string;
  email: string;
  language: string;
  timezone: string;
  avatarDataUrl: string | null;
  accentColor: string;
};

const STORAGE_CARDS = "dash.cards.v1";
const STORAGE_TRASH = "dash.trash.v1";
const STORAGE_THEME = "dash.theme.v1";
const STORAGE_ACCOUNT = "dash.account.v1";

const now = () => Date.now();
const DAY = 24 * 60 * 60 * 1000;

function createDefaultAccount(): AccountProfile {
  return {
    firstName: "Marouane",
    lastName: "",
    displayName: "Marouane",
    birthDate: "",
    location: "",
    email: "",
    language: "fr-FR",
    timezone: "Europe/Paris",
    avatarDataUrl: null,
    accentColor: "#7c3aed",
  };
}

function profileInitials(account: AccountProfile) {
  const base =
    account.displayName.trim() ||
    [account.firstName, account.lastName].filter(Boolean).join(" ").trim();
  if (!base) return "?";
  const parts = base.split(/\s+/).slice(0, 2);
  return parts
    .map((part) => part.charAt(0).toUpperCase())
    .join("")
    .padEnd(parts.length === 1 ? 1 : 0, "");
}

function profileDisplayName(account: AccountProfile) {
  const composed =
    account.displayName.trim() ||
    [account.firstName, account.lastName].filter(Boolean).join(" ").trim();
  return composed || "Invité";
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let current = "";
  let row: string[] = [];
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    if (inQuotes) {
      if (char === "\"") {
        if (text[i + 1] === "\"") {
          current += "\"";
          i += 1;
        } else {
          inQuotes = false;
        }
      } else {
        current += char;
      }
    } else if (char === "\"") {
      inQuotes = true;
    } else if (char === ",") {
      row.push(current);
      current = "";
    } else if (char === "\r") {
      continue;
    } else if (char === "\n") {
      row.push(current);
      rows.push(row);
      row = [];
      current = "";
    } else {
      current += char;
    }
  }

  if (current.length > 0 || row.length > 0) {
    row.push(current);
    rows.push(row);
  }

  return rows.filter((r) => r.some((cell) => cell.trim() !== ""));
}

function stringifyCsv(rows: string[][]): string {
  return rows
    .map((row) =>
      row
        .map((value) => {
          const safe = value ?? "";
          if (/[",\n]/.test(safe)) {
            return `"${safe.replace(/"/g, '""')}"`;
          }
          return safe;
        })
        .join(",")
    )
    .join("\n");
}

function tableToMarkdown(table: CardTable): string {
  if (!table.columns.length) return "";
  const header = `| ${table.columns.join(" | ")} |`;
  const separator = `| ${table.columns.map(() => "---").join(" | ")} |`;
  const body = table.rows
    .map((row) =>
      `| ${table.columns
        .map((_, idx) => (row[idx] ?? "").replace(/\|/g, "\\|"))
        .join(" | ")} |`
    )
    .join("\n");
  return [`### ${table.title}`, header, separator, body].filter(Boolean).join("\n");
}

function loadLocal<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function saveLocal<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

// -------------------------------------------------
// Horloge (Europe/Paris) – mise à jour en direct
// -------------------------------------------------
function Clock() {
  const [date, setDate] = useState<Date>(new Date());
  useEffect(() => {
    const id = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const formatted = new Intl.DateTimeFormat("fr-FR", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Europe/Paris",
  }).format(date);

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium tracking-wide text-gray-100">
      {formatted}
    </div>
  );
}

// -------------------------------------------------
// Composant principal
// -------------------------------------------------
export default function DashboardShell() {
  const [activeSection, setActiveSection] = useState<NavSection>("Accueil");
  const [openCardId, setOpenCardId] = useState<string | null>(null);
  const [themeKey, setThemeKey] = useState<ThemeKey>(() => loadLocal<ThemeKey>(STORAGE_THEME, "graphite"));
  const [account, setAccount] = useState<AccountProfile>(() => {
    const stored = loadLocal<Partial<AccountProfile> | null>(STORAGE_ACCOUNT, null);
    const defaults = createDefaultAccount();
    return stored ? { ...defaults, ...stored } : defaults;
  });
  const theme = THEMES[themeKey];
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const glowX = useSpring(pointerX, { stiffness: 220, damping: 26, mass: 0.5 });
  const glowY = useSpring(pointerY, { stiffness: 220, damping: 26, mass: 0.5 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    pointerX.set(centerX);
    pointerY.set(centerY);
    const handlePointerMove = (event: PointerEvent) => {
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
    };
    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [pointerX, pointerY]);

  const DEFAULT_CARD_SEED: StoredCard[] = [
    {
      id: "1",
      key: "finance",
      title: "Finance",
      desc: "Suivi des comptes, budgets, transactions.",
      iconName: "wallet",
      createdAt: now(),
      lastViewedAt: now(),
      favorite: true,
      bannerUrl: defaultBannerFor(0),
      markdown: [
        "## Synthèse",
        "- Surveille les flux de trésorerie et les budgets.",
        "- Analyse les tendances pour anticiper les dépenses.",
        "",
        "## Points clés",
        "- Prévoir un budget d'épargne.",
        "- Programmer les rappels de factures.",
      ].join("\n"),
      tables: [
        {
          id: "finance-revenus",
          title: "Revenus (mensuels)",
          columns: ["Source", "Date", "Montant"],
          rows: [
            ["Salaire", "05 septembre 2025", "2 100 €"],
            ["Freelance", "12 septembre 2025", "850 €"],
            ["Revente", "22 septembre 2025", "240 €"],
          ],
        },
        {
          id: "finance-depenses",
          title: "Dépenses (mensuelles)",
          columns: ["Catégorie", "Date", "Montant"],
          rows: [
            ["Loyer", "01 septembre 2025", "650 €"],
            ["Courses", "09 septembre 2025", "210 €"],
            ["Transports", "14 septembre 2025", "70 €"],
            ["Loisirs", "21 septembre 2025", "95 €"],
          ],
        },
      ],
    },
    {
      id: "2",
      key: "programme",
      title: "Programme",
      desc: "Planning, routines, scripts.",
      iconName: "code",
      createdAt: now(),
      lastViewedAt: now(),
      favorite: false,
      bannerUrl: defaultBannerFor(1),
      markdown: defaultMarkdownFor("Programme"),
      tables: [],
    },
    {
      id: "3",
      key: "recettes",
      title: "Recettes",
      desc: "Base de connaissances, procédures.",
      iconName: "notes",
      createdAt: now(),
      lastViewedAt: now(),
      favorite: false,
      bannerUrl: defaultBannerFor(2),
      markdown: defaultMarkdownFor("Recettes"),
      tables: [],
    },
    {
      id: "4",
      key: "calendrier",
      title: "Calendrier",
      desc: "Événements, rappels, disponibilité.",
      iconName: "calendar",
      createdAt: now(),
      lastViewedAt: now(),
      favorite: false,
      bannerUrl: defaultBannerFor(3),
      markdown: defaultMarkdownFor("Calendrier"),
      tables: [],
    },
    {
      id: "5",
      key: "taches",
      title: "Tâches",
      desc: "To‑do, priorités, échéances.",
      iconName: "tasks",
      createdAt: now(),
      lastViewedAt: now(),
      favorite: false,
      bannerUrl: defaultBannerFor(0),
      markdown: defaultMarkdownFor("Tâches"),
      tables: [],
    },
  ];

  const [cards, setCards] = useState<CardData[]>(() => {
    const raw = loadLocal<StoredCard[]>(STORAGE_CARDS, DEFAULT_CARD_SEED);
    return raw.map((card, index) => ({
      ...card,
      favorite: card.favorite ?? false,
      bannerUrl: card.bannerUrl ?? defaultBannerFor(index),
      markdown: card.markdown ?? defaultMarkdownFor(card.title),
      tables: card.tables ?? [],
    }));
  });

  const [trash, setTrash] = useState<TrashItem[]>(() => loadLocal<TrashItem[]>(STORAGE_TRASH, []));

  // Toolbar state
  const [query, setQuery] = useState<string>("");
  const [sortMode, setSortMode] = useState<SortMode>("manual");

  // Drag & Drop state
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);
  const [dragPreview, setDragPreview] = useState<DragPreviewState | null>(null);

  // Persist
  useEffect(() => saveLocal(STORAGE_CARDS, cards), [cards]);
  useEffect(() => saveLocal(STORAGE_TRASH, trash), [trash]);
  useEffect(() => saveLocal(STORAGE_THEME, themeKey), [themeKey]);
  useEffect(() => saveLocal(STORAGE_ACCOUNT, account), [account]);
  useEffect(() => {
    const accent = THEME_ACCENT_HEX[themeKey];
    if (!accent) return;
    setAccount((prev) => (prev.accentColor === accent ? prev : { ...prev, accentColor: accent }));
  }, [themeKey]);
  useEffect(() => {
    if (!dragPreview) return;
    const handleDragOver = (event: DragEvent) => {
      setDragPreview((prev) =>
        prev ? { ...prev, x: event.clientX, y: event.clientY } : prev
      );
    };
    const handleDragEnd = () => setDragPreview(null);
    window.addEventListener("dragover", handleDragOver);
    window.addEventListener("dragend", handleDragEnd);
    return () => {
      window.removeEventListener("dragover", handleDragOver);
      window.removeEventListener("dragend", handleDragEnd);
    };
  }, [dragPreview]);
  useEffect(() => {
    if (!draggingId) setDragPreview(null);
  }, [draggingId]);

  // Auto‑purge trash > 30 jours
  useEffect(() => {
    const purged = trash.filter((t) => now() - t.deletedAt <= 30 * DAY);
    if (purged.length !== trash.length) setTrash(purged);
  }, []);

  // Derived list (search + sort)
  const visibleCards = useMemo(() => {
    const q = query.trim().toLowerCase();
    let arr = cards.filter((c) =>
      !q || c.title.toLowerCase().includes(q) || (c.desc || "").toLowerCase().includes(q)
    );
    if (sortMode === "name-asc") arr = [...arr].sort((a, b) => a.title.localeCompare(b.title));
    if (sortMode === "name-desc") arr = [...arr].sort((a, b) => b.title.localeCompare(a.title));
    if (sortMode === "last-viewed") arr = [...arr].sort((a, b) => (b.lastViewedAt || 0) - (a.lastViewedAt || 0));
    return arr;
  }, [cards, query, sortMode]);

  const favorites = useMemo(() => cards.filter((c) => c.favorite), [cards]);
  const activeCard = useMemo(() => cards.find((c) => c.id === openCardId) ?? null, [cards, openCardId]);

  // Actions cartes
  function addCard(data: { title: string; desc: string; iconName: IconName }) {
    setCards((prev) => {
      const key = uniqueKey(slugify(data.title), prev);
      const id = `${now()}-${Math.random().toString(36).slice(2, 7)}`;
      return [
        ...prev,
        {
          id,
          key,
          title: data.title,
          desc: data.desc,
          iconName: data.iconName,
          createdAt: now(),
          lastViewedAt: now(),
          favorite: false,
          bannerUrl: defaultBannerFor(prev.length),
          markdown: defaultMarkdownFor(data.title),
          tables: [],
        },
      ];
    });
  }
  function uniqueKey(base: string, existing: CardData[]) {
    let k = base || `carte-${existing.length + 1}`;
    const exists = new Set(existing.map((c) => c.key));
    let i = 1;
    while (exists.has(k)) k = `${base}-${i++}`;
    return k;
  }
  function deleteCard(id: string) {
    setCards((prev) => {
      const found = prev.find((c) => c.id === id);
      if (!found) return prev;
      setTrash((t) => [{ ...found, deletedAt: now() }, ...t]);
      return prev.filter((c) => c.id !== id);
    });
  }
  function restoreCard(id: string) {
    setTrash((prev) => {
      const found = prev.find((t) => t.id === id);
      if (!found) return prev;
      const { deletedAt, ...rest } = found;
      setCards((c) => [...c, rest]);
      return prev.filter((t) => t.id !== id);
    });
  }
  function hardDelete(id: string) {
    setTrash((prev) => prev.filter((t) => t.id !== id));
  }

  function handleOpen(id: string) {
    setActiveSection("Accueil");
    setOpenCardId(id);
    setCards((prev) => prev.map((c) => (c.id === id ? { ...c, lastViewedAt: now() } : c)));
  }

  function closeCard() {
    setOpenCardId(null);
  }

  function updateCard(
    id: string,
    updates: Partial<CardData> | ((card: CardData) => CardData)
  ) {
    setCards((prev) =>
      prev.map((card) => {
        if (card.id !== id) return card;
        return typeof updates === "function"
          ? (updates as (card: CardData) => CardData)(card)
          : { ...card, ...updates };
      })
    );
  }

  function moveCard(srcId: string, dstId: string) {
    setCards((prev) => {
      const srcIndex = prev.findIndex((c) => c.id === srcId);
      if (srcIndex < 0) return prev;
      if (dstId === DROPZONE_END) {
        const arr = prev.slice();
        const [moved] = arr.splice(srcIndex, 1);
        arr.push(moved);
        return arr;
      }
      const dstIndex = prev.findIndex((c) => c.id === dstId);
      if (dstIndex < 0 || dstIndex === srcIndex) return prev;
      const arr = prev.slice();
      const temp = arr[srcIndex];
      arr[srcIndex] = arr[dstIndex];
      arr[dstIndex] = temp;
      return arr;
    });
  }

  function moveCardToTop(id: string) {
    setCards((prev) => {
      const idx = prev.findIndex((c) => c.id === id);
      if (idx <= 0) return prev;
      const arr = prev.slice();
      const [card] = arr.splice(idx, 1);
      arr.unshift(card);
      return arr;
    });
  }

  function duplicateCard(id: string) {
    setCards((prev) => {
      const index = prev.findIndex((c) => c.id === id);
      if (index < 0) return prev;
      const original = prev[index];
      const baseKey = `${original.key}-copie`;
      const key = uniqueKey(baseKey, prev);
      const titleBase = original.title.endsWith("(copie)") ? original.title : `${original.title} (copie)`;
      const newCard: CardData = {
        ...original,
        id: `${now()}-${Math.random().toString(36).slice(2, 7)}`,
        key,
        title: titleBase,
        createdAt: now(),
        lastViewedAt: now(),
        favorite: false,
        tables: original.tables.map((table) => ({
          ...table,
          id: `${table.id}-copy-${Math.random().toString(36).slice(2, 6)}`,
          rows: table.rows.map((row) => [...row]),
          columns: [...table.columns],
        })),
      };
      const arr = prev.slice();
      arr.splice(index + 1, 0, newCard);
      return arr;
    });
  }

  function toggleFavorite(id: string) {
    setCards((prev) => prev.map((c) => (c.id === id ? { ...c, favorite: !c.favorite } : c)));
  }

  function exportCardData(card: CardData, format: DataFormat) {
    if (typeof window === "undefined") return;
    const payload = format === "markdown" ? cardToMarkdown(card) : cardToCsv(card);
    const blob = new Blob([payload], {
      type: format === "markdown" ? "text/markdown;charset=utf-8" : "text/csv;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${card.key}.${format === "markdown" ? "md" : "csv"}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function importCardData(
    cardId: string,
    format: DataFormat,
    file: { content: string; name?: string }
  ) {
    if (format === "markdown") {
      updateCard(cardId, { markdown: file.content });
      return;
    }
    const table = tableFromCsv(
      file.content,
      file.name?.replace(/\.[^.]+$/, "") || "Table importée"
    );
    if (!table) return;
    updateCard(cardId, (card) => {
      const appendedMarkdown = tableToMarkdown(table);
      const markdownBlocks = [card.markdown.trim(), appendedMarkdown].filter(Boolean);
      return {
        ...card,
        tables: [table, ...card.tables],
        markdown: markdownBlocks.join("\n\n"),
      };
    });
  }

  const handleCardDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    card: { id: string; title: string; desc: string; iconName: IconName; favorite: boolean }
  ) => {
    if (sortMode !== "manual") return;
    setDraggingId(card.id);
    setOverId(card.id);
    setDragPreview({
      id: card.id,
      title: card.title,
      desc: card.desc,
      iconName: card.iconName,
      favorite: card.favorite,
      x: event.clientX,
      y: event.clientY,
    });
  };

  // Sidebar navigation – "Compte" retiré du menu principal
  const nav: { label: NavSection; icon: React.ComponentType<{ className?: string }> }[] = [
    { label: "Accueil", icon: Home },
    { label: "Paramètres", icon: Settings },
    { label: "Corbeille", icon: Trash2 },
  ];

  const accountName = profileDisplayName(account);
  const accountSubtitle =
    account.location.trim() ||
    account.email.trim() ||
    account.timezone ||
    "Profil synchronisé";
  const avatarAccent = account.accentColor || "#7c3aed";

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#04070c] text-gray-100 antialiased">
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${theme.pageFrom} ${theme.pageVia} ${theme.pageTo} opacity-60`}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.12),transparent_55%)]"
        aria-hidden
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[5] h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl transition-opacity duration-500 md:h-52 md:w-52"
        style={{
          translateX: glowX,
          translateY: glowY,
          background: `radial-gradient(circle at center, ${POINTER_GLOW_COLORS[themeKey]} 0%, rgba(4, 7, 12, 0) 70%)`,
          opacity: draggingId ? 0.85 : 0.6,
        }}
      />
      {dragPreview && (
        <div
          className="pointer-events-none fixed left-0 top-0 z-50 w-64 max-w-[min(18rem,45vw)] -translate-x-1/2 -translate-y-1/2"
          style={{ transform: `translate3d(${dragPreview.x}px, ${dragPreview.y}px, 0)` }}
        >
          <DragPreviewCard data={dragPreview} theme={theme} />
        </div>
      )}
      <aside className="hidden md:flex fixed inset-y-0 left-0 z-20 w-72 flex-col overflow-y-auto border-r border-white/10 bg-[#0b1018]/95 px-6 py-8 shadow-[0_40px_120px_-60px_rgba(0,0,0,0.85)] backdrop-blur">
        <div className="mb-8 flex items-center gap-3">
          <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${theme.logoGradient} ring-1 ring-white/10`} />
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">Mon espace</div>
            <div className="text-lg font-semibold tracking-tight text-gray-100">Tableau de bord</div>
          </div>
        </div>
        <nav className="space-y-1">
          {nav.map(({ label, icon: Icon }) => {
            const selected = activeSection === label;
            return (
              <button
                key={label}
                onClick={() => {
                  setActiveSection(label);
                  setOpenCardId(null);
                }}
                className={[
                  "group flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition",
                  selected ? "bg-white/10 ring-1 ring-white/10" : "hover:bg-white/5",
                ].join(" ")}
              >
                <Icon className="h-5 w-5 opacity-80" />
                <span className="flex-1 font-medium">{label}</span>
              </button>
            );
          })}
        </nav>

        <div className="my-6 h-px bg-gradient-to-r from-white/5 via-white/10 to-white/5" />

        <div className="flex-1">
          <div className="flex h-full flex-col gap-3">
            <div className="px-1 text-xs font-semibold uppercase tracking-wide text-gray-400/80">Cartes</div>
            <div className="flex-1 overflow-y-auto pr-1">
              <CardQuickAccessList
                cards={cards}
                onSelect={(card) => handleOpen(card.id)}
                emptyLabel="Aucune carte pour le moment."
              />
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-white/5 p-3 text-xs text-gray-400">
          <div className="mb-2 flex items-center justify-between">
            <div className="font-semibold text-gray-300">Compte</div>
            <button
              onClick={() => {
                setActiveSection("Paramètres");
                setOpenCardId(null);
              }}
              className="rounded-full bg-white/5 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-gray-200 transition hover:bg-white/10"
            >
              Gérer
            </button>
          </div>
          <div className="flex items-center gap-3">
            <AccountAvatar account={account} size={36} withGlow className="shrink-0" />
            <div className="leading-tight text-left">
              <div className="font-medium text-gray-200">{accountName}</div>
              <div className="text-[11px] text-gray-400/80">{accountSubtitle}</div>
            </div>
          </div>
        </div>
      </aside>

      <div className="relative w-full px-4 py-6 md:ml-[18rem] md:px-10">
        <main className="mx-auto w-full max-w-6xl xl:max-w-7xl 2xl:max-w-[1200px]">
          {/* Topbar (mobile) */}
          <div className="mb-4 flex items-center justify-between md:hidden">
            <div className="text-base font-semibold">{activeCard ? activeCard.title : activeSection}</div>
            <Clock />
          </div>

          {/* Header */}
          <header className="mb-4 flex items-end justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">
                {activeCard ? activeCard.title : activeSection}
              </h1>
              <p className="mt-1 text-sm text-gray-200/70">
                {activeCard
                  ? activeCard.desc || "Aucune description pour le moment."
                  : activeSection === "Accueil"
                  ? "Interface de départ — clique une carte pour ouvrir une rubrique."
                  : activeSection === "Paramètres"
                  ? "Réglages par sections (Préférences > Apparence pour changer le thème)."
                  : activeSection === "Corbeille"
                  ? "Éléments supprimés (conservés 30 jours)."
                  : ""}
              </p>
            </div>

            {/* Actions à droite */}
            <div className="flex items-center gap-3">
              {activeCard ? (
                <>
                  <CardActionMenu
                    card={activeCard}
                    onDuplicate={() => duplicateCard(activeCard.id)}
                    onMoveToTop={() => moveCardToTop(activeCard.id)}
                    onToggleFavorite={() => toggleFavorite(activeCard.id)}
                    onExport={(format) => exportCardData(activeCard, format)}
                    onImport={(format, file) => importCardData(activeCard.id, format, file)}
                  />
                  <button
                    onClick={closeCard}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-200 transition hover:bg-white/10"
                    title="Fermer la carte"
                    aria-label="Fermer la carte"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </>
              ) : (
                <>
                  <Clock />
                  {activeSection === "Accueil" && (
                    <AddCardButton onAdded={addCard} focusRing={theme.focusRing} />
                  )}
                </>
              )}
            </div>
          </header>

          {/* Toolbar: Search + Sort */}
          {activeSection === "Accueil" && !activeCard && (
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <div className="relative">
                <SearchIcon className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Rechercher une carte (titre/description)"
                  className="w-72 rounded-xl border border-white/10 bg-white/5 pl-8 pr-7 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md bg-white/10 px-1.5 text-xs text-gray-300 hover:bg-white/15"
                    aria-label="Effacer la recherche"
                  >
                    ×
                  </button>
                )}
              </div>

              <SortModeMenu value={sortMode} onChange={setSortMode} theme={theme} />

              {sortMode !== "manual" && (
                <span className="text-[11px] text-gray-400">(le glisser‑déposer est désactivé en tri automatique)</span>
              )}
            </div>
          )}

          {/* Content */}
          {activeCard ? (
            <CardDetailView
              card={activeCard}
              theme={theme}
              profileAccent={avatarAccent}
              onToggleFavorite={() => toggleFavorite(activeCard.id)}
              onUpdateCard={(updates) => updateCard(activeCard.id, updates)}
            />
          ) : activeSection === "Paramètres" ? (
            <SettingsRoot
              themeKey={themeKey}
              setThemeKey={setThemeKey}
              theme={theme}
              account={account}
              setAccount={setAccount}
            />
          ) : activeSection === "Corbeille" ? (
            <TrashView items={trash} onRestore={restoreCard} onHardDelete={hardDelete} theme={theme} />
          ) : (
            <div className="space-y-8">
              <section>
                <div className="flex items-center justify-between">
                  <div className="px-1 text-xs font-semibold uppercase tracking-wide text-gray-400/80">Favoris</div>
                  <div className="text-[11px] text-gray-500">{favorites.length} sélection(s)</div>
                </div>
                <div className="mt-2">
                  <CardQuickAccessList
                    cards={favorites}
                    onSelect={(card) => handleOpen(card.id)}
                    emptyLabel="Aucun favori pour le moment."
                    showFavorite
                  />
                </div>
              </section>

              <section>
                <div className="mb-3 flex items-center justify-between">
                  <div className="px-1 text-xs font-semibold uppercase tracking-wide text-gray-400/80">
                    Toutes les cartes
                  </div>
                  <div className="text-[11px] text-gray-500">{visibleCards.length} carte(s)</div>
                </div>
                <div
                  className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  onDragOver={(event) => {
                    if (sortMode !== "manual" || !draggingId) return;
                    const target = event.target as HTMLElement;
                    const targetCard = target.closest<HTMLElement>("[data-card-id]");
                    const placeholder = target.closest<HTMLElement>("[data-drop-target]");
                    if (targetCard) {
                      event.preventDefault();
                      const cardId = targetCard.getAttribute("data-card-id");
                      if (cardId && overId !== cardId) {
                        setOverId(cardId);
                      }
                      return;
                    }
                    if (placeholder) {
                      event.preventDefault();
                      const dropId = placeholder.getAttribute("data-drop-target");
                      if (dropId && overId !== dropId) {
                        setOverId(dropId);
                      }
                      return;
                    }
                    event.preventDefault();
                    if (overId !== DROPZONE_END) {
                      setOverId(DROPZONE_END);
                    }
                  }}
                  onDrop={(event) => {
                    if (sortMode !== "manual" || !draggingId) return;
                    if (overId === DROPZONE_END) {
                      event.preventDefault();
                      moveCard(draggingId, DROPZONE_END);
                    }
                    setDraggingId(null);
                    setOverId(null);
                    setDragPreview(null);
                  }}
                >
                  {visibleCards.map(({ id, title, desc, iconName, favorite }) => {
                    const showPlaceholder =
                      sortMode === "manual" && !!draggingId && draggingId !== id && overId === id;
                    return (
                      <React.Fragment key={id}>
                        {showPlaceholder && (
                          <DropPlaceholder
                            theme={theme}
                            targetId={id}
                            onHover={() => {
                              if (overId !== id) {
                                setOverId(id);
                              }
                            }}
                            onDrop={() => {
                              if (draggingId) {
                                moveCard(draggingId, id);
                              }
                              setDraggingId(null);
                              setOverId(null);
                            }}
                          />
                        )}
                        <Card
                          id={id}
                          title={title}
                          desc={desc}
                          favorite={favorite}
                          Icon={ICONS[iconName]}
                          theme={theme}
                          onDelete={() => deleteCard(id)}
                          onClick={() => handleOpen(id)}
                          draggableEnabled={sortMode === "manual"}
                          dragging={draggingId === id}
                          dragOver={overId === id}
                          onDragStart={(event) =>
                            handleCardDragStart(event, {
                              id,
                              title,
                              desc,
                              iconName,
                              favorite,
                            })
                          }
                          onDragEnter={() => {
                            if (sortMode !== "manual" || draggingId === id) return;
                            setOverId(id);
                          }}
                          onDragOver={(e) => {
                            if (sortMode !== "manual") return;
                            e.preventDefault();
                            if (overId !== id) setOverId(id);
                          }}
                          onDrop={() => {
                            if (sortMode !== "manual") return;
                            if (draggingId && draggingId !== id) moveCard(draggingId, id);
                            setDraggingId(null);
                            setOverId(null);
                            setDragPreview(null);
                          }}
                          onDragEnd={() => {
                            setDraggingId(null);
                            setOverId(null);
                            setDragPreview(null);
                          }}
                        />
                      </React.Fragment>
                    );
                  })}
                  {sortMode === "manual" && draggingId && overId === DROPZONE_END && (
                    <DropPlaceholder
                      theme={theme}
                      targetId={DROPZONE_END}
                      onHover={() => {
                        if (overId !== DROPZONE_END) {
                          setOverId(DROPZONE_END);
                        }
                      }}
                      onDrop={() => {
                        moveCard(draggingId, DROPZONE_END);
                        setDraggingId(null);
                        setOverId(null);
                        setDragPreview(null);
                      }}
                    />
                  )}
                  {visibleCards.length === 0 && (
                    <div className="col-span-full rounded-2xl border border-white/5 p-6 text-sm text-gray-300/80">
                      Aucune carte ne correspond à la recherche.
                    </div>
                  )}
                </div>
              </section>
            </div>
          )}
          {/* Footer compte (mobile) */}
          <MobileAccountFooter
            account={account}
            onEdit={() => {
              setActiveSection("Paramètres");
              setOpenCardId(null);
            }}
          />
        </main>
      </div>
    </div>
  );
}

// -------------------------------------------------
// Menu de tri custom
// -------------------------------------------------
function SortModeMenu({
  value,
  onChange,
  theme,
}: {
  value: SortMode;
  onChange: (value: SortMode) => void;
  theme: (typeof THEMES)[ThemeKey];
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const activeOption = SORT_OPTIONS.find((option) => option.value === value) ?? SORT_OPTIONS[0];

  useEffect(() => {
    if (!open) return;
    function handleClick(event: MouseEvent) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-left text-sm text-gray-100 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-gradient-to-br ${theme.accentFrom} ${theme.accentTo} text-white shadow-inner`}
        >
          <SlidersHorizontal className="h-4 w-4" />
        </span>
        <div className="flex min-w-[140px] flex-col">
          <span className="text-[10px] uppercase tracking-wide text-gray-400">Mode de tri</span>
          <span className="font-medium text-gray-100">{activeOption.label}</span>
        </div>
        <ChevronRight className={`ml-auto h-4 w-4 text-gray-400 transition-transform ${open ? "rotate-90" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 z-20 mt-2 w-[320px] rounded-2xl border border-white/10 bg-slate-950/95 p-3 text-sm text-gray-100 shadow-[0_40px_90px_rgba(3,7,18,0.7)] backdrop-blur">
          <div className="mb-3 px-1 text-[11px] font-semibold uppercase tracking-wide text-gray-400">Choisir un tri</div>
          <div className="space-y-1">
            {SORT_OPTIONS.map((option) => {
              const isActive = option.value === value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition ${
                    isActive ? "bg-white/10 text-white shadow-inner" : "text-gray-200 hover:bg-white/5"
                  }`}
                  role="menuitemradio"
                  aria-checked={isActive}
                >
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-xl border ${
                      isActive
                        ? `border-white/30 bg-gradient-to-br ${theme.accentFrom} ${theme.accentTo}`
                        : "border-white/10 bg-white/5"
                    }`}
                  >
                    <option.Icon className="h-4 w-4" />
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <span>{option.label}</span>
                      {option.badge && (
                        <span className="rounded-full bg-white/10 px-2 text-[10px] uppercase tracking-wide text-gray-200/80">
                          {option.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[12px] text-gray-400">{option.description}</p>
                  </div>
                  {isActive && <Check className="h-4 w-4 text-white" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------
// Bouton + formulaire d'ajout de carte
// -------------------------------------------------
function AddCardButton({ onAdded, focusRing }: { onAdded: (d: { title: string; desc: string; iconName: IconName }) => void; focusRing: string }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [iconName, setIconName] = useState<IconName>("tasks");

  function submit() {
    if (!title.trim()) return;
    onAdded({ title: title.trim(), desc: desc.trim(), iconName });
    setTitle("");
    setDesc("");
    setIconName("tasks");
    setOpen(false);
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm transition hover:bg-white/10 ${focusRing}`}
      >
        <Plus className="h-4 w-4" /> Ajouter une carte
      </button>

      {open && (
        <div className="absolute right-0 z-10 mt-2 w-[320px] rounded-2xl border border-white/10 bg-slate-950/95 p-4 shadow-2xl backdrop-blur">
          <div className="mb-2 text-sm font-medium text-gray-200">Nouvelle carte</div>
          <label className="mb-2 block text-xs text-gray-400">Titre</label>
          <input
            className="mb-3 w-full rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-white/20"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex. Projets"
          />
          <label className="mb-2 block text-xs text-gray-400">Description</label>
          <textarea
            className="mb-3 w-full rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-white/20"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Résumé de la rubrique"
            rows={2}
          />
          <label className="mb-2 block text-xs text-gray-400">Icône</label>
          <select
            className="mb-4 w-full rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-white/20"
            value={iconName}
            onChange={(e) => setIconName(e.target.value as IconName)}
          >
            <option value="wallet">Wallet (Finance)</option>
            <option value="code">Code (Programme)</option>
            <option value="notes">Notes (Recettes/Docs)</option>
            <option value="calendar">Calendrier</option>
            <option value="tasks">Tâches</option>
          </select>

          <div className="flex items-center justify-end gap-2">
            <button onClick={() => setOpen(false)} className="rounded-lg px-2 py-1 text-xs text-gray-300 hover:bg-white/5">Annuler</button>
            <button onClick={submit} className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-medium text-gray-100 hover:bg-white/15">Ajouter</button>
          </div>
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------
// Liste d'accès rapide (utilisée dans la sidebar et les favoris)
// -------------------------------------------------
function CardQuickAccessList({
  cards,
  onSelect,
  emptyLabel,
  showFavorite,
}: {
  cards: CardData[];
  onSelect: (card: CardData) => void;
  emptyLabel?: string;
  showFavorite?: boolean;
}) {
  return (
    <div className="space-y-1">
      {cards.map((card) => {
        const Icon = ICONS[card.iconName];
        return (
          <button
            key={card.id}
            onClick={() => onSelect(card)}
            className="group flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-gray-200/80 transition hover:bg-white/5 hover:text-gray-100"
          >
            <span className="rounded-lg bg-white/5 p-1.5 ring-1 ring-white/10 transition group-hover:bg-white/10">
              <Icon className="h-4 w-4" />
            </span>
            <span className="flex-1 truncate">{card.title}</span>
            {showFavorite && card.favorite && (
              <Star className="h-4 w-4 text-amber-300" fill="currentColor" />
            )}
            <ChevronRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-60" />
          </button>
        );
      })}
      {cards.length === 0 && emptyLabel && (
        <div className="rounded-lg border border-dashed border-white/10 px-3 py-2 text-[11px] text-gray-400/80">
          {emptyLabel}
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------
// Actions de carte (menu ...)
// -------------------------------------------------
function CardActionMenu({
  card,
  onDuplicate,
  onMoveToTop,
  onToggleFavorite,
  onExport,
  onImport,
}: {
  card: CardData;
  onDuplicate: () => void;
  onMoveToTop: () => void;
  onToggleFavorite: () => void;
  onExport: (format: DataFormat) => void;
  onImport: (format: DataFormat, file: { content: string; name?: string }) => void;
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const csvInputRef = useRef<HTMLInputElement | null>(null);
  const markdownInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!open) return;
    function handleClick(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  function handle(action: () => void) {
    action();
    setOpen(false);
  }

  function triggerImport(format: DataFormat) {
    setOpen(false);
    if (format === "csv") {
      csvInputRef.current?.click();
    } else {
      markdownInputRef.current?.click();
    }
  }

  function onFileSelected(format: DataFormat, event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const content = typeof reader.result === "string" ? reader.result : "";
      if (content) {
        onImport(format, { content, name: file.name });
      }
      event.target.value = "";
    };
    reader.readAsText(file, "utf-8");
  }

  return (
    <div className="relative" ref={menuRef}>
      <input
        ref={csvInputRef}
        type="file"
        accept=".csv,text/csv"
        className="hidden"
        onChange={(event) => onFileSelected("csv", event)}
      />
      <input
        ref={markdownInputRef}
        type="file"
        accept=".md,text/markdown,.markdown"
        className="hidden"
        onChange={(event) => onFileSelected("markdown", event)}
      />
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-200 transition hover:bg-white/10"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Options de la carte"
      >
        <MoreVertical className="h-4 w-4" />
      </button>
      {open && (
        <div className="absolute right-0 top-full z-20 mt-2 w-48 rounded-2xl border border-white/10 bg-slate-950/95 p-2 text-sm shadow-2xl backdrop-blur">
          <button
            onClick={() => handle(onDuplicate)}
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-xs text-gray-200 transition hover:bg-white/5"
          >
            <Copy className="h-4 w-4" /> Dupliquer
          </button>
          <button
            onClick={() => handle(onMoveToTop)}
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-xs text-gray-200 transition hover:bg-white/5"
          >
            <ArrowUp className="h-4 w-4" /> Déplacer en premier
          </button>
          <button
            onClick={() => handle(onToggleFavorite)}
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-xs text-gray-200 transition hover:bg-white/5"
          >
            {card.favorite ? (
              <StarOff className="h-4 w-4" />
            ) : (
              <Star className="h-4 w-4" />
            )}
            {card.favorite ? "Retirer des favoris" : "Ajouter aux favoris"}
          </button>
          <div className="my-1 h-px bg-white/5" />
          <button
            onClick={() => handle(() => onExport("markdown"))}
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-xs text-gray-200 transition hover:bg-white/5"
          >
            <Download className="h-4 w-4" /> Exporter en Markdown
          </button>
          <button
            onClick={() => handle(() => onExport("csv"))}
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-xs text-gray-200 transition hover:bg-white/5"
          >
            <Download className="h-4 w-4" /> Exporter en CSV
          </button>
          <button
            onClick={() => triggerImport("markdown")}
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-xs text-gray-200 transition hover:bg-white/5"
          >
            <Upload className="h-4 w-4" /> Importer un Markdown
          </button>
          <button
            onClick={() => triggerImport("csv")}
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-xs text-gray-200 transition hover:bg-white/5"
          >
            <Upload className="h-4 w-4" /> Importer un CSV
          </button>
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------
// Avatar réutilisable
// -------------------------------------------------
function AccountAvatar({
  account,
  size = 48,
  className = "",
  withGlow = false,
}: {
  account: AccountProfile;
  size?: number;
  className?: string;
  withGlow?: boolean;
}) {
  const dimension = `${size}px`;
  const baseClass = "flex items-center justify-center overflow-hidden rounded-full font-semibold text-xs uppercase";
  const accent = account.accentColor || "#7c3aed";
  const glowClass = withGlow ? "ring-2 ring-white/20" : "";

  if (account.avatarDataUrl) {
    return (
      <img
        src={account.avatarDataUrl}
        alt={account.displayName || `${account.firstName} ${account.lastName}` || "Avatar"}
        style={{ width: dimension, height: dimension }}
        className={[baseClass, glowClass, "bg-black/40 object-cover", className].join(" ")}
      />
    );
  }

  return (
    <div
      style={{
        width: dimension,
        height: dimension,
        background: `radial-gradient(circle at 30% 30%, ${accent}, rgba(4, 7, 12, 0.85))`,
      }}
      className={[baseClass, glowClass, "text-white shadow-inner", className].join(" ")}
    >
      {profileInitials(account)}
    </div>
  );
}

// -------------------------------------------------
// Paramètres : navigation par sections (comme un téléphone)
// -------------------------------------------------
function SettingsRoot({
  themeKey,
  setThemeKey,
  theme,
  account,
  setAccount,
}: {
  themeKey: ThemeKey;
  setThemeKey: (k: ThemeKey) => void;
  theme: (typeof THEMES)[ThemeKey];
  account: AccountProfile;
  setAccount: React.Dispatch<React.SetStateAction<AccountProfile>>;
}) {
  const [section, setSection] = useState<"Général" | "Préférences" | "Notifications" | "Compte">("Préférences");
  const [prefScreen, setPrefScreen] = useState<null | "Apparence">("Apparence");

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-10">
      {/* Sections list */}
      <div className={`lg:col-span-3 rounded-2xl border border-white/10 bg-gradient-to-br ${theme.cardFrom} ${theme.cardVia} ${theme.cardTo}`}>
        <div className="p-3 text-xs font-medium uppercase tracking-wider text-gray-400">Sections</div>
        <nav className="px-2 pb-2">
          {([
            { label: "Général", icon: SlidersHorizontal },
            { label: "Préférences", icon: Settings },
            { label: "Notifications", icon: Bell },
            { label: "Compte", icon: User },
          ] as const).map(({ label, icon: Icon }) => {
            const selected = section === label;
            return (
              <button
                key={label}
                onClick={() => {
                  setSection(label);
                  setPrefScreen(label === "Préférences" ? "Apparence" : null);
                }}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition ${selected ? "bg-white/10" : "hover:bg-white/5"}`}
              >
                <span className="inline-flex items-center gap-3"><Icon className="h-4 w-4" /> {label}</span>
                <ChevronRight className="h-4 w-4 opacity-60" />
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content panel */}
      <div className="lg:col-span-7">
        {section === "Préférences" && !prefScreen && (
          <div className={`rounded-2xl border border-white/10 bg-gradient-to-br ${theme.cardFrom} ${theme.cardVia} ${theme.cardTo} p-4`}>
            <div className="text-sm font-medium text-gray-200">Préférences</div>
            <div className="mt-3 divide-y divide-white/5">
              <button onClick={() => setPrefScreen("Apparence")} className="flex w-full items-center justify-between py-3 text-left text-sm hover:opacity-90">
                <span className="inline-flex items-center gap-3"><Palette className="h-4 w-4" /> Apparence</span>
                <ChevronRight className="h-4 w-4 opacity-60" />
              </button>
            </div>
          </div>
        )}

        {section === "Préférences" && prefScreen === "Apparence" && (
          <AppearanceView themeKey={themeKey} setThemeKey={setThemeKey} theme={theme} />
        )}

        {section === "Général" && (
          <div className={`rounded-2xl border border-white/10 bg-gradient-to-br ${theme.cardFrom} ${theme.cardVia} ${theme.cardTo} p-4 text-sm text-gray-300/90`}>
            Réglages généraux (bientôt).
          </div>
        )}

        {section === "Notifications" && (
          <div className={`rounded-2xl border border-white/10 bg-gradient-to-br ${theme.cardFrom} ${theme.cardVia} ${theme.cardTo} p-4 text-sm text-gray-300/90`}>
            Notifications (bientôt).
          </div>
        )}

        {section === "Compte" && (
          <AccountSettingsPanel account={account} setAccount={setAccount} theme={theme} />
        )}
      </div>
    </div>
  );
}

function AccountSettingsPanel({
  account,
  setAccount,
  theme,
}: {
  account: AccountProfile;
  setAccount: React.Dispatch<React.SetStateAction<AccountProfile>>;
  theme: (typeof THEMES)[ThemeKey];
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const tenorAbortRef = useRef<AbortController | null>(null);
  const tenorScrollRef = useRef<HTMLDivElement | null>(null);
  const [avatarEditorOpen, setAvatarEditorOpen] = useState(false);
  const [avatarSource, setAvatarSource] = useState<"photo" | "gif" | "tenor">("photo");
  const [avatarError, setAvatarError] = useState<string | null>(null);
  const [tenorQuery, setTenorQuery] = useState("");
  const [tenorActiveQuery, setTenorActiveQuery] = useState<string | undefined>(undefined);
  const [tenorLoadingState, setTenorLoadingState] = useState<"idle" | "initial" | "append">("idle");
  const [tenorError, setTenorError] = useState<string | null>(null);
  const [tenorResults, setTenorResults] = useState<TenorGif[]>([]);
  const [tenorNext, setTenorNext] = useState<string | null>(null);
  const [tenorHasMore, setTenorHasMore] = useState(false);
  const [tenorFeedMode, setTenorFeedMode] = useState<"remote" | "fallback">("remote");

  useEffect(
    () => () => {
      tenorAbortRef.current?.abort();
      tenorAbortRef.current = null;
    },
    []
  );

  useEffect(() => {
    if (!avatarEditorOpen) {
      setAvatarSource("photo");
      setAvatarError(null);
    }
  }, [avatarEditorOpen]);

  const updateAccount = (updates: Partial<AccountProfile>) =>
    setAccount((prev) => ({ ...prev, ...updates }));

  const PAGE_SIZE = 18;

  const mergeResults = useCallback((prev: TenorGif[], incoming: TenorGif[]) => {
    if (!incoming.length) return prev;
    const existing = new Set(prev.map((gif) => gif.id));
    const appended = incoming.filter((gif) => !existing.has(gif.id));
    return appended.length ? [...prev, ...appended] : prev;
  }, []);

  const applyFallbackResults = useCallback(
    (query: string | undefined, append: boolean, reason: "empty" | "error") => {
      const fallbackPool = getFallbackTenorResults(query, 0, Number.MAX_SAFE_INTEGER);
      setTenorFeedMode("fallback");
      setTenorResults((prev) => {
        const start = append ? prev.length : 0;
        const slice = fallbackPool.slice(start, start + PAGE_SIZE);
        setTenorHasMore(start + slice.length < fallbackPool.length);
        setTenorNext(null);
        if (append) {
          return mergeResults(prev, slice);
        }
        return slice;
      });

      if (fallbackPool.length) {
        if (query) {
          setTenorError(
            reason === "empty"
              ? "Aucun résultat officiel. Voici quelques suggestions hors-ligne."
              : "Impossible de joindre Tenor. Résultats hors-ligne proposés pour ta recherche."
          );
        } else {
          setTenorError(
            reason === "empty"
              ? "Galerie Tenor momentanément indisponible. Sélection hors-ligne affichée."
              : "Impossible de joindre Tenor. Voici une sélection hors-ligne."
          );
        }
      } else {
        setTenorError(
          reason === "empty"
            ? query
              ? "Aucun résultat pour cette recherche."
              : "Aucun GIF disponible pour le moment."
            : "Impossible de charger la galerie Tenor."
        );
      }
    },
    [PAGE_SIZE, mergeResults]
  );

  const resetFileInput = (target: HTMLInputElement | null) => {
    if (target) target.value = "";
  };

  const closeAvatarEditor = () => {
    setAvatarEditorOpen(false);
    setAvatarSource("photo");
    tenorAbortRef.current?.abort();
    tenorAbortRef.current = null;
    setTenorLoadingState("idle");
  };

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    const file = input.files?.[0];
    if (!file) return;
    const lowerName = file.name.toLowerCase();
    const isGif = file.type === "image/gif" || lowerName.endsWith(".gif");
    const isImage = file.type.startsWith("image/");

    if (avatarSource === "gif" && !isGif) {
      setAvatarError("Sélectionne un fichier GIF animé.");
      resetFileInput(input);
      return;
    }

    if (avatarSource === "photo" && isGif) {
      setAvatarError("Ce mode attend une photo (PNG, JPG, WEBP).");
      resetFileInput(input);
      return;
    }

    if (!isImage) {
      setAvatarError("Format non pris en charge. Choisis une image ou un GIF.");
      resetFileInput(input);
      return;
    }

    setAvatarError(null);
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      if (result) {
        updateAccount({ avatarDataUrl: result });
        closeAvatarEditor();
      }
      resetFileInput(input);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveAvatar = () => {
    updateAccount({ avatarDataUrl: null });
    setAvatarError(null);
  };

  const fetchTenor = useCallback(
    async ({
      search,
      append = false,
      next,
    }: {
      search?: string;
      append?: boolean;
      next?: string | null;
    } = {}) => {
      const normalizedSearch = typeof search === "string" ? search.trim() : undefined;
      const baseQuery = append ? tenorActiveQuery : normalizedSearch;
      const resolvedQuery = baseQuery && baseQuery.length > 0 ? baseQuery : undefined;

      if (!append) {
        tenorAbortRef.current?.abort();
        setTenorFeedMode("remote");
        setTenorResults([]);
        setTenorActiveQuery(resolvedQuery);
        setTenorHasMore(false);
        setTenorNext(null);
        if (tenorScrollRef.current) {
          tenorScrollRef.current.scrollTop = 0;
        }
      } else if (tenorFeedMode === "fallback") {
        setTenorLoadingState("append");
        applyFallbackResults(resolvedQuery, true, "empty");
        setTenorLoadingState("idle");
        return;
      }

      setTenorLoadingState(append ? "append" : "initial");
      setTenorError(null);

      if (typeof fetch === "undefined") {
        applyFallbackResults(resolvedQuery, append, "error");
        setTenorLoadingState("idle");
        return;
      }

      const controller = new AbortController();
      tenorAbortRef.current = controller;

      try {
        const baseUrl = "https://tenor.googleapis.com/v2";
        const endpoint = resolvedQuery
          ? `${baseUrl}/search?q=${encodeURIComponent(resolvedQuery)}&key=AIzaSyBtw6sR-jxfEzNKmka-W4IXmvF8qqY7wGQ&client_key=notionlike-dashboard&limit=${PAGE_SIZE}&media_filter=gif,tinygif`
          : `${baseUrl}/featured?key=AIzaSyBtw6sR-jxfEzNKmka-W4IXmvF8qqY7wGQ&client_key=notionlike-dashboard&limit=${PAGE_SIZE}&media_filter=gif,tinygif`;
        const finalEndpoint = next && next.length ? `${endpoint}&pos=${encodeURIComponent(next)}` : endpoint;
        const response = await fetch(finalEndpoint, { signal: controller.signal });
        if (!response.ok) throw new Error("TENOR_HTTP_ERROR");
        const payload = (await response.json()) as {
          results?: {
            id: string;
            media_formats?: {
              gif?: { url: string; width?: number; height?: number };
              tinygif?: { url: string; width?: number; height?: number };
              nanogif?: { url: string; width?: number; height?: number };
              mediumgif?: { url: string; width?: number; height?: number };
            };
          }[];
          next?: string;
        };
        const mapped = (payload.results ?? [])
          .map((item) => {
            const media =
              item.media_formats?.tinygif ||
              item.media_formats?.gif ||
              item.media_formats?.nanogif ||
              item.media_formats?.mediumgif;
            if (!media) return null;
            const preview =
              item.media_formats?.nanogif ||
              item.media_formats?.tinygif ||
              item.media_formats?.gif ||
              item.media_formats?.mediumgif ||
              media;
            return {
              id: item.id,
              url: media.url,
              preview: preview.url,
              width: media.width ?? 160,
              height: media.height ?? 160,
            } satisfies TenorGif;
          })
          .filter(Boolean) as TenorGif[];

        if (mapped.length) {
          setTenorResults((prev) => (append ? mergeResults(prev, mapped) : mapped));
          setTenorNext(payload.next ?? null);
          setTenorHasMore(Boolean(payload.next));
          setTenorFeedMode("remote");
          return;
        }

        applyFallbackResults(resolvedQuery, append, "empty");
      } catch (error) {
        if ((error as DOMException).name === "AbortError") return;
        applyFallbackResults(resolvedQuery, append, "error");
      } finally {
        if (!controller.signal.aborted) {
          setTenorLoadingState("idle");
          tenorAbortRef.current = null;
        }
      }
    },
    [
      PAGE_SIZE,
      applyFallbackResults,
      mergeResults,
      tenorActiveQuery,
      tenorFeedMode,
    ]
  );

  useEffect(() => {
    if (
      avatarEditorOpen &&
      avatarSource === "tenor" &&
      tenorResults.length === 0 &&
      tenorLoadingState === "idle"
    ) {
      const initialQuery = tenorQuery.trim() || undefined;
      fetchTenor({ search: initialQuery });
    }
  }, [
    avatarEditorOpen,
    avatarSource,
    tenorResults.length,
    tenorLoadingState,
    tenorQuery,
    fetchTenor,
  ]);

  const handleTenorSearch = (event: React.FormEvent) => {
    event.preventDefault();
    fetchTenor({ search: tenorQuery });
  };

  const handleTenorScroll = (event: React.UIEvent<HTMLDivElement>) => {
    if (!tenorHasMore || tenorLoadingState !== "idle") return;
    if (tenorFeedMode === "remote" && !tenorNext) return;
    const target = event.currentTarget;
    if (target.scrollTop + target.clientHeight >= target.scrollHeight - 120) {
      fetchTenor({ append: true, next: tenorFeedMode === "remote" ? tenorNext : null });
    }
  };

  const handleTenorSelect = (gif: { id: string; url: string }) => {
    updateAccount({ avatarDataUrl: gif.url });
    setAvatarError(null);
    closeAvatarEditor();
  };

  const formattedBirthDate = (() => {
    if (!account.birthDate) return "Date non renseignée";
    const parsed = new Date(account.birthDate);
    if (Number.isNaN(parsed.getTime())) return "Date non renseignée";
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(parsed);
  })();

  const languageLabel =
    LANGUAGE_OPTIONS.find((option) => option.value === account.language)?.label ||
    account.language ||
    "Langue non définie";
  const timezoneLabel =
    TIMEZONE_OPTIONS.find((option) => option.value === account.timezone)?.label ||
    account.timezone ||
    "Fuseau horaire non défini";

  return (
    <div
      className={`space-y-6 rounded-2xl border border-white/10 bg-gradient-to-br ${theme.cardFrom} ${theme.cardVia} ${theme.cardTo} p-5`}
    >
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="flex-1 space-y-5">
          <div className="rounded-2xl bg-black/20 p-4 shadow-inner backdrop-blur-sm">
            <input
              key={avatarSource}
              ref={fileInputRef}
              type="file"
              accept={avatarSource === "gif" ? "image/gif" : "image/png,image/jpeg,image/webp"}
              className="hidden"
              onChange={handleAvatarUpload}
            />
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-4">
                <AccountAvatar account={account} size={76} withGlow className="ring-2 ring-white/15" />
                <div className="min-w-[220px] flex-1">
                  <div className="text-sm font-medium text-gray-200">Avatar & identité</div>
                  <p className="mt-1 text-xs text-gray-400">
                    Choisis une photo statique ou un GIF animé pour personnaliser ton profil.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (avatarEditorOpen) {
                      closeAvatarEditor();
                    } else {
                      setAvatarEditorOpen(true);
                    }
                  }}
                  className="rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-gray-100 transition hover:bg-white/20"
                >
                  {avatarEditorOpen ? "Terminer" : "Modifier la photo de profil"}
                </button>
              </div>
              {avatarEditorOpen && (
                <div className="space-y-4 rounded-2xl border border-white/10 bg-black/30 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-wide text-gray-200">
                      {[
                        { value: "photo" as const, label: "Importer une photo" },
                        { value: "gif" as const, label: "Importer un GIF" },
                        { value: "tenor" as const, label: "Depuis Tenor" },
                      ].map(({ value, label }) => {
                        const active = avatarSource === value;
                        return (
                          <button
                            key={value}
                            type="button"
                            onClick={() => {
                              setAvatarSource(value);
                              setAvatarError(null);
                              if (value !== "tenor") setTenorError(null);
                            }}
                            className={`rounded-full border px-3 py-1 transition ${
                              active
                                ? "border-white/40 bg-white/15 text-white"
                                : "border-transparent text-gray-300 hover:border-white/20 hover:text-white"
                            }`}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                    {account.avatarDataUrl && (
                      <button
                        type="button"
                        onClick={handleRemoveAvatar}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-gray-200 transition hover:bg-white/10"
                      >
                        Supprimer la photo
                      </button>
                    )}
                  </div>
                  {avatarSource === "tenor" ? (
                    <div className="space-y-3 text-sm text-gray-300">
                      <form onSubmit={handleTenorSearch} className="flex flex-wrap items-center gap-2">
                        <div className="relative min-w-[200px] flex-1">
                          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                          <input
                            value={tenorQuery}
                            onChange={(event) => setTenorQuery(event.target.value)}
                            placeholder="Rechercher un GIF (ex : joie, focus, coding…)"
                            className="w-full rounded-xl border border-white/10 bg-black/40 py-2 pl-9 pr-3 text-sm text-gray-100 placeholder:text-gray-500 focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/20"
                          />
                        </div>
                        <button
                          type="submit"
                          className="rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-gray-100 transition hover:bg-white/20"
                        >
                          Rechercher
                        </button>
                      </form>
                      {tenorError && <p className="text-xs text-amber-300">{tenorError}</p>}
                      <div className="rounded-2xl border border-white/5 bg-black/40 p-2">
                        <div
                          ref={tenorScrollRef}
                          onScroll={handleTenorScroll}
                          className="max-h-64 overflow-y-auto pr-1"
                        >
                          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                            {tenorLoadingState === "initial" && tenorResults.length === 0
                              ? Array.from({ length: 9 }).map((_, index) => (
                                  <div
                                    key={`loading-${index}`}
                                    className="aspect-square w-full animate-pulse rounded-lg bg-white/10"
                                  />
                                ))
                              : tenorResults.map((gif) => {
                                  const selected = account.avatarDataUrl === gif.url;
                                  return (
                                    <button
                                      key={gif.id}
                                      type="button"
                                      onClick={() => handleTenorSelect(gif)}
                                      className={`group relative overflow-hidden rounded-lg border transition ${
                                        selected
                                          ? "border-white/40 ring-2 ring-white/30"
                                          : "border-white/10 hover:border-white/30"
                                      }`}
                                    >
                                      <img
                                        src={gif.preview}
                                        alt="Prévisualisation Tenor"
                                        className="h-full w-full object-cover"
                                        loading="lazy"
                                      />
                                      {selected && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white">
                                          <Check className="h-5 w-5" />
                                        </div>
                                      )}
                                    </button>
                                  );
                                })}
                            {tenorResults.length === 0 &&
                              tenorLoadingState === "idle" &&
                              !tenorError && (
                                <div className="col-span-full rounded-lg border border-white/10 bg-black/30 p-3 text-center text-xs text-gray-400">
                                  Lance une recherche pour découvrir des GIFs Tenor.
                                </div>
                              )}
                          </div>
                          {tenorLoadingState === "append" && (
                            <div className="py-2 text-center text-[11px] text-gray-400">
                              Chargement de nouveaux GIFs…
                            </div>
                          )}
                          {!tenorHasMore && tenorResults.length > 0 && tenorLoadingState !== "append" && (
                            <div className="py-2 text-center text-[11px] text-gray-500">
                              Fin de la sélection.
                            </div>
                          )}
                        </div>
                      </div>
                      <p className="text-[10px] uppercase tracking-wide text-gray-500">Gif search by Tenor</p>
                    </div>
                  ) : (
                    <div className="space-y-3 rounded-2xl border border-dashed border-white/10 bg-black/30 p-4 text-sm text-gray-300">
                      <p className="text-xs text-gray-400">
                        {avatarSource === "photo"
                          ? "Formats acceptés : JPG, PNG, WEBP (4 Mo max recommandés)."
                          : "Formats acceptés : GIF animé (4 Mo max recommandés)."}
                      </p>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-gray-100 transition hover:bg-white/20"
                      >
                        {avatarSource === "photo" ? "Choisir une photo" : "Choisir un GIF"}
                      </button>
                    </div>
                  )}
                </div>
              )}
              {avatarError && <p className="text-xs text-red-300">{avatarError}</p>}
            </div>
          </div>

          <div className="rounded-2xl bg-black/20 p-4 shadow-inner backdrop-blur-sm">
            <div className="text-sm font-medium text-gray-200">Informations personnelles</div>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <label className="flex flex-col gap-1 text-xs uppercase tracking-wide text-gray-400">
                Prénom
                <input
                  value={account.firstName}
                  onChange={(event) => updateAccount({ firstName: event.target.value })}
                  className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-gray-100 placeholder:text-gray-500 focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/20"
                  placeholder="Ton prénom"
                />
              </label>
              <label className="flex flex-col gap-1 text-xs uppercase tracking-wide text-gray-400">
                Nom
                <input
                  value={account.lastName}
                  onChange={(event) => updateAccount({ lastName: event.target.value })}
                  className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-gray-100 placeholder:text-gray-500 focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/20"
                  placeholder="Ton nom"
                />
              </label>
              <label className="flex flex-col gap-1 text-xs uppercase tracking-wide text-gray-400">
                Nom affiché
                <input
                  value={account.displayName}
                  onChange={(event) => updateAccount({ displayName: event.target.value })}
                  className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-gray-100 placeholder:text-gray-500 focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/20"
                  placeholder="Pseudo ou nom complet"
                />
              </label>
              <label className="flex flex-col gap-1 text-xs uppercase tracking-wide text-gray-400">
                Date de naissance
                <input
                  type="date"
                  value={account.birthDate}
                  onChange={(event) => updateAccount({ birthDate: event.target.value })}
                  className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-gray-100 focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/20"
                />
              </label>
              <label className="flex flex-col gap-1 text-xs uppercase tracking-wide text-gray-400">
                Localisation
                <input
                  value={account.location}
                  onChange={(event) => updateAccount({ location: event.target.value })}
                  className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-gray-100 placeholder:text-gray-500 focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/20"
                  placeholder="Ville, pays"
                />
              </label>
              <label className="flex flex-col gap-1 text-xs uppercase tracking-wide text-gray-400">
                Adresse e-mail
                <input
                  type="email"
                  value={account.email}
                  onChange={(event) => updateAccount({ email: event.target.value })}
                  className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-gray-100 placeholder:text-gray-500 focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/20"
                  placeholder="tu@email.com"
                />
              </label>
              <label className="flex flex-col gap-1 text-xs uppercase tracking-wide text-gray-400">
                Langue
                <select
                  value={account.language}
                  onChange={(event) => updateAccount({ language: event.target.value })}
                  className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-gray-100 focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/20"
                >
                  {LANGUAGE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-1 text-xs uppercase tracking-wide text-gray-400">
                Fuseau horaire
                <select
                  value={account.timezone}
                  onChange={(event) => updateAccount({ timezone: event.target.value })}
                  className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-gray-100 focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/20"
                >
                  {TIMEZONE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        </div>

        <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-gray-100 shadow-xl">
          <div className="mb-4 text-xs font-semibold uppercase tracking-wide text-gray-400">Aperçu du profil</div>
          <div className="flex items-center gap-3">
            <AccountAvatar account={account} size={56} withGlow className="shrink-0" />
            <div>
              <div className="text-base font-semibold text-white">{profileDisplayName(account)}</div>
              <div className="text-xs text-gray-300">
                {account.location.trim() || account.email.trim() || "Personnalise ton espace."}
              </div>
            </div>
          </div>
          <div className="mt-4 space-y-2 text-xs text-gray-300">
            {account.email.trim() && (
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5" /> {account.email.trim()}
              </div>
            )}
            {account.location.trim() && (
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5" /> {account.location.trim()}
              </div>
            )}
            <div className="flex items-center gap-2">
              <Globe className="h-3.5 w-3.5" /> {languageLabel}
            </div>
            <div className="flex items-center gap-2">
              <Clock3 className="h-3.5 w-3.5" /> {timezoneLabel}
            </div>
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-3.5 w-3.5" /> {formattedBirthDate}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------
// Vue détaillée d'une carte
// -------------------------------------------------
function CardDetailView({
  card,
  theme,
  profileAccent,
  onToggleFavorite,
  onUpdateCard,
}: {
  card: CardData;
  theme: (typeof THEMES)[ThemeKey];
  profileAccent: string;
  onToggleFavorite: () => void;
  onUpdateCard: (updates: Partial<CardData>) => void;
}) {
  const Icon = ICONS[card.iconName];
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const [isEditingContent, setIsEditingContent] = useState(false);
  const [markdownDraft, setMarkdownDraft] = useState(card.markdown);
  const titleEditableRef = useRef<HTMLDivElement | null>(null);
  const descEditableRef = useRef<HTMLDivElement | null>(null);
  const titleDraftRef = useRef(card.title);
  const descDraftRef = useRef(card.desc);
  const bannerInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    titleDraftRef.current = card.title;
    if (titleEditableRef.current && !isEditingTitle) {
      titleEditableRef.current.textContent = card.title;
      titleEditableRef.current.dataset.empty = card.title.trim() ? "false" : "true";
    }
  }, [card.title, card.id, isEditingTitle]);
  useEffect(() => {
    descDraftRef.current = card.desc;
    if (descEditableRef.current && !isEditingDesc) {
      descEditableRef.current.innerText = card.desc;
      descEditableRef.current.dataset.empty = card.desc.trim() ? "false" : "true";
    }
  }, [card.desc, card.id, isEditingDesc]);
  useEffect(() => setMarkdownDraft(card.markdown), [card.markdown, card.id]);

  const syncTitleDom = (value: string) => {
    titleDraftRef.current = value;
    if (titleEditableRef.current) {
      titleEditableRef.current.textContent = value;
      titleEditableRef.current.dataset.empty = value.trim() ? "false" : "true";
    }
  };

  const syncDescDom = (value: string) => {
    descDraftRef.current = value;
    if (descEditableRef.current) {
      descEditableRef.current.innerText = value;
      descEditableRef.current.dataset.empty = value.trim() ? "false" : "true";
    }
  };

  const placeCaretAtEnd = (element: HTMLElement) => {
    if (typeof window === "undefined") return;
    const selection = window.getSelection();
    if (!selection) return;
    const range = document.createRange();
    range.selectNodeContents(element);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
  };

  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat("fr-FR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    []
  );
  const dateTimeFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat("fr-FR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    []
  );

  const created = dateFormatter.format(new Date(card.createdAt));
  const lastViewed = card.lastViewedAt ? dateTimeFormatter.format(new Date(card.lastViewedAt)) : "Jamais consultée";

  function saveTitle() {
    const rawValue = titleDraftRef.current ?? "";
    const normalized = rawValue.replace(/\s+/g, " ").trim();
    setIsEditingTitle(false);
    if (titleEditableRef.current) {
      titleEditableRef.current.dataset.editing = "false";
    }
    if (!normalized) {
      syncTitleDom(card.title);
      return;
    }
    syncTitleDom(normalized);
    if (normalized !== card.title) {
      onUpdateCard({ title: normalized });
    }
  }

  function cancelTitle() {
    setIsEditingTitle(false);
    if (titleEditableRef.current) {
      titleEditableRef.current.dataset.editing = "false";
    }
    syncTitleDom(card.title);
  }

  function saveDesc() {
    const rawValue = descDraftRef.current ?? "";
    const normalized = rawValue.replace(/\u00a0/g, " ").replace(/\r/g, "").trim();
    setIsEditingDesc(false);
    if (descEditableRef.current) {
      descEditableRef.current.dataset.editing = "false";
    }
    syncDescDom(normalized);
    if (normalized !== card.desc) {
      onUpdateCard({ desc: normalized });
    }
  }

  function cancelDesc() {
    setIsEditingDesc(false);
    if (descEditableRef.current) {
      descEditableRef.current.dataset.editing = "false";
    }
    syncDescDom(card.desc);
  }

  function saveContent() {
    const value = markdownDraft.trim();
    setIsEditingContent(false);
    if (value !== card.markdown.trim()) {
      onUpdateCard({ markdown: value });
    }
  }

  function cancelContent() {
    setMarkdownDraft(card.markdown);
    setIsEditingContent(false);
  }

  function handleBannerChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = typeof reader.result === "string" ? reader.result : "";
      if (dataUrl) {
        onUpdateCard({ bannerUrl: dataUrl });
      }
      event.target.value = "";
    };
    reader.readAsDataURL(file);
  }

  function resetBanner() {
    onUpdateCard({ bannerUrl: undefined });
  }

  return (
    <article className="space-y-8 text-gray-200">
      <input
        ref={bannerInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleBannerChange}
      />
      <div className="overflow-hidden rounded-3xl border border-white/5 bg-[#0c1016] shadow-[0_40px_80px_-60px_rgba(0,0,0,0.9)]">
        <div className="relative h-56 w-full sm:h-64">
          {card.bannerUrl ? (
            <img src={card.bannerUrl} alt={`Bannière ${card.title}`} className="h-full w-full object-cover" />
          ) : (
            <div className={`h-full w-full bg-gradient-to-r ${theme.cardFrom} ${theme.cardVia} ${theme.cardTo}`} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 px-6 pb-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="flex items-start gap-4">
                <span
                  className="rounded-2xl p-2.5 backdrop-blur"
                  style={{
                    background: `linear-gradient(135deg, ${profileAccent}, rgba(4, 7, 12, 0.65))`,
                  }}
                >
                  <Icon className="h-6 w-6 text-white" />
                </span>
                <div className="max-w-3xl">
                  <div
                    ref={titleEditableRef}
                    role="textbox"
                    aria-label="Modifier le titre de la page"
                    contentEditable
                    suppressContentEditableWarning
                    data-placeholder="Donne un nom à ta page"
                    data-empty={titleDraftRef.current.trim() ? "false" : "true"}
                    data-editing={isEditingTitle}
                    className="relative w-full cursor-text text-3xl font-semibold tracking-tight text-white outline-none transition before:absolute before:inset-0 before:pointer-events-none before:select-none before:text-white/30 before:opacity-75 before:content-[attr(data-placeholder)] before:whitespace-pre-wrap data-[empty=false]:before:content-none"
                    onFocus={(event) => {
                      setIsEditingTitle(true);
                      event.currentTarget.dataset.editing = "true";
                    }}
                    onBlur={() => saveTitle()}
                    onInput={(event) => {
                      const element = event.currentTarget;
                      const text = element.textContent ?? "";
                      if (text.includes("\n")) {
                        const sanitized = text.replace(/\s*\n+/g, " ");
                        element.textContent = sanitized;
                        titleDraftRef.current = sanitized;
                        placeCaretAtEnd(element);
                      } else {
                        titleDraftRef.current = text;
                      }
                      element.dataset.empty = titleDraftRef.current.trim() ? "false" : "true";
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        (event.currentTarget as HTMLElement).blur();
                      }
                      if (event.key === "Escape") {
                        event.preventDefault();
                        cancelTitle();
                        (event.currentTarget as HTMLElement).blur();
                      }
                    }}
                  >
                    {card.title}
                  </div>
                  <div className="mt-2 text-sm text-gray-200/85">
                    <div
                      ref={descEditableRef}
                      role="textbox"
                      aria-label="Modifier la description"
                      contentEditable
                      suppressContentEditableWarning
                      data-placeholder="Ajoute une description pour contextualiser la page."
                      data-empty={descDraftRef.current.trim() ? "false" : "true"}
                      data-editing={isEditingDesc}
                      className="relative min-h-[36px] cursor-text whitespace-pre-wrap py-1 leading-relaxed text-gray-200/90 outline-none before:pointer-events-none before:absolute before:inset-x-0 before:bottom-1 before:top-1 before:select-none before:text-gray-400/70 before:content-[attr(data-placeholder)] before:whitespace-pre-wrap data-[empty=false]:before:content-none"
                      onFocus={(event) => {
                        setIsEditingDesc(true);
                        event.currentTarget.dataset.editing = "true";
                      }}
                      onBlur={() => saveDesc()}
                      onInput={(event) => {
                        const element = event.currentTarget;
                        const text = (element.innerText ?? "").replace(/\r/g, "");
                        descDraftRef.current = text;
                        element.dataset.empty = text.trim() ? "false" : "true";
                      }}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" && !event.shiftKey) {
                          event.preventDefault();
                          (event.currentTarget as HTMLElement).blur();
                        }
                        if (event.key === "Escape") {
                          event.preventDefault();
                          cancelDesc();
                          (event.currentTarget as HTMLElement).blur();
                        }
                      }}
                    >
                      {card.desc}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={onToggleFavorite}
                  className={`inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide transition ${card.favorite ? "bg-amber-400/20 text-amber-200" : "bg-white/5 text-gray-100 hover:bg-white/10"}`}
                >
                  {card.favorite ? <Star className="h-4 w-4" fill="currentColor" /> : <StarOff className="h-4 w-4" />}
                  {card.favorite ? "Favori" : "Ajouter"}
                </button>
                <button
                  type="button"
                  onClick={() => bannerInputRef.current?.click()}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-gray-100 transition hover:bg-white/10"
                >
                  <ImageIcon className="h-4 w-4" /> Bannière
                </button>
                <button
                  type="button"
                  onClick={resetBanner}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-gray-100 transition hover:bg-white/10"
                >
                  Réinitialiser
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-white/5 bg-[#0b1018] p-4 shadow-inner">
          <div className="text-[11px] uppercase tracking-wide text-gray-400">Créée le</div>
          <div className="mt-1 text-sm font-medium text-gray-100">{created}</div>
        </div>
        <div className="rounded-2xl border border-white/5 bg-[#0b1018] p-4 shadow-inner">
          <div className="text-[11px] uppercase tracking-wide text-gray-400">Dernière consultation</div>
          <div className="mt-1 text-sm font-medium text-gray-100">{lastViewed}</div>
        </div>
        <div className="rounded-2xl border border-white/5 bg-[#0b1018] p-4 shadow-inner">
          <div className="text-[11px] uppercase tracking-wide text-gray-400">Identifiant</div>
          <div className="mt-1 truncate font-mono text-sm text-gray-100">{card.key}</div>
        </div>
        <div className="rounded-2xl border border-white/5 bg-[#0b1018] p-4 shadow-inner">
          <div className="text-[11px] uppercase tracking-wide text-gray-400">Tables</div>
          <div className="mt-1 text-sm font-medium text-gray-100">
            {card.tables.length > 0 ? `${card.tables.length} tableau(x)` : "Aucune donnée importée"}
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-white/5 bg-[#0d121c] p-6 shadow-inner">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-300">Notes & markdown</h2>
            <p className="text-xs text-gray-500">Modifie le contenu puis exporte-le en Markdown ou CSV depuis le menu en haut.</p>
          </div>
          <div className="flex items-center gap-2">
            {isEditingContent ? (
              <>
                <button
                  type="button"
                  onClick={saveContent}
                  className="rounded-full bg-white/20 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-white/30"
                >
                  Enregistrer
                </button>
                <button
                  type="button"
                  onClick={cancelContent}
                  className="rounded-full bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-gray-300 transition hover:bg-white/10"
                >
                  Annuler
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditingContent(true)}
                className="rounded-full bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-gray-100 transition hover:bg-white/10"
              >
                Modifier
              </button>
            )}
          </div>
        </div>
        {isEditingContent ? (
          <textarea
            value={markdownDraft}
            onChange={(event) => setMarkdownDraft(event.target.value)}
            className="h-64 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm leading-relaxed text-gray-100 outline-none focus:border-white/30 focus:ring-2 focus:ring-white/20"
          />
        ) : (
          <MinimalMarkdown content={card.markdown} />
        )}
      </section>

      {card.tables.length > 0 && (
        <section className="space-y-6">
          {card.tables.map((table) => (
            <div
              key={table.id}
              className="overflow-hidden rounded-3xl border border-white/5 bg-[#0d121c] shadow-[0_30px_60px_-50px_rgba(0,0,0,0.9)]"
            >
              <div className="flex items-center justify-between border-b border-white/5 bg-white/5 px-5 py-4">
                <div className="text-sm font-semibold text-gray-100">{table.title}</div>
                <div className="text-xs uppercase tracking-wide text-gray-500">
                  {table.rows.length} ligne(s)
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-white/5 text-sm text-gray-200/85">
                  <thead className="bg-white/5 text-xs uppercase tracking-wide text-gray-400">
                    <tr>
                      {table.columns.map((column) => (
                        <th key={column} className="px-4 py-3 text-left font-medium">
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {table.rows.length === 0 && (
                      <tr>
                        <td colSpan={Math.max(table.columns.length, 1)} className="px-4 py-6 text-center text-xs text-gray-500">
                          Aucune donnée disponible.
                        </td>
                      </tr>
                    )}
                    {table.rows.map((row, rowIndex) => (
                      <tr key={rowIndex} className={rowIndex % 2 === 0 ? "" : "bg-white/[0.03]"}
                      >
                        {table.columns.map((_, columnIndex) => (
                          <td key={`${rowIndex}-${columnIndex}`} className="whitespace-nowrap px-4 py-3 text-sm text-gray-200/80">
                            {row[columnIndex] || "—"}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </section>
      )}
    </article>
  );
}

function MinimalMarkdown({ content }: { content: string }) {
  const blocks = content
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  if (blocks.length === 0) {
    return <div className="text-sm text-gray-500">Ajoute du contenu pour commencer.</div>;
  }

  return (
    <div className="space-y-4 text-sm text-gray-200/85">
      {blocks.map((block, index) => {
        if (block.startsWith("### ")) {
          return (
            <h3 key={index} className="text-base font-semibold text-gray-100">
              {block.replace(/^###\s*/, "")}
            </h3>
          );
        }
        if (block.startsWith("## ")) {
          return (
            <h2 key={index} className="text-lg font-semibold text-gray-100">
              {block.replace(/^##\s*/, "")}
            </h2>
          );
        }
        if (block.split("\n").every((line) => /^[-*]\s+/.test(line))) {
          const items = block.split("\n").map((line) => line.replace(/^[-*]\s+/, ""));
          return (
            <ul key={index} className="ml-4 list-disc space-y-2 text-gray-200/80">
              {items.map((item, itemIndex) => (
                <li key={itemIndex} dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(item) }} />
              ))}
            </ul>
          );
        }
        return (
          <p key={index} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(block) }} />
        );
      })}
    </div>
  );
}

function renderInlineMarkdown(text: string) {
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return escaped
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code class='rounded bg-white/10 px-1 py-0.5 text-[11px]'>$1</code>");
}

// -------------------------------------------------
// Préférences > Apparence (sélecteur de thème)
// -------------------------------------------------
function AppearanceView({ themeKey, setThemeKey, theme }: { themeKey: ThemeKey; setThemeKey: (k: ThemeKey) => void; theme: (typeof THEMES)[ThemeKey] }) {
  return (
    <div className={`rounded-2xl border border-white/10 bg-gradient-to-br ${theme.cardFrom} ${theme.cardVia} ${theme.cardTo} p-4`}>
      <div className="mb-3 text-sm font-medium text-gray-200">Apparence</div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {(Object.keys(THEMES) as ThemeKey[]).map((k) => {
          const th = THEMES[k];
          const selected = themeKey === k;
          return (
            <button
              key={k}
              onClick={() => setThemeKey(k)}
              className={`group relative rounded-2xl border ${selected ? "border-white/20" : "border-white/10 hover:border-white/20"} bg-gradient-to-br ${th.cardFrom} ${th.cardVia} ${th.cardTo} p-4 text-left transition`}
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`h-8 w-8 rounded-lg bg-gradient-to-br ${th.logoGradient} ring-1 ring-white/10`} />
                  <div className="text-sm font-medium text-gray-200">{th.name}</div>
                </div>
                <Palette className="h-4 w-4 text-gray-400" />
              </div>
              <div className="flex items-center gap-2">
                <div className={`h-1.5 w-24 rounded-full bg-gradient-to-r ${th.accentFrom} ${th.accentTo}`} />
                <div className={`h-6 w-6 rounded-md ring-2 ${th.glowRing} ring-offset-0`} />
              </div>
              {selected && <div className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-white/10" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// -------------------------------------------------
// Vue Corbeille
// -------------------------------------------------
function TrashView({ items, onRestore, onHardDelete, theme }: { items: TrashItem[]; onRestore: (id: string) => void; onHardDelete: (id: string) => void; theme: (typeof THEMES)[ThemeKey] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.length === 0 && (
        <div className="col-span-full rounded-2xl border border-white/5 p-6 text-sm text-gray-300/80">
          Corbeille vide.
        </div>
      )}
      {items.map(({ id, title, desc, iconName, deletedAt }) => {
        const Icon = ICONS[iconName];
        const remainingDays = Math.max(0, 30 - Math.floor((now() - deletedAt) / (24 * 60 * 60 * 1000)));
        return (
          <div key={id} className={`relative rounded-2xl border border-white/5 bg-gradient-to-br ${theme.cardFrom} ${theme.cardVia} ${theme.cardTo} p-4`}>
            <div className="mb-2 flex items-start gap-3">
              <div className="rounded-xl bg-white/5 p-2 ring-1 ring-white/10"><Icon className="h-5 w-5" /></div>
              <div>
                <div className="text-base font-semibold leading-tight">{title}</div>
                <p className="mt-1 text-[13px] text-gray-300/80">{desc || "(Sans description)"}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-gray-300/70">
              <div>Suppr. dans {remainingDays} j</div>
              <div className="flex items-center gap-2">
                <button onClick={() => onRestore(id)} className="rounded-lg bg-white/10 px-2 py-1 text-[11px] hover:bg-white/15">
                  <span className="inline-flex items-center gap-1"><Undo2 className="h-3.5 w-3.5" /> Restaurer</span>
                </button>
                <button onClick={() => onHardDelete(id)} className="rounded-lg bg-white/10 px-2 py-1 text-[11px] text-red-300 hover:bg-white/15">
                  Supprimer définitivement
                </button>
              </div>
            </div>
            <div className={`pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-1 ${theme.glowRing} blur-[1px] transition-opacity`} />
          </div>
        );
      })}
    </div>
  );
}

// -------------------------------------------------
// Footer compte (mobile only)
// -------------------------------------------------
function MobileAccountFooter({
  account,
  onEdit,
}: {
  account: AccountProfile;
  onEdit: () => void;
}) {
  const name = profileDisplayName(account);
  const subtitle =
    account.location.trim() ||
    account.email.trim() ||
    account.timezone ||
    "Profil synchronisé";

  const languageLabel =
    LANGUAGE_OPTIONS.find((option) => option.value === account.language)?.label || account.language;
  const timezoneLabel =
    TIMEZONE_OPTIONS.find((option) => option.value === account.timezone)?.label || account.timezone;
  const birthDateLabel = (() => {
    if (!account.birthDate) return null;
    const parsed = new Date(account.birthDate);
    if (Number.isNaN(parsed.getTime())) return null;
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(parsed);
  })();

  return (
    <footer className="mt-8 md:hidden">
      <div className="rounded-2xl border border-white/5 bg-white/5 p-3 text-xs text-gray-400">
        <div className="mb-2 flex items-center justify-between">
          <div className="font-semibold text-gray-300">Compte</div>
          <button
            onClick={onEdit}
            className="rounded-full bg-white/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-gray-200 transition hover:bg-white/20"
          >
            Gérer
          </button>
        </div>
        <div className="flex items-center gap-3">
          <AccountAvatar account={account} size={36} withGlow className="shrink-0" />
          <div className="leading-tight">
            <div className="font-medium text-gray-200">{name}</div>
            <div className="text-[11px] text-gray-400/80">{subtitle}</div>
            <div className="mt-2 space-y-1 text-[10px] text-gray-400/80">
              {account.email.trim() && (
                <div className="flex items-center gap-1">
                  <Mail className="h-3 w-3" /> {account.email.trim()}
                </div>
              )}
              {account.location.trim() && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> {account.location.trim()}
                </div>
              )}
              {languageLabel && (
                <div className="flex items-center gap-1">
                  <Globe className="h-3 w-3" /> {languageLabel}
                </div>
              )}
              {timezoneLabel && (
                <div className="flex items-center gap-1">
                  <Clock3 className="h-3 w-3" /> {timezoneLabel}
                </div>
              )}
              {birthDateLabel && (
                <div className="flex items-center gap-1">
                  <CalendarIcon className="h-3 w-3" /> {birthDateLabel}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// -------------------------------------------------
// Preview flottant pendant le drag & drop
// -------------------------------------------------
function DragPreviewCard({
  data,
  theme,
}: {
  data: DragPreviewState;
  theme: (typeof THEMES)[ThemeKey];
}) {
  const Icon = ICONS[data.iconName];
  return (
    <motion.div
      className={`relative w-full min-w-[180px] rounded-2xl border border-white/10 bg-gradient-to-br ${theme.cardFrom} ${theme.cardVia} ${theme.cardTo} p-4 shadow-2xl`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.15 }}
    >
      <div className="flex items-start gap-3">
        <div className="rounded-xl bg-white/10 p-2 ring-1 ring-white/10">
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1 text-sm font-semibold text-gray-100">
            <span className="truncate">{data.title}</span>
            {data.favorite && <Star className="h-3.5 w-3.5 text-amber-300" fill="currentColor" aria-hidden />}
          </div>
          <p className="mt-1 line-clamp-2 text-xs text-gray-300/90">{data.desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

// Placeholder visuel pendant le drag & drop
// -------------------------------------------------
function DropPlaceholder({
  theme,
  onDrop,
  onHover,
  targetId,
}: {
  theme: (typeof THEMES)[ThemeKey];
  onDrop: () => void;
  onHover?: () => void;
  targetId: string;
}) {
  return (
    <motion.div
      layout
      aria-hidden
      className="relative min-h-[140px] w-full rounded-2xl border border-dashed border-white/15 bg-white/[0.03]"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 0.75, scale: 1 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      data-drop-target={targetId}
      onDragOver={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onHover?.();
      }}
      onDragEnter={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onHover?.();
      }}
      onDrop={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onDrop();
      }}
    >
      <div
        className={`pointer-events-none absolute inset-[2px] rounded-[18px] bg-gradient-to-br ${theme.cardFrom} ${theme.cardVia} ${theme.cardTo} opacity-25 blur-md`}
      />
      <div className="relative z-10 flex h-full items-center justify-center text-xs font-semibold uppercase tracking-[0.3em] text-gray-300/80">
        Déposer ici
      </div>
    </motion.div>
  );
}

// -------------------------------------------------
// Carte (draggable en mode tri manuel)
// -------------------------------------------------
function Card({
  id,
  title,
  desc,
  favorite,
  Icon,
  theme,
  onClick,
  onDelete,
  draggableEnabled,
  dragging,
  dragOver,
  onDragStart,
  onDragEnter,
  onDragOver,
  onDrop,
  onDragEnd,
}: {
  id: string;
  title: string;
  desc: string;
  favorite?: boolean;
  Icon: React.ComponentType<{ className?: string }>;
  theme: (typeof THEMES)[ThemeKey];
  onClick?: () => void;
  onDelete?: () => void;
  draggableEnabled?: boolean;
  dragging?: boolean;
  dragOver?: boolean;
  onDragStart?: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragEnter?: () => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDrop?: () => void;
  onDragEnd?: () => void;
}) {
  const spring = { type: "spring", stiffness: 260, damping: 22, mass: 0.7 } as const;
  const cardRef = useRef<HTMLButtonElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const isDropTarget = !!dragOver && !dragging;
  const animateState = dragging
    ? {
        scale: 1.04,
        y: 0,
        zIndex: 30,
        boxShadow: "0 32px 65px rgba(8, 15, 35, 0.6)",
      }
    : isDropTarget
      ? {
          scale: 0.98,
          y: -4,
          zIndex: 8,
          boxShadow: "0 24px 55px rgba(8, 15, 35, 0.45)",
        }
      : {
          scale: 1,
          y: 0,
          zIndex: 1,
          boxShadow: "0 18px 40px rgba(8, 15, 35, 0.35)",
        };
  const stackingIndex = animateState.zIndex;

  useEffect(() => {
    if (dragging) {
      rotateX.set(-6);
      rotateY.set(6);
      return;
    }
    if (isDropTarget) {
      rotateX.set(-2);
      rotateY.set(2);
      return;
    }
    rotateX.set(0);
    rotateY.set(0);
  }, [dragging, isDropTarget, rotateX, rotateY]);

  const handlePointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (dragging || isDropTarget) return;
    const element = cardRef.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;
    const percentX = offsetX / rect.width;
    const percentY = offsetY / rect.height;
    const tiltX = (0.5 - percentY) * 18;
    const tiltY = (percentX - 0.5) * 18;
    rotateX.set(tiltX);
    rotateY.set(tiltY);
  };

  const resetTilt = () => {
    if (dragging || isDropTarget) return;
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      layout
      className={`group relative ${draggableEnabled ? "cursor-grab active:cursor-grabbing" : ""}`}
      draggable={!!draggableEnabled}
      onDragStart={(event) => {
        if (!draggableEnabled) return;
        const dragEvent = event as unknown as React.DragEvent<HTMLDivElement>;
        const transfer = dragEvent.dataTransfer;
        if (transfer) {
          transfer.effectAllowed = "move";
          try {
            transfer.setData("text/plain", id);
            const ghost = getTransparentDragImage();
            if (ghost) transfer.setDragImage(ghost, ghost.width / 2, ghost.height / 2);
          } catch {}
        }
        onDragStart?.(dragEvent);
      }}
      onDragEnter={() => {
        if (!draggableEnabled) return;
        onDragEnter?.();
      }}
      onDragOver={(event: React.DragEvent<HTMLDivElement>) => {
        if (!draggableEnabled) return;
        event.preventDefault();
        onDragOver?.(event);
      }}
      onDrop={(event: React.DragEvent<HTMLDivElement>) => {
        if (!draggableEnabled) return;
        event.preventDefault();
        event.stopPropagation();
        onDrop?.();
      }}
      onDragEnd={(event) => {
        if (draggableEnabled) {
          (event as unknown as React.DragEvent<HTMLDivElement>).preventDefault();
        }
        onDragEnd?.();
      }}
      aria-grabbed={dragging}
      data-card-id={id}
      data-over={dragOver}
      style={{ zIndex: stackingIndex }}
    >
      <motion.button
        ref={cardRef}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onClick?.();
        }}
        className={`relative flex min-h-[140px] w-full flex-col justify-between rounded-2xl border ${dragOver ? "border-white/40" : "border-white/5"} bg-gradient-to-br ${theme.cardFrom} ${theme.cardVia} ${theme.cardTo} p-4 text-left outline-none ring-0 transition ${theme.focusRing}`}
        animate={animateState}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.97 }}
        transition={spring}
        initial={false}
        style={{
          transformPerspective: 1100,
          rotateX,
          rotateY,
          opacity: dragging ? 0 : 1,
        }}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetTilt}
        onPointerEnter={handlePointerMove}
      >
        {/* Glow border on hover */}
        <div className={`pointer-events-none absolute inset-0 rounded-2xl ${dragOver ? "opacity-100" : "opacity-0"} ring-1 ${theme.glowRing} blur-[1px] transition-opacity group-hover:opacity-100`} />

        {/* Delete btn */}
        {onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="absolute right-2 top-2 rounded-md bg-white/5 p-1.5 text-gray-300 opacity-0 ring-1 ring-white/10 transition hover:bg-white/10 group-hover:opacity-100"
            aria-label="Supprimer la carte"
            title="Supprimer la carte"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}

        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-white/5 p-2 ring-1 ring-white/10">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-1 text-base font-semibold leading-tight">
              <span>{title}</span>
              {favorite && <Star className="h-4 w-4 text-amber-300" fill="currentColor" aria-hidden />}
            </div>
            <p className="mt-1 text-[13px] text-gray-300/80">{desc}</p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className={`h-1.5 w-24 rounded-full bg-gradient-to-r ${theme.accentFrom} ${theme.accentTo}`} />
          <div className="flex items-center gap-1 text-sm text-gray-100">
            <span className="opacity-90">Ouvrir</span>
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </div>
        </div>
      </motion.button>
    </motion.div>
  );
}
