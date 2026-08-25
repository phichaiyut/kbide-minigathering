int MaxSpeed = 100;
int MinSpeed = 0;
int ModePidStatus = 0;
int LastError;

int tocenter = 0;

void ModeSpdPID(int Mod,int max, int min) {
  ModePidStatus = Mod;
  MaxSpeed = max;
  MinSpeed = min;
}

void SetCenter(int x){
tocenter = x;


}

int readPosition(int Track, int noise) {
  unsigned char i, online = 0;
  unsigned long avg = 0;
  unsigned int sum = 0;
  static int last_value = ((4 - 1) * 1000 / 2);
  ReadCalibrate();
  int S[4] = {F[1],F[2],F[3],F[4]};
  for (i = 0; i < 4; i++) {
    int values = S[i];
    if (values > Track) {
      online = 1;
    }
    if (values > noise) {
      avg += (long)(values) * (i * 1000);
      sum += values;
    }
  }
  if (!online) {
    if (last_value < (4 - 1) * 1000 / 2) {
      return 0;
    } else {
      return (4 - 1) * 1000;
    }
  }
    // if (sum == 0) {
    //     return last_value; // ใช้ค่าตำแหน่งล่าสุดเมื่อไม่มีเส้น
    // }
  last_value = avg / sum;
  return last_value;
}

void PID(int SpeedL,int SpeedR, float Kp, float Kd) {
  int Pos = readPosition(200, 50);
  int Error = Pos - ((4 - 1) * 1000 / 2);
  int PID_Value = (Kp * Error) + (Kd * (Error - LastError));
  LastError = Error;
 int LeftPower = SpeedL + PID_Value;
  int RightPower = SpeedR - PID_Value;
  if (ModePidStatus == 0) {
    if (LeftPower > MaxSpeed) LeftPower = MaxSpeed;
    if (LeftPower < 0) LeftPower = MinSpeed;
    if (RightPower > MaxSpeed) RightPower = MaxSpeed;
    if (RightPower < 0) RightPower = MinSpeed;
  } else if (ModePidStatus == 1) {
    if (LeftPower > MaxSpeed) LeftPower = MaxSpeed;
    if (LeftPower < MinSpeed) LeftPower = MinSpeed;
    if (RightPower > MaxSpeed) RightPower = MaxSpeed;
    if (RightPower < MinSpeed) RightPower = MinSpeed;
  } else if (ModePidStatus == 2) {
    if (LeftPower > SpeedL) LeftPower = SpeedL;
    if (LeftPower < -SpeedL) LeftPower = -SpeedL;
    if (RightPower > SpeedR) RightPower = SpeedR;
    if (RightPower < -SpeedR) RightPower = -SpeedR;
  }
  else {
    if (LeftPower > MaxSpeed) LeftPower = MaxSpeed;
    if (LeftPower < 0) LeftPower = 0;
    if (RightPower > MaxSpeed) RightPower = MaxSpeed;
    if (RightPower < 0) RightPower = 0;
  }
  Motor(LeftPower, RightPower);
}

void FFTimer(int Speed, int TotalTime) {
  BaseSpeed = Speed;
  InitialSpeed();
  unsigned long StartTime = millis();
  unsigned long EndTime = StartTime + TotalTime;
  while (millis() <= EndTime) {
    PID(LeftBaseSpeed,RightBaseSpeed, PID_Kp, PID_Kd);
  }
  // Beep(10);
}


void TrackSelect(int spd, char x) {
  if (x == 's' || x == 'S' ) {
    MotorStop();
    Beep(100);
  }
  else if (x == 'p' || x == 'P') {
    BZon();
    Motor(LeftBaseSpeed, RightBaseSpeed);
    while (1) {
      Motor(LeftBaseSpeed, RightBaseSpeed);
      ReadCalibrate();
      if (F[0] < Ref && F[5] < Ref) {
        BZoff();
        break;
      }
    }
  }
  else if (x == 'l' || x == 'L') {
    ToCenter();
    SpinL();
    FFTimer(0,20);
  }
  else if (x == 'r' || x == 'R') {
    ToCenter();
    SpinR();
    FFTimer(0,20);
  }
  else if (x == 'f' || x == 'F') {
    Motor(LeftBaseSpeed, RightBaseSpeed);
    Beep(500/spd);
  }

  else if (x == 'q' || x == 'Q') {
    BZon();
    while (1) {
      Motor(spd, spd);
      ReadCalibrate();
      if (F[0] < Ref) {
        BZoff();
        break;
      }
    }
    TurnLeft();
    FFTimer(0,20);
  }
  else if (x == 'e' || x == 'E') {
    BZon();
    while (1) {
      Motor(spd, spd);
      ReadCalibrate();
      if (F[5] < Ref) {
        BZoff();
        break;
      }
    }
    TurnRight();
    FFTimer(0,20);
  }


}




void FF(int Speed, char select) {
  BaseSpeed = Speed;
  InitialSpeed();
  while (1) {
    PID(LeftBaseSpeed,RightBaseSpeed, PID_Kp, PID_Kd);
    ReadCalibrate();
    if ((F[0] > Ref && F[5] > Ref ) || (F[0] > Ref && F[2] > Ref) || (F[3] > Ref && F[5] > Ref)) {
      break;
    }
  }
  TrackSelect(Speed, select);
}

