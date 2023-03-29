import {Schema, NodeSpec} from "prosemirror-model"
import {schema} from "ngx-editor"

export const dinos = ["brontosaurus", "stegosaurus", "triceratops", "tyrannosaurus", "pterodactyl"];

const style = `
  padding: 4px 8px;
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  color: #397FFF;
  background: rgba(57, 127, 255, 0.1);
  border-radius: 4px;
`;

const dinoNodeSpec: NodeSpec = {
  attrs: {
    type: {default: "brontosaurus"},
    text: {default: ""},
  },
  inline: true,
  group: "inline",
  draggable: true,
  parseDOM: [{
    tag: "span",
    getAttrs: dom => ({
      type: (dom as HTMLElement).getAttribute("dino-type"),
      text: (dom as HTMLElement).textContent,
    }),
  }],
  toDOM: (node) => {
    const { type, text } = node.attrs;
    return ["span", {'dino-type': type, title: type, style}, text ]
  },
}

export const dinoSchema = new Schema({
  nodes: schema.spec.nodes.addToEnd('dino', dinoNodeSpec),
  marks: schema.spec.marks
})
