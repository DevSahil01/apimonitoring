import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilExternalLink,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilGraph,
  cilWarning,
  cilBarChart,
  cilSettings,
  cilListRich,
  cilClock,
  cilStorage
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Projects',
    to: '/projects',
    icon: <CIcon icon={cilStorage} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'New',
    },
  },
  {
    component: CNavTitle,
    name: 'Analytics',
  },
  {
    component: CNavGroup,
    name: 'Project Analytics',
    to: '/analytics',
    icon: <CIcon icon={cilGraph} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Overview',
        to: '/analytics/overview',
      },
      {
        component: CNavItem,
        name: 'Active Projects',
        to: '/analytics/active-projects',
      },
      {
        component: CNavItem,
        name: 'Project Performance',
        to: '/analytics/performance',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Performance Metrics',
    to: '/analytics/performance',
    icon: <CIcon icon={cilBarChart} customClassName="nav-icon" />
    // items: [
    //   {
    //     component: CNavItem,
    //     name: 'Response Times',
    //     to: '/metrics/response',
    //   },
    //   {
    //     component: CNavItem,
    //     name: 'Throughput',
    //     to: '/metrics/throughput',
    //   },
    //   {
    //     component: CNavItem,
    //     name: 'Resource Usage',
    //     to: '/metrics/resources',
    //   },
    // ],
  },
  {
    component: CNavItem,
    name: 'Error Analytics',
    to: '/analytics/errors',
    icon: <CIcon icon={cilWarning} customClassName="nav-icon" />,
    // items: [
    //   {
    //     component: CNavItem,
    //     name: 'Error Dashboard',
    //     to: '/errors/dashboard',
    //   },
    //   {
    //     component: CNavItem,
    //     name: 'Error Trends',
    //     to: '/errors/trends',
    //   },
    //   {
    //     component: CNavItem,
    //     name: 'Error Types',
    //     to: '/errors/types',
    //   },
    // ],
  },
 
  {
    component: CNavGroup,
    name: 'Logs',
    to: '/logs',
    icon: <CIcon icon={cilListRich} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Recent Logs',
        to: '/logs/recent',
      },
      {
        component: CNavItem,
        name: 'Search Logs',
        to: '/logs/search',
      },
      {
        component: CNavItem,
        name: 'Log Patterns',
        to: '/logs/patterns',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Historical Data',
    to: '/history',
    icon: <CIcon icon={cilClock} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Trend Analysis',
        to: '/history/trends',
      },
      {
        component: CNavItem,
        name: 'Comparisons',
        to: '/history/comparisons',
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'Administration',
  },
  {
    component: CNavItem,
    name: 'Settings',
    to: '/settings',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Documentation',
    href: 'https://coreui.io/react/docs/templates/installation/',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
]

export default _nav