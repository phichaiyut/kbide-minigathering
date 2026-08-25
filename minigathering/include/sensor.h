#include <NewPing.h>  // เรียกใช้งานไลบรารี NewPing
#include <EEPROM.h>

#define EEPROM_START_ADDR 0
#define EEPROM_SIZE 512   // ต้องมากพอ
#define NUM_SENSORS 6
int MinValue[NUM_SENSORS];
int MaxValue[NUM_SENSORS];
uint8_t F_PIN[NUM_SENSORS] = { 25, 33, 32, 35, 34, 39 };
int F[NUM_SENSORS];
int Ref = 0;
const int TRIGGER_PIN = 13;   // กำหนดตำแหน่งขา trigger ของ ultrasonic sensor.
const int ECHO_PIN = 5;       // กำหนดตำแหน่งขา echo ของ ultrasonic sensor.
const int MAX_DISTANCE = 30;  // กำหนดระยะทางสูงสุดที่ต้องการตรวจจับหน่วยเป็น (centimeters). ค่าสูงสุดที่กำหนดได้ประมาณ 400-500cm.
// Create Ultrasonic object
NewPing sonar(TRIGGER_PIN, ECHO_PIN, MAX_DISTANCE);  // ตั้งค่าตำแหน่งขาที่ใช้ของ ultrasonic และระยะสูงสุดที่ต้องการอ่านค่า

// กำหนดขา digital (ปุ่มกด)
const int button = 27;

// กำหนดขา digital (ลำโพง) Buzzer
const int buzzer = 15;
int LineColor = 0;


void beep() {
  digitalWrite(buzzer, LOW);  //ดัง
  delay(50);
  digitalWrite(buzzer, HIGH);  //เงียบ
  delay(50);
}
void Beep(int de){
digitalWrite(buzzer, LOW);  //ดัง
  delay(de);
  digitalWrite(buzzer, HIGH);  //เงียบ
  delay(de);

}


void BZon(){
	digitalWrite(buzzer, LOW);  //ดัง
}
void BZoff(){
	digitalWrite(buzzer, HIGH);  //เงียบ
}

void RefLineValue(int x) {
  Ref = x;
}
void WaitOK() {  //ฟังก์ชันรอการกดปุ่ม
  while (digitalRead(button) != 0) {  //ติดลูปค้างไว้ถ้ายังไม่กดปุ่ม
    ;
  }
  Serial.println("Push Switch");
  beep();
  delay(300);
}

int OK_PUSH() {
  if (digitalRead(button) == 1) return 0;
  else {
    return 1;
  }
}

void fastBeep() {
  digitalWrite(buzzer, LOW);  //ดัง
  delay(15);
  digitalWrite(buzzer, HIGH);  //เงียบ
}


void ReadSensor() {
  for (int _sensor = 0; _sensor < NUM_SENSORS; _sensor++) {
    F[_sensor] = analogRead(F_PIN[_sensor]);
  }
}

void SaveCalibrateToEEPROM() {
  int addr = EEPROM_START_ADDR;

  Serial.println(F("=== Save Calibrate To EEPROM ==="));

  for (int i = 0; i < NUM_SENSORS; i++) {
    EEPROM.put(addr, MinValue[i]);
    addr += sizeof(int);

    EEPROM.put(addr, MaxValue[i]);
    addr += sizeof(int);

    // แสดงผลทาง Serial
    Serial.print(F("Sensor "));
    Serial.print(i);
    Serial.print(F(" | Min = "));
    Serial.print(MinValue[i]);
    Serial.print(F(" | Max = "));
    Serial.println(MaxValue[i]);
  }

  EEPROM.commit();   // สำหรับ ESP / RP2040 / Pico
  Serial.println(F("=== Save Complete ===\n"));
}

void LoadCalibrateFromEEPROM() {
  int addr = EEPROM_START_ADDR;

  Serial.println(F("\n=== Load Calibrate From EEPROM ==="));

  for (int i = 0; i < NUM_SENSORS; i++) {
    EEPROM.get(addr, MinValue[i]);
    addr += sizeof(int);
    EEPROM.get(addr, MaxValue[i]);
    addr += sizeof(int);

    bool invalid = false;

    // กัน EEPROM ว่าง / ค่าเพี้ยน
    if (MinValue[i] < 0 || MinValue[i] > 4095 ||
        MaxValue[i] < 0 || MaxValue[i] > 4095 ||
        MinValue[i] >= MaxValue[i]) {
      MinValue[i] = 0;
      MaxValue[i] = 4095;
      invalid = true;
    }

    // แสดงผล
    Serial.print(F("Sensor "));
    Serial.print(i);
    Serial.print(F(" : Min="));
    Serial.print(MinValue[i]);
    Serial.print(F("  Max="));
    Serial.print(MaxValue[i]);

    if (invalid) Serial.print(F("  [DEFAULT]"));
    Serial.println();
  }

  Serial.println(F("=== Load Done ===\n"));
}

