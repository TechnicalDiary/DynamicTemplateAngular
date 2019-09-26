import { Component, OnInit, ViewContainerRef, ViewChild, ComponentFactoryResolver } from '@angular/core';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('dashboardChildComponent', { read: ViewContainerRef, static: true })
  protected contentTarget: ViewContainerRef;
  private clientName = environment.clientName;
  constructor(private componentResolver: ComponentFactoryResolver, private vcRef: ViewContainerRef, ) { }


  ngOnInit() {
    // const dynamicComponent = this.createContentComponent(this.clientName);
    // this.componentResolver.resolveComponentFactory(dynamicComponent).
    //   .then((factory: any) => this.contentTarget.createComponent(factory));
    const factory = this.componentResolver.resolveComponentFactory(comp);
    const compRef = this.vcRef.createComponent(factory);

    (compRef as any).instance.model = this.model;
  }

  createContentComponent(clientName) {
    @Component({
      selector: 'my-ng-include-content',
      templateUrl: clientName,
      styleUrls: clientName,
    })
    class DashboardChildComponent { }
    return DashboardChildComponent;
  }

}

// https://stackoverflow.com/questions/39678963/load-existing-components-dynamically-angular-2-final-release/39680765#39680765

// https://blog.angularindepth.com/here-is-what-you-need-to-know-about-dynamic-components-in-angular-ac1e96167f9e

// https://stackoverflow.com/questions/33749994/dynamic-template-in-templaturl-in-angular2
