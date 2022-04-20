import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { NodeModel, Type } from '../../models/node-model';
import { ConfirmAddChild } from '../../models/confirm-add-child';

@Component({
  selector: 'folders-app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
})
export class RootComponent implements OnInit {
  form: FormGroup;
  folders: FormArray;
  children: FormArray;
  ids = 0;
  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      folderRoot: this.formBuilder.array([]),
    });
  }

  ngOnInit(): void {}

  confirmAdd(index: number) {
    this.folders = this.form.controls.folderRoot as FormArray;
    const name = this.folders.controls[index].value?.name;
    if (name) {
      const folder = this.folders.controls[index].get('editing');
      folder?.setValue(false);
    }
  }

  addFolder() {
    const type = 'folder';
    this.ids++;
    this.folders = this.form.controls.folderRoot as FormArray;
    this.folders.push(this.formBuilder.group(this.createNode(Type.folder)));
  }

  deleteFolder(index: number) {
    this.folders = this.form.controls.folderRoot as FormArray;
    this.folders.removeAt(index);
  }

  onAddChild(type: string, index: number) {
    let convertedType = Type.file;
    if (type === 'folder') {
      convertedType = Type.folder;
    }
    this.folders = this.form.controls.folderRoot as FormArray;
    this.children = this.folders.controls[index].get('children') as FormArray;
    if (this.children) {
      this.children.push(
        this.formBuilder.group(this.createNode(convertedType))
      );
    }
  }

  createNode(type: Type): NodeModel {
    return {
      type: type,
      name: '',
      id: this.ids.toString(),
      children: this.formBuilder.array([]),
      editing: true,
    };
  }

  trackByFn(index: number, item: any) {
    return this.ids;
  }

  /**
   * Set the name of the appropriate child.
   * @param child ConfirmAddChild
   */
  handleConfirmAddChild(event: ConfirmAddChild) {
    const currentValues = this.form.controls.folderRoot.value[event.index];
    if (this.children) {
      const child = this.children.controls[event.index] as FormGroup;
      if (child) {
        child.controls['name'].setValue(event.childName);
      }
    }
  }
}
