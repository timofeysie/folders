import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';


@Component({
  selector: 'folders-app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
})
export class RootComponent implements OnInit {
  form: FormGroup;
  ids = 0;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      folderRoot: this.fb.array([]),
    });
  }

  ngOnInit(): void {}

  addFolder() {
    const type = 'folder';
    this.ids++;
    const folders = this.form.controls.folderRoot as FormArray;
    folders.push(
      this.fb.group({
        type: type,
        name: '',
        id: this.ids,
      })
    );
  }

  onUpdateName(event: any) {
    console.log('event', event);
    console.log('name', this.form.controls.folderRoot.value[event.index]);
    // this.form.controls.folderRoot['controls']?.name?.setValue(event.name);
    // this.form.controls.folderRoot.value[event.index]
  }

  trackByFn(index: number, item: any) {
    return this.ids;
  }
}
