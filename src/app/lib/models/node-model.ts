import { FormArray } from '@angular/forms';

export class NodeModel {
  type: Type | null;
  name?: string;
  children?: NodeModel[] | FormArray;
  id: string;
  editing?: boolean;
}

export enum Type {
  'folder' = 'folder',
  'file' = 'file',
  'unset' = 'unset',
  null = 'null',
}
