import type { IconType } from 'react-icons'
import * as BoxIcons from 'react-icons/bi'
import { FaFacebookF, FaGithub, FaLinkedin, FaXTwitter, FaYoutube } from 'react-icons/fa6'
import { AiFillInstagram } from 'react-icons/ai'

// Curated common icons for the "Common" tab — most useful for an economic development site
export const COMMON_ICON_KEYS = [
  'BiBuildings', 'BiBuilding', 'BiBriefcase', 'BiGroup', 'BiUser',
  'BiMapPin', 'BiMap', 'BiWorld', 'BiPhone', 'BiEnvelope',
  'BiCalendar', 'BiCalendarEvent', 'BiDollar', 'BiDollarCircle', 'BiChart',
  'BiLineChart', 'BiTrendingUp', 'BiBarChartAlt2', 'BiRocket', 'BiTargetLock',
  'BiShield', 'BiShieldAlt2', 'BiStar', 'BiHeart', 'BiCheckCircle',
  'BiCog', 'BiSearch', 'BiBookOpen', 'BiLeaf', 'BiWrench',
  'BiFactory', 'BiStore', 'BiHome', 'BiNetworkChart', 'BiLandscape',
  'BiTrain', 'BiCar', 'BiWifi', 'BiBolt', 'BiDroplet',
]

// Social media icons
export const SOCIAL_ICONS: Record<string, IconType> = {
  FaFacebookF,
  FaGithub,
  FaLinkedin,
  FaXTwitter,
  FaYoutube,
  AiFillInstagram,
}

// All available icons (Box Icons + social)
export const ALL_ICONS: Record<string, IconType> = {
  ...(BoxIcons as Record<string, IconType>),
  ...SOCIAL_ICONS,
}

// All icon keys as sorted array (for search/pagination)
export const ALL_ICON_KEYS = Object.keys(ALL_ICONS).sort()
