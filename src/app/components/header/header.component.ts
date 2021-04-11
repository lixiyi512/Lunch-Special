import { Component } from '@angular/core';

@Component({
    selector: 'lr-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})

export class HeaderComponent {

    openGithub() {
        window.open('https://github.com/lixiyi512/Lunch-Special', '_blank');
    }
}
