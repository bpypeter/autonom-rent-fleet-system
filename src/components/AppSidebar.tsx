
import * as React from "react"
import { ChevronUp, User2, Calendar, Car, FileText, DollarSign, Settings, LogOut, Users, BarChart3, ClipboardList, History, MessageSquare } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/contexts/AuthContext"
import { useNavigate } from "react-router-dom"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: BarChart3,
      roles: ['admin', 'operator']  // Removed 'client' from here
    },
    {
      title: "Vehicule",
      url: "/vehicles",
      icon: Car,
      roles: ['admin', 'operator', 'client']
    },
    {
      title: "Rezervările Mele",
      url: "/reservations",
      icon: Calendar,
      roles: ['client']  // Only for clients
    },
    {
      title: "Toate Rezervările",
      url: "/all-reservations",
      icon: FileText,
      roles: ['admin', 'operator']
    },
    {
      title: "Gestionare Flotă",
      url: "/fleet",
      icon: Car,
      roles: ['admin']
    },
    {
      title: "Returnări Vehicule",
      url: "/returns",
      icon: ClipboardList,
      roles: ['admin', 'operator']
    },
    {
      title: "Clienți",
      url: "/clients",
      icon: Users,
      roles: ['admin']
    },
    {
      title: "Plăți",
      url: "/payments",
      icon: DollarSign,
      roles: ['admin', 'operator']
    },
    {
      title: "Rapoarte",
      url: "/reports",
      icon: BarChart3,
      roles: ['admin']
    },
    {
      title: "Istoric",
      url: "/history",
      icon: History,
      roles: ['admin', 'operator', 'client']
    },
    {
      title: "Feedback",
      url: "/feedback",
      icon: MessageSquare,
      roles: ['admin', 'operator', 'client']
    },
    {
      title: "Setări",
      url: "/settings",
      icon: Settings,
      roles: ['admin']
    }
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const filteredNavItems = data.navMain.filter(item => 
    user?.role && item.roles.includes(user.role)
  )

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Car className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Autonom Services</span>
                  <span className="truncate text-xs">Rent a Car</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigare</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <User2 className="size-4" />
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user?.name || 'Utilizator'}</span>
                    <span className="truncate text-xs capitalize">{user?.role || 'client'}</span>
                  </div>
                  <ChevronUp className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut />
                  Deconectare
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
