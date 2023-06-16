import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Subject, takeUntil } from 'rxjs';
import { FormControl } from '@angular/forms';

import { PasswordMeterTypeEnum } from '../../common/enums/password-meter-type.enum';

@Component({
    selector: 'app-password',
    templateUrl: './password.component.html',
    styleUrls: ['./password.component.scss'],
})
export class PasswordComponent implements OnInit, OnDestroy {
    private readonly componentDestroyed$: Subject<void> = new Subject<void>();

	toShowPassword: boolean = false;
	passwordControl: FormControl = new FormControl();
    meterClass: PasswordMeterTypeEnum = PasswordMeterTypeEnum.DISABLED;

	/**
	 * Subscribe on password form control value change on component initialized
	 */
    ngOnInit(): void {
        this.subscribeOnPasswordValue();
    }

	/**
	 * Subscribe on password form control value change and define current meter class based on next conditions:
	 *		1. Only letters/digits/symbols - the password is easy;
	 *   	2. Combination of letters-symbols/letters-digits/digits-symbols the password is medium;
	 * 		3. Has letters, symbols and numbers - the password is strong;
	 * 		4. If has less than 8 characters - the password is weak
	 *
	 * @private
	 */
    private subscribeOnPasswordValue() {
        const oneTypeCharRegex = new RegExp(
            '^[a-z]+$|^[0-9]+$|^[!@#$%^&*()_-]+$/gi'
        );

        this.passwordControl.valueChanges
            .pipe(
                takeUntil(this.componentDestroyed$),
                map((passwordValue: string): PasswordMeterTypeEnum => {
                    const hasLetters = new RegExp(/[a-z]+/i).test(passwordValue);
                    const hasNumbers = new RegExp(/[0-9]+/).test(passwordValue);
                    const hasSymbols = new RegExp(/[!@#$%^&*()_-]+/g).test(passwordValue);

                    if (passwordValue.length < 8) {
                        return PasswordMeterTypeEnum.WEAK;
                    }

                    if (oneTypeCharRegex.test(passwordValue)) {
						return PasswordMeterTypeEnum.EASY;
                    }

                    if (hasLetters && hasNumbers && hasSymbols) {
                        return PasswordMeterTypeEnum.STRONG;
                    }

                    if ((hasLetters && hasNumbers) || (hasLetters && hasSymbols) || (hasNumbers && hasSymbols)) {
                        return PasswordMeterTypeEnum.MEDIUM;
                    }

                    return PasswordMeterTypeEnum.DISABLED;
                })
            )
            .subscribe((meterClass: PasswordMeterTypeEnum): void => {
                this.meterClass = meterClass;
            });
    }

	/**
	 * Complete subject on component destroy
	 */
    ngOnDestroy(): void {
        this.componentDestroyed$.next();
        this.componentDestroyed$.complete();
    }
}
