import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- for ngStyle
import { FormsModule } from '@angular/forms'; // <-- for ngModel
import { NzButtonModule } from 'ng-zorro-antd/button'; // <-- for nz-button

@Component({
  selector: 'app-wheel',
  standalone: true,
  imports: [CommonModule, FormsModule, NzButtonModule], // <-- add modules here
  templateUrl: './wheel.component.html',
})
export class Wheel {
  @ViewChild('wheel') wheel!: ElementRef<HTMLDivElement>;
  sectorInput = '';
  errorMessage = '';

  sectors = Array.from({ length: 10 }, (_, i) => i + 1);

  spinWheel() {
    const targetSector = Number(this.sectorInput);

    if (!targetSector || targetSector < 1 || targetSector > 10) {
      this.errorMessage = 'The specified sector could not be found';
      return;
    }

    this.errorMessage = '';

    const sectorAngle = 360 / this.sectors.length;
    const targetAngle = 360 * 5 - (targetSector - 1) * sectorAngle - sectorAngle / 2; // 5 spins
    this.wheel.nativeElement.style.transition = 'transform 3s ease-out';
    this.wheel.nativeElement.style.transform = `rotate(${targetAngle}deg)`;

    // Reset after animation
    setTimeout(() => {
      this.wheel.nativeElement.style.transition = 'none';
      this.wheel.nativeElement.style.transform = `rotate(${-(targetSector - 1) * sectorAngle - sectorAngle / 2}deg)`;
    }, 3000);
  }
}
