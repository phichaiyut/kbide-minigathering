// Servo arm helpers — ported from examples/MiniGathering/Servo.ino and the
// Servo object setup in examples/MiniGathering/MiniGathering.ino. These are
// not part of the core minigathering library headers (motor.h/sensor.h/...),
// but are the project's own convenience functions for the gripper arm.
#include <ESP32Servo.h>

Servo servo_gripper;
Servo servo_base;

const int servo_gripper_PIN = 14;
const int servo_base_PIN = 12;

int pos1 = 90;
int pos2 = 90;
int s_up = 70;
int s_up45 = 90;
int s_down = 150;
int s_ready = 140;
int s_open = 170;        //อ้าม
int s_closesmall = 90;   //จับลูกเล็ก
int s_closebig = 120;    //จับลูกใหญ่

void servoSetup() {
  servo_gripper.attach(servo_gripper_PIN, 500, 2500);
  servo_base.attach(servo_base_PIN, 500, 2500);
}

void servo(int de1, int de2) {
  MotorStop();
  servo_gripper.write(pos2 = de2);  //กำหนดให้มือจับอ้า
  servo_base.write(pos1 = de1);     //กำหนดให้มือจับยก
  delay(300);
}

void servo_up() {
  MotorStop();
  servo_base.write(s_up);  //กำหนดให้มือจับยก
  delay(300);
}

void servo_up45() {
  MotorStop();
  servo_base.write(s_up45);  //กำหนดให้มือจับยก
  delay(300);
}

void servo_down() {
  MotorStop();
  servo_base.write(s_down);  //กำหนดให้มือจับยก
  delay(300);
}

void servo_open() {
  MotorStop();
  servo_gripper.write(s_open);  //กำหนดให้มือจับอ้า
  delay(300);
}

void servo_close_small() {
  MotorStop();
  servo_gripper.write(s_closesmall);  //กำหนดให้มือจับอ้า
  delay(300);
}

void servo_close_big() {
  MotorStop();
  servo_gripper.write(s_closebig);  //กำหนดให้มือจับอ้า
  delay(300);
}

void arm_base(int angle) {
  MotorStop();
  servo_base.write(angle);  //กำหนดให้มือจับยก
  delay(300);
}

void arm_gripper(int angle) {
  MotorStop();
  servo_gripper.write(angle);  //กำหนดให้มือจับอ้า
  delay(300);
}

// Interactive servo jog over Serial — from examples/MiniGathering/MiniGathering.ino.
// Type "1 90" / "2 90" in the Serial Monitor to move a servo, or "exit" to return.
void SerialServoControl() {

  Serial.println("=== Serial Servo Control ===");
  Serial.println("Servo 1:  1 90");
  Serial.println("Servo 2:  2 90");
  Serial.println("Exit: exit");

  while (1) {

    if (Serial.available()) {

      String cmd = Serial.readStringUntil('\n');
      cmd.trim();

      // =========================
      // Exit
      // =========================
      if (cmd.equalsIgnoreCase("exit")) {
        Serial.println("Exit Servo Control");
        break;
      }

      int servoNum;
      int angle;

      // =========================
      // รับ: Servo + Angle
      // เช่น 1 90
      // =========================
      if (sscanf(cmd.c_str(), "%d %d", &servoNum, &angle) == 2) {

        angle = constrain(angle, 0, 180);

        // Servo 1 = Gripper
        if (servoNum == 2) {

          servo_gripper.write(angle);

          Serial.print("Gripper -> ");
          Serial.print(angle);
          Serial.println(" deg");
        }

        // Servo 2 = Base
        else if (servoNum == 1) {

          servo_base.write(angle);

          Serial.print("Base -> ");
          Serial.print(angle);
          Serial.println(" deg");
        }

        else {
          Serial.println("Servo must be 1 or 2");
        }
      }

      else {
        Serial.println("Format: Servo Angle");
        Serial.println("Example: 1 90");
      }
    }

    delay(10);
  }
}
