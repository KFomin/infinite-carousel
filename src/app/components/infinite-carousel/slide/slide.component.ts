import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgOptimizedImage, NgStyle} from "@angular/common";
import {ISlide} from "../../../data/ISlide";

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
  @Input({required: true}) slide!: ISlide;
  @Output() buttonClicked = new EventEmitter<string>();

  handleClick: () => void = (() => {
    this.buttonClicked.emit("Button in " + this.slide.title + " clicked")
  })
}
