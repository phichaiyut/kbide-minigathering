// กำหนดขามอเตอร์
// หมายเหตุ: สลับ IN1/IN2 ของมอเตอร์ทั้งสองข้างจากต้นฉบับไลบรารี เพื่อแก้ปัญหาการเดินหน้า/ถอยหลัง
// สลับทิศทาง (มอเตอร์จริงบนบอร์ดนี้ต่อขั้วกลับด้าน) — ถ้าอัปเดต motor.h จากไลบรารีต้นฉบับใหม่
// อีกครั้ง ต้องสลับค่า 4 บรรทัดนี้กลับด้วย
const int leftMotorPin_IN1  = 4;
const int leftMotorPin_IN2  = 2;
const int rightMotorPin_IN1 = 17;
const int rightMotorPin_IN2 = 16;
int BaseSpeed ,LeftBaseSpeed, RightBaseSpeed, BackLeftBaseSpeed, BackRightBaseSpeed;



void Motor1(int spdL){
spdL = constrain(spdL, -100, 100);
int pwmL = map(abs(spdL), 0, 100, 0, 255);
 // มอเตอร์ซ้าย
  if (spdL > 0) { // เดินหน้า
    analogWrite(leftMotorPin_IN1, pwmL);
    analogWrite(leftMotorPin_IN2, 0);
  } else if (spdL < 0) { // ถอยหลัง
    analogWrite(leftMotorPin_IN1, 0);
    analogWrite(leftMotorPin_IN2, pwmL);
  } else { // หยุด
    analogWrite(leftMotorPin_IN1, 0);
    analogWrite(leftMotorPin_IN2, 0);
  }
}

void Motor2(int spdR){
spdR = constrain(spdR, -100, 100);

  // แปลงจาก -100~100 → -255~255

  int pwmR = map(abs(spdR), 0, 100, 0, 255);

  // มอเตอร์ขวา
  if (spdR > 0) { // เดินหน้า
    analogWrite(rightMotorPin_IN1, pwmR);
    analogWrite(rightMotorPin_IN2, 0);
  } else if (spdR < 0) { // ถอยหลัง
    analogWrite(rightMotorPin_IN1, 0);
    analogWrite(rightMotorPin_IN2, pwmR);
  } else { // หยุด
    analogWrite(rightMotorPin_IN1, 0);
    analogWrite(rightMotorPin_IN2, 0);
  }


}



void Motor(int spdL, int spdR) {
  // จำกัดค่าให้อยู่ในช่วง -100 ถึง 100
  Motor1(spdL);
  Motor2(spdR);

}

void MotorStop() {
  analogWrite(leftMotorPin_IN1, 255);
  analogWrite(leftMotorPin_IN2, 255);
  analogWrite(rightMotorPin_IN1, 255);
  analogWrite(rightMotorPin_IN2, 255);
}

void MotorStop(int de) {
  analogWrite(leftMotorPin_IN1, 255);
  analogWrite(leftMotorPin_IN2, 255);
  analogWrite(rightMotorPin_IN1, 255);
  analogWrite(rightMotorPin_IN2, 255);
  delay(de);
}

void Move(int l, int r, int de){
 Motor(l, r);
 delay(de);
}


void fd(int speed){
Motor(speed, speed);
}

void fd2(int speedL,int speedR){
  Motor(speedL, speedR);
}


void bk(int speed){
Motor(-speed, -speed);
}

void bk2(int speedL,int speedR){
  Motor(-speedL, -speedR);
}

void sl(int speed){
Motor(-speed, speed);
}

void sr(int speed){
Motor(speed, -speed);
}

void tl(int speed){
Motor(0, speed);
}

void tr(int speed){
Motor(speed, 0);
}