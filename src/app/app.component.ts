import {Component, OnDestroy, OnInit} from '@angular/core';
import {Editor, Toolbar} from "ngx-editor";
import {dinoSchema} from "./custom-schema";
import {FormControl} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";
import {Schema} from "prosemirror-model";
import {ToolbarItem} from "ngx-editor/lib/types";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  destroy = new Subject();

  html = new FormControl



  editor = new Editor({ schema: dinoSchema });
  toolbar: Toolbar = [
    // default value
    [{ heading: ['h6', 'h5', 'h4', 'h3', 'h2' ] }],
    ['ordered_list', 'bullet_list', 'bold', 'italic','underline','image'],
  ];

  ngOnInit() {
    this.html.valueChanges.pipe(takeUntil(this.destroy)).subscribe(value => console.log(value));
  }

  ngOnDestroy(): void {
    this.destroy.next(null);
    this.editor.destroy();
  }
}
