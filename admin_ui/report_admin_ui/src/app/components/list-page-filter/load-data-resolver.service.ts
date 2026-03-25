import { inject, Injectable } from '@angular/core';
import { MasterService } from '../../features/auth/master-controller/service/master.service';

@Injectable({
  providedIn: 'root'
})
export class LoadDataResolverService {

  constructor() { }
  categoryService = inject(MasterService);

  resolve(serviceName: string): Function {
    const serviceMap: Record<string, Function> = {
      'masterService.getCategories': this.categoryService.getSubcategory.bind(this.categoryService),
    };
    return serviceMap[serviceName];
  };
}
