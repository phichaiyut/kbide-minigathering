

int LCh, LTurnSpdL, LTurnSpdR, TurnDelayL;
int RCh, RTurnSpdL, RTurnSpdR, TurnDelayR;
int tct,  tspd;
int tctL,tctR;
int Delay_c_f;

void TurnSpeedLeft(int Ch ,int l, int r, int de) {
  LCh = Ch;
  LTurnSpdL = l;
  LTurnSpdR = r;
  TurnDelayL = de;
}

void TurnSpeedRight(int Ch ,int l, int r, int de) {
  RCh = Ch;
  RTurnSpdL = l;
  RTurnSpdR = r;
  TurnDelayR = de;
}

void SetTurnSpeed(int tspdv) {
  tspd = tspdv;
}


void SetToCenterSpeed(int tctv) {

  tct = tctv;
	BaseSpeed = tctv;
	InitialSpeed();
	tctL = LeftBaseSpeed;
	tctR = RightBaseSpeed;
}

void Delay_c_F(int de){
    Delay_c_f = de;
}


void ToCenter(){
BZon();
   Motor(tctL, tctR);
delay( Delay_c_f/tct);
      Motor(-tct, -tct);
      delay(5);
      MotorStop();
      BZoff();

}

void TurnLeft() {
  Motor(-LTurnSpdL, LTurnSpdR);
  delay(TurnDelayL);
  while (1) {
    Motor(-LTurnSpdL, LTurnSpdR);
    ReadCalibrate();
    if (F[LCh] >= 500) {
      Motor(LTurnSpdL, -LTurnSpdR);
      delay(30);
      MotorStop();
      break;
    }
  }
}

void TurnRight() {
  Motor(RTurnSpdL, -RTurnSpdR);
  delay(TurnDelayR);
  while (1) {
    Motor(RTurnSpdL, -RTurnSpdR);
    ReadCalibrate();
    if (F[RCh] >= 500) {
      Motor(-RTurnSpdL, RTurnSpdR);
      delay(30);
      MotorStop();
      break;
    }
  }
}



void SpinL() {
  MotorStop();
  delay(10);
  Motor(-tspd, tspd);
  delay(60);
   while (1) {
    ReadCalibrate();
    Motor(-tspd, tspd);
    if (F[1] <= Ref) {
      Motor(tspd, -tspd);
      delay(5);
      MotorStop();
      break;
    }
  }
  while (1) {
    ReadCalibrate();
    Motor(-tspd, tspd);
    if (F[1] >= Ref) {
      Motor(tspd, -tspd);
      delay(5);
      MotorStop();
      break;
    }
  }
}

void SpinL2() {
  MotorStop();
  delay(10);
  Motor(-tspd, tspd);
  delay(20);
  while (1) {
    ReadCalibrate();
    Motor(-tspd, tspd);
    if (F[1] >= Ref) {
      break;
    }
  }
  Motor(-tspd, tspd);
  delay(50);
  while (1) {
    ReadCalibrate();
    Motor(-tspd, tspd);
    if (F[1] >= Ref) {
      Motor(tspd, -tspd);
      delay(5);
      MotorStop();
      break;
    }
  }
}

void SpinR() {
  MotorStop();
  delay(10);
  Motor(tspd, -tspd);
  delay(60);
   while (1) {
    ReadCalibrate();
    Motor(tspd, -tspd);
    if (F[4] <= Ref) {
      Motor(-tspd, tspd);
      delay(5);
      MotorStop();
      break;
    }
  }
  while (1) {
    ReadCalibrate();
    Motor(tspd, -tspd);
    if (F[4] >= Ref) {
      Motor(-tspd, tspd);
      delay(5);
      MotorStop();
      break;
    }
  }
}

void SpinR2() {
  MotorStop();
  delay(10);
  Motor(tspd, -tspd);
  delay(20);
  while (1) {
    ReadCalibrate();
    Motor(tspd, -tspd);
    if (F[4] >= Ref) {
      break;
    }
  }
  Motor(tspd, -tspd);
  delay(50);
  while (1) {
    ReadCalibrate();
    Motor(tspd, -tspd);
    if (F[4] >= Ref) {
      Motor(-tspd, tspd);
      delay(5);
      MotorStop();
      break;
    }
  }
}
