import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    constructor(private toastr: ToastrService) { }

    /**
     * Show success toast
     * @param message Toast message
     */
    success(message: string): void {
        this.toastr.success(message, 'Success');
    }

    /**
     * Show error toast
     * @param message Toast message
     */
    error(message: string): void {
        this.toastr.error(message, 'Error');
    }

    /**
     * Show warning toast
     * @param message Toast message
     */
    warning(message: string): void {
        this.toastr.warning(message, 'Warning');
    }

    /**
     * Show info toast
     * @param message Toast message
     */
    info(message: string): void {
        this.toastr.info(message, 'Information');
    }

    /**
     * Show custom toast
     * @param message Toast message
     */
    custom(message: string): void {
        this.toastr.show(message, 'Message');
    }

    /**
     * Clear all toasts
     */
    clear(): void {
        this.toastr.clear();
    }

    /**
     * Remove specific toast by ID
     * @param toastId Toast ID
     */
    remove(toastId?: number): void {
        if (toastId !== undefined) {
            this.toastr.remove(toastId);
        }
    }
}
