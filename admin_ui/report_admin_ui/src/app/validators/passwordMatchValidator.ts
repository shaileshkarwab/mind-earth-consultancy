import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordMatchValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {

        const password = formGroup.get('password')?.value;
        const confirmPassword = formGroup.get('confirmPassWord')?.value;

        if (!password || !confirmPassword) {
            return null; // let required validator handle empty case
        }

        if (password !== confirmPassword) {
            return { passwordMismatch: true };
        }

        return null;
    };
}