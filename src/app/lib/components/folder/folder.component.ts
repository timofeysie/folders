import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss'],
})
export class FolderComponent {
  @Input() folderForm: any;
  @Input() index: number;
  @Output() updateName = new EventEmitter<any>();
  name: string;

  add() {
    this.updateName.emit({ name: this.name, index: this.index });
  }
}
