/**
 * Remark plugin: converts ```mermaid code blocks into raw HTML
 * <pre class="mermaid"> elements before Shiki can touch them.
 */
import { visit } from 'unist-util-visit';

export function remarkMermaid() {
  return (tree) => {
    visit(tree, 'code', (node, index, parent) => {
      if (node.lang !== 'mermaid') return;

      // Replace the code node with raw HTML that Mermaid.js will pick up
      parent.children[index] = {
        type: 'html',
        value: `<pre class="mermaid">${node.value}</pre>`,
      };
    });
  };
}
