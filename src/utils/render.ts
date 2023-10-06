export default function render(query: 'app', block: any) {
  const root = document.getElementById(query);
  root!.appendChild(block.getContent()!);
  return root;
}
