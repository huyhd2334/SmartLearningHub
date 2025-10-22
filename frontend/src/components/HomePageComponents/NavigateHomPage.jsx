"use client";
import React from "react";
import { Link } from "react-router-dom"
import { CircleCheckIcon, CircleHelpIcon, CircleIcon, UserCog } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const VocabFunction = [
  {
    title: "New Vocab",
    href: "/",
    description:
      "Study new words with spaced repetition.",
  },
  {
    title: "Your Lib",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Daily Vocab challenge",
    href: "/docs/primitives/scroll-area",
    description: "Explore 20 worlds per day to keep your streak",
  },
  {
    title: "All Vocabulary",
    href: "/ShowAllVocabPage",
    description:
      "a font, a fortiori, a posteriori, .... ",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when hovered or focused.",
  },
];

const NavigationHomePage = (user) => {
  return (
    <NavigationMenu className = "fixed top-3 space-x-10 bg rounded-4xl w-200 shadow-md py-1 px-6 ">
      <NavigationMenuList className="flex flex-wrap gap-1">
        {/* HOME */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-lg font-semibold px-4 py-3 hover:bg-gray-100 rounded-lg">Home</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    href="/"
                    className="flex flex-col justify-end h-full w-full rounded-md bg-gradient-to-b from-muted/50 to-muted p-4 md:p-6 no-underline outline-hidden transition-all duration-200 select-none focus:shadow-md"
                  >
                    <div className="mb-2 text-lg font-medium sm:mt-4">
                      shadcn/ui
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Beautifully designed components built with Tailwind CSS.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>

              <ListItem href="/docs" title="Introduction">
                Reusable components built using Radix UI and Tailwind CSS.
              </ListItem>
              <ListItem href="/docs/installation" title="Installation">
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Typography">
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* COMPONENTS */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-lg font-semibold px-4 py-3 hover:bg-gray-100 rounded-lg">Vocabulary</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {VocabFunction.map((item) => (
                <ListItem
                  key={item.title}
                  title={item.title}
                  href={item.href}
                >
                  {item.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* DOCS */}
        {/* <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/docs">Docs</Link>
          </NavigationMenuLink>
        </NavigationMenuItem> */}

        {/* Gramma */}
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger className="text-lg font-semibold px-4 py-3 hover:bg-gray-100 rounded-lg">Gramma</NavigationMenuTrigger>
          <NavigationMenuContent side="left" align="start">
            <ul className="grid w-[600px] gap-4 p-4">
              <li className="flex flex-col gap-2">
                <MenuLink title="Components" description="Browse all components in the library." />
                <MenuLink title="Documentation" description="Learn how to use the library." />
                <MenuLink title="Blog" description="Read our latest blog posts." />
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* SIMPLE */}
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger className="text-lg font-semibold px-4 py-3 hover:bg-gray-100 rounded-lg">Toeic</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[600px] gap-2 p-4">
              <li className="flex flex-col gap-2">
                <SimpleLink title="Components" />
                <SimpleLink title="Documentation" />
                <SimpleLink title="Blocks" />
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* WITH ICON */}
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger> <UserCog className="w-5 h-5"/> </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[600px] gap-2 p-4">
              <li className="flex flex-col gap-2">
                <IconLink icon={<CircleHelpIcon />} label="Backlog" />
                <IconLink icon={<CircleIcon />} label="To Do" />
                <IconLink icon={<CircleCheckIcon />} label="Done" />
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

/* ===== COMPONENT PHỤ ===== */

function ListItem({ title, children, href }) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          to={href}
          className="block p-3 rounded-md hover:bg-accent transition"
        >
          <div className="font-medium text-sm">{title}</div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

function MenuLink({ title, description }) {
  return (
    <NavigationMenuLink asChild>
      <Link href="#" className="hover:text-primary">
        <div className="font-medium">{title}</div>
        <div className="text-muted-foreground text-sm">{description}</div>
      </Link>
    </NavigationMenuLink>
  );
}

function SimpleLink({ title }) {
  return (
    <NavigationMenuLink asChild>
      <Link href="#" className="hover:text-primary">
        {title}
      </Link>
    </NavigationMenuLink>
  );
}

function IconLink({ icon, label }) {
  return (
    <NavigationMenuLink asChild>
      <Link href="#" className="flex items-center gap-2 hover:text-primary">
        {icon}
        {label}
      </Link>
    </NavigationMenuLink>
  );
}

export default NavigationHomePage