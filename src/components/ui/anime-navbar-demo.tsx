"use client"

import * as React from "react"
import { Home, User, Briefcase, Cpu, Mail } from "lucide-react"
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
    name: "Experience",
    url: "#experience",
    icon: Briefcase,
  },
  {
    name: "Stack",
    url: "#stack",
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
