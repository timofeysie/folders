import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-folder-display',
  templateUrl: './folder-display.component.html',
  styleUrls: ['./folder-display.component.scss'],
})
export class FolderDisplayComponent {
  @Input() folder: any;
  @Input() index: number;
  @Output() addChild = new EventEmitter<string>();
  @Output() deleteNode = new EventEmitter<boolean>();
  addChildMode = false;
  ids = 0;

  handleAddChild() {
    this.addChildMode = true;
  }

  handleDeleteNode() {
    this.deleteNode.emit(true);
  }

  handleAddChildType(type: string) {
    this.addChild.emit(type);
    this.addChildMode = false;
  }

  /** TODO: Remove when reuseable folder component works */
  trackByFn(index: number, item: any) {
    return this.ids;
  }

  deleteFolder(i: number) {}

  onAddChild(type: string, index: number) {}

  confirmAdd(index: number) {}
}
