# Folders

## Workflow

```txt
ng serve
ng build
ng test
ng e2e
```

## Getting started

Created the basics container component pattern:

```shell
ng new my-app
ng g component lib/containers/root
ng g component lib/components/folder
```

## Task

Build an angular application that allows you to create and render a folder structure. The ui should be backed by a JSON representation of the folder structure. The structure consists of “nodes” which are either files or folders.

### Requirements

1. The user should be able to add a root folder to the tree via the “add folder to root” button.
2. The user should be able to name the newly created node. Once named, it does not need to be renamable.
3. The only validation required on the naming of a node is that the name can’t be left blank. If it is, the file/folder should be deleted.
4. A newly added node can be cancelled by pressing the cancel button during naming.
5. The user should be able to add a node as a child to a folder by clicking a button that becomes visible on a folder upon hover. The user should not be able to add a child node to a file.
6. Upon adding a child node to a folder, the user should be presented with two buttons to decide if the newly added child node is a file or a folder.
7. The user should be able to delete a node via a delete button that becomes visible on a file or folder upon hover.
8. A JSON object representing the folder structure should be visible in a read-only text area at the bottom of the page.
9. The following model should be used to represent a file or folder node. You can extend it or modify it if your solution requires it. A copy of this file can be found in the resources folder.

```ts
export class NodeModel {
  type: 'folder' | 'file' | 'unset' | null;
  name?: string;
  children?: NodeMOdel[];
  id: string;
}
```

### Task 1

*The user should be able to add a root folder to the tree via the “add folder to root” button.*

Created a form with a container/component pattern to hold the root folders adding functionality.

In the folder.component.ts file, this causes the following error:

```ts
@Input() folderForm: FormGroup;
```

```txt
Property 'folderForm' has no initializer and is not definitely assigned in the constructor.ts(2564)
```

The solution for this [is explained in this SO answer](https://stackoverflow.com/questions/67104671/property-productform-has-no-initializer-and-is-not-definitely-assigned-in-the):

*Add "strictPropertyInitialization": false in the compilerOptions section of the "tsconfig.json" file.*

### The folder component form group issue

I was not able to get the component to use the form value with the dynamically added folder groups.

These are the type errors I was seeing:

```err
formControlName must be used with a parent formGroup directive.  You'll want to add a formGroup
...
core.js:6498 ERROR TypeError: Cannot read properties of null (reading 'addControl')
...
core.js:6498 ERROR TypeError: Cannot read properties of null (reading 'getFormGroup')
```

I have used the container/component pattern with nested forms, but they were not created dynamically like this app requires.  No doubt there is a way to set this up properly, but to save time, I created a separate model and emit the value changes which works for now with a little extra code.

Using formGroupName around the group in the root.component works, but formControlName doesn't.

### Setting the values

It seems like this would be the appropriate way to manually set the value of the name on the folders:

```ts
this.form.controls.folderRoot['controls'][event.index].name.controls.setValue(event.name);
```

However, this causes the error:

```err
Element implicitly has an 'any' type because type 'AbstractControl' has no index signature. Did you mean to call 'get'?
```

Using the model doesn't seem to create the default folder:

```ts
folders.push(this.fb.group(new NodeModel()));
```

This works:

```ts
this.fb.group({
  type: type,
  name: '',
  id: this.ids,
})
```

Of course we need children also.  Could add an empty group array initially, or when there is a name added after the plus button is chosen.

### The icons

For now, components will do.  No third party libraries needed.

ng g component lib/components/folder-icon

ng g component lib/components/trash-icon

### Folder display component

ng g component lib/components/folder-display

## Things to consider

- When will the model be sent to a store/database?
- What is the format of the id?  Is it OK to burn increments?
- create shared css styles to import, or use Ionic styles.

I'm sure this file system pattern has very mature solutions to all these issues, but researching those is outside of the scope of this task.

## Original readme

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.6.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
