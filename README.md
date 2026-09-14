# MiniGathering

บอร์ดสำหรับหุ่นยนต์เดินตามเส้น MiniGathering สร้างบนฐาน ESP32 DevKit ทั่วไป (ESP-WROOM-32, 30 ขา,
USB-Serial CP2102/CH340 — เช่น DOIT ESP32 DEVKIT V1) เขียนโปรแกรมบนแพลตฟอร์ม `arduino-esp32` ที่
มากับ KBIDE โดยไม่ต้องพึ่งฮาร์ดแวร์เสริมเฉพาะทาง (จอ/ปุ่ม/ลำโพงในตัว) แบบบอร์ด KidBright เดิม

> ดูคำอธิบายบล็อกคำสั่งทั้ง 8 หมวดหมู่แบบละเอียด (ภาษาไทย) ได้ที่ [`คู่มือบล็อกคำสั่ง.md`](./คู่มือบล็อกคำสั่ง.md)

## สิ่งที่มากับบอร์ดนี้

โฟลเดอร์ `include/` ของบอร์ดถูกใส่ไลบรารีต่อไปนี้ไว้ให้แล้ว (คอมไพล์รวมกับทุกโปรเจกต์บนบอร์ดนี้
โดยอัตโนมัติ ไม่ต้องติดตั้งเพิ่ม):

- **minigathering** — ไลบรารีหุ่นยนต์เดินตามเส้น/PID จาก
  `Documents\Arduino\libraries\minigathering` (คัดลอกมาโดยไม่แก้ไขโค้ด): `motor.h`, `sensor.h`,
  `pid.h`, `turn.h`, `forwardbackwardandturn.h`, `initial.h`, `minigathering.h`
- **NewPing** v1.9.7 — ไลบรารีอ่านค่าเซนเซอร์ระยะ (ultrasonic)
- **ESP32Servo** — ไลบรารีควบคุมเซอร์โวบน ESP32 (ใช้ LEDC API รุ่นเก่าที่ตรงกับแพลตฟอร์ม
  arduino-esp32 ที่ติดตั้งใน KBIDE — ได้ตรวจสอบแล้วว่า guard ด้วย `ESP_ARDUINO_VERSION_MAJOR` จึง
  ไม่ชนกับ core รุ่นเก่า)
- **mg_servo.h** — ฟังก์ชันแขนกล/เซอร์โว พอร์ตมาจาก
  `examples\MiniGathering\Servo.ino` และการตั้งค่า `Servo` object ใน `MiniGathering.ino` (ไม่ใช่ส่วน
  ของไลบรารี core แต่เป็นโค้ดเฉพาะของสเก็ตช์ตัวอย่าง): ประกาศ `servo_gripper`/`servo_base` พร้อมขา 14/12
  และฟังก์ชัน `servoSetup`, `servo`, `servo_up`, `servo_up45`, `servo_down`, `servo_open`,
  `servo_close_small`, `servo_close_big`, `arm_base`, `arm_gripper`

