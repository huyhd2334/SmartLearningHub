"use client";
import React from "react";
import { Link } from "react-router-dom";
import { CircleCheckIcon, CircleHelpIcon, CircleIcon, UserCog } from "lucide-react";
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
    title: "New Vocab",
    href: "/",
    description: "Study new words with spaced repetition.",
  },
  {
    title: "Your Lib",
    href: "/yourlibpage",
    description: "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/progress",
    description: "Displays progress of your learning path.",
  },
  {
    title: "Daily Vocab challenge",
    href: "/dailyvocab",
    description: "Explore 20 words per day to keep your streak.",
  },
  {
    title: "All Vocabulary",
    href: "/ShowAllVocabPage",
    description: "a font, a fortiori, a posteriori, .... ",
  },
];

const ToeicFunction = [
  {
    title: "Part 1 - Photo",
    href: "/toeicpartfivepage",
    description: "Listen and choose the best description.",
  },
  {
    title: "Part 2 - Question Response",
    href: "/toeic/part2",
    description: "Listen and respond to short questions.",
  },
];

const NavigationHomePage = ({ user, streak }) => {
  return (
    <NavigationMenu className="fixed top-3 space-x-10 bg-white rounded-4xl w-200 shadow-md py-1 px-6">
      <NavigationMenuList className="flex flex-wrap gap-1">

        {/* Vocabulary */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-lg font-semibold px-4 py-3 hover:bg-gray-100 rounded-lg">
            Vocabulary
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {VocabFunction.map((item) => (
                <ListItem
                  key={item.title}
                  title={item.title}
                  href={item.href}
                  user={user}
                  streak={streak}
                >
                  {item.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Toeic */}
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger className="text-lg font-semibold px-4 py-3 hover:bg-gray-100 rounded-lg">
            Toeic
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[600px] gap-2 p-4 md:grid-cols-2">
              {ToeicFunction.map((item) => (
                <SimpleLink
                  key={item.title}
                  title={item.title}
                  href={item.href}
                  user={user}
                  streak={streak}
                />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* User icon */}
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger>
            <UserCog className="w-5 h-5" />
          </NavigationMenuTrigger>
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
};

/* ===== COMPONENT PHỤ ===== */
function ListItem({ title, children, href, user, streak }) {
  const stateToSend = { user, streak };
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          to={href}
          state={stateToSend}
          className="block p-3 rounded-md hover:bg-accent transition"
        >
          <div className="font-medium text-sm">{title}</div>
          <p className="text-sm text-muted-foreground line-clamp-2">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

function SimpleLink({ title, href, user, streak }) {
  const stateToSend = { user, streak };
  return (
    <NavigationMenuLink asChild>
      <Link
        to={href}
        state={stateToSend}
        className="block p-3 rounded-md hover:bg-accent transition"
      >
        <div className="font-medium text-sm">{title}</div>
      </Link>
    </NavigationMenuLink>
  );
}

function IconLink({ icon, label }) {
  return (
    <NavigationMenuLink asChild>
      <Link to="#" className="flex items-center gap-2 hover:text-primary">
        {icon}
        {label}
      </Link>
    </NavigationMenuLink>
  );
}

export default NavigationHomePage;
