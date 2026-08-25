#include "sensor.h"
#include "motor.h"
#include "initial.h"
#include "forwardbackwardandturn.h"
#include "turn.h"
#include "pid.h"

void robotsetup(){
    Serial.begin(115200);
     if (!EEPROM.begin(EEPROM_SIZE)) {
    Serial.println("EEPROM begin failed!");
    while (1);
  }
    pinMode(button, INPUT_PULLUP);  // กำหนดให้ขา button เป็น INPUT แบบ PULLUP
  // Set buzzer controller pins as output
  pinMode(buzzer, OUTPUT);     // กำหนดให้ขา buzzer เป็น OUTPUT
  digitalWrite(buzzer, HIGH);  //กำหนดค่าเริ่มต้นของ buzzer ให้ไม่ดัง

  pinMode(leftMotorPin_IN1, OUTPUT);
  pinMode(rightMotorPin_IN1, OUTPUT);
  pinMode(leftMotorPin_IN2, OUTPUT);
  pinMode(rightMotorPin_IN2, OUTPUT);
  beep();
beep();
beep();
  Motor(0, 0);  // เริ่มต้นหยุด


}


#define LONG_PRESS_TIME 2000  // 2 วินาที

void wait_start() {

  MotorStop(100);

  while (1) {

    // =========================
    // รอจนกว่าจะกดปุ่ม
    // =========================
    while (digitalRead(button) != LOW) {
      delay(10);
    }

    unsigned long pressTime = millis();

    // =========================
    // รอจนกว่าจะปล่อยปุ่ม
    // =========================
    while (digitalRead(button) == LOW) {

      // กดค้างครบ 2 วินาที
      if (millis() - pressTime >= LONG_PRESS_TIME) {

        Serial.println("Calibrate Sensor");

        beep();
        delay(200);

        CalibrateSensor(20, 200);

        beep();
        delay(500);

        Serial.println("Calibration Complete");
        Serial.println("Press button to start");

        // รอให้ปล่อยปุ่มก่อน
        while (digitalRead(button) == LOW) {
          delay(10);
        }

        // ไม่ return
        // กลับไป while(1) ด้านนอก
        break;
      }

      delay(10);
    }

    // =========================
    // ถ้ากดค้าง → Calibration
    // แล้ววนกลับไปรอปุ่มใหม่
    // =========================
    if (millis() - pressTime >= LONG_PRESS_TIME) {
      continue;
    }

    // =========================
    // กดสั้น → เริ่มวิ่ง
    // =========================
    Serial.println("Push Switch");

    beep();
    delay(300);

    break;
  }
}
