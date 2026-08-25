#include <Arduino.h>
#include <WiFi.h>
#include <Wire.h>
#include <SPI.h>
#include <EEPROM.h>
#include <ESP32Servo.h>
#include <NewPing.h>
#include <minigathering.h>
#include "mg_servo.h"





// ---- default speed / PID calibration tables ----
// (from examples/MiniGathering/setspeed.ino — edit the values below to tune
// your own robot, or drag "Speed & PID" blocks into Setup to override them)
void SetKpKd() {
  setKpKd(SPD_10, 0.030, 0.30);
  setKpKd(SPD_20, 0.030, 0.30);
  setKpKd(SPD_30, 0.030, 0.30);
  setKpKd(SPD_40, 0.020, 0.20);
  setKpKd(SPD_50, 0.030, 0.60);
  setKpKd(SPD_60, 0.050, 0.50);
  setKpKd(SPD_70, 0.060, 0.60);
  setKpKd(SPD_80, 0.065, 0.65);
  setKpKd(SPD_90, 0.070, 0.70);
  setKpKd(SPD_100, 0.080, 0.80);
}

void SetSpeedForward() {
  setBalanceSpeed(SPD_10, 0, 0);
  setBalanceSpeed(SPD_20, 0, 0);
  setBalanceSpeed(SPD_30, 0, 0);
  setBalanceSpeed(SPD_40, 0, 0);
  setBalanceSpeed(SPD_50, 0, 0);
  setBalanceSpeed(SPD_60, 0, 0);
  setBalanceSpeed(SPD_70, 0, 0);
  setBalanceSpeed(SPD_80, 0, 0);
  setBalanceSpeed(SPD_90, 0, 0);
  setBalanceSpeed(SPD_100, 0, 0);
}

void SetSpeedBackward() {
  setBalanceBackSpeed(SPD_10, 0, 0);
  setBalanceBackSpeed(SPD_20, 0, 0);
  setBalanceBackSpeed(SPD_30, 0, 0);
  setBalanceBackSpeed(SPD_40, 0, 0);
  setBalanceBackSpeed(SPD_50, 0, 0);
  setBalanceBackSpeed(SPD_60, 0, 0);
  setBalanceBackSpeed(SPD_70, 0, 0);
  setBalanceBackSpeed(SPD_80, 0, 0);
  setBalanceBackSpeed(SPD_90, 0, 0);
  setBalanceBackSpeed(SPD_100, 0, 0);
}



void setup()
{
  

  // ---- default startup sequence (from examples/MiniGathering/MiniGathering.ino) ----
  servoSetup();
  robotsetup();
  LoadCalibrateFromEEPROM();

  TurnSpeedLeft(1, 100, 100, 40);   // sensor channel, motor left, motor right, turn delay (ms)
  TurnSpeedRight(4, 100, 100, 40);
  SetTurnSpeed(60);

  SetKpKd();
  SetSpeedForward();
  SetSpeedBackward();

  TrackLineColor(1);  // 0 = black floor / white line, 1 = white floor / black line
  RefLineValue(500);
  ModeSpdPID(1, 100, -100);

 

  // ---- your Setup blocks / code run here ----
  wait_start();
  Motor(50, 50);

  
}
void loop()
{
  
  
}
