"use client";
import React from "react";
import { Link } from "react-router-dom";
import { LogOut, UserCog } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const VocabFunction = [
  {
    title: "Vocab Topics",
    href: "/vocab/topicspage",
    description: "Study new words with spaced repetition.",
  },
  {
    title: "Your Lib",
    href: "/vocab/yourlibpage",
    description: "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/vocab/progress",
    description: "Displays progress of your learning path.",
  },
  {
    title: "Daily Vocab challenge",
    href: "/dailyvocab",
    description: "Explore 20 words per day to keep your streak.",
  },
  {
    title: "All Vocabulary",
    href: "/vocab/showallvocabpage",
    description: "a font, a fortiori, a posteriori, .... ",
  },
  {
    title: "Flash Cards",
    href: "/flashcardpage",
    description: "flash card to learn vocabs faster"
  }
];

const ToeicFunction = [
  {
    title: "Part 5 - 30 questions",
    href: "/toeic/toeicpartfivepage",
    description: "chose the best answer",
  },
  {
    title: "Part 6 ",
    href: "/",
    description: "",
  },
  {
    title: "Part 7 ",
    href: "/",
    description: "",
  },
  {
    title: "Part 1 ",
    href: "/",
    description: "",
  },
  {
    title: "Part 2 ",
    href: "/",
    description: "",
  },
  {
    title: "Part 3 ",
    href: "/",
    description: "",
  },
  {
    title: "Part 4 ",
    href: "/",
    description: "",
  },
];

const hskFunction = [
  {
    title: "Hsk 1",
    href: "/toeicpartfivepage",
    description: "chose the best answer",
  },
  {
    title: "Hsk 2 ",
    href: "/",
    description: "",
  },
  {
    title: "Hsk 3 ",
    href: "/",
    description: "",
  },
  {
    title: "Hsk 4 ",
    href: "/",
    description: "",
  },
  {
    title: "Hsk 5 ",
    href: "/",
    description: "",
  },
  {
    title: "Hsk 6 ",
    href: "/",
    description: "",
  },
  {
    title: "Hsk 7 ",
    href: "/",
    description: "",
  },
  {
    title: "Hsk 8 ",
    href: "/",
    description: "",
  },
  {
    title: "Hsk 9 ",
    href: "/",
    description: "",
  },
];

const NavigationHome = ({langue}) => {
  return (
    <NavigationMenu className="mx-auto max-w-7xl py-1 px-6">
      <NavigationMenuList className="flex w-full items-center justify-between gap-8 bg-gray-50">

        {/* Vocabulary */}
        <NavigationMenuItem className="flex-1 flex justify-center bg-white">
          <NavigationMenuTrigger className="text-xl px-4 py-3 hover:bg-gray-100 rounded-lg">
            Vocabulary
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-white rounded-md">
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

        {/* Toeic */}
        <NavigationMenuItem className="relative">
          <NavigationMenuTrigger className="text-xl px-4 py-3 hover:bg-gray-100 rounded-lg">
              {langue === "english" ? <a>Toeic</a> : <a>Hsk</a>}
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-white rounded-md">
            <ul className="grid w-[600px] gap-2 p-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {(langue === "english" ? ToeicFunction : hskFunction).map((item) => (
                <li key={item.title}>
                  <SimpleLink
                    title={item.title}
                    href={item.href}
                  />
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* User icon */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <UserCog className="w-7 h-7" />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[300px] gap-2 p-4">
              <li className="flex flex-col gap-2">
                <IconLink icon={<LogOut/>} label="log out" />
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

/* ===== COMPONENT PHỤ ===== */
function ListItem({ title, children, href}) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          to={href}
          className="block p-3 rounded-md hover:bg-accent transition"
        >
          <div className="font-medium text-sm">{title}</div>
          <p className="text-sm text-muted-foreground line-clamp-2">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

function SimpleLink({ title, href}) {
  return (
    <NavigationMenuLink asChild>
      <Link
        to={href}
        className="block p-3 rounded-md hover:bg-accent transition"
      >
        <div className="font-medium text-sm">{title}</div>
      </Link>
    </NavigationMenuLink>
  );
}

function IconLink() {
  return (
    <NavigationMenuLink asChild>
      <Link to="/" className="flex items-center gap-2 hover:text-primary">
      </Link>
    </NavigationMenuLink>
  );
}

export default NavigationHome;
