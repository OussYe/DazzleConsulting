import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ArrowLeft, ArrowRight, Trash2, Save, Plus, GripVertical } from 'lucide-react';

import { useMenu } from '../../contexts/MenuContext';
import { useLanguage } from '../../contexts/LanguageContext';

// MenuItem component with drag-and-drop functionality
const SortableMenuItem = ({ id, item, onEdit, onDelete, onAddChild, level = 0 }) => {
  const { language } = useLanguage();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className={`pl-${level * 4}`}>
      <div className="flex items-center p-3 my-1 bg-white rounded-md shadow-sm border border-gray-200 hover:border-teal">
        {/* Drag Handle */}
        <div {...attributes} {...listeners} className="cursor-grab">
          <GripVertical size={20} className="text-gray-400" />
        </div>
        
        {/* Menu Item Content */}
        <div className="ml-3 flex-grow">
          <div className="font-medium">{item.label[language]}</div>
          <div className="text-xs text-gray-500">Path: {item.path}</div>
        </div>
        
        {/* Actions */}
        <div className="flex space-x-2">
          <button 
            onClick={() => onEdit(id)}
            className="p-1.5 rounded-md hover:bg-gray-100 text-slate-gray"
            title="Edit"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9"></path>
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
            </svg>
          </button>
          
          <button 
            onClick={() => onAddChild(id)}
            className="p-1.5 rounded-md hover:bg-gray-100 text-teal"
            title="Add Child Item"
          >
            <Plus size={18} />
          </button>
          
          <button 
            onClick={() => onDelete(id)}
            className="p-1.5 rounded-md hover:bg-gray-100 text-red-500"
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

const MenuEditor: React.FC = () => {
  const { menuItems, updateMenuItem, addMenuItem, removeMenuItem } = useMenu();
  const { language } = useLanguage();
  
  const [editMode, setEditMode] = useState<'view' | 'edit'>('view');
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  
  // For drag and drop functionality
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleEditItem = (id: string) => {
    const item = menuItems.find(item => item.id === id);
    if (item) {
      setEditingItem({ ...item });
      setEditMode('edit');
    }
  };

  const handleAddItem = () => {
    const newId = `item-${Date.now()}`;
    setEditingItem({
      id: newId,
      label: { fr: '', en: '' },
      path: '',
      order: menuItems.length + 1,
    });
    setEditMode('edit');
  };

  const handleAddChildItem = (parentId: string) => {
    const parent = menuItems.find(item => item.id === parentId);
    const newId = `${parentId}-child-${Date.now()}`;
    
    if (parent) {
      setEditingItem({
        id: newId,
        label: { fr: '', en: '' },
        path: '',
        parent: parentId,
        order: menuItems.filter(item => item.parent === parentId).length + 1,
      });
      setEditMode('edit');
    }
  };

  const handleSaveItem = () => {
    if (editingItem) {
      const existingItem = menuItems.find(item => item.id === editingItem.id);
      
      if (existingItem) {
        // Update existing item
        updateMenuItem(editingItem.id, editingItem);
      } else {
        // Add new item
        addMenuItem(editingItem);
      }
      
      setEditMode('view');
      setEditingItem(null);
    }
  };

  const handleDeleteItem = (id: string) => {
    if (window.confirm(language === 'fr' 
      ? 'Êtes-vous sûr de vouloir supprimer cet élément de menu et tous ses enfants ?'
      : 'Are you sure you want to delete this menu item and all its children?')) {
      removeMenuItem(id);
    }
  };

  const handleCancelEdit = () => {
    setEditMode('view');
    setEditingItem(null);
  };

  const handleDragEnd = (event) => {
    // Handle reordering logic here
    console.log('Drag ended:', event);
  };

  // Get top-level menu items for the editor
  const topLevelItems = menuItems
    .filter(item => !item.parent)
    .sort((a, b) => a.order - b.order);

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-gray">
          {language === 'fr' ? 'Éditeur de Menu' : 'Menu Editor'}
        </h1>
        
        <div className="flex space-x-3">
          {/* Toggle Preview Mode */}
          <div className="bg-white rounded-md shadow-sm border border-gray-200 flex">
            <button
              className={`px-3 py-1.5 text-sm ${
                previewMode === 'desktop' 
                  ? 'bg-teal text-white' 
                  : 'bg-white text-slate-gray'
              }`}
              onClick={() => setPreviewMode('desktop')}
            >
              Desktop
            </button>
            <button
              className={`px-3 py-1.5 text-sm ${
                previewMode === 'mobile' 
                  ? 'bg-teal text-white' 
                  : 'bg-white text-slate-gray'
              }`}
              onClick={() => setPreviewMode('mobile')}
            >
              Mobile
            </button>
          </div>
          
          {/* Add Menu Item Button */}
          <button
            onClick={handleAddItem}
            className="btn btn-primary"
          >
            <Plus size={18} className="mr-2" />
            {language === 'fr' ? 'Ajouter un élément' : 'Add Item'}
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Menu Editor */}
        <div className="bg-off-white rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-slate-gray">
            {language === 'fr' ? 'Structure du Menu' : 'Menu Structure'}
          </h2>
          
          {editMode === 'view' ? (
            <div>
              <DndContext 
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext 
                  items={topLevelItems.map(item => item.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {topLevelItems.map(item => (
                    <div key={item.id}>
                      <SortableMenuItem 
                        id={item.id}
                        item={item}
                        onEdit={handleEditItem}
                        onDelete={handleDeleteItem}
                        onAddChild={handleAddChildItem}
                      />
                      
                      {/* Child Items */}
                      {menuItems
                        .filter(child => child.parent === item.id)
                        .sort((a, b) => a.order - b.order)
                        .map(child => (
                          <div key={child.id} className="ml-8">
                            <SortableMenuItem 
                              id={child.id}
                              item={child}
                              onEdit={handleEditItem}
                              onDelete={handleDeleteItem}
                              onAddChild={handleAddChildItem}
                              level={1}
                            />
                          </div>
                        ))
                      }
                    </div>
                  ))}
                </SortableContext>
              </DndContext>
              
              {topLevelItems.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  {language === 'fr' 
                    ? 'Aucun élément de menu. Cliquez sur "Ajouter un élément" pour commencer.'
                    : 'No menu items. Click "Add Item" to get started.'
                  }
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-medium mb-4 text-slate-gray">
                {editingItem && editingItem.id.includes('item-') 
                  ? (language === 'fr' ? 'Nouvel élément de menu' : 'New Menu Item')
                  : (language === 'fr' ? 'Modifier l\'élément de menu' : 'Edit Menu Item')
                }
              </h3>
              
              <div className="space-y-4">
                {/* ID Field (readonly) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ID
                  </label>
                  <input
                    type="text"
                    value={editingItem?.id || ''}
                    readOnly
                    className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-500"
                  />
                </div>
                
                {/* Label Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {language === 'fr' ? 'Libellé (Français)' : 'Label (French)'}
                    </label>
                    <input
                      type="text"
                      value={editingItem?.label?.fr || ''}
                      onChange={(e) => setEditingItem({
                        ...editingItem,
                        label: { ...editingItem.label, fr: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {language === 'fr' ? 'Libellé (Anglais)' : 'Label (English)'}
                    </label>
                    <input
                      type="text"
                      value={editingItem?.label?.en || ''}
                      onChange={(e) => setEditingItem({
                        ...editingItem,
                        label: { ...editingItem.label, en: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal"
                    />
                  </div>
                </div>
                
                {/* Path Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'fr' ? 'Chemin' : 'Path'}
                  </label>
                  <input
                    type="text"
                    value={editingItem?.path || ''}
                    onChange={(e) => setEditingItem({
                      ...editingItem,
                      path: e.target.value
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal"
                  />
                </div>
                
                {/* Parent Selection */}
                {!editingItem?.parent && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {language === 'fr' ? 'Parent (optionnel)' : 'Parent (optional)'}
                    </label>
                    <select
                      value={editingItem?.parent || ''}
                      onChange={(e) => setEditingItem({
                        ...editingItem,
                        parent: e.target.value || undefined
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal"
                    >
                      <option value="">
                        {language === 'fr' ? '-- Aucun parent --' : '-- No parent --'}
                      </option>
                      {topLevelItems
                        .filter(item => item.id !== editingItem?.id)
                        .map(item => (
                          <option key={item.id} value={item.id}>
                            {item.label[language]}
                          </option>
                        ))
                      }
                    </select>
                  </div>
                )}
                
                {/* Order Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'fr' ? 'Ordre' : 'Order'}
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={editingItem?.order || 1}
                    onChange={(e) => setEditingItem({
                      ...editingItem,
                      order: parseInt(e.target.value)
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal"
                  />
                </div>
                
                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-2">
                  <button
                    onClick={handleCancelEdit}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    {language === 'fr' ? 'Annuler' : 'Cancel'}
                  </button>
                  <button
                    onClick={handleSaveItem}
                    className="btn btn-primary"
                  >
                    <Save size={18} className="mr-2" />
                    {language === 'fr' ? 'Enregistrer' : 'Save'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Menu Preview */}
        <div className="bg-off-white rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-slate-gray flex items-center justify-between">
            <span>
              {language === 'fr' ? 'Aperçu du Menu' : 'Menu Preview'}
            </span>
            <span className="text-sm font-normal text-gray-500">
              {language === 'fr' ? 'Mode: ' : 'Mode: '}
              <span className="text-teal font-medium">
                {previewMode === 'desktop' 
                  ? (language === 'fr' ? 'Bureau' : 'Desktop') 
                  : (language === 'fr' ? 'Mobile' : 'Mobile')
                }
              </span>
            </span>
          </h2>
          
          <div className={`border border-gray-200 rounded-lg overflow-hidden ${
            previewMode === 'desktop' ? 'p-4 bg-white' : 'w-64 mx-auto bg-white'
          }`}>
            {previewMode === 'desktop' ? (
              <div className="flex items-center space-x-8">
                {/* Logo Placeholder */}
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-slate-gray rounded-md"></div>
                  <span className="ml-2 font-medium">DazzleConsulting</span>
                </div>
                
                {/* Desktop Menu */}
                <nav className="flex items-center space-x-6">
                  {topLevelItems.map(item => (
                    <div key={item.id} className="relative group">
                      <button className="flex items-center text-sm font-medium text-slate-gray">
                        {item.label[language]}
                        {menuItems.some(child => child.parent === item.id) && (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                        )}
                      </button>
                      
                      {/* Dropdown */}
                      {menuItems.some(child => child.parent === item.id) && (
                        <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                          {menuItems
                            .filter(child => child.parent === item.id)
                            .sort((a, b) => a.order - b.order)
                            .map(child => (
                              <a
                                key={child.id}
                                href="#"
                                className="block px-4 py-2 text-sm text-slate-gray hover:bg-gray-100 hover:text-teal"
                              >
                                {child.label[language]}
                              </a>
                            ))
                          }
                        </div>
                      )}
                    </div>
                  ))}
                </nav>
              </div>
            ) : (
              <div className="p-4">
                {/* Mobile Header */}
                <div className="flex items-center justify-between mb-4">
                  <button className="p-2 rounded-md bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="3" y1="12" x2="21" y2="12"></line>
                      <line x1="3" y1="6" x2="21" y2="6"></line>
                      <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                  </button>
                  
                  <div className="w-8 h-8 bg-slate-gray rounded-md"></div>
                  
                  <div className="w-8 h-8"></div> {/* Spacer for alignment */}
                </div>
                
                {/* Mobile Menu Content */}
                <nav className="py-2">
                  {topLevelItems.map(item => (
                    <div key={item.id} className="mb-2">
                      <div className="flex items-center justify-between py-2 border-b border-gray-100">
                        <span className="text-sm font-medium">
                          {item.label[language]}
                        </span>
                        
                        {menuItems.some(child => child.parent === item.id) && (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6"></polyline>
                          </svg>
                        )}
                      </div>
                      
                      {/* Submenu Items (simplified, not interactive in preview) */}
                      {false && menuItems.some(child => child.parent === item.id) && (
                        <div className="pl-4 py-2">
                          {menuItems
                            .filter(child => child.parent === item.id)
                            .sort((a, b) => a.order - b.order)
                            .map(child => (
                              <div
                                key={child.id}
                                className="py-2 text-sm text-gray-600"
                              >
                                {child.label[language]}
                              </div>
                            ))
                          }
                        </div>
                      )}
                    </div>
                  ))}
                </nav>
              </div>
            )}
          </div>
          
          <div className="mt-6 bg-white rounded-lg p-4 border border-gray-200">
            <h3 className="text-sm font-medium text-slate-gray mb-2">
              {language === 'fr' ? 'Conseils d\'édition' : 'Editing Tips'}
            </h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start">
                <span className="text-teal mr-2">•</span>
                <span>
                  {language === 'fr' 
                    ? 'Glissez et déposez les éléments pour réorganiser le menu'
                    : 'Drag and drop items to reorder the menu'
                  }
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-teal mr-2">•</span>
                <span>
                  {language === 'fr' 
                    ? 'Cliquez sur le bouton + pour ajouter un sous-élément'
                    : 'Click the + button to add a child item'
                  }
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-teal mr-2">•</span>
                <span>
                  {language === 'fr' 
                    ? 'Les modifications sont automatiquement enregistrées pour tous les utilisateurs'
                    : 'Changes are automatically saved for all users'
                  }
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuEditor;
