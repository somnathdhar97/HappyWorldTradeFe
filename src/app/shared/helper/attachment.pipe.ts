import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'attachment'
})
export class AttachmentPipe implements PipeTransform {

  transform(value: Uint8Array): string {
    // const base64String = btoa(String.fromCharCode(...value));
    return `data:image/png;base64,${value}`;
  }

}
