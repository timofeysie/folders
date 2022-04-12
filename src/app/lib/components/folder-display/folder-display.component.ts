import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-folder-display',
  templateUrl: './folder-display.component.html',
  styleUrls: ['./folder-display.component.scss'],
})
export class FolderDisplayComponent implements OnInit {
  @Input() folder: any;
  @Input() index: number;
  @Output() addSubItem = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}
}
