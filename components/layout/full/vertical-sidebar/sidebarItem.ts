import {
  ChecklistIcon,
  UsersIcon,
  LayoutDashboardIcon,
  BellIcon,
  NewsIcon,
  PhotoIcon,
  CirclesIcon,
  InfoCircleIcon,
  MapIcon,
  Message2Icon,
  BuildingIcon,
  PlaneDepartureIcon,
  SettingsIcon,
  QuestionMarkIcon,
  VersionsIcon,
  CarIcon,
  DoorIcon,
  ExclamationMarkIcon,
  PlaneTiltIcon,
  BuildingSkyscraperIcon,
  MessagesIcon,
  CalendarEventIcon,
} from "vue-tabler-icons";

export interface menu {
  header?: string;
  title?: string;
  icon?: any;
  to?: string;
  chip?: string;
  chipColor?: string;
  chipVariant?: string;
  chipIcon?: string;
  children?: menu[];
  disabled?: boolean;
  type?: string;
  subCaption?: string;
}

const sidebarItem: menu[] = [
  { header: "Home" },
  {
    title: "Dashboard",
    icon: LayoutDashboardIcon,
    to: "/",
  },
  { header: "Events" },
  {
    title: "Events",
    icon: VersionsIcon,
    to: "/events",
  },
  { header: "Session & Speakers" },
  {
    title: "Sessions",
    icon: VersionsIcon,
    to: "/sessions",
  },
  {
    title: "Agenda",
    icon: VersionsIcon,
    to: "/agenda",
  },
  {
    title: "All speakers",
    icon: UsersIcon,
    to: "/speakers",
  },
  { header: "Notification & news" },
  {
    title: "Notifications",
    icon: BellIcon,
    to: "/notifications",
  },
  {
    title: "News",
    icon: NewsIcon,
    to: "/news",
  },
  { header: "Requests" },
  {
    title: "Registration",
    icon: UsersIcon,
    to: "/delegates",
  },
  {
    title: "Visa Requests",
    icon: ChecklistIcon,
    to: "/visa-request"
  },
  {
    title: "Flight",
    icon: PlaneTiltIcon,
    to: "/flight-request"
  },
  {
    title: "Accommodation",
    icon: BuildingSkyscraperIcon,
    to: "/accomodation-request"
  },
  {
    title: "Transfer request",
    icon: CarIcon,
    to: "/transfer-request"
  },
  { header: "Info Desk" },
  {
    title: "Warning Desk",
    icon: ExclamationMarkIcon,
    to: "/warning-desk",
  },
  {
    title: "Q&As",
    icon: QuestionMarkIcon,
    to: "/questions-answers",
  },
  {
    title: "Questions by Event",
    icon: MessagesIcon,
    to: "/questions-by-event",
  },
  {
    title: "Upcoming events",
    icon: CalendarEventIcon,
    to: "/upcoming-events",
  },
  {
    title: "About conference",
    icon: InfoCircleIcon,
    to: "/about-conference",
  },
  // {
  //   title: "Topics",
  //   icon: PresentationIcon,
  //   to: "/topics",
  // },
  // { header: "Organizers & partners" },
  // {
  //   title: "Organizers",
  //   icon: SofaIcon,
  //   to: "/organizers",
  // },
  // {
  //   title: "Partners",
  //   icon: AffiliateIcon,
  //   to: "/partners",
  // },
  { header: "Participant list" },
  {
    title: "Categories",
    icon: CirclesIcon,
    to: "/participant-categories",
  },
  {
    title: "All companies",
    icon: CirclesIcon,
    to: "/companies",
  },
  // {
  //   title: "Participants",
  //   icon: CirclesIcon,
  //   to: "/participants",
  // },
  { header: "Users" },
  {
    title: "Users",
    icon: UsersIcon,
    to: "/users",
  },
  {
    title: "Chatrooms",
    icon: UsersIcon,
    to: "/chatrooms",
  },
  { header: "Airlines" },
  {
    title: "Airports",
    icon: BuildingIcon,
    to: "/airports"
  },
  {
    title: "Available flights",
    icon: PlaneDepartureIcon,
    to: "/available-flights"
  },

  { header: "Accomodation" },
  {
    title: "Hotels",
    icon: BuildingIcon,
    to: "/hotels"
  },
  {
    title: "Rooms",
    icon: DoorIcon,
    to: "/rooms"
  },

  { header: "Travel" },
  {
    title: "Transfers",
    icon: CarIcon,
    to: "/transfers"
  },
  { header: "Informations" },
  // {
  //   title: "Home PDF",
  //   icon: Book2Icon,
  //   to: "/home-pdf"
  // },
  {
    title: "Gallery",
    icon: PhotoIcon,
    to: "/gallery",
  },
  {
    title: "Floor Plan",
    icon: MapIcon,
    to: "/floor-plan",
  },
  { header: "Feedbacks" },
  {
    title: "Feedback",
    icon: Message2Icon,
    to: "/feedbacks",
  },
  { header: "App configs" },
  {
    title: "App Config",
    icon: SettingsIcon,
    to: "/app-config",
  },
  {
    title: "Onboardings",
    icon: SettingsIcon,
    to: "/onboardings",
  },
];

export default sidebarItem;
