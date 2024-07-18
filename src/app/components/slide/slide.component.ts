import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgOptimizedImage, NgStyle} from "@angular/common";
import {IOffer} from "../../data/IOffer";

@Component({
  selector: 'app-slide',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgStyle
  ],
  templateUrl: './slide.component.html',
  styleUrl: './slide.component.scss'
})
export class SlideComponent {
  @Input({required: true}) offer!: IOffer;
  @Output() buttonClicked = new EventEmitter<string>();

  handleClick: () => void = (() => {
    this.buttonClicked.emit("Button in " + this.offer.title + " clicked")
  })
}
