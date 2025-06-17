import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from '../../core/services/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html'
})
export class CategoryFormComponent {
  form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(128)]]
  });

  constructor(private fb: FormBuilder, private categoryService: CategoryService) {}

  onSubmit() {
    if (this.form.valid) {
      this.categoryService.create(this.form.value).subscribe();
      this.form.reset();
    }
  }
}
