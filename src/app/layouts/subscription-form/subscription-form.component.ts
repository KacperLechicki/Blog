import { Component, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subscriber } from 'src/app/models/subscriber';
import { SubscribersService } from 'src/app/services/subscribers.service';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.scss'],
})
export class SubscriptionFormComponent {
  subscriptionForm!: FormGroup;
  loading: boolean = false;

  @ViewChild('subscription') subscriptionComponent: any;

  constructor(
    private formBuilder: FormBuilder,
    private subService: SubscribersService,
  ) {}

  ngOnInit(): void {
    this.subscriptionForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    let subData: Subscriber = {
      email: this.subscriptionForm.value.email,
      name: this.subscriptionForm.value.name,
      createdAt: new Date()
    }
    if (this.subscriptionForm.valid) {
      this.loading = true;
      this.subService.saveData(subData);
      setTimeout(() => {
        this.loading = false;
      }, 1000);
      this.subscriptionForm.reset();
      this.subscriptionComponent.reload();
    }
  }
}
