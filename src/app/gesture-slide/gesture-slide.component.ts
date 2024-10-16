import { Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { UserService } from '../api/user.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-gesture-slide',
  templateUrl: './gesture-slide.component.html',
  styleUrls: ['./gesture-slide.component.scss'],
})
export class GestureSlideComponent {
  tinderCardsArray: Array<ElementRef>;
  @Output() choiceMade = new EventEmitter();
  @ViewChildren('tinderCard') tinderCards: QueryList<ElementRef>;
  public crossVisible: boolean = true;
  public heartVisible: boolean = true;
  public transitionInProgress: boolean = true;
  public moveOutWidth: number;
  public shiftRequired: boolean = false;
  public profileList: any = [];

  constructor(private renderer: Renderer2, private service: UserService, private toastController: ToastController) {
    this.profileList = this.service.getSessionData('details');
  }

  handlePan(event: any) {
    console.log(event, 'EVENTSSS')
    if (
      event.deltaX === 0 ||
      (event.center.x === 0 && event.center.y === 0) ||
      !this.profileList.length
    )
      return;

      console.log(this.transitionInProgress, 'TRANSITION_IN_PROGRESS')
    if (this.transitionInProgress) {
      this.handleShift();
    }

    this.renderer.addClass(this.tinderCardsArray[0].nativeElement, 'moving');

    if (event.deltaX > 0) {
      this.toggleChoiceIndicator(false, true);
    }
    if (event.deltaX < 0) {
      this.toggleChoiceIndicator(true, false);
    }

    let xMulti = event.deltaX * 0.03;
    let yMulti = event.deltaY / 80;
    let rotate = xMulti * yMulti;

    this.renderer.setStyle(
      this.tinderCardsArray[0].nativeElement,
      'transform',
      'translate(' +
        event.deltaX +
        'px, ' +
        event.deltaY +
        'px) rotate(' +
        rotate +
        'deg)'
    );

    this.shiftRequired = true;
  }

  handleShift() {
    console.log(this.shiftRequired, 'enters-function')
    this.transitionInProgress = false;
    this.toggleChoiceIndicator(false, false);
    if (this.shiftRequired) {
      this.shiftRequired = false;
      this.profileList.shift();
    }
  }

  toggleChoiceIndicator(cross, heart) {
    if(heart) {
      this.intrestedProfile('accept')
    }
    if(cross) {
      this.intrestedProfile('reject')
    }
    this.crossVisible = cross;
    this.heartVisible = heart;
  }

  handlePanEnd(event) {
    this.toggleChoiceIndicator(false, false);

    if (!this.profileList.length) return;

    this.renderer.removeClass(this.tinderCardsArray[0].nativeElement, 'moving');

    let keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;
    if (keep) {
      this.renderer.setStyle(
        this.tinderCardsArray[0].nativeElement,
        'transform',
        ''
      );
      this.shiftRequired = false;
    } else {
      let endX = Math.max(
        Math.abs(event.velocityX) * this.moveOutWidth,
        this.moveOutWidth
      );
      let toX = event.deltaX > 0 ? endX : -endX;
      let endY = Math.abs(event.velocityY) * this.moveOutWidth;
      let toY = event.deltaY > 0 ? endY : -endY;
      let xMulti = event.deltaX * 0.03;
      let yMulti = event.deltaY / 80;
      let rotate = xMulti * yMulti;

      this.renderer.setStyle(
        this.tinderCardsArray[0].nativeElement,
        'transform',
        'translate(' +
          toX +
          'px, ' +
          (toY + event.deltaY) +
          'px) rotate(' +
          rotate +
          'deg)'
      );

      this.shiftRequired = true;

      this.emitChoice(!!(event.deltaX > 0), this.profileList[0]);
    }
    this.transitionInProgress = true;
  }

  emitChoice(heart, card) {
    this.choiceMade.emit({
      choice: heart,
      payload: card,
    });
  }


  ngAfterViewInit() {
    this.moveOutWidth = document.documentElement.clientWidth * 1.5;
    this.tinderCardsArray = this.tinderCards.toArray();
    this.tinderCards.changes.subscribe(() => {
      this.tinderCardsArray = this.tinderCards.toArray();
    });
  }

  async intrestedProfile(type) {
    console.log(type, 'typee')
    let toast = await this.toastController.create({
      message:  type == 'accept' ? 'Interested' : type == 'reject' ? 'Not Interested' : 'Shortlisted',
      duration: 1500,
      position: 'bottom',
    });
    await toast.present();
  }

  onTap(event, type) {
    if(type == 'accept' || type == 'shortlisted') {
      event.deltaX = 360;
      event.deltaY = -269;
    } else {
      event.deltaX = -484;
      event.deltaY = -269;
    }
    console.log(event, 'EVENT')

    this.renderer.addClass(this.tinderCardsArray[0].nativeElement, 'moving');

    if (event.deltaX > 0) {
      this.toggleChoiceIndicator(false, true);
    }
    if (event.deltaX < 0) {
      this.toggleChoiceIndicator(true, false);
    }

    let xMulti = event.deltaX * 0.03;
    let yMulti = event.deltaY / 80;
    let rotate = xMulti * yMulti;

    this.renderer.setStyle(
      this.tinderCardsArray[0].nativeElement,
      'transform',
      'translate(' +
        event.deltaX +
        'px, ' +
        event.deltaY +
        'px) rotate(' +
        rotate +
        'deg)'
    );

    this.shiftRequired = true;

    this.handleShift();

  }

}
