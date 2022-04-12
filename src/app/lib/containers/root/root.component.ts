import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { NodeModel } from '../../models/node-model';


@Component({
  selector: 'folders-app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
})
export class RootComponent implements OnInit {
  form: FormGroup;
  ids = 0;
  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      folderRoot: this.formBuilder.array([]),
    });
  }

  ngOnInit(): void {}

  confirmAdd(index: number) {
    const folders = this.form.controls.folderRoot as FormArray;
    const name = folders.controls[index].value?.name;
    if (name) {
      const folder = folders.controls[index].get('editing');
      folder?.setValue(false);
    }
  }

  addFolder() {
    const type = 'folder';
    this.ids++;
    const folders = this.form.controls.folderRoot as FormArray;
    folders.push(
      this.formBuilder.group({
        type: type,
        name: '',
        id: this.ids,
        children: this.formBuilder.array([]),
        editing: true,
      })
    );
  }

  deleteFolder(index: number) {
    const folders = this.form.controls.folderRoot as FormArray;
    folders.removeAt(index);
  }

  trackByFn(index: number, item: any) {
    return this.ids;
  }

  onAddSubItem(event: any) {
    console.log('event', event);
  }
}