void FFC(int Speed,  char select) {
  BaseSpeed = Speed;
  InitialSpeed();
  while (1) {
    PID(LeftBaseSpeed,RightBaseSpeed, PID_Kp, PID_Kd);
    ReadCalibrate();
    if ((F[0] > Ref && F[5] > Ref)) {
      break;
    }
  }
  TrackSelect(Speed, select);
}
void FFC2(int Speed,  char select) {
  BaseSpeed = Speed;
  InitialSpeed();
  while (1) {
    PID(LeftBaseSpeed,RightBaseSpeed, PID_Kp, PID_Kd);
    ReadCalibrate();
    if ((F[1] > Ref && F[2] > Ref && F[3] > Ref && F[4] > Ref )) {
      break;
    }
  }
  TrackSelect(Speed, select);
}


void FFR(int Speed,  char select) {
  BaseSpeed = Speed;
  InitialSpeed();
  while (1) {
    PID(LeftBaseSpeed,RightBaseSpeed, PID_Kp, PID_Kd);
    ReadCalibrate();
    if ((F[3] > Ref && F[5] > Ref)) {
      break;
    }
  }
  TrackSelect(Speed, select);
}

void FFR5(int Speed,  char select) {
  BaseSpeed = Speed;
  InitialSpeed();
  while (1) {
    PID(LeftBaseSpeed,RightBaseSpeed, PID_Kp, PID_Kd);
    ReadCalibrate();
    if ( F[5] > Ref) {
      break;
    }
  }
  TrackSelect(Speed, select);
}

void FFR2(int Speed,  char select) {
  BaseSpeed = Speed;
  InitialSpeed();
  while (1) {
    PID(LeftBaseSpeed,RightBaseSpeed, PID_Kp, PID_Kd);
    ReadCalibrate();
    if ((F[3] > Ref && F[4] > Ref && F[5] > Ref )) {
      break;
    }
  }
  TrackSelect(Speed, select);
}
void FFL(int Speed, char select) {
  BaseSpeed = Speed;
  InitialSpeed();
  while (1) {
    PID(LeftBaseSpeed,RightBaseSpeed, PID_Kp, PID_Kd);
    ReadCalibrate();
    if ((F[0] > Ref && F[2] > Ref)) {
      break;
    }
  }
  TrackSelect(Speed, select);
}

void FFL0(int Speed, char select) {
  BaseSpeed = Speed;
  InitialSpeed();
  while (1) {
    PID(LeftBaseSpeed,RightBaseSpeed, PID_Kp, PID_Kd);
    ReadCalibrate();
    if (F[0] > Ref ) {
      break;
    }
  }
  TrackSelect(Speed, select);
}

void FFL2(int Speed, char select) {
  BaseSpeed = Speed;
  InitialSpeed();
  while (1) {
    PID(LeftBaseSpeed,RightBaseSpeed, PID_Kp, PID_Kd);
    ReadCalibrate();
    if ((F[0] > Ref && F[1] > Ref && F[2] > Ref)) {
      break;
    }
  }
  TrackSelect(Speed, select);
}

void FF_DISTANCED(int Speed,char select,int dist) {
  BaseSpeed = Speed;
  InitialSpeed();
  while (1) {
    PID(LeftBaseSpeed,RightBaseSpeed, PID_Kp, PID_Kd);
    int d = sonar.ping_cm();

    // d == 0 → ยังไม่เจออะไร (ให้วิ่งต่อ)
    if (d > 0 && d <= dist) {
      MotorStop();
      Beep(10);
      break;
    }
  }
  TrackSelect(Speed, select);
}

void FFTimer(int Speed, int TotalTime, char select) {
  BaseSpeed = Speed;
  InitialSpeed();
  unsigned long StartTime = millis();
  unsigned long EndTime = StartTime + TotalTime;
  while (millis() <= EndTime) {
    PID(LeftBaseSpeed,RightBaseSpeed, PID_Kp, PID_Kd);
  }
  TrackSelect(Speed, select);
  // Beep(10);
}

void FFNUM(int Speed, char select,int numm) {
  BaseSpeed = Speed;
  InitialSpeed();
  while (1) {
    PID(LeftBaseSpeed,RightBaseSpeed, PID_Kp, PID_Kd);
    ReadCalibrate();
    if (F[numm] > Ref) {
      break;
    }
  }
  TrackSelect(Speed, select);
}

void FFWhite(int Speed, char select) {
	BaseSpeed = Speed;
	InitialSpeed();
  while (1) {
    PID(LeftBaseSpeed,RightBaseSpeed, PID_Kp, PID_Kd);
    ReadCalibrate();
    if ((F[0] < Ref && F[1] < Ref && F[2] < Ref && F[3] < Ref && F[4] < Ref && F[5] < Ref )) {
      break;
    }
  }
  TrackSelect(Speed, select);
}

void FFBlack(int Speed, char select) {
	BaseSpeed = Speed;
	InitialSpeed();
  Move(LeftBaseSpeed,RightBaseSpeed,50);
  while (1) {
    Motor(LeftBaseSpeed,RightBaseSpeed);
    ReadCalibrate();
    if (F[0] > Ref || F[1] > Ref || F[2] > Ref || F[3] > Ref || F[4] > Ref || F[5] > Ref) {
      break;
    }
  }
  TrackSelect(Speed, select);
}


void set_f(int num) {
  for (int i=0; i< num; i++) {
    while (1) {
      ReadCalibrate();
      delay(5);
      if (F[0] > Ref && F[5] < Ref) {
        Motor(-5, 15);
      } else if (F[0] < Ref && F[5] > Ref) {
        Motor(15, -5);
      } else if (F[0] < Ref && F[5] < Ref) {
        Motor(15, 15);
      } else {
        Motor(-1, -1);
        break;
      }
    }
    if (num > 1) {
      Motor(-15, -15);
      delay(50);
      Motor(-1, -1);
    }
  }

}