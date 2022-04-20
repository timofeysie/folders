import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormGroup,
  FormArray,
  FormGroupDirective,
  ControlContainer,
  FormControl,
} from '@angular/forms';
import { ConfirmAddChild } from '../../models/confirm-add-child';
@Component({
  selector: 'app-folder-display',
  templateUrl: './folder-display.component.html',
  styleUrls: ['./folder-display.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
})
export class FolderDisplayComponent {
  @Input() children: any;
  @Input() folder: any;
  @Input() index: number;
  @Output() addChild = new EventEmitter<string>();
  @Output() confirmAddChild = new EventEmitter<any>();
  @Output() deleteNode = new EventEmitter<boolean>();
  childFormGroup: FormGroup;
  childForm: any;
  childName: String;
  addChildMode = false;
  ids = 0;

  constructor(private formGroupDirective: FormGroupDirective) {}

  ngOnInit() {
    this.childForm = this.formGroupDirective.form;
  }

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

  confirmAdd(index: number, type: string) {
    const data: ConfirmAddChild = {
      index: index,
      childName: this.childName.toString(),
      type: type,
    };
    this.confirmAddChild.emit(data);
  }
}
