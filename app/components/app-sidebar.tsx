import {
  Box,
  ChevronRight,
  FlaskConical,
  Home,
  Paintbrush,
  Play,
} from "lucide-react";
import { Link, useLocation } from "react-router";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarHeader,
  SidebarTrigger,
} from "~/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";

const navigation = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Three.js Journey",
    icon: Box,
    url: "/three-js-journey",
    children: [
      { title: "Basic Scene", url: "/three-js-journey/basic-scene" },
      { title: "Cameras", url: "/three-js-journey/cameras" },
      { title: "Text", url: "/three-js-journey/text" },
      { title: "Shaders", url: "/three-js-journey/shaders" },
      { title: "Particles", url: "/three-js-journey/particles" },
    ],
  },
  {
    title: "Animation",
    icon: Play,
    url: "/animation",
    children: [
      { title: "Text Rollup", url: "/animation/text-rollup" },
      { title: "Sticky Cursor", url: "/animation/sticky-cursor" },
      { title: "Perspective", url: "/animation/perspective" },
      { title: "Parallax Bento", url: "/animation/parallax-bento" },
      { title: "Mask Cursor", url: "/animation/mask-cursor" },
      { title: "Text Along Path", url: "/animation/text-along-path" },
      { title: "Card Parallax", url: "/animation/card-parallax" },
      { title: "Zoom Parallax", url: "/animation/zoom-parallax" },
      { title: "Sticky Footer", url: "/animation/sticky-footer" },
      {
        title: "Text Scroll Gradient",
        url: "/animation/text-scroll-gradient",
      },
    ],
  },
  {
    title: "Design",
    icon: Paintbrush,
    url: "/design",
    children: [],
  },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar variant="floating" className="p-4 pr-0">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center justify-between">
              <SidebarMenuButton size="lg" asChild>
                <Link to="/">
                  <FlaskConical className="size-5" />
                  <span className="text-lg font-bold">Lab</span>
                </Link>
              </SidebarMenuButton>
              <SidebarTrigger />
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarMenu>
            {navigation.map((item) =>
              item.children ? (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={location.pathname.startsWith(item.url)}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip={item.title}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.children.map((child) => (
                          <SidebarMenuSubItem key={child.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={location.pathname === child.url}
                            >
                              <Link to={child.url}>
                                <span>{child.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ) : (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    isActive={location.pathname === item.url}
                  >
                    <Link to={item.url}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ),
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
