import React, { createContext, useContext, useState, useEffect } from 'react';

// Types
type MenuItem = {
  id: string;
  label: {
    fr: string;
    en: string;
  };
  path: string;
  parent?: string;
  order: number;
  children?: MenuItem[];
};

interface MenuContextType {
  menuItems: MenuItem[];
  setMenuItems: (items: MenuItem[]) => void;
  updateMenuItem: (id: string, data: Partial<MenuItem>) => void;
  addMenuItem: (item: MenuItem) => void;
  removeMenuItem: (id: string) => void;
  getMenuTree: () => MenuItem[];
}

// Initial menu items
const defaultMenuItems: MenuItem[] = [
  {
    id: 'about',
    label: { fr: 'À propos', en: 'About' },
    path: '/about/history',
    order: 1,
  },
  {
    id: 'about-history',
    label: { fr: 'Histoire', en: 'History' },
    path: '/about/history',
    parent: 'about',
    order: 1,
  },
  {
    id: 'about-team',
    label: { fr: 'Équipe', en: 'Team' },
    path: '/about/team',
    parent: 'about',
    order: 2,
  },
  {
    id: 'services',
    label: { fr: 'Services', en: 'Services' },
    path: '/services/digital-strategy',
    order: 2,
  },
  {
    id: 'services-digital',
    label: { fr: 'Stratégie digitale', en: 'Digital Strategy' },
    path: '/services/digital-strategy',
    parent: 'services',
    order: 1,
  },
  {
    id: 'services-branding',
    label: { fr: 'Branding', en: 'Branding' },
    path: '/services/branding',
    parent: 'services',
    order: 2,
  },
  {
    id: 'services-advertising',
    label: { fr: 'Publicité', en: 'Advertising' },
    path: '/services/advertising',
    parent: 'services',
    order: 3,
  },
  {
    id: 'references',
    label: { fr: 'Références', en: 'References' },
    path: '/references',
    order: 3,
  },
  {
    id: 'articles',
    label: { fr: 'Articles', en: 'Articles' },
    path: '/articles',
    order: 4,
  },
  {
    id: 'contact',
    label: { fr: 'Contact', en: 'Contact' },
    path: '/contact',
    order: 5,
  },
];

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    // Try to get menu items from localStorage, fallback to default
    const storedItems = localStorage.getItem('dazzleMenuItems');
    return storedItems ? JSON.parse(storedItems) : defaultMenuItems;
  });

  useEffect(() => {
    // Save menu items to localStorage
    localStorage.setItem('dazzleMenuItems', JSON.stringify(menuItems));
  }, [menuItems]);

  const updateMenuItem = (id: string, data: Partial<MenuItem>) => {
    setMenuItems(items => 
      items.map(item => 
        item.id === id ? { ...item, ...data } : item
      )
    );
  };

  const addMenuItem = (item: MenuItem) => {
    setMenuItems(items => [...items, item]);
  };

  const removeMenuItem = (id: string) => {
    // Remove the item and any children
    setMenuItems(items => 
      items.filter(item => item.id !== id && item.parent !== id)
    );
  };

  // Build a hierarchical menu tree
  const getMenuTree = (): MenuItem[] => {
    const rootItems = menuItems
      .filter(item => !item.parent)
      .sort((a, b) => a.order - b.order);
    
    return rootItems.map(item => {
      const children = menuItems
        .filter(child => child.parent === item.id)
        .sort((a, b) => a.order - b.order);
      
      return {
        ...item,
        children: children.length > 0 ? children : undefined
      };
    });
  };

  return (
    <MenuContext.Provider value={{ 
      menuItems, 
      setMenuItems, 
      updateMenuItem, 
      addMenuItem, 
      removeMenuItem,
      getMenuTree
    }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};
