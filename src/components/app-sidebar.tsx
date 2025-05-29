import * as React from "react";
import { ChevronRight, File, Folder } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  changes: [
    {
      file: "README.md",
      state: "M",
    },
    {
      file: "api/hello/route.ts",
      state: "U",
    },
    {
      file: "app/layout.tsx",
      state: "M",
    },
  ],
  tree: [
    [
      "mathematics",
      ["Rational Numbers", []],
      ["Linear Equations in One Variable", ["examples.md"]],
      ["Understanding Quadrilaterals", []],
      ["Practical Geometry", ["activity.docx"]],
    ],
    [
      "science",
      ["Crop Production and Management", []],
      ["Microorganisms: Friend and Foe", ["video.mp4"]],
      ["Materials: Metals and Non-Metals", ["experiment.xlsx"]],
      ["Synthetic Fibres and Plastics"],
    ],
    [
      "social-science",
      ["From Trade to Territory", ["map.kml"]],
      ["Ruling the Countryside", []],
      ["Tribals, Dikus and the Vision of a Golden Age", ["case-study.pdf"]],
      ["How, When and Where"],
    ],
    [
      "english",
      [
        "The Best Christmas Present in the World",
        ["The Tsunami", ["assignment.docx"]],
        "Glimpses of the Past",
        ["Bepin Choudhury’s Lapse of Memory", ["analysis.md"]],
      ],
    ],
    [
      "hindi",
      [
        "ध्वनि",
        ["लाख की चूड़ियाँ", ["प्रश्नोत्तर.docx"]],
        "बस की यात्रा",
        ["दीवानों की हस्ती", ["कविता.mp3"]],
      ],
    ],
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarContent>
        
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-semibold">
            Recent conversations
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.changes.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton>
                    <File />
                    {item.file}
                  </SidebarMenuButton>
                  <SidebarMenuBadge>{item.state}</SidebarMenuBadge>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-semibold">
            Course curriculum
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.tree.map((item, index) => (
                <Tree key={index} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

function Tree({ item }: { item: string | any[] }) {
  const [name, ...items] = Array.isArray(item) ? item : [item];

  if (!items.length) {
    return (
      <SidebarMenuButton
        isActive={name === "button.tsx"}
        className="data-[active=true]:bg-transparent"
      >
        <File />
        {name}
      </SidebarMenuButton>
    );
  }

  return (
    <SidebarMenuItem>
      <Collapsible
        className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
        defaultOpen={name === "components" || name === "ui"}
      >
        <CollapsibleTrigger asChild>
          <SidebarMenuButton>
            <ChevronRight className="transition-transform" />
            <Folder />
            {name}
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {items.map((subItem, index) => (
              <Tree key={index} item={subItem} />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
}
