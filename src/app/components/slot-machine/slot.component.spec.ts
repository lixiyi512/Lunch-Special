import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SlotMachineComponent } from './slot.component';
import { Restaurant } from '../../models/restaurant.interface';

const MOCK_ITEMS_ARRAY: Restaurant[] = Array.from({ length: 20 }, (e, i) => ({
    id: i,
    place: {
        name: i
    }
}));

describe('SlotMachineComponent', () => {
    let component: SlotMachineComponent;
    let fixture: ComponentFixture<SlotMachineComponent>;
    let componentElement: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserAnimationsModule
            ],
            declarations: [SlotMachineComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SlotMachineComponent);
        component = fixture.componentInstance;
        component.itemArray = MOCK_ITEMS_ARRAY;
        fixture.detectChanges();
        componentElement = fixture.debugElement.nativeElement;
    });

    it('should create component', () => {
        expect(component).toBeDefined();
    });

    it('should have a spin button', () => {
        const button = componentElement.querySelector('button');
        expect(button).toBeDefined();
        expect(button.textContent).toEqual('SPIN');
    });

    it('spin function should be called after click', fakeAsync(() => {
        spyOn(component, 'spinIt');

        const button = componentElement.querySelector('button');
        button.click();
        tick();
        expect(component.spinIt).toHaveBeenCalled();
    }));
});
