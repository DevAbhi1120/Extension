import GridLayout, { type Layout } from 'react-grid-layout';
import { canEmbedInWorkspace } from '../../utils/security';

const panels = [
  { i: 'docs', x: 0, y: 0, w: 6, h: 6, url: 'https://developer.mozilla.org' },
  { i: 'wiki', x: 6, y: 0, w: 6, h: 6, url: 'https://wikipedia.org' }
];

export function WorkspacePanels() {
  const layout: Layout[] = panels.map(({ i, x, y, w, h }) => ({ i, x, y, w, h }));

  return (
    <GridLayout className="layout" layout={layout} cols={12} rowHeight={38} width={960} isResizable isDraggable>
      {panels.map((panel) => (
        <div key={panel.i} className="glass-card overflow-hidden">
          {canEmbedInWorkspace(panel.url) ? (
            <iframe title={panel.i} src={panel.url} className="h-full w-full border-none" loading="lazy" sandbox="allow-scripts allow-same-origin" />
          ) : (
            <p className="p-3 text-xs text-white/80">Blocked by iframe allowlist</p>
          )}
        </div>
      ))}
    </GridLayout>
  );
}
