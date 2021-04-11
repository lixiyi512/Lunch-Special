import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';

describe('Header Component Tests', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let componentElement: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserModule,
                CommonModule
            ],
            declarations: [
                HeaderComponent
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        componentElement = fixture.debugElement.nativeElement;
    });

    it('should have header', () => {
        const header = componentElement.querySelector('.header-inner');
        expect(header.textContent).toEqual('Lunch Special');
    });

    it('should trigger openGithub function when clicking github logo', fakeAsync(() => {
        spyOn(component, 'openGithub');
        const logo: HTMLElement = componentElement.querySelector('.header-right');
        logo.click();
        tick();
        expect(component.openGithub).toHaveBeenCalled();
    }));
});