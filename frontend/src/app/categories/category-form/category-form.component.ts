import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from '../../core/services/category.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html'
})
export class CategoryFormComponent implements OnInit {
  isEdit = false;
  id?: number;

  form = this.fb.group({
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(32),
        Validators.pattern('^[a-zA-Z ]+$')
      ]
    ]
  });

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEdit = true;
        this.id = +id;
        this.categoryService.getById(this.id).subscribe(category => {
          this.form.patchValue(category);
        });
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const value = this.form.value;
      if (this.isEdit && this.id) {
        this.categoryService.update(this.id, value).subscribe(() => this.router.navigate(['/categories']));
      } else {
        this.categoryService.create(value).subscribe(() => this.router.navigate(['/categories']));
      }
    }
  }
}
