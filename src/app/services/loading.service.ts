import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  public loading: boolean = false;

  constructor() {}

  loadingStart(): boolean {
    return (this.loading = true);
  }

  loadingStop(): boolean {
    return (this.loading = false);
  }
}
