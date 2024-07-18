import {Component, Input} from '@angular/core';
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

  handleClick:()=>void=(()=>{
    console.log("click");
  })
}
