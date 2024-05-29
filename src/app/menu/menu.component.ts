import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Input() menuType: 'paused' | 'lose' | 'win' = 'paused';
  @Output() cuntinueGame = new EventEmitter<void>();
  @Output() playAgain = new EventEmitter<void>();
  @Output() newCategory = new EventEmitter<void>();
  @Output() quitGame = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  getTitle(): string {
    switch (this.menuType) {
      case 'paused':
        return 'https://res.cloudinary.com/dcbbqlssh/image/upload/v1716962303/FEMentors/Paused_r7tlje.png';
      case 'lose':
        return 'https://res.cloudinary.com/dcbbqlssh/image/upload/v1716962303/FEMentors/You_Lose_neyzuy.png';
      case 'win':
        return 'https://res.cloudinary.com/dcbbqlssh/image/upload/v1716962303/FEMentors/You_Win_fpumod.png';
    }
  }

  onContinueGame() {
    this.cuntinueGame.emit();
  }

  onPlayAgain() {
    this.playAgain.emit();
  }

  onNewCategory() {
    this.newCategory.emit();
  }

  onQuitGame() {
    this.quitGame.emit();
  }

}
