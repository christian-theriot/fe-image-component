import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FeImageComponentComponent } from './fe-image-component.component';

const defaultSrc = 'https://via.placeholder.com/150';

describe('FeImageComponentComponent', () => {
  let component: FeImageComponentComponent;
  let fixture: ComponentFixture<FeImageComponentComponent>;
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeImageComponentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeImageComponentComponent);
    de = fixture.debugElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

    const sources = de.queryAll(By.css('.component-image source'));
    const img = de.query(By.css('.component-image img'));

    expect(sources).toEqual([]);

    expect(img.attributes['src']).toBe(defaultSrc);
    expect(img.attributes['alt']).toBe('Default Image');
    expect(img.attributes['loading']).toBe('lazy');
  });

  it('can create a responsive image', () => {
    component.sources = [
      {
        srcset:
          'https://via.placeholder.com/150 200w, https://via.placeholder.com/300 500w',
        sizes: '(max-width: 300px) 200px, 500px',
      },
      {
        srcset:
          'https://via.placeholder.com/500 700w, https://via.placeholder.com/800 1000w',
        sizes: '(min-width: 501px) and (max-width: 800px) 700px, 1000px',
      },
    ];
    component.src = 'https://via.placeholder.com/50';
    component.alt = 'Real alt';
    component.loading = 'eager';

    fixture.detectChanges();

    const sources = de.queryAll(By.css('.component-image source'));
    const img = de.query(By.css('.component-image img'));

    component.sources?.map((s, i) => {
      expect(sources[i].attributes['srcset']).toBe(s.srcset ?? '');
      expect(sources[i].attributes['sizes']).toBe(s.sizes ?? '');
      expect(s.media).toBeUndefined();
      expect(s.type).toBeUndefined();
    });

    expect(img.attributes['src']).toBe(component.src);
    expect(img.attributes['alt']).toBe(component.alt);
    expect(img.attributes['loading']).toBe(component.loading);
  });
});
