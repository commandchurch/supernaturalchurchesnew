import React from 'react';

type DownlineNode = {
  id: string;
  name: string;
  level: number;
  status: 'active' | 'inactive';
  earnings: number;
  children?: DownlineNode[];
};

interface DownlineTreeProps {
  nodes: DownlineNode[];
  formatCurrency: (n: number) => string;
}

const DownlineItem = React.memo(({ node, formatCurrency }: { node: DownlineNode; formatCurrency: (n: number) => string }) => {
  return (
    <li>
      <div className="flex items-center justify-between p-3 bg-gray-700/40 border border-gray-600">
        <div>
          <div className="text-white font-semibold">{node.name} ({node.id})</div>
          <div className="flex items-center gap-2 mt-1">
            <span className={`px-2 py-0.5 text-xs border ${
              node.level === 1 ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
              node.level === 2 ? 'bg-green-500/20 text-green-400 border-green-500/30' :
              node.level === 3 ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' :
              'bg-orange-500/20 text-orange-400 border-orange-500/30'
            }`}>Level {node.level}</span>
            <span className={`px-2 py-0.5 text-xs ${node.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>{node.status}</span>
          </div>
        </div>
        <div className="text-white font-bold">{formatCurrency(node.earnings)}</div>
      </div>
      {node.children && node.children.length > 0 && (
        <div className="ml-4 md:ml-6 mt-2 border-l border-gray-700 pl-3 md:pl-4">
          <DownlineTree nodes={node.children} formatCurrency={formatCurrency} />
        </div>
      )}
    </li>
  );
});
DownlineItem.displayName = 'DownlineItem';

export default function DownlineTree({ nodes, formatCurrency }: DownlineTreeProps) {
  return (
    <ul className="space-y-3">
      {nodes.map((n) => (
        <DownlineItem key={n.id} node={n} formatCurrency={formatCurrency} />
      ))}
    </ul>
  );
}
