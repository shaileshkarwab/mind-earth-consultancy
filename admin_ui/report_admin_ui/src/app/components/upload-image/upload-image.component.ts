import { Component, EventEmitter, forwardRef, inject, input, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ToastService } from '../../services';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AppConfigConstants } from '../../constants/app-config-constants';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-upload-image',
  standalone: true,
  imports: [NgIf],
  templateUrl: './upload-image.component.html',
  styleUrl: './upload-image.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UploadImageComponent),
      multi: true
    }
  ]
})
export class UploadImageComponent implements ControlValueAccessor, OnInit, OnChanges {



  @Input() accept: string = '*/*';
  @Input() size: number = 120;
  showMessage = inject(ToastService);
  imagePreview: string | ArrayBuffer | null = AppConfigConstants.DEFAULT_IMAGE;
  private file: File | null = null;
  @Output() fileSelectedEvent = new EventEmitter<File>();
  @Input() showPreview: boolean = true;
  @Input() imageSource?: string;
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }
    const file = input.files[0];
    if (!this.acceptFile(file)) {
      this.showMessage.error('Invalid file format');
      input.value = '';
      return;
    }

    if (file.size / 1024 > this.size) {
      this.showMessage.error(`The file should be less then ${this.size} KB`);
      input.value = '';
      return;
    }
    this.file = file;
    this.onChange(file);
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
    this.fileSelectedEvent.emit(file);
  }

  onChange: (value: File | null) => void = () => { };
  onTouched: () => void = () => { };

  writeValue(obj: any): void {
    if (typeof obj === 'string') {
      this.imagePreview = obj;
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
  }

  acceptFile(file: File): boolean {
    if (file.type.includes('pdf') || file.type.includes('image'))
      return true;
    else
      return false;
  }

  ngOnInit(): void {
    if (this.imageSource) {
      this.imagePreview = this.imageSource;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['imageSource']) {
      this.imagePreview = changes['imageSource'].currentValue;
    }
  }
}