ในโปรเจกต์ (โหมดเขียนโค้ดข้อความ) สามารถ `#include <minigathering.h>` แล้วเรียกใช้ฟังก์ชันจาก
ตัวอย่างใน `Documents\Arduino\libraries\minigathering\examples\MiniGathering\` ได้เลย เช่น
`robotsetup()`, `Motor()`, `PID()`, `wait_start()`, `CalibrateSensor()` ฯลฯ

## ขาที่ไลบรารี MiniGathering ใช้อยู่แล้ว (ห้ามใช้ซ้ำกับอย่างอื่น)

| อุปกรณ์ | ขา (GPIO) |
| --- | --- |
| มอเตอร์ซ้าย IN1 / IN2 | 4 / 2 |
| มอเตอร์ขวา IN1 / IN2 | 17 / 16 |
| เซนเซอร์เส้น 6 ตัว (F0–F5) | 25, 33, 32, 35, 34, 39 |
| ปุ่มกด (button) | 27 |
| บัซเซอร์ (buzzer) | 15 |
| Ultrasonic Trigger / Echo | 13 / 5 |
| เซอร์โวแขนกล (servo_base) / มือจับ (servo_gripper) | 12 / 14 |

ขาที่เหลือยังใช้งานได้อิสระ

> **หมายเหตุ:** `leftMotorPin_IN1`/`IN2` และ `rightMotorPin_IN1`/`IN2` ใน `include/motor.h` ถูกสลับค่า
> ไปจากไลบรารีต้นฉบับ (ต้นฉบับคือ 2/4 และ 16/17) เพราะมอเตอร์บนบอร์ดจริงต่อขั้วกลับด้าน ทำให้
> `Motor(50, 50)` วิ่งถอยหลังแทนที่จะเดินหน้า ถ้าจะอัปเดต `motor.h` จากไลบรารีต้นฉบับใหม่อีกครั้ง
> อย่าลืมสลับ 4 ค่านี้กลับด้วย

## การตั้งค่าที่ทำไว้ให้

- `template.c` — โครงโค้ดเริ่มต้นของโหมดบล็อก (ไม่มีผลกับโหมดเขียนโค้ดข้อความ) เลียนแบบลำดับการ
  ตั้งค่าใน `examples\MiniGathering\MiniGathering.ino` ทุกโปรเจกต์บนบอร์ดนี้จะได้ `setup()` เริ่มต้น
  ที่ทำตามลำดับนี้เสมอ ก่อนบล็อกของผู้ใช้จะทำงาน:
  `servoSetup → robotsetup → LoadCalibrateFromEEPROM → TurnSpeedLeft/Right → SetTurnSpeed →
  SetKpKd/SetSpeedForward/SetSpeedBackward (ตารางค่าเริ่มต้นจาก examples\MiniGathering\setspeed.ino)
  → TrackLineColor → RefLineValue → ModeSpdPID → arm_base/arm_gripper → wait_start` แล้วค่อยรัน
  บล็อกที่ผู้ใช้วางไว้ใน Setup (ทับค่าเริ่มต้นได้ตามต้องการ) ปิดท้ายด้วย `MotorStop()`
  ฟังก์ชัน `SetKpKd`/`SetSpeedForward`/`SetSpeedBackward` ก็อยู่ใน template.c นี้เอง แก้ค่าตัวเลขในนั้น
  ได้โดยตรงถ้าต้องการเปลี่ยนค่าคาลิเบรตเริ่มต้นของทุกโปรเจกต์บนบอร์ดนี้
- `config.js` — ประกาศบอร์ดชื่อ `minigathering` ใช้แพลตฟอร์ม `arduino-esp32`
- `context.json` — เพิ่ม `-I"{board}/include"` และรองรับชิป USB-Serial ยอดนิยมของบอร์ดโคลน DOIT
  (CP2102: `10c4:ea60`, CH340: `1a86:7523`, CH9102: `1a86:55d4`) สำหรับให้ KBIDE มองเห็นพอร์ต
  เวลาอัปโหลด — ถ้าคอมพิวเตอร์มองไม่เห็นพอร์ต ให้ตรวจสอบ VID:PID จริงของบอร์ดใน Device Manager
  แล้วเพิ่มเข้าไปในไฟล์นี้
- `include/pins_arduino.h` — ผังขามาตรฐานของ ESP32 (WROOM-32 30 ขา)
- `block/` — บล็อกลาก-วางเฉพาะของ MiniGathering (เพิ่มเติมจากชุดบล็อก GPIO/Serial/WiFi/Math/Logic/...
  เริ่มต้นของแพลตฟอร์ม arduino-esp32 ที่ยังใช้ได้ตามปกติ) แบ่งเป็น 8 หมวดในกล่องเครื่องมือ แต่ละหมวดมี
  ไอคอนของตัวเอง (ดึงจากชุดไอคอนที่มากับ KBIDE เอง ที่ `/static/icons/...` — ใช้ได้กับทุกบอร์ดโดยไม่ต้อง
  แนบไฟล์รูปมาด้วย) และป้ายชื่อบนตัวบล็อกแต่ละอันตั้งตามชื่อฟังก์ชัน/พารามิเตอร์จริงในไลบรารี (เช่น
  บล็อก "Motor" มีช่อง "L"/"R" ตรงกับ `Motor(int spdL, int spdR)`) เพื่อให้อ่านโค้ดอ้างอิงในไลบรารีแล้ว
  จับคู่กับบล็อกได้ทันที:

  | หมวด | ไอคอน (ไฟล์ในชุดไอคอนของ KBIDE) | บล็อกที่มีให้ | อ้างอิงฟังก์ชันไลบรารี |
  | --- | --- | --- | --- |
  | Setup | `chip.png` | เริ่มต้นหุ่นยนต์, รอกดปุ่มเริ่ม | `robotsetup`, `wait_start` |
  | Motor | `icons8_exercise_96px.png` | สั่งมอเตอร์ซ้าย/ขวา, มอเตอร์เดี่ยว, หยุดมอเตอร์ (มี/ไม่มีหน่วงเวลา), เดินตามเวลา, ขับต่อเนื่องแบบไม่หน่วงเวลา (เดินหน้า/ถอยหลัง/หมุนซ้าย-ขวา/เลี้ยวล้อเดียว) | `Motor`, `Motor1`, `Motor2`, `MotorStop`, `Move`, `fd`, `fd2`, `bk`, `bk2`, `sl`, `sr`, `tl`, `tr` |
  | Sound & Button | `buzzer.png` | บี๊บสั้น/บี๊บนาน/บี๊บเร็ว, เปิด-ปิดบัซเซอร์ค้าง, รอกดปุ่ม, เช็คปุ่ม (ไม่บล็อก) | `beep`, `Beep`, `BZon`, `BZoff`, `fastBeep`, `WaitOK`, `OK_PUSH` |
  | Sensor | `icons8_thermometer_automation_96px.png` | อ่านค่าเซนเซอร์เส้นดิบ/หลังคาลิเบรต, ค่าเซนเซอร์แต่ละตัว, ระยะ Ultrasonic, คาลิเบรต, บันทึก/โหลด EEPROM, ตั้งค่า Min/Max เอง, ตั้งสีสนาม, แสดงค่าทาง Serial | `ReadSensor`, `ReadCalibrate`, `F[]`, `sonar.ping_cm`, `CalibrateSensor`, `Save/LoadCalibrateToEEPROM`, `SensorValueMin/Max`, `TrackLineColor`, `RefLineValue`, `SerialSensor/Calibrate/Distance` |
  | Speed & PID | `icons8_process_96px.png` | ปรับสมดุลเดินหน้า/ถอยหลัง, ตั้งค่า Kp/Kd, โหมดจำกัดความเร็ว PID, ตั้งกึ่งกลางเส้น, สั่ง PID หนึ่งครั้ง, อ่านตำแหน่งเส้น | `setBalanceSpeed`, `setBalanceBackSpeed`, `setKpKd`, `ModeSpdPID`, `SetCenter`, `PID`, `readPosition` |
  | Turning | `icons8_repeat_96px.png` | ตั้งค่า/สั่งเลี้ยวซ้าย-ขวาแบบตามเซนเซอร์, ตั้งความเร็วหมุน/เข้ากึ่งกลาง, เข้ากึ่งกลางเส้น, หมุนอยู่กับที่ 4 แบบ | `TurnSpeedLeft/Right`, `SetTurnSpeed`, `SetToCenterSpeed`, `Delay_c_F`, `ToCenter`, `TurnLeft/Right`, `SpinL/L2/R/R2` |
  | Line Follow | `icons8_workflow_128px.png` | เดินหน้า/ถอยหลัง/หมุนตามเวลา, เดินตามเส้น PID จนเจอทางแยกแบบต่าง ๆ (11 แบบ) จนใกล้สิ่งกีดขวาง หรือตามเวลา, ทำคำสั่งที่ทางแยกเอง | `FD/BK/TL/TR/SL/SR`, `FF/FFC/FFC2/FFR/FFR5/FFR2/FFL/FFL0/FFL2/FFWhite/FFBlack`, `FFNUM`, `FF_DISTANCED`, `FFTimer`, `TrackSelect` |
  | Servo | `icons8_disconnected_96px.png` | ต่อเซอร์โว (attach), ตั้งแขนกล/มือจับเป็นค่าที่กำหนดเอง, ท่ายกแขน/ลดแขน/อ้า/หุบสำเร็จรูป | `servoSetup`, `servo`, `arm_base`, `arm_gripper`, `servo_up`, `servo_up45`, `servo_down`, `servo_open`, `servo_close_small`, `servo_close_big` |

  บล็อกทุกตัวใช้ชื่อชนิด (type) ขึ้นต้นด้วย `mg_` (เช่น `mg_motor`, `mg_ff`) เพื่อไม่ชนกับบล็อกมาตรฐานของแพลตฟอร์ม
  แต่ข้อความบนตัวบล็อกเองใช้ชื่อฟังก์ชันจริงจากไลบรารี (เช่น "Motor", "FF", "TurnLeft", "PID") ไม่ใช่คำอธิบาย
  ภาษาอังกฤษทั่วไป และไม่มีคำว่า "MiniGathering" นำหน้าคำสั่งแล้ว — คำอธิบายการใช้งานยังอยู่ใน tooltip
  (hover ค้างไว้ที่บล็อกเพื่อดู) ส่วนไอคอนหมวดหมู่ทั้งหมดใช้ไฟล์ที่มากับ KBIDE เองอยู่แล้วที่
  `/static/icons/` จึงไม่ต้องแนบไฟล์รูปเพิ่มในบอร์ดนี้
  ไฟล์อยู่ที่ `block/blocks_mg_*.js` (นิยามรูปร่างบล็อก), `block/generators_mg_*.js` (แปลงบล็อกเป็นโค้ด
  C/C++) และ `block/menu/config.group.mg_*.js` (จัดกลุ่มในกล่องเครื่องมือ พร้อมค่าเริ่มต้น)

## วิธีใช้งานใน KBIDE

1. เปิด KBIDE แล้วเลือกบอร์ดเป็น **MiniGathering** จากรายชื่อบอร์ด
2. เขียนโค้ดแบบข้อความ (C/C++) หรือใช้บล็อกลาก-วางตามปกติ
3. เชื่อมต่อบอร์ดผ่าน USB แล้วเลือกพอร์ต COM ที่ปรากฏ จากนั้นกดคอมไพล์/อัปโหลดได้ตามปกติ

## ข้อจำกัดที่ควรทราบ

- แพลตฟอร์ม arduino-esp32 ที่มากับ KBIDE เป็นคอร์รุ่นเก่า (ESP32 ตัวเดียว ไม่รองรับ S2/S3/C3) —
  ฟังก์ชันของ ESP32Servo/NewPing ที่ใช้ในบอร์ดนี้ถูกตรวจสอบแล้วว่าใช้ได้กับ API รุ่นเก่าที่คอร์นี้มี
- บล็อกในหมวด Servo อ้างอิงขาตายตัวตามตัวอย่าง (servo_base = 12, servo_gripper = 14) ถ้าเดินสายจริง
  ใช้ขาอื่น ต้องแก้ค่า `servo_gripper_PIN`/`servo_base_PIN` ใน `include/mg_servo.h` เอง
- ในโหมดเขียนโค้ดข้อความ (ไม่ใช้บล็อก) ต้อง `#include "mg_servo.h"` เองต่อจาก `#include <minigathering.h>`
  จึงจะเรียกฟังก์ชันเซอร์โวพวกนี้ได้ (เหมือนกับที่ต้อง include `<minigathering.h>` เองเช่นกัน)
