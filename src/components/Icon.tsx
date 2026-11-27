// @ts-nocheck
import { Activity as ActivityIcon, ArrowDown as ArrowDownIcon, ArrowLeft as ArrowLeftIcon, ArrowRight as ArrowRightIcon, ArrowUpRight as ArrowUpRightIcon, Baby as BabyIcon, Bandage as BandageIcon, BookOpen as BookOpenIcon, Bookmark as BookmarkIcon, Brain as BrainIcon, Calculator as CalculatorIcon, CalendarDays as CalendarDaysIcon, Check as CheckIcon, ChevronDown as ChevronDownIcon, ChevronRight as ChevronRightIcon, CircleAlert as CircleAlertIcon, CircleHelp as CircleHelpIcon, Clock3 as Clock3Icon, Cross as CrossIcon, Download as DownloadIcon, Droplets as DropletsIcon, ExternalLink as ExternalLinkIcon, FileCheck2 as FileCheck2Icon, FileText as FileTextIcon, FlaskConical as FlaskConicalIcon, HeartPulse as HeartPulseIcon, History as HistoryIcon, House as HouseIcon, Image as ImageIcon, Info as InfoIcon, Keyboard as KeyboardIcon, Languages as LanguagesIcon, LayoutGrid as LayoutGridIcon, ListChecks as ListChecksIcon, LockKeyhole as LockKeyholeIcon, Maximize2 as Maximize2Icon, Menu as MenuIcon, Monitor as MonitorIcon, Moon as MoonIcon, Pill as PillIcon, Plus as PlusIcon, Printer as PrinterIcon, Search as SearchIcon, Settings2 as Settings2Icon, ShieldCheck as ShieldCheckIcon, ShieldPlus as ShieldPlusIcon, SlidersHorizontal as SlidersHorizontalIcon, Stethoscope as StethoscopeIcon, Sun as SunIcon, Syringe as SyringeIcon, Triangle as TriangleIcon, Type as TypeIcon, Users as UsersIcon, Weight as WeightIcon, X as XIcon, Zap as ZapIcon, ZoomIn as ZoomInIcon, ZoomOut as ZoomOutIcon } from 'lucide-react';

const iconMap = {
  image: ImageIcon,
  download: DownloadIcon,
  zoomIn: ZoomInIcon,
  zoomOut: ZoomOutIcon,
  activity: ActivityIcon,
  down: ArrowDownIcon,
  back: ArrowLeftIcon,
  arrow: ArrowRightIcon,
  up: ArrowUpRightIcon,
  baby: BabyIcon,
  bandage: BandageIcon,
  book: BookOpenIcon,
  bookmark: BookmarkIcon,
  brain: BrainIcon,
  calendar: CalendarDaysIcon,
  check: CheckIcon,
  chevronDown: ChevronDownIcon,
  chevron: ChevronRightIcon,
  alert: CircleAlertIcon,
  clock: Clock3Icon,
  cross: CrossIcon,
  droplet: DropletsIcon,
  external: ExternalLinkIcon,
  filecheck: FileCheck2Icon,
  file: FileTextIcon,
  flask: FlaskConicalIcon,
  heart: HeartPulseIcon,
  history: HistoryIcon,
  home: HouseIcon,
  info: InfoIcon,
  grid: LayoutGridIcon,
  list: ListChecksIcon,
  maximize: Maximize2Icon,
  menu: MenuIcon,
  moon: MoonIcon,
  pill: PillIcon,
  plus: PlusIcon,
  print: PrinterIcon,
  search: SearchIcon,
  settings: Settings2Icon,
  shield: ShieldCheckIcon,
  shieldplus: ShieldPlusIcon,
  sliders: SlidersHorizontalIcon,
  stethoscope: StethoscopeIcon,
  sun: SunIcon,
  syringe: SyringeIcon,
  triangle: TriangleIcon,
  type: TypeIcon,
  users: UsersIcon,
  scale: WeightIcon,
  x: XIcon,
  zap: ZapIcon,
  calculator: CalculatorIcon,
  lock: LockKeyholeIcon,
  languages: LanguagesIcon,
  help: CircleHelpIcon,
  keyboard: KeyboardIcon,
  monitor: MonitorIcon
};

const customIconPaths = {
  lungs: "M12 3v8m0-3c-2-4-4-4-5-1L3 15c-2 5 4 7 7 4 1-1 0-6 0-7m2-4c2-4 4-4 5-1l4 8c2 5-4 7-7 4-1-1 0-6 0-7M12 10l-4 4m4-4 4 4",
  stomach: "M11 3v5c0 3-3 3-5 3-4 0-5 5-2 8 2 3 7 3 11 1 5-2 7-6 6-10-1-3-5-4-7-1V3M8 17c2 2 6 1 8-1",
  kidney: "M8 4c-5-2-7 5-6 10 1 6 7 8 9 3 1-3-4-3-3-6 0-2 4-5 0-7m8 0c5-2 7 5 6 10-1 6-7 8-9 3-1-3 4-3 3-6 0-2-4-5 0-7M10 13l2 3 2-3m-2 3v6",
  virus: "M8 8c5-5 13 3 8 8S3 13 8 8m-3-3 3 3m8 8 3 3M3 12h4m10 0h4M12 3v4m0 10v4M5 19l3-3m8-8 3-3M10 11h.01M14 14h.01"
};

function Icon({
  name,
  size = 20,
  strokeWidth = 1.7,
  className = "",
  style = undefined
}: {
  name: string;
  size?: number;
  strokeWidth?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const O = iconMap[name];
  if (customIconPaths[name]) {
    return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d={customIconPaths[name]} /></svg>;
  }
  if (O) {
    return <O aria-hidden="true" size={size} strokeWidth={strokeWidth} className={className} style={style} />;
  }
  return <FileTextIcon aria-hidden="true" size={size} />;
}

export { Icon, customIconPaths, iconMap };
