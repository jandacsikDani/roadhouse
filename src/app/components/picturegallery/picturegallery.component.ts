import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-picturegallery',
  imports: [],
  templateUrl: './picturegallery.component.html',
  styleUrl: './picturegallery.component.css'
})
export class PicturegalleryComponent implements OnInit, OnDestroy{
  images = [
    'slideimages/slideimg1.jpg',
    'slideimages/slideimg2.jpg',
    'slideimages/slideimg3.jpg',
    'slideimages/slideimg4.jpg',
    'slideimages/slideimg5.jpg'
  ];

  currentIndex = 0;
  isTransitioning = true;
  intervalId: any;

  ngOnInit() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 5000); // 3 másodpercenként
  }

  nextSlide() {
    this.isTransitioning = true;
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  goToSlide(index: number) {
    this.isTransitioning = true;
    this.currentIndex = index;
  }

  prevSlide() {
    this.isTransitioning = true;
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
  }
}
