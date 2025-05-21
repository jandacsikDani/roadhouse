import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-picturegallery',
  imports: [],
  templateUrl: './picturegallery.component.html',
  styleUrl: './picturegallery.component.css'
})
export class PicturegalleryComponent implements OnInit, OnDestroy{
  images = [
    'slideimages/slideimg1.webp',
    'slideimages/slideimg2.webp',
    'slideimages/slideimg3.webp',
    'slideimages/slideimg4.webp',
    'slideimages/slideimg5.webp'
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
