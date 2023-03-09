import {Component, Input, OnInit} from '@angular/core';
import { setBlockType } from 'prosemirror-commands';
import { EditorState, Plugin, PluginKey, Transaction } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

import { Editor } from 'ngx-editor';
import { isNodeActive } from 'ngx-editor/helpers';
import {dinos} from "../custom-schema";

@Component({
  selector: 'app-custom-menu',
  templateUrl: './custom-menu.component.html',
  styleUrls: ['./custom-menu.component.scss']
})
export class CustomMenuComponent implements OnInit {
  @Input() editor!: Editor;
  isActive = false;
  isDisabled = false;
  dinos = dinos

  onClick(e: MouseEvent, type = 'brontosaurus'): void {
    e.preventDefault();
    const { state, dispatch } = this.editor.view;
    this.insertDino(type)(state, dispatch);
  }

  insertDino(type: string) {
    return (state: EditorState, dispatch: (tr: Transaction) => void) => {
      const { schema, tr } = state;

      const nodeType = schema.nodes['dino'];
      if (!nodeType) {
        return false;
      }

      const node = nodeType.create({type, text: type})

      tr.replaceSelectionWith(node, false)
        .scrollIntoView();

      if (tr.docChanged) {
        dispatch?.(tr);
        return true;
      }

      return false;
    }
  }

  execute(state: EditorState, dispatch?: (tr: Transaction) => void): boolean {
    const { schema } = state;

    if (this.isActive) {
      return setBlockType(schema.nodes['dino'])(state, dispatch);
    }

    return setBlockType(schema.nodes['dino'])(state, dispatch);
  }

  update = (view: EditorView) => {
    const { state } = view;
    const { schema } = state;
    this.isActive = isNodeActive(state, schema.nodes['dino']);
    // this.isDisabled = !this.execute(state, undefined); // returns true if executable
  };

  ngOnInit(): void {
    const plugin = new Plugin({
      key: new PluginKey(`dino`),
      view: () => {
        return {
          update: this.update,
        };
      },
    });

    this.editor.registerPlugin(plugin);
  }

}
