import Block from "./Block";

export default function render(query: 'app', block: Block<Record<string, unknown>>) {
  const root = document.getElementById(query);
  root!.appendChild(block.getContent()!);
  return root;
}
