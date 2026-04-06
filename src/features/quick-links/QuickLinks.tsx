import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useEffect, useState } from 'react';
import type { ShortcutItem } from '../../types';
import { getShortcuts, saveShortcuts } from '../../utils/storage';

function LinkCard({ item }: { item: ShortcutItem }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });

  return (
    <a
      ref={setNodeRef}
      href={item.url}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className="glass-card block p-3 text-sm"
      {...attributes}
      {...listeners}
    >
      <p className="font-medium">{item.title}</p>
      <p className="truncate text-xs text-white/70">{item.url}</p>
    </a>
  );
}

export function QuickLinks() {
  const [items, setItems] = useState<ShortcutItem[]>([]);

  useEffect(() => {
    void getShortcuts().then((existing) =>
      setItems(
        existing.length
          ? existing
          : [
              { id: '1', title: 'GitHub', url: 'https://github.com' },
              { id: '2', title: 'Stack Overflow', url: 'https://stackoverflow.com' }
            ]
      )
    );
  }, []);

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={({ active, over }) => {
        if (!over || active.id === over.id) return;
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const next = arrayMove(items, oldIndex, newIndex);
        setItems(next);
        void saveShortcuts(next);
      }}
    >
      <SortableContext items={items.map((item) => item.id)}>
        <div className="grid grid-cols-2 gap-3">
          {items.map((item) => (
            <LinkCard key={item.id} item={item} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
