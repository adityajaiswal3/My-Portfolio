"use client"

import * as React from "react"
import { Home, User, Briefcase, Cpu, Mail, Award, Trophy } from "lucide-react"
import { AnimeNavBar } from "./anime-navbar"

const items = [
  {
    name: "Home",
    url: "#home",
    icon: Home,
  },
  {
    name: "About",
    url: "#about",
    icon: User,
  },
  {
    name: "Projects",
    url: "#projects",
    icon: Briefcase,
  },
  {
    name: "Achievements",
    url: "#achievements",
    icon: Trophy,
  },
  {
    name: "Certificates",
    url: "#certifications",
    icon: Award,
  },
  {
    name: "Skills",
    url: "#skills",
    icon: Cpu,
  },
  {
    name: "Connect",
    url: "#connect",
    icon: Mail,
  },
]

export function AnimeNavBarDemo() {
  return <AnimeNavBar items={items} defaultActive="Home" />
}
