import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from 'src/app/shared/models/player';
import { PlayerService } from 'src/app/shared/services/player.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

@Component({
  selector: 'app-create-player',
  templateUrl: './create.component.html'
})
export class CreateComponent implements OnInit, AfterViewInit {

  @ViewChild('NamePlayer') nomePlayer!: MatInput;

  matchId: string = "";

  player!: Player;

  playerForm!: FormGroup;

  posicoes: any[] = [
    { value: 'ATAQUE' },
    { value: 'DEFESA' },
    { value: 'GOLEIRO' }
  ];

  constructor(
    private fb: FormBuilder,
    private playerService: PlayerService,
    private snackBarService: SnackBarService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.matchId = this.route.snapshot.params.matchid;
  }

  ngOnInit(): void {
    if (!this.matchId) {
      this.router.navigate(['/match']);
    } else {
      this.playerForm = this.fb.group({
        name: ['', [Validators.required]],
        position: ['', [Validators.required]],
        matchId: ['', [Validators.required]],
        selected: ['', [Validators.required]]
      });

      this.setValuesDefaults(true);
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.nomePlayer.focus(), 0
    });
  }

  save = () => {
    if (this.playerForm.dirty && this.playerForm.valid) {
      this.player = Object.assign({}, this.player, this.playerForm.value);

      this.playerService.create(this.player)
        .subscribe(
          success => {
            this.playerService.players.push(this.player as Player);
            this.playerService.players = this.playerService.PlayerUtils.orderPlayers(this.playerService.players);
            this.setValuesDefaults(false);
            this.nomePlayer.focus();
          },
          fail => {
            this.nomePlayer.focus();
            this.snackBarService.error('Ops, ocorreu erro!', '');
          }
        );
    } else {
      this.nomePlayer.focus();
    }
  }

  setValuesDefaults = (first: boolean) => {
    this.playerForm.patchValue(
      first ?
        {
          matchId: this.matchId,
          position: 'ATAQUE',
          name: '',
          selected: true
        } :
        {
          matchId: this.matchId,
          name: '',
          selected: true
        });
  }

}
