import {Component, Input} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {IOffer} from "../../data/IOffer";

@Component({
  selector: 'app-slide',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './slide.component.html',
  styleUrl: './slide.component.scss'
})
export class SlideComponent {
  @Input({required: true}) offer!: IOffer;
}
