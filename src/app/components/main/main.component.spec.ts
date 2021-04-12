import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { MainComponent } from './main.component';
import { SlotMachineComponent } from '../slot-machine/slot.component';
import { RestaurantService } from '../../service/restaurant.service';

const MOCK_PLACES_RESPONSE = [
    {
        geometry: {
            location: {
               lat : 39.9604469,
               lng : -75.159809
            }
        },
        name: 'place_0'
    },
    {
        geometry: {
            location: {
               lat : 39.961304,
               lng : -75.159309
            }
        },
        name: 'place_1'
    }
];

const MOCK_POSITION = {
    coords: {
        latitude: 0,
        longitude: 0
    }
}

const MOCK_RESTAURANT_LIST = [
    {
        id: 0,
        place: { name: 'place_0' },
        selected: false
    },
];

describe('Main Component Tests', () => {
    let component: MainComponent;
    let fixture: ComponentFixture<MainComponent>;
    let componentElement: HTMLElement;
    let mockRestaurantService: RestaurantService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserModule,
                CommonModule,
                NoopAnimationsModule
            ],
            declarations: [
                MainComponent,
                SlotMachineComponent
            ],
        }).compileComponents();

        // Create restaurant service functions to return mock restaurant array
        mockRestaurantService =  TestBed.get(RestaurantService);
        mockRestaurantService.initService = jasmine.createSpy().and.returnValue(undefined);
        mockRestaurantService.initRestaurants = jasmine.createSpy().and.returnValue(of(MOCK_PLACES_RESPONSE));
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MainComponent);
        component = fixture.componentInstance;
        component.restaurantsArray = [];
        fixture.detectChanges();
        componentElement = fixture.debugElement.nativeElement;
    });

    it('should generate restaurant array', fakeAsync(() => {
        // @ts-ignore
        component.map = { setCenter: () => {} };
        // @ts-ignore
        component.mapService = { setMarker: () => {} };
        component.getPositionSuccessCallBack(MOCK_POSITION);
        tick();
        expect(component.restaurantsArray.length).toEqual(MOCK_PLACES_RESPONSE.length);
    }));

    it('should trigger removeRestaurant function when clicking X', fakeAsync(() => {
        component.restaurantsArray = MOCK_RESTAURANT_LIST;
        fixture.detectChanges();
        componentElement = fixture.debugElement.nativeElement;
        console.log(component.restaurantsArray)
        spyOn(component, 'removeRestaurant');
        const icon: HTMLElement = componentElement.querySelector('.remove');
        icon.click();
        tick();
        expect(component.removeRestaurant).toHaveBeenCalled();
    }));

    it('should be able to remove restaurant', fakeAsync(() => {
        // @ts-ignore
        component.map = { setCenter: () => {} };
        // @ts-ignore
        component.mapService = { setMarker: () => {} };
        component.getPositionSuccessCallBack(MOCK_POSITION);

        const removedRestaurantId = 0;
        component.removeRestaurant(removedRestaurantId);
        tick();
        expect(component.restaurantsArray.find(r => r.id === removedRestaurantId))
            .toEqual(undefined);
        expect(component.restaurantsArray.length).toEqual(MOCK_PLACES_RESPONSE.length - 1);    
    }));
});