void CalibrateSensor(int pauseTime, int samples) {
  for (int i = 0; i < NUM_SENSORS; i++) {
    MinValue[i] = 4096;
    MaxValue[i] = 0;
  }
  for (int startSamp = 0; startSamp <= samples; startSamp++) {
    ReadSensor();
    for (int i = 0; i < NUM_SENSORS; i++) {
      MinValue[i] = (F[i] <= MinValue[i] ? F[i] : MinValue[i]);
      MaxValue[i] = (F[i] >= MaxValue[i] ? F[i] : MaxValue[i]);
    }
    delay(pauseTime);
  }
  for (int i = 0; i < NUM_SENSORS; i++) {
    MinValue[i] += 50;
    MaxValue[i] -= 100;
  }
SaveCalibrateToEEPROM();
}

void SensorValueMin(uint16_t minF0, uint16_t minF1, uint16_t minF2, uint16_t minF3, uint16_t minF4, uint16_t minF5){
  MinValue[0] = minF0;
  MinValue[1] = minF1;
  MinValue[2] = minF2;
  MinValue[3] = minF3;
  MinValue[4] = minF4;
  MinValue[5] = minF5;
}

void SensorValueMax(uint16_t maxF0, uint16_t maxF1, uint16_t maxF2, uint16_t maxF3, uint16_t maxF4, uint16_t maxF5){
  MaxValue[0] = maxF0;
  MaxValue[1] = maxF1;
  MaxValue[2] = maxF2;
  MaxValue[3] = maxF3;
  MaxValue[4] = maxF4;
  MaxValue[5] = maxF5;
}

  void SensorValueF(uint16_t minF0, uint16_t minF1, uint16_t minF2, uint16_t minF3, uint16_t minF4, uint16_t minF5, uint16_t maxF0, uint16_t maxF1, uint16_t maxF2, uint16_t maxF3, uint16_t maxF4, uint16_t maxF5) {
  MinValue[0] = minF0;
  MinValue[1] = minF1;
  MinValue[2] = minF2;
  MinValue[3] = minF3;
  MinValue[4] = minF4;
  MinValue[5] = minF5;


  MaxValue[0] = maxF0;
  MaxValue[1] = maxF1;
  MaxValue[2] = maxF2;
  MaxValue[3] = maxF3;
  MaxValue[4] = maxF4;
  MaxValue[5] = maxF5;
}
void TrackLineColor(int x){
LineColor = x;
}

void ReadCalibrate() {
  ReadSensor();
  for (int i = 0; i < NUM_SENSORS; i++) {
    F[i] = constrain(F[i], MinValue[i], MaxValue[i]);
    int x;
    if (LineColor == 0)
      x = map(F[i], MinValue[i], MaxValue[i], 1000, 0);
    else
      x = map(F[i], MinValue[i], MaxValue[i], 0, 1000);
    if (x < 100)   x = 0;
    if (x > 900)  x = 1000;
    // if (x < 0)    x = 0;
    // if (x > 1000) x = 1000;
    F[i] = x;
  }


}


void SerialSensor() {
  while (1) {
    ReadSensor();
    for (int _serialF = 0; _serialF < NUM_SENSORS; _serialF++) {
      Serial.print(F[_serialF]);
      Serial.print("\t");
    }
    Serial.println("");
    delay(50);
    if (OK_PUSH() == 1) {
      Beep(40);
      break;
    }
  }
}

void SerialCalibrate() {
  while (1) {
    ReadCalibrate();
    for (int _serialF = 0; _serialF < NUM_SENSORS; _serialF++) {
      Serial.print(F[_serialF]);
      Serial.print("\t");
    }
    Serial.println("");
    delay(100);
    if (OK_PUSH() == 1) {
      Beep(40);
      break;
    }
  }
}

void SerialDistance() {
  while (1) {
    Serial.print("Distance : ");
    Serial.println(sonar.ping_cm());
    ;
    delay(150);
  }
}
