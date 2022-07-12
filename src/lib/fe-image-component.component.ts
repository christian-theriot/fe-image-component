import { Component, Input, OnInit } from '@angular/core';

declare type SourceSet = {
  srcset?: string;
  type?: string;
  media?: string;
  sizes?: string;
};

@Component({
  selector: 'fe-image-component',
  templateUrl: './fe-image-component.component.html',
  styles: [],
})
export class FeImageComponentComponent implements OnInit {
  @Input() sources?: SourceSet[];
  @Input() src: string = 'https://via.placeholder.com/150';
  @Input() alt: string = 'Default Image';
  @Input() loading: 'lazy' | 'eager' = 'lazy';

  constructor() {}

  ngOnInit(): void {}
}
