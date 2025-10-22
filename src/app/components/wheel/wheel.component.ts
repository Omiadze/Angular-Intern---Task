import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-wheel',
  standalone: true,
  imports: [CommonModule, FormsModule, NzButtonModule, NzAvatarModule, NzIconModule],
  templateUrl: './wheel.component.html',
  styleUrls: [],
})
export class Wheel {
  @ViewChild('wheel') wheel!: ElementRef<HTMLDivElement>;

  sectors = Array.from({ length: 10 }, (_, i) => i + 1);
  sectorInput = '';
  errorMessage = '';
  spinning = false;

  spinWheel() {
    const targetPrizeNumber = Number(this.sectorInput);
    const totalSectors = this.sectors.length;

    if (
      isNaN(targetPrizeNumber) ||
      targetPrizeNumber < 1 ||
      targetPrizeNumber > totalSectors ||
      !Number.isInteger(targetPrizeNumber)
    ) {
      this.errorMessage = `Please enter a valid prize number (1-${totalSectors})`;
      return;
    }

    this.errorMessage = '';
    if (!this.wheel) return;

    this.spinning = true;

    const sectorAngle = 360 / totalSectors;
    const spins = 5;
    const targetPrizeIndex = targetPrizeNumber - 1;
    const angleToCenterSector = targetPrizeIndex * sectorAngle + sectorAngle / 2;
    const targetAngle = 360 * spins - angleToCenterSector;

    const wheelEl = this.wheel.nativeElement;
    wheelEl.style.transition = 'transform 3s ease-out';
    wheelEl.style.transform = `rotate(${targetAngle}deg)`;

    setTimeout(() => {
      wheelEl.style.transition = 'none';
      wheelEl.style.transform = `rotate(${-angleToCenterSector}deg)`;
      this.spinning = false;
    }, 3000);
  }
}
