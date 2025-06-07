
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { 
  Calendar, 
  Car, 
  FileText, 
  CreditCard, 
  MessageSquare, 
  History,
  Settings,
  Users,
  BarChart3
} from 'lucide-react';

const menuItems = {
  client: [
    { title: 'Rezervări', url: '/reservations', icon: Calendar },
    { title: 'Vehicule Disponibile', url: '/vehicles', icon: Car },
    { title: 'Istoricul Meu', url: '/history', icon: History },
    { title: 'Feedback', url: '/feedback', icon: MessageSquare },
  ],
  operator: [
    { title: 'Administrare Flotă', url: '/fleet', icon: Car },
    { title: 'Rezervări', url: '/reservations', icon: Calendar },
    { title: 'Returnări', url: '/returns', icon: FileText },
    { title: 'Clienți', url: '/clients', icon: Users },
  ],
  admin: [
    { title: 'Dashboard', url: '/dashboard', icon: BarChart3 },
    { title: 'Toate Rezervările', url: '/all-reservations', icon: Calendar },
    { title: 'Administrare Flotă', url: '/fleet', icon: Car },
    { title: 'Plăți', url: '/payments', icon: CreditCard },
    { title: 'Clienți', url: '/clients', icon: Users },
    { title: 'Rapoarte', url: '/reports', icon: FileText },
    { title: 'Setări', url: '/settings', icon: Settings },
  ]
};

export const AppSidebar: React.FC = () => {
  const { user } = useAuth();
  const items = user ? menuItems[user.role] : [];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigare</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-2">
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
