import { Component, inject, OnInit, signal } from '@angular/core';
import { CentralizedContainer } from '../../components/centralized-container/centralized-container';
import { MatCardModule } from "@angular/material/card";
import { MatDivider } from '@angular/material/divider';
import { MatSliderModule } from '@angular/material/slider';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PasswordGenerator } from '../../shared/services/password-generator';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-generator',
  imports: [CentralizedContainer, MatCardModule, MatDivider, MatSliderModule, FormsModule, ReactiveFormsModule, MatInputModule, MatIconModule, MatCheckboxModule],
  templateUrl: './generator.html',
  styleUrl: './generator.scss'
})
export class GeneratorComponent implements OnInit {
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  private passwordGenerator = inject(PasswordGenerator);

  form!: FormGroup;
  password = signal('');

  ngOnInit(): void {
    this.form = this.createForm();
    this.generate();

    this.form.valueChanges.subscribe((value: any) => {
      this.verifyCheckboxes(value);
      this.generate();
    });
  }

  verifyCheckboxes(form: any) {
    const formValue = this.form.getRawValue();
    const selectedSets = Object.keys(formValue).filter(key => formValue[key] === true);

    if (selectedSets.length === 1) {
      this.form.get(selectedSets[0])?.disable({ emitEvent: false })
    } else {
      Object.keys(this.form.controls).forEach(key => {
        const control = this.form.get(key);
        if (control?.disabled) {
          control.enable({ emitEvent: false });
        }
      });
    }
  }

  createForm(): any {
    return this.fb.group({
      passwordLength: [5],
      uppercase: [{ value: true, disabled: true }],
      lowercase: [false],
      numbers: [false],
      symbols: [false],
    });
  }

  generate() {
    this.password.set(this.passwordGenerator.generatePassword(this.form.getRawValue()));
  }

  copyToClipboard() {
    const snackConfig: MatSnackBarConfig = {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['snackbar--margin-top']
    }

    navigator.clipboard.writeText(this.password()).then(
      () => this.snackBar.open('Senha copiada para a área de transferência!', 'Fechar', snackConfig),
      (err) => this.snackBar.open('Erro ao copiar a senha: ' + err, 'Fechar', snackConfig)
    );
  }
}